import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import PostPriviewList from './postPreview';
import List from '@mui/material/List';
import { useState } from 'react';
import useSWR from 'swr';
import axios from "axios"


const url = "http://20.193.230.163:5000"


async function getDataByID(id){

  // const response = fetch(`http://20.193.230.163:5000/posts/getdata/${id}`, {
  //   method: "GET",
  // }).then((res) => (
  //   res.json()
  // ));
  // const a = response.json();

  ids = id.join("&")

  console.log(`${url}/posts/getdata/${ids}`)
  const response = await axios.get(`${url}/posts/getdata/${ids}`)

  const a = response.data

  console.log(a)
  
  return a;
  
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function PostTabPanel({isLoggedIn, username}) {
  const [value, setValue] = React.useState(0);

  const hotPosts = [
    {
      id: "5",
      avatar: "/vercel.svg",
      owner_user_id: "5754667",
      owner_username: "yadav",
      owner_display_name: "Yadav Abhinav",
      title: "The question again",
      answer_count: 5,
      tags: "<cpp><c><python>",
      creation_date: "2022-10-02 13:00",
      score: 9
    },
  ]

  const [recentPostIDs,setRecentPostsID] = useState([]);
  const [recentPosts,setRecentPosts] = useState([]);
  // start here recent post

  const fetcher = async (...args) => {
    const res = await fetch(...args)

    const requestedIDs = await res.json()
    setRecentPostsID(Object.values(requestedIDs))

    console.log("IDs")
    console.log(requestedIDs)

    const tempData = []

    const ids = recentPostIDs.join("&")

    console.log(`${url}/posts/getdata/${ids}`)
    const response = await axios.get(`${url}/posts/getsummary/${ids}`)

    // const data = await getDataByID(recentPostIDs);
    // for (const id of recentPostIDs) {
    //   console.log(id)
    //   // console.log({id, data})
    //   tempData.push(data)
    // }
    console.log(response.data)
    const data = response.data;
    data.reverse();
    setRecentPosts(data)

    return response.data;
  }
  useSWR('http://20.193.230.163:5000/posts/recent/0/20',fetcher);
  // console.log("data")
  // console.log(data)


  // console.log(recentPosts)
  // return <div> Lauding...</div>

  const asked = hotPosts;
  const answered = hotPosts;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ alignItems: "center" }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="post tabs" >
                <Tab label="trending" {...a11yProps(0)} />
                <Tab label="recent" {...a11yProps(1)} />

                {isLoggedIn &&
                  <Tab label="asked by you" {...a11yProps(2)} />
                }
                {isLoggedIn &&
                  <Tab label="answered by you" {...a11yProps(3)} />
                }
              </Tabs>
            </Box>
        </Grid>
      </Grid>
      <TabPanel value={value} index={0}>
        <PostPriviewList posts={hotPosts} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PostPriviewList posts={recentPosts} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PostPriviewList posts={asked} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <PostPriviewList posts={answered} />
      </TabPanel>
    </Box>
  );
}