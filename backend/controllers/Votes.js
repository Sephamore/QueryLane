import { VotesModel, PostsModel } from "../models/init-models.js";
import { Op } from "sequelize";

//returns vote entries based on the params- userid and postid (can be "all") 
export const getVotesByUser = async (req, res) => {
    try {
        let searchCriteria = {
            user_id: req.params.userid,
            post_id: req.params.postid            
        };

        if(req.params.postid === "all"){
            searchCriteria = {user_id: req.params.userid};
        }

        const voteList = await VotesModel.findAll({
            where: searchCriteria
        });
        res.json(voteList);
    } catch (error) {
        res.json({ message: error.message });
    }
}


const recalcPostScore = async (postid) => {

    const upvotes = await VotesModel.count({
        where: {
            post_id: postid,
            vote_type_id: 2
        }
    });

    const downvotes = await VotesModel.count({
        where: {
            post_id: postid,
            vote_type_id: 3
        }
    });

    const recalculated = upvotes - downvotes;

        await PostsModel.update({
            score:recalculated
        }, {
            where: {id: postid}
        });
}

//search for existing vote by user
//if found, then update that entry
//2 for upvote, 3 for downvote, (-1 for undo vote internally)
export const votePost = async (req, res) => {
    // const username = req.session.username;
    //handles upvotes and downvotes
    const type_id = req.body.vote_type_id;
    if( type_id == 2 || type_id == 3){
     try {
        const now = new Date();
        const entry = {
            user_id: req.body.user_id,
            post_id: req.body.post_id,
            vote_type_id: req.body.vote_type_id,
            bounty_amount: null,
            creation_date: now
        }
        //temp

        //check if upvote, downvote or unvote already exists
        const previousVote = await VotesModel.findOne({
            where: {
                user_id: req.body.user_id,
                post_id: req.body.post_id,
                vote_type_id: {[Op.in] : [2,3,-1] }
            }
        });
    
        var desc = "";
        if(previousVote === null) {     //previous vote doesn't exist
            await VotesModel.create( entry );
            desc = "Vote sent";
        }
        else if(previousVote.vote_type_id !== type_id)
        {                           //change vote type
            await VotesModel.update( entry, {
                where: {id: previousVote.id}
            });
            desc = "Vote sent";
        }
        else if(previousVote.vote_type_id === type_id)
        {                           //undo previous vote
            entry.vote_type_id = -1;
            await VotesModel.update( entry, {
                where: {id: previousVote.id}
            });
            desc = "Undid vote";
        }

        //score recalculation
        await recalcPostScore(req.body.post_id);

        res.json({
            message: "Request successful! " + desc
        });
     } 
     catch (error) {
        res.json({ message: error.message });
     }

    } //end of upvote/downvote if

    else {
        res.json({
            message: "Requires vote type to be 2 or 3"
        });
    }
}

/*
useful test requests:
curl -X POST http://localhost:5000/votes/cast -H "Content-Type: application/json" -d '{"post_id":1, "user_id":6, "vote_type_id":3}'
curl http://localhost:5000/posts/getdata/1
curl http://localhost:5000/votes/byuser/6/all
*/