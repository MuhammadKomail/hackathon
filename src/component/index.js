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

const settings = ['Logout'];

// const { SubMenu } = Menu;
// import Button from ''
// const { Title } = Typography;
// const { Header, Footer, Sider, Content } = Layout;



export default function Dashboard() {

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [data, setData] = React.useState([]);
    const [con, setCon] = React.useState(false);
    const dispatch = useDispatch()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
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
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseNavMenu}>
                                           <Button onClick={logOut} type="primary">Logout</Button>
                                        </MenuItem>
                                    ))}
                                    
                                </Menu>
                            </Box>

                        </Toolbar>
                    </Container>
                </AppBar>
            </Layout>

            <Card1 />

            {/* <h1>{data.firstName}</h1> */}
        </>
    )
}


