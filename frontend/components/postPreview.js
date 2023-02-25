import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Date from './date';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { format, parseISO } from 'date-fns';
import style from '@/styles/postPreview.module.css'
import { useRouter } from 'next/router';
import Paper from '@mui/material/Paper';


export function PostPreview({ post }) {
    const router = useRouter();
    return (
        <Paper elevation={5} sx={{my: 1}} >
            {/* <ListItem alignItems="flex-start"  > */}
                {/* <ListItemAvatar sx={{ mr: 2 }}> */}
            <Box sx={{display: "flex", flexDirection:{xs: "row", md: "row" }, py: 0.5}}>
                <Box sx={{ display: "flex", flexDirection: "column", width: {xs: "20%", md: "20%"}, mx: 1, mt: 1 }} minWidth="20%" >
                    <Box sx={{ display: "flex", justifyContent: "center" }} >
                        <Avatar 
                            alt={post.userDisplayName}
                            src={post.avatar}
                        />
                    </Box>
                    <Link href={`/users/${post.username}`} underline="none" color="inherit"
                        className={style.profile_link} >
                            <Box sx={{ display: "flex", justifyContent: "center"}}>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    align='center'
                                    style={{ wordWrap: "break-word" }}
                                    
                                >
                                    {post.userDisplayName}
                                </Typography>
                            </Box>
                    </Link>
                </Box>
                {/* </ListItemAvatar> */}
                <Box>
                    <Link href={`/posts/${post.post_id}`} underline='none'
                        className={style.post_link} >
                        <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        >
                            {post.title}
                        </Typography>
                    </Link>
                    <Box display="flex" flexDirection="column" justifyContent="center">
                        <Box display="flex" flexDirection="row" flexWrap="wrap" >
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                                marginRight={1}
                            >
                                {post.answer_count} answers |
                            </Typography>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                                marginRight={1}
                            >
                                {post.votes} votes |
                            </Typography>
                            <div className={style.small}>
                                asked on {format(parseISO(post.time), 'LLLL d, yyyy hh:mm a')}
                            </div>
                        </Box>
                        {/* <Stack direction="row" spacing={0.5}> */}
                        <Box>
                            {
                                post.tags.map((tag) => (
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
                        {/* </Stack> */}
                    </Box>
                </Box>
            </Box>
            {/* </ListItem> */}
        </Paper>
    )
}

export default function PostPriviewList({ posts }) {
    
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid item xs={3}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {
                        posts.map( post => (
                            <div key={post.post_id}>
                                    <PostPreview post={post} />
                            </div>
                        ))
                    }
                </List>
            </Grid>
        </Grid>
    );
}