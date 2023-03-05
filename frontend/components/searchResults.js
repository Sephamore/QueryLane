import { useEffect, useState } from "react"
import { backend } from "@/query.config"
import axios from "axios"
import PostPreviewList from "./postPreview"
import { Box } from "@mui/system"
import { Chip } from "@mui/material"
import { Person, Label } from "@mui/icons-material"
import Divider from "@mui/material/Divider"


export default function SearchResults({selectedList, setSelectedList, limit, typeid, options, setOptions, searchInputValue, setSearchInputValue, orderBy, setShowSearchResults }) {
    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        const update = async () => {
            let tags = selectedList.filter((item) => item.type == 'tag').map(
                (tag) => {
                    return tag.name
                }
            ).join("&")
            let userids = selectedList.filter((item) => item.type == 'user').map(
                (user) => user.id
            ).join("&")
            console.log("selected", selectedList)
            console.log(userids)
            if (selectedList.length == 0){
                if (searchInputValue == "")
                    setShowSearchResults(false)
                return
            }
            let url = `${backend}/posts/search/limit=${limit || 20}+typeid=${typeid || 1}+order=${orderBy}`
            if (tags != '')
                url += `+tags=${tags}`
            if (userids != '')
                url += `+userids=${userids}`
            console.log(url)
            try {
                const postIds = (await axios.get(url)).data.join("&")

                console.log(postIds)
                if (postIds == "")
                    setPosts([])
                const summaries = (await axios.get(`${backend}/posts/getsummary/${postIds}`)).data
                if (summaries.map)
                    setPosts(summaries.sort((p1, p2) => {
                        if (orderBy == "upvotes")
                            return p1.score < p2.score
                    }))
                console.log("selected", selectedList)
                console.log("summaries", summaries)
            } catch(e) {
            }
        }
        update()
    }, [selectedList, orderBy])

    return <Box>
        <Box sx={{ my: 2 }}>
            {
                options.map((option) => {
                    return <Chip
                        key = {option.id}
                        label= {`${option.username || option.id} : ${option.name}`}
                        onClick = {() => {
                            setSelectedList(selectedList.concat([ option ]))
                            setSearchInputValue("")
                            setOptions(options.filter((item) => !selectedList.includes(item)))
                        }}
                        sx = {{ mx: 1, my: 0.5 }}
                    />
                })
            }
        </Box>
        {
            options.length != 0 &&
            <Divider />
        }

        <Box sx={{ mt: 2 }} >
            {
                selectedList.map((item) => {
                    return <Chip
                        key={item.id}
                        label={ item.name } 
                        icon={item.type == "tag" ? <Label /> : <Person />}
                        onDelete={
                            () => {
                                setSelectedList(selectedList.filter((item2) => {
                                    return item.id != item2.id
                                }))
                            }
                        } 
                    sx={{ mx: 0.25 }}
                    />
                })
            }
        </Box>
        <PostPreviewList posts={posts} />
    </Box>
}