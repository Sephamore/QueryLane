
import { Op } from "sequelize";
import {PostsModel} from "../models/init-models.js";

// POST DATA RELATED

export const getPostData = async (req, res) => {
    let idlist = req.params.id.split('&');
    console.log(idlist);
    try {
        let post = await PostsModel.findAll({
            where: {
                id: idlist
            }, 
        });
        res.json(post);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getPostSummary = async (req, res) => {
    try {
        let idlist = req.params.id.split('&');
        console.log(idlist);
        const post = await PostsModel.findAll({
            where: {
                id: idlist
            },
            attributes: {exclude: ['body']}
        });
        res.json(post);
    } catch (error) {
        res.json({ message: error.message });
    }
}


const postBelongs = async (postid, userid) => {
    try {
        let post = await PostsModel.findOne({
            where: {
                id: postid
            }, 
        });
        if(post.owner_user_id === userid) {
            return true;
        }
        else {
            return false;
        };
    } catch (error) {
        return false;
    }
}

const updateAnswerCount = async (postid, delta) => {
    try {
        PostsModel.increment(
            { answer_count: delta },
            { where: { id: postid } }
          );
        res.json({
            message: "Answer Count incremented"
        });
    } catch (error) {
        res.json({ message: error.message });
    }   
}

//in progress
export const createPost = async (req, res) => {
    // console.log("creating")
    try {
        let content = req.body;
        if(req.session.userId !== content.owner_user_id)
        {
            throw {message: "owner_user_id not same as current user"};
        };
        content.creation_date = new Date();
        content.score = 0;
        content.view_count = 0;
        content.answer_count = 0;
        content.comment_count = 0;
        content.content_license = "CC BY-SA 3.0";
        content.id = await PostsModel.max("id")+1;
        // console.log("creating", content)
        await PostsModel.create( content );
        // console.log("created")
        res.json({
            message: "Post Created",
            id: content.id,
            status: "OK"
        });

        if(content.post_type_id === 2 && content.parent_id != null){
            updateAnswerCount(content.parent_id, 1); //increment
        }
    }
    catch (error) {
        res.json({ message: error.message, status: "Error" });
        // console.log("Error", error.message)
    }
}

//only allows title, tags and body to be changed
export const updatePost = async (req, res) => {
    try {
        if(! await postBelongs(req.body.id, req.session.userId))
        {
            throw {message: "post owner_user_id not same as current user"};
        };

        let newData = req.body;
        // newData.keys(values).forEach( (key) => {
        //   if (values[key] === undefined) {delete values[key];}        // handle undefined
        //   if (values[key] === null){values[key] === "";}              // use empty string instead of nulls
        //   if (values[key] === null){values[key] === "";}              // use empty string instead of nulls
        // }); 

        const now = new Date();
        await PostsModel.update({
            title: newData.title,
            body: newData.body,
            tags: newData.tags,
            last_edit_date: now
        },{
            where: {id: req.body.id}
        });
        res.json({
            message: "Post Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

//deletes the content of a post and sets post_type_id = -1
export const deletePost = async (req, res) => {
    try {
        if(! await postBelongs(req.body.id, req.session.userId))
        {
            throw {message: "post owner_user_id not same as current user"};
        };

        let post = await PostsModel.findOne({
            where: {
                id: postid
            }, 
        });

        if(post.post_type_id === 2 && post.parent_id != null){
            updateAnswerCount(post.parent_id, -1); //decrement
        }

        await PostsModel.update({
            body: "Deleted",
            title: "Deleted",
            post_type_id: -1      //stays in database, but not shown
        },{
            where: {
                id: req.params.id
            }
        });

        res.json({
            message: "Post Deleted"
        });

    } catch (error) {
        res.json({ message: error.message });
    }
}

// ANSWER RELATED

export const getAnswers = async (req, res) => {
    try {
        let idlist = await PostsModel.findAll({
            where: {
                parent_id: req.params.id,
                post_type_id:2
            },
            attributes: ["id"]
        });

        idlist = idlist.map(e => e.id);
        res.json(idlist);
    } catch (error) {
        res.json({ message: error.message });
    }
}

/*example:
curl "http://localhost:5000/posts/getparents/44271&10000"
converts list of post ids to list of parent ids while preserving orderq*/
export const getParents = async (req, res) => {
    try {
        const answerList = req.params.id.split('&');
        const parentList = await PostsModel.findAll(
            {
                where: {
                    id: answerList
                },
                attributes: ['id', 'parent_id']
            }
        )
        
        var parentDict = {}; //generate dictionary
        parentList.map(r => {parentDict[r.id] = r.parent_id;} ); 
        
        const resultList = answerList.map(e => parentDict[e] ); //map all answers to parents
        res.json(resultList);
    } catch (error) {
        res.json({ message: error.message });
    }
}


// SEARCH RELATED

/*examples: 
curl "http://localhost:5000/posts/recent/2011-11-25T22:32:41.300Z/10"
curl "http://localhost:5000/posts/byuser/2162&262/upvotes"
curl "http://localhost:5000/posts/bytags/ubuntu&windows/time"
*/

export const getRecentPosts = async (req, res) => {
    try{
        const searchstart = Date.parse(req.params.starttime);
        let idlist = await PostsModel.findAll({
            where: {
                creation_date: { 
                    [Op.gte]: searchstart    //generates timestamp
                },
                post_type_id: 1 // gets only questions
            },
            order: [ ['creation_date', 'DESC'] ],
            attributes: ['id']
        });

        if(req.params.limit !== "all"){
            idlist = idlist.slice(0, parseInt(req.params.limit));
        }

        idlist = idlist.map(e => e.id);

        res.json(idlist);
        
    } catch (error) {
        res.json({ message: error.message });
    }
}


export const getTrendingPosts = async (req, res) => {
    try{
        let idlist = await PostsModel.findAll({
            where: {
                post_type_id: 1, // gets only questions
                score: {[Op.gt] : 2 }
            }, 
            //order: [Sequelize.literal('score + EXTRACT(EPOCH FROM creation_date)/(86400) DESC')],
            attributes: ['id'], 
            limit: 20
        });

        // score/age is a good measure. But the data is many years old, so 1/age is nearly constant
        //order: [Sequelize.literal("score/( EXTRACT(EPOCH FROM now()) - EXTRACT(EPOCH FROM creation_date) ) DESC")],

        idlist = idlist.map(e => e.id);
        res.json(idlist);
        
    } catch (error) {
        res.json({ message: error.message });
    }
}

const decideSorting = (param) => {
    var sorting = ['creation_date', 'DESC']; //default
    if(param === 'default'){
        return sorting;
    }

    if(param === "upvotes"|| param === "upvotes_d"){ 
        sorting = ['score', 'DESC'];
    }   
    else if (param === "time"|| param === "time_d"){ 
        sorting = ['creation_date', 'DESC'];
    }
    else if(param === "upvotes_a"){ 
        sorting = ['score', 'ASC'];
    }   
    else if (param === "time_a"){ 
        sorting = ['creation_date', 'ASC'];
    }
    return sorting;
}


const extractParams = (c) => {
    return c.split('=')[1].split('&');
}


/*
search for posts (from one of the users, with all tags)
example:
curl "http://localhost:5000/posts/search/tags=ubuntu&linux+order=upvotes+limit=3"
*/
export const searchPosts = async (req, res) => {
    try {
        const criteria = req.params.query.split('+'); 
        var whereClause = {}; // describes search parameters
        var order = 'default'; // describes order
        var limit = null; //max results if search criteria is provided

        // read each criterion from query string
        for(var i =0; i< criteria.length; i++){

            if(criteria[i].includes("tags="))   
            {
                const tagArray = extractParams(criteria[i]); // array of tags
                //console.log(tagArray);
                const likeTagArray = tagArray.map( (tag) => { 
                    return { [Op.like]: "%<"+tag+">%" };      // like operator on tags
                } );
                whereClause.tags = { 
                    [Op.and]: likeTagArray      // and ensures all given tags are present
                };
            }

            else if(criteria[i].includes("userids="))
            {
                const useridArray = extractParams(criteria[i]);
                //console.log(useridArray);
                whereClause.owner_user_id = useridArray;
            }

            //1 for questions, 2 for answers
            else if(criteria[i].includes("typeid="))
            {
                whereClause.post_type_id = criteria[i].split('=')[1];
            }

            else if(criteria[i].includes("order="))
            {
                order = criteria[i].split('=')[1];
            }

            else if(criteria[i].includes("limit="))
            {
                limit = criteria[i].split('=')[1];
            }

        }        
        const orderClause = decideSorting(order);  // order by  

        // to prevent unreasonably large requests, max limit is 1000 results
        if(limit > 1000 || limit === null || limit < 0){
            limit = 1000;  
        }

        let idlist = await PostsModel.findAll({
            where: whereClause,
            order: [orderClause],
            attributes: ['id'],
            limit: limit
        });

        idlist = idlist.map(e => e.id);
        res.json(idlist);
    } catch (error) {
        res.json({ message: error.message });
    }
}


//legacy controllers


export const getPostsByUser = async (req, res) => {
    try {
        const sorting = decideSorting(req.params.sorting);

        const userlist = req.params.userids.split("&");

        let idlist = await PostsModel.findAll({
            where: {
                owner_user_id: userlist,
                post_type_id: req.params.type
            },
            order: [sorting],
            attributes: ['id']
        });
        idlist = idlist.map(e => e.id);
        if (req.params.type == 2) {
            idlist = await PostsModel.findAll({
                where: {
                    id: idlist
                },
                order: [sorting],
                attributes: ['parent_id']
            });
            idlist = idlist.map(e => e.parent_id);
        }
        res.json(idlist);
    } catch (error) {
        res.json({ message: error.message });
    }
}

//returns postids where all tags are present, in order given by params.sorting
export const getPostsByTags = async (req, res) => {
    try {
        const sorting = decideSorting(req.params.sorting);

        const tags = req.params.tags;  // "ubuntu&windows"; // 
        const tagArray = tags.split('&'); //params will have tags separated by &
        const likeTagArray = tagArray.map( (tag) => { 
            return { [Op.like]: "%<"+tag+">%" }; 
        } );

        let idlist = await PostsModel.findAll({
            where: {
                tags: { 
                    [Op.and]: likeTagArray
                }
            },
            order: [sorting],
            attributes: ['id']
        });
        idlist = idlist.map(e => e.id);
        res.json(idlist);
    } catch (error) {
        res.json({ message: error.message });
    }
}








/*  ALTERNATE
        const tags = req.params.tags; // "<ubuntu><windows>"
        //regex to keep tags intact when splitting
        const tagArray = tags.split(/(?=<)/g) ; //split based on lookahead for '<'
        const likeTagArray = tagArray.map( (tag) => { 
            return { [Op.like]: "%"+tag+"%" }; 
        } );
*/



/* For getting an idea of daily questions posted
with temp as (SELECT id, DATE(creation_date) as d FROM posts where post_type_id = 1)
select count(id), d from temp  group by d order by d desc limit 20; 
 */



/*
checking references to users table:
with A as (select id, owner_user_id from posts EXCEPT select posts.id, posts.owner_user_id from users, posts where users.id = posts.owner_user_id ) select count(*) from A; 
all excpetions due to nulls:
select count(*) from posts where posts.owner_user_id is null; 
*/