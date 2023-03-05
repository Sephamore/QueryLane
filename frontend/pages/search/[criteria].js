import { useRouter } from "next/router";
import Box from '@mui/material/Box'
import { useState } from "react";
import useSWR from 'swr'
import { useEffect } from "react";
import TopBar from "@/components/topBar";
import Link from "next/link";
import axios from "axios";


axios.defaults.withCredentials = true


export default function Search() {
    const router = useRouter();
    const { criteria } = router.query;
    const path = router.asPath
    const [ hash ,setHash ] = useState('')
    const [ tags, setTags ] = useState([])
    const [ users, setUsers ] = useState([])

    useEffect(() => {
        setHash(window.location.hash)
    })

    useEffect(() => {
        hash
        .replace('#', '')
        .split('+')
        .map((criteria) => {
            const c = criteria.split('=')
            console.log(c)
            if (c[0] == 'tags'){
                setTags(c[1].split('&'))
            }
            else if (c[0] == 'username'){
                setUsers(c[1].split('&'))
            }
        })
    }, [hash])

    // if (typeof window !== 'undefined' && hash != window.location.hash)
    //     setHash(window.location.hash)

    return <Box>
        <TopBar />
        <Box>
            {criteria}<br />
            {hash} <br />
            {users.join(" ")}<br />
            {tags.join(' ')}
            <Link href={path.split('#')[0]+"#abcd"}> abcd </Link>
        </Box>
    </Box>
}