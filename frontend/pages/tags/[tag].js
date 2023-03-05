import { useRouter } from "next/router"
import TopBar from "@/components/topBar";
import Box from "@mui/system/Box";
import PostTabPanel from "@/components/postTabPanel";
import { useState } from "react";
import axios from "axios";


axios.defaults.withCredentials = true

function TagInfo({ tagData }) {

}

export default function Tags() {

    const [ isLoggedIn, setIsLoggedIn ] = useState(true)
    const [ username, setUsername ] = useState("abhinav")
    const [ userDisplayName, setUserDisplayName ] = useState("Abhinav")
    const [ userId, setUserId ] = useState("7498")

    const router = useRouter();
    const { tag } = router.query

    const [ tagData, setTagData ] = useState({})



    return (
        <Box>
            <TopBar {...{ isLoggedIn, userDisplayName, username, userId }} />
            
        </Box>
    )
}