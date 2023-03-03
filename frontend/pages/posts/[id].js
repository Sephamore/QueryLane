import Post from "@/components/post"
import { Box } from "@mui/system"
import Paper from "@mui/material/Paper"
import { useState } from "react"
import TopBar from "@/components/topBar"
import style from "@/styles/post.module.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useRouter } from "next/router"
import useSwr from 'swr'
import { backend } from "@/query.config"
import axios from "axios"
// import RichTextDialog from "@/components/richTextDialog"


function FlexiblePost(props) {
    if (!props.post)
        return 
    return <Box>
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ py: 1 }}
            // className={style.blue_bg}
        >
            {
                props.displayTitle && 
                <Paper
                    className={style.title}
                    sx={{minWidth: {xs: "95%", sm: "85%", md: "75%", lg: "65%", xl: "55%" }, p: 1, m:1}}
                    elevation={10}
                >
                    {props.post.title}
                </Paper>
            }
            <Paper
                sx={{width: {xs: "95%", sm: "85%", md: "75%", lg: "65%", xl: "55%" }, pb: 0}}
                elevation={10}
                className={style.comment_background}
            >
                <Post {...props} />
            </Paper>
        </Box>
        {/* <Divider component='div' sx={{ borderWidth: 1, width: {xs: "100%", sm: "90%", md: "80%", lg: "70%", xl: "60%" } }} /> */}
    </Box>
}


export default function Posts() {
    const router = useRouter();
    const {id} = router.query
    const post = {
        body: "Text ".repeat(400),
        tags: "<text><python><js>",
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
        creation_date: "2022-12-12T19:36:50.053Z",
        community_owned_date: "2022-12-12",
        closed_date: "2023-02-02",
        last_edit_date: "2023-02-01T23:54:40.053Z",
        last_activity_date: "2023-02-03",
        owner_profile_image_url: "/vercel.svg",
        last_editor_profile_image_url: "/vercel.svg"
    }
    const post2 = {
        body: "Text ".repeat(400),
        tags: "<text><python><js>",
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

    const theQuestion = {post, comments}
    const theAnswers=[{post, comments}, {post: post2, comments}]

    const [ isLoggedIn, setIsLoggedIn ] = useState(true)
    const [ username, setUsername ] = useState("abhinav")
    const [ userId, setUserId ] = useState("7498")
    const [ userDisplayName, setUserDisplayName ] = useState("Abhinav")
    const [sortBy, setSortBy] = useState("Score")
    const [ question, setQuestion ] = useState({})
    const [ answers, setAnswers ] = useState([])

    const getQuestion = async (id) => {
        const res = await axios.get(`${backend}/posts/getdata/${id}`)
        const data = res.data
        const res2 = await axios.get(`${backend}/comments/bypost/${id}`)
        const comments = res2.data;
        setQuestion({post: data[0], comments});

        const res3 = await axios.get(`${backend}/posts/getanswers/${id}`)
        const ans_ids = res3.data
        const id_str = ans_ids.join("&")

        console.log(id_str)

        // console.log("a")
        console.log(`${backend}/posts/getdata/${id_str}`)
        const res4 = await axios.get(`${backend}/posts/getdata/${id_str}`)
        // console.log("b")
        const answers = res4.data;
        // console.log(answers)
        const answerPosts = await Promise.all(answers.map(async (answer) => {
            const res2 = await axios.get(`${backend}/comments/bypost/${answer.id}`)
            const comments = await res2.data;
            return {post: answer, comments}
        }))
        console.log(answerPosts)
        setAnswers(answerPosts)
    }

    useSwr(id, getQuestion)

    // rte
    // const [dialogOpen, setDialogOpen] = useState(false);

    return (<>
        <TopBar isLoggedIn={isLoggedIn} username={username} userDisplayName={userDisplayName} />
        <Box display="flex" justifyContent="center" flexDirection="column" >
            <Box>
                <FlexiblePost displayTitle post={question.post} comments={question.comments} accepted_answer_id={456789} isLoggedIn={isLoggedIn} userId={userId} />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Paper
                    className={style.title}
                    sx={{width: {xs: "95%", sm: "85%", md: "75%", lg: "65%", xl: "55%" }, p: 1, m:1}}
                    elevation={10}
                >
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <Box minWidth="max-content">
                            {answers.length} Answers    
                        </Box>
                        <Box flexGrow={1} />
                        <FormControl style={{minWidth: 120}}>
                            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sortBy}
                                label="SortBy"
                                onChange={(e) => {
                                    setSortBy(e.target.value)
                                }}
                            >
                                <MenuItem value={"Score"}>Score</MenuItem>
                                <MenuItem value={"TimeAsc"}>Time (oldest first)</MenuItem>
                                <MenuItem value={"TimeDesc"}>Time (newest first)</MenuItem>
                            </Select>
                        </FormControl>
                        {/* <Box flexGrow={1} /> */}
                    </Box>
                </Paper>
                
            </Box>
            <Box>
                {
                    answers.map(({post, comments}) => (
                        <Box  key={post.id}>
                            <FlexiblePost key={post.id} post={post} comments={comments} accepted_answer_id={456789} isLoggedIn={isLoggedIn} userId={userId} />
                        </Box>
                    ))
                }
            </Box>
        </Box>
        {/* <RichTextDialog open={dialogOpen} /> */}
    </>
    )
}