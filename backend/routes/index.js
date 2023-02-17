import express from "express";
import { getPostData, createPost, updatePost, deletePost, 
        getRecentPosts, getPostsByUser, getPostsByTags } from "../controllers/Posts.js";
import {getVotesByUser, votePost} from "../controllers/Votes.js";
import {getComments, createComment, deleteComment} from "../controllers/Comments.js";
const router = express.Router();
//MAINTAIN ALL ROUTES HERE

router.get('/posts/getdata/:id', getPostData); 
router.post('/posts/create', createPost);
router.patch('/posts/update/', updatePost); 
router.delete('/posts/delete/:id', deletePost); 
router.get('/posts/recent/:starttime/:limit', getRecentPosts);  //starttime is timestamp (datestring also works)
router.get('/posts/byuser/:userid/:sorting', getPostsByUser); //sorting = 'time' or 'upvotes' 
router.get('/posts/bytags/:tags/:sorting', getPostsByTags); 
 //tags without angled braces, separated by '&' such as /ubuntu&windows

router.post('/votes/cast', votePost); //requires body with user_id, post_id, vote_type_id
router.get('/votes/byuser/:userid/:postid/', getVotesByUser); //postid can be "all"

router.get('/comments/bypost/:postid', getComments);
router.post('/comments/create', createComment);
router.delete('/comments/delete/:id', deleteComment);

export default router;