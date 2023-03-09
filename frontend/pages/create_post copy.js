import RTE from "@/components/RTE";
import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import TopBar from "@/components/topBar";
import { backend } from "@/query.config";

axios.defaults.withCredentials = true

export default function CreatePost() {
    const [ post, setPost ] = useState("")
    const [ title, setTitle ] = useState("")
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ username, setUsername ] = useState("")
    const [ userDisplayName, setUserDisplayName ] = useState("")
    const [ userId, setUserId ] = useState("")

    const router = useRouter();

    useEffect(() => {
        const setter = async () => {
            try {
                const data = (await axios.get(`${backend}/login`)).data;
                console.log(data);
                if (data.status == 'OK'){
                    setIsLoggedIn(data.isLoggedIn);
                    setUsername(data.username);
                    setUserDisplayName(data.displayName);
                    setUserId(data.userId);
                } else {
                    setIsLoggedIn(false);
                    router.push("/login")
                }
            } catch (e) {
                console.log(e)
            }
        }

        setter();
    });
    const submit = async () => {
        const data = {
            owner_user_id: userId,
            post_type_id: "1",
            owner_display_name: userDisplayName || null,
            title: title,
            tags: "",
            body: post
        }
        console.log(data)
        const res = await axios.post(`${backend}/posts/create`, data)
        console.log("create ", res.data)

        if (res.data.status == "OK") {
            router.push(`/posts/${res.data.id}`)
        }
    }

    return (
        <RTE />
    )

    return (
        <Box>
            <TopBar isLoggedIn={isLoggedIn} username={username} userDisplayName={userDisplayName} userId={userId} setIsLoggedIn={setIsLoggedIn} />
            <Box sx = {{ flexDirection: "column", display: "flex", alignItems: "center",}}>
                <Box sx = {{ my: 3 }} width="80%" maxWidth={700}>
                    <TextField
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                </Box>
                <Box maxWidth="80%">
                    <RTE
                        onChange={(value) => {
                            setPost(value);
                        }}
                    />
                </Box>
                <Box display="flex" flexDirection="row" alignItems="self-end">
                    <Button color="primary" onClick={submit} disabled={title==""} > Submit </Button>
                </Box>
            </Box>
        </Box>
    )
}
