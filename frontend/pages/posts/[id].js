import Post from "@/components/post"
import { Box } from "@mui/system"
import Paper from "@mui/material/Paper"
import { useState } from "react"
import TopBar from "@/components/topBar"
import style from "@/styles/post.module.css"
import Divider from "@mui/material/Divider"
// import RichTextDialog from "@/components/richTextDialog"


export default function Posts({id}) {
    const post = {
        body: "Text ".repeat(400),
        tags: ["text", "python", "js"],
        id: "456789",
        owner_user_id: "564",
        last_editor_user_id: "5467",
        post_type_id: "1",
        accepted_answer_id: "5667",
        score: "456",
        parent_id: "67645",
        view_count: "324",
        answer_count: "12",
        comment_count: "4",
        owner_display_name: "Abhinav",
        last_editor_display_name: "Yadav",
        title: "A simple text 400 times",
        content_license: "4565u7",
        favorite_count: "12",
        creation_date: "2022-12-12 19:36:50.053",
        community_owned_date: "2022-12-12",
        closed_date: "2023-02-02",
        last_edit_date: "2023-02-01 23:54:40.053",
        last_activity_date: "2023-02-03",
        owner_profile_image_url: "/vercel.svg",
        last_editor_profile_image_url: "/vercel.svg"
    }
    const post2 = {
        body: "Text ".repeat(400),
        tags: ["text", "python", "js"],
        id: "4565",
        owner_user_id: "564",
        last_editor_user_id: "5467",
        post_type_id: "1",
        accepted_answer_id: "5667",
        score: "456",
        parent_id: "67645",
        view_count: "324",
        answer_count: "12",
        comment_count: "4",
        owner_display_name: "Abhinav",
        last_editor_display_name: "Yadav",
        title: "A simple text 400 times",
        content_license: "4565u7",
        favorite_count: "12",
        creation_date: "2022-12-12 19:36:50.053",
        community_owned_date: "2022-12-12",
        closed_date: "2023-02-02",
        last_edit_date: "2023-02-01 23:54:40.053",
        last_activity_date: "2023-02-03",
        owner_profile_image_url: "/vercel.svg",
        last_editor_profile_image_url: "/vercel.svg"
    }

    const comments = [
        {
            id: "54534",
            post_id: "456789",
            user_id: "534",
            score: "23",
            content_license: "qrw4f4",
            user_display_name: "Someone",
            text: "Why so many texts bro?",
            creation_date: "2023-02-12 16:21:05.756",
        },
        {
            id: "545",
            post_id: "456789",
            user_id: "5934",
            score: "4",
            content_license: "5657hg",
            user_display_name: "No one",
            text: "Hehe! Texts!! ".repeat(100),
            creation_date: "2023-02-25 14:43:56.656",
        },
        {
            id: "435",
            post_id: "456789",
            user_id: "56463",
            score: "5",
            content_license: "rgtwt4",
            user_display_name: "Random one",
            text: "F U. ".repeat(40),
            creation_date: "2023-02-25 14:59:59.999",
        },
    ]

    const posts=[{post, comments}, {post: post2, comments}]

    const [ isLoggedIn, setIsLoggedIn ] = useState(true)
    const [ username, setUsername ] = useState("abhinav")
    const [ userId, setUserId ] = useState("564")
    const [ userDisplayName, setUserDisplayName ] = useState("Abhinav")

    // rte
    // const [dialogOpen, setDialogOpen] = useState(false);

    return (<>
        <TopBar isLoggedIn={isLoggedIn} username={username} userDisplayName={userDisplayName} />
        <Box display="flex" justifyContent="center">
            <Box>
                {
                    posts.map(({post, comments}) => (
                        <Box display="flex" flexDirection="column" alignItems="center" key={post.id}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                sx={{ py: 1 }}
                            >
                                <Paper
                                    sx={{width: {xs: "95%", sm: "85%", md: "75%", lg: "65%", xl: "55%" }, pb: 0}}
                                    elevation={10}
                                    className={style.comment_background}
                                >
                                    <Post post={post} comments={comments} accepted_answer_id={456789} isLoggedIn={isLoggedIn} userId={userId} />
                                </Paper>
                            </Box>
                            {/* <Divider component='div' sx={{ borderWidth: 1, width: {xs: "100%", sm: "90%", md: "80%", lg: "70%", xl: "60%" } }} /> */}
                        </Box>
                    ))
                }
            </Box>
        </Box>
        {/* <RichTextDialog open={dialogOpen} /> */}
    </>
    )
}