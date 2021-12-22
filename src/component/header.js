import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  auth,
  onAuthStateChanged,
  signOut,
  ref,
  db,
  child,
  get
} from '../firebase/firebase'
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [data, setData] = useState()
  const logOut = () => {
    signOut(auth)
      .then((success) => { console.log(success) })
      .catch((err) => { console.log(err) })
  }
  let navigate = useNavigate()

  useEffect(() => {
    const dbRef = ref(db);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        get(child(dbRef, `users /${uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            setData(snapshot.val())

          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      } else {
        navigate('/signup')
      }
    }


    );
  }, [])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const home = () => {
    navigate('/')
  }
  const form = () => {
    navigate('/form')
  }
  const detail = () => {
    navigate('/accdet')
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <img src={logo} width={'20%'} alt="Logo" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem >
                <Typography onClick={home} textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem >
                <Typography onClick={detail} textAlign="center">Booking Detail</Typography>
              </MenuItem>
              <MenuItem >
                <Typography onClick={form} textAlign="center">Booking Form</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img src={logo} width={'40%'} alt="Logo" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={home} sx={{ my: 2, color: 'white', display: 'block' }}>Home</Button>
            <Button onClick={detail} sx={{ my: 2, color: 'white', display: 'block' }}>Booking Detail</Button>
            <Button onClick={form} sx={{ my: 2, color: 'white', display: 'block' }}>Booking Form</Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Typography onClick={logOut} textAlign="center">logout</Typography>
              </MenuItem>
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
