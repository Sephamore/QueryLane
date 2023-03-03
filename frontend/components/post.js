import Box from "@mui/system/Box";
import style from "@/styles/post.module.css"
import Link from "next/link";
import { format, parseISO } from 'date-fns';
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper'
import { useRouter } from "next/router";
import { ThumbUp, ThumbDown, Visibility, ContentCopy, Reply, Edit, CheckCircle, HorizontalRule, Minimize } from "@mui/icons-material";
import { useState } from "react";


export function Comment({comment}) {
    return (
        <Box sx={{mt: 0.8, mb: 0.8}}>
            <Box display="flex" flexDirection="row" alignItems="center">
                <Avatar src={comment.owner_profile_image_url} sx={{mx: 1}} />
                <Link href={`/users/${comment.user_id}`} >{comment.user_display_name || comment.user_id}</Link>
                <HorizontalRule sx={{ mx: 0.5 }} />
                {format(parseISO(comment.creation_date), 'LLLL d, yyyy hh:mm a')}
            </Box>
            <Box display="flex" flexDirection="row">
                <Box display="flex" flexDirection="column">
                    <Box display="flex" flexDirection="row" width={50} alignItems="center">
                        <Box flexGrow={1}/>
                        <Box display="flex" alignItems="center">
                            {comment.score}
                        </Box>
                        <Box flexGrow={1}/>
                    </Box>
                </Box>
                {comment.text}
            </Box>
        </Box>
    )
}


export function Comments({ comments }) {
    const [ viewAll, setViewAll] = useState(true)
    const a = []
    a.slice
    return (
        <Box>
            {
                comments.slice(0, (!viewAll && 4) || undefined).map((comment) => (<div key={comment.id}>
                    <Paper elevation={6} >
                        <Comment comment={comment} />
                    </Paper>
                    {/* <Divider component="div" sx={{ borderTopWidth: 1 }} /> */}
                </div>
                ))
            }
        </Box>
    )
}


export function Post({post, accepted_answer_id, isLoggedIn, userId}) {
    const upvote = () => {

    }

    const downvote = () => {

    }

    const comment = () => {

    }

    const router = useRouter();

    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Box display="flex" flexDirection="row">
                <Box
                    className={style.small}
                    display="flex"
                    flexDirection={{xs: "column", sm: "column", md: "row", lg: "row", xl: "row"}}
                    alignItems="center"
                    maxWidth="50%"
                >
                    {post.post_type_id == 1 ? "Asked" : "Answered"} by 
                    <Avatar src={post.owner_profile_image_url} sx={{mx: 1}} />
                    <Link href={`/users/${post.owner_user_id}`} className={style.link_spacing}>{post.owner_display_name || post.owner_user_id}</Link> 
                    <Box  className={style.date}>at {format(parseISO(post.creation_date), 'LLLL d, yyyy hh:mm a')}</Box>
                </Box>
                <Box flexGrow={1}/>
                {
                    post.last_editor_display_name && 
                    <Box
                        className={style.small}
                        display="flex"
                        flexDirection={{xs: "column", sm: "column", md: "row", lg: "row", xl: "row"}}
                        alignItems="center"
                        maxWidth="50%"
                    >
                        Last edited by
                        <Avatar src={post.last_editor_profile_image_url} sx={{mx: 1}} />
                        <Link href={`/users/${post.last_editor_user_id}`} className={style.link_spacing}> {post.last_editor_display_name}</Link> 
                        <Box className={style.date}>at {format(parseISO(post.last_edit_date), 'LLLL d, yyyy hh:mm a')}</Box>
                    </Box>
                }
            </Box>

            <Divider component="div" sx={{ borderTopWidth: 1 }} />
            <Box>
                <span dangerouslySetInnerHTML={{__html: post.body}} />
            </Box>

            <Divider component="div" sx={{ borderTopWidth: 1 }} />
            <Box>
                {
                    post.tags != null &&
                    post.tags.replaceAll("<", " ").replaceAll(">", "").split(" ").filter((str) => (str != "")).map((tag) => (
                        <Chip className={style.tag_link} key={tag} label={tag} variant='outlined'
                            color='default'
                            onClick={() => {
                                router.push(`/tags/${tag}`)
                            }}
                            sx={{ mr: 0.5 }}
                        />
                    ))
                }
            </Box>
            <Box display="flex" flexDirection="row">
                <Box display="flex" flexDirection="row" sx={{mr: 2}} >
                    <Tooltip title="downvote">
                        <IconButton onClick={downvote}>
                            {/* <Box component="img" src="/icons/downvote.png" alt="downvote" height={20}/> */}
                            <ThumbDown className={style.thumb_down}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="favorite count">
                        <div className={style.favorite_count}>
                            {post.score}
                        </div>
                    </Tooltip>
                    <Tooltip title="upvote">
                        <IconButton onClick={upvote}>
                            {/* <Box component="img" src="/icons/upvote.png" alt="upvote" height={20}/> */}
                            <ThumbUp className={style.thumb_up} />
                        </IconButton>
                    </Tooltip>
                </Box>

                {
                    post.post_type_id == 1 &&
                    <Tooltip title="views">
                        <Box display="flex" flexDirection="row" >
                            {/* <Box component="img" src="/icons/views.svg" alt="views" height={20} sx={{mt: 0.9, mr:0.3}} /> */}
                            <Visibility sx={{mt: 0.9, mr:0.3}} />
                            <div className={style.favorite_count}>
                                {post.view_count}
                            </div>
                        </Box>
                    </Tooltip>
                }
                <Box flexGrow={1} />
                {
                    accepted_answer_id == post.id
                    &&
                    <Tooltip title="accepted answer">
                        <Box>
                            {/* <Box component="img" src="/icons/checked.png" alt="checked" height={20} sx={{mt: 0.9, mr:0.3}} /> */}
                            <CheckCircle color="success" sx={{mt: 0.9, mr:0.3}} />
                        </Box>
                    </Tooltip>
                }
                <Box flexGrow={1} />
                <Box display="flex" flexDirection="row" >
                    <Tooltip title="copy link">
                        <IconButton onClick={() => {

                        }}>
                            {/* <Box component="img" src="/icons/copy.svg" alt="views" height={20}/> */}
                            <ContentCopy className={style.action_icon} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="comment">
                        <IconButton onClick={comment}>
                            {/* <Box component="img" src="/icons/reply.svg" alt="comment" height={20}/> */}
                            <Reply className={style.action_icon} />
                        </IconButton>
                    </Tooltip>

                    {isLoggedIn && (
                        userId == post.owner_user_id &&
                        <Tooltip title="edit">
                            <IconButton onClick={comment}>
                                {/* <Box component="img" src="/icons/edit.svg" alt="edit" height={20}/> */}
                                <Edit className={style.edit_icon} />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            </Box>
        </Box>
    )
}


export default function PostView({post, comments, accepted_answer_id, isLoggedIn, userId}) {
    return (
        <Box>
            <Box sx={{p: 1}} className={style.white_bg} >
                <Post post={post} accepted_answer_id={accepted_answer_id} isLoggedIn={isLoggedIn} userId={userId}/>
            </Box>
            <Divider component="div" sx={{ borderTopWidth: 1, borderColor: "ActiveBorder" }} />
            <Box display="flex" flexDirection="row">
                <Box minWidth={30} />
                <Box sx={{ mx: 1 }}>
                    <Comments comments={comments} />
                </Box>
            </Box>
        </Box>
    )
}
