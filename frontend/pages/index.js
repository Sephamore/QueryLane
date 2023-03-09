import TopBar from '@/components/topBar'
import PostTabPanel from '@/components/postTabPanel'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import axios from 'axios';
import {backend} from '@/query.config';
import SearchResults from '@/components/searchResults'


axios.defaults.withCredentials = true

export default function HomePage() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ username, setUsername ] = useState("abhinav")
  const [ userDisplayName, setUserDisplayName ] = useState("Abhinav")
  const [ userId, setUserId ] = useState("7498")
  const [ showSearchResults, setShowSearchResults ] = useState(false)
  const [ options, setOptions ] = useState([])
  const [ orderBy, setOrderBy ] = useState("time")
  const [ searchInputValue, setSearchInputValue ] = useState("")
  const [ selectedList, setSelectedList ] = useState([])

  const getSelected = () => {
    return selectedList
  }

  useEffect(() => {
    const setter = async () => {
      try {
        const data = (await axios.get(`${backend}/login`)).data;
        console.debug(data)
        if (data.status == 'OK'){
          setIsLoggedIn(data.isLoggedIn);
          setUsername(data.username);
          setUserDisplayName(data.displayName);
          setUserId(data.userId);
        } else {
          setIsLoggedIn(false);
        }
      } catch (e) {

      }
    }

    setter();
  });

  return (
    <>
      <TopBar isLoggedIn={isLoggedIn} username={username} userDisplayName={userDisplayName} userId={userId} setIsLoggedIn={setIsLoggedIn} selected={selectedList} setSelected={setSelectedList} setShowSearchResults={setShowSearchResults}
        options={options} setOptions={setOptions} searchInputValue={searchInputValue} setSearchInputValue={setSearchInputValue}
        orderBy={orderBy} setOrderBy={setOrderBy} showSearchBar
      />
      <Box display="flex">
        <Box flexGrow={1} />
          <Box sx={{display: "flex", width: {xs: "95%", sm: "85%", md: "75%", lg: "65%", xl: "55%"}, maxWidth: "max-content"}}>
            {
              showSearchResults
              &&
              <SearchResults selectedList={selectedList} setSelectedList={setSelectedList} options={options}
                searchInputValue={searchInputValue} setSearchInputValue={setSearchInputValue} setOptions={setOptions}
                orderBy={orderBy} setShowSearchResults={setShowSearchResults}
              />
              ||
              <PostTabPanel isLoggedIn={isLoggedIn} username={username} userDisplayName={userDisplayName} userId={userId}/>
            }
          </Box>
        <Box flexGrow={1} />
      </Box>
    </>
  )
}

