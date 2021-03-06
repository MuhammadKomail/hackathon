import React from 'react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useLocation } from "react-router";
import {
    auth,
    onAuthStateChanged,
    signOut,
    ref,
    db,
    child,
    get
} from '../firebase/firebase'
import Typography from '@mui/material/Typography';
import logo from '../images/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import { Layout } from 'antd';
import { useDispatch } from "react-redux";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Card1 from './Card';







export default function Dashboard() {
    
    const settings = ['Logout'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [data, setData] = React.useState([]);
    const [con, setCon] = React.useState(false);
    const dispatch = useDispatch()

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

    const navigation = useNavigate();
    const location = useLocation();

    const logOut = () => {
        signOut(auth)
            .then((success) => { console.log(success) })
            .catch((err) => { console.log(err) })
    }
    const home = () => {
        navigation('/')
      }
      const form = () => {
        navigation('/form')
      }
      const detail = () => {
        navigation('/accdet')
      }
    const dbRef = ref(db);


    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCon(true);
                const uid = user.uid;
                get(child(dbRef, `users /${uid}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log(snapshot.val());
                        setData(snapshot.val())
                        dispatch({
                            type: "DATAFROMDASHBOARD",
                            ...data
                        });

                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }
        }


        );
    }, [])
    return (
        <>

        

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
              {con==true?<Avatar alt={data.firstName} src="/static/images/avatar/2.jpg" />:null}
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

            <Card1 />

            {/* <h1>{data.firstName}</h1> */}
        </>
    )
}


