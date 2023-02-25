import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import PostPriviewList from './postPreview';
import List from '@mui/material/List';

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
      post_id: "0",
      avatar: "/vercel.svg",
      username: "abhinav",
      userDisplayName: "Abinav YadavYadavYadav",
      title: "The question The question The question The question The question The question The question The question The question The question The question The question The question The question The question The question The question ",
      answer_count: 2,
      tags: ["cpp", "multi_threading", "synchronization"],
      time: "2022-10-02 12:00",
      votes: 6
    },
    {
      post_id: "1",
      avatar: "/vercel.svg",
      username: "yadav",
      userDisplayName: "Yadav Abhinav",
      title: "The question again",
      answer_count: 5,
      tags: ["python", "multi_threading", "synchronization"],
      time: "2022-10-02 13:00",
      votes: 9
    },
    {
      post_id: "2",
      avatar: "/vercel.svg",
      username: "yadav",
      userDisplayName: "Yadav Abhinav",
      title: "The question again",
      answer_count: 5,
      tags: ["python", "multi_threading", "synchronization"],
      time: "2022-10-02 13:00",
      votes: 9
    },
    {
      post_id: "3",
      avatar: "/vercel.svg",
      username: "yadav",
      userDisplayName: "Yadav Abhinav",
      title: "The question again",
      answer_count: 5,
      tags: ["python", "multi_threading", "synchronization"],
      time: "2022-10-02 13:00",
      votes: 9
    },
    {
      post_id: "4",
      avatar: "/vercel.svg",
      username: "yadav",
      userDisplayName: "Yadav Abhinav",
      title: "The question again",
      answer_count: 5,
      tags: ["python", "multi_threading", "synchronization"],
      time: "2022-10-02 13:00",
      votes: 9
    },
    {
      post_id: "5",
      avatar: "/vercel.svg",
      username: "yadav",
      userDisplayName: "Yadav Abhinav",
      title: "The question again",
      answer_count: 5,
      tags: ["python", "multi_threading", "synchronization"],
      time: "2022-10-02 13:00",
      votes: 9
    },
  ]

  const recentPosts = hotPosts;
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
                <Tab label="hot" {...a11yProps(0)} />
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