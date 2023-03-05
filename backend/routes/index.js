import express from "express";
import { getPostData, getPostSummary, createPost, updatePost, deletePost,
        getAnswers, getParents,
        getRecentPosts, getTrendingPosts, searchPosts, getPostsByUser, getPostsByTags  } from "../controllers/Posts.js";
import {getVotesByUser, votePost} from "../controllers/Votes.js";
import {getComments, createComment, deleteComment} from "../controllers/Comments.js";
import {getTags, getTagsByNames} from "../controllers/Tags.js"
import {getLoggedInUser, login, logout, isUserNameAvailable, updateUser, getUserProfile, getUserPicture, getSimilarNames, register} from "../controllers/Users.js"
const router = express.Router();
//MAINTAIN ALL ROUTES HERE

router.get('/posts/getdata/:id', getPostData); 
router.get('/posts/getsummary/:id', getPostSummary);
router.post('/posts/create', createPost);
router.patch('/posts/update', updatePost); 
router.delete('/posts/delete/:id', deletePost);

router.get('/posts/getanswers/:id', getAnswers);    // find answer
router.get('/posts/getparents/:id', getParents);      // find parent
router.get('/posts/trending', getTrendingPosts);    // starttime is timestamp (datestring also works)
router.get('/posts/recent/:starttime/:limit', getRecentPosts);  //starttime is timestamp (datestring also works)
router.get('/posts/search/:query', searchPosts);
// above query of form "tags=a&b+userids=x&y+order=upvotes+limit=4+typeid=1"
// (criteria are optional and may appear in any order)
// example: curl "http://localhost:5000/posts/search/tags=ubuntu&linux+order=upvotes+limit=3"


//legacy
router.get('/posts/byuser/:userids/:sorting/:type', getPostsByUser); //userids separated by &. sorting = 'time' or 'upvotes' 
router.get('/posts/bytags/:tags/:sorting', getPostsByTags);  // tags (without angled braces) separated by '&' such as /ubuntu&windows

router.post('/votes/cast', votePost); //requires body with user_id, post_id, vote_type_id(2/3)
router.get('/votes/byuser/:userid/:postid/', getVotesByUser); //postid can be "all"

router.get('/comments/bypost/:postid', getComments);
router.post('/comments/create', createComment);
router.delete('/comments/delete/:id', deleteComment);

router.get('/tags/get', getTags);
router.get('/tags/byName/:names', getTagsByNames);

router.get("/login", getLoggedInUser);
router.post("/login", login);
router.post('/signup', register);
router.get('/logout', logout);
router.get("/isNameAvailable/:username", isUserNameAvailable);
router.post("/users/update", updateUser);
router.get("/users/profile/:id", getUserProfile);
router.get("/users/picture/:id", getUserPicture);
router.get("/users/similar/:substring/:limit", getSimilarNames); // if no limit, set it to 'max'
export default router;