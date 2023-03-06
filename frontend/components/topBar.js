import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import style from '@/styles/topBar.module.css'
import { useRouter } from 'next/router';
import { backend } from '@/query.config';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { Select } from "@mui/material"


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '15ch',
    },
    [theme.breakpoints.up('sm')]: {
      width: '22ch',
    },
    [theme.breakpoints.up('md')]: {
      width: '35ch',
    },
    [theme.breakpoints.up('lg')]: {
      width: '60ch',
    },
  },
}));

export default function TopBar({ showSearchBar, isLoggedIn, username, userDisplayName, userId, setIsLoggedIn, selected, setSelected, setShowSearchResults, options, setOptions, searchInputValue, setSearchInputValue, orderBy, setOrderBy}) {

  const [ allTags, setAllTags ] = useState([])
  const [ tags, setTags ] = useState([])
  const [ users, setUsers ] = useState([])
  // const [ options, setOptions ] = useState([])
  const [ value, setValue ] = useState([])
  const [ searchFor, setSearchFor ] = useState("Tag")

  const staticOptions = [
    {name: "Ab", id: "1", type: "tag"},
    {name: "Cd", id: "2", type: "tag"},
    {name: "Ef", id: "3", type: "tag"},
    {name: "serg", id: "4", type: "user"},
    {name: "sgsgt", id: "5", type: "user"},
    {name: "esrgg", id: "6", type: "user"},
    {name: "sergrsg", id: "7", type: "user"},
  ]

  useEffect(() => {
    const getTags = async () => {
      try {
        if (!showSearchBar)
          return
        const res = await axios.get(`${backend}/tags/get`)
        const data = res.data.map((tag) => {
          return {
            name: tag.tag_name,
            id: tag.id.toString(),
            type: "tag"
          }
        })
        setAllTags(data);
        setOptions(users.concat(allTags))
        console.log("ops", options)
      } catch (e) {

      }
    }

    getTags();
  }, [])

  const handleInputChange = async (e) => {
    const name = e.target.value;
    setSearchInputValue(name);
    // console.log(name, selected)
    if (name == ""){
      setOptions([])
      if (selected.length == 0){
        setShowSearchResults(false)
        return;
      }
    }
    else {
      setShowSearchResults(true)
    }
    
    if (searchFor == 'Tag' && name != ""){
      let tags = allTags.filter((tag) => tag.name.toLowerCase().startsWith(name.toLowerCase()))
      console.log(tags)
      setOptions(tags.filter((tag) => !selected.includes(tag)));
    } else if (searchFor == "User" && name != "") {
      try {
        const res = await axios.get(`${backend}/users/similar/${name}/20`)
        let users = res.data.map((user) => {
          return {
            id: user.id,
            name: user.display_name,
            type: "user",
            username: user.username
          }
        })
        setOptions(users.filter((user) => !selected.includes(user)))
      } catch (e) {

      }
    }
  }

  const handleSearch = async (event, value) => {
    const name = value || event.target.value;
    // console.log(name)
    try {
      if (name == ''){
        // setOptions([])
        return [];
      }
      console.log(`${backend}/users/similar/${name}/20`)
      const res = await axios.get(`${backend}/users/similar/${name}/20`)
      let users = res.data.map((user) => {
        return {
          id: user.username,
          name: user.display_name,
          type: "user",
          username: user.username
        }
      })
      let tags = allTags.filter((tag) => tag.name.toLowerCase().startsWith(name.toLowerCase()))
      return users.concat(tags)
    } catch (e) {
      console.log(e)
      return []
    }
  }

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };


  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logout = async () => {
    try {
      await axios.get(`${backend}/logout`)
      setIsLoggedIn(false)
    } catch (e) {
      
    }
  }

  const router = useRouter();


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

          {isLoggedIn && <MenuItem onClick={(event) => {
            router.push(`/profiles/${username}`)
          }} >
            Profile
          </MenuItem>}
          {isLoggedIn && <MenuItem onClick={(event) => {
            router.push(`/users/${username}`)
          }}>
            Account
          </MenuItem>}
          {isLoggedIn && <MenuItem onClick={logout}>
            Logout
          </MenuItem>}

        {!isLoggedIn && <MenuItem onClick={() => {
          router.push("/login");
        }}>
          Login
        </MenuItem>}
        {!isLoggedIn && <MenuItem onClick={() => {
          router.push("/signup");
        }}>
          Signup
        </MenuItem>}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Link href="/" underline="none" 
          className={style.home_link}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >

              QueryLane
            </Typography>
          </Link> 
          <Box sx={{ flexGrow: 1 }} />
          {/* <Box sx={{ width: "2%" }} /> */}
          {
            showSearchBar &&
            <Search>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchFor}
                label="searchFor"
                onChange={(e) => {
                  setSearchFor(e.target.value)
                  setSearchInputValue("")
                }}
              >
                <MenuItem value="Tag">Tag</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
              {/* <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper> */}
              <StyledInputBase
                value={searchInputValue}
                placeholder={`Search for a ${searchFor}`}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleInputChange}
              />
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={orderBy}
                label="orderBy"
                onChange={(e) => {
                  setOrderBy(e.target.value)
                }}
              >
                <MenuItem value="time">time</MenuItem>
                <MenuItem value="upvotes">upvotes</MenuItem>
              </Select>
            </Search>
          }
          {/* {autoComplete} */}
          <Box sx={{ flexGrow: 1 }} />
          {/* <Box sx={{ width: "2%" }} /> */}

          {
            isLoggedIn &&
            <>
              <Box sx={{ display: { xs: "none", md: "flex" } }} >
                <Box display="flex" flexDirection="column" alignItems="center" justifyItems="center"
                  sx={{ mr: 1 }} >
                  <Link href={`/profiles/${username}`} color="inherit" underline="none">
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      className={ style.user_display_name }
                    >
                      {userDisplayName}
                    </Typography>
                  </Link>
                  <Link href={`/users/${username}`} color="inherit" underline="none">
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      className={ style.username }
                    >
                      {username}
                    </Typography>
                  </Link>
                </Box>
                <Button color="inherit" onClick={logout} > logout </Button>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }} >
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
            </Box>
            </>
            ||
            <>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button color="inherit" href='/login' > Login </Button>
                <Button color="inherit" href='/signup' > Signup </Button>
              </Box>
            </>
          }
          {!isLoggedIn &&
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          }
        </Toolbar>
      </AppBar>
      <Toolbar />
      {/* {renderMenu} */}
      {renderMobileMenu}
    </Box>
  );
}