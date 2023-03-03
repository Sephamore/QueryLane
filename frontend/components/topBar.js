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
      width: '20ch',
    },
    [theme.breakpoints.up('sm')]: {
      width: '35ch',
    },
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
}));

export default function TopBar({ isLoggedIn, username, userDisplayName, userId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    // setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuOpen = (event) => {
    // setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logout = () => {

  }

  const router = useRouter();

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} href>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for a query…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />

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