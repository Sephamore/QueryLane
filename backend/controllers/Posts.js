
import { Op } from "sequelize";
import {PostsModel} from "../models/init-models.js";

export const getPostData = async (req, res) => {
    try {
        const post = await PostsModel.findAll({
            where: {
                id: req.params.id
            }, 
        });
        res.json(post);
    } catch (error) {
        res.json({ message: error.message });
    }
}

//in progress
export const createPost = async (req, res) => {
    try {
        req.body.creation_date = new Date();
        await PostsModel.create( req.body );
        res.json({
            message: "Post Created"
        });
    }
    catch (error) {
        res.json({ message: error.message });
    }
}

//pending : verify user
//only allows title and body to be changed
export const updatePost = async (req, res) => {
    try {
        const now = new Date();
        await PostsModel.update({
            title: req.body.title,
            body: req.body.body,
            tags: req.body.tags,
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

/*examples: 
curl "http://localhost:5000/posts/recent/2011-11-25T22:32:41.300Z/10"
curl "http://localhost:5000/posts/byuser/6/upvotes"
curl "http://localhost:5000/posts/bytags/ubuntu&windows/time"
*/

export const getRecentPosts = async (req, res) => {
    try{
        const searchstart = Date.parse(req.params.starttime);
        let idlist = await PostsModel.findAll({
            where: {
                creation_date: { 
                    [Op.gte]: searchstart    //generates timestamp
                }
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

export const getPostsByUser = async (req, res) => {
    try {
        var sorting = ['creation_date', 'DESC']; //default
        if(req.params.sorting === "upvotes"|| req.params.sorting === "upvotes_d"){ 
            sorting = ['score', 'DESC'];
        }   
        else if (req.params.sorting === "time"|| req.params.sorting === "time_d"){ 
            sorting = ['creation_date', 'DESC'];
        }
        else if(req.params.sorting === "upvotes_a"){ 
            sorting = ['score', 'ASC'];
        }   
        else if (req.params.sorting === "time_a"){ 
            sorting = ['creation_date', 'ASC'];
        }

        let idlist = await PostsModel.findAll({
            where: {
                owner_user_id: req.params.userid
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

//returns postids where all tags are present, in order given by params.sorting
export const getPostsByTags = async (req, res) => {
    try {
        var sorting = ['creation_date', 'DESC']; //default
        if(req.params.sorting === "upvotes"|| req.params.sorting === "upvotes_d"){ 
            sorting = ['score', 'DESC'];
        }   
        else if (req.params.sorting === "time"|| req.params.sorting === "time_d"){ 
            sorting = ['creation_date', 'DESC'];
        }
        else if(req.params.sorting === "upvotes_a"){ 
            sorting = ['score', 'ASC'];
        }   
        else if (req.params.sorting === "time_a"){ 
            sorting = ['creation_date', 'ASC'];
        }

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