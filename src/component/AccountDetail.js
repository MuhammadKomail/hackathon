import React from 'react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useLocation } from "react-router";
import Typography from '@mui/material/Typography';
import {
    auth,
    onAuthStateChanged,
    signOut,
    ref,
    db,
    child,
    get
} from '../firebase/firebase'
import { Layout } from 'antd';
import { useDispatch } from "react-redux";

// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Card1 from './Card';
import UserForm from './form';

const settings = ['Logout'];
const fnc = ['logoutfnc', 'accountFnc']


export default function Dashboard() {
    const pages = ['Products', 'Pricing', 'Blog'];
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [data, setData] = React.useState([]);
    const dispatch = useDispatch()
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
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
    const dbRef = ref(db);


    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
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
            } else {
                navigation('/signup')
            }
        }


        );
    }, [])
    return (
        <>


            <Layout>
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            </Box>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                            </Box>

                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={data.firstName} src="/static/images/avatar/2.jpg" />
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
                                        <Button  type="primary">Booking Detail</Button>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button onClick={logOut} type="primary">Logout</Button>
                                    </MenuItem>
                                </Menu>

                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Layout>

            {/* <UserForm /> */}

        </>
    )
}


