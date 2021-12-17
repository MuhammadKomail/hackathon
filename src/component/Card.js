import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    auth,
    push,
    onAuthStateChanged,
    signOut,
    ref,
    db,
    child,
    get,
    query,
    onValue
} from '../firebase/firebase'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));






export default function Card1() {
    const navigation = useNavigate();
    const [expanded, setExpanded] = React.useState(false);
    const [data, setData] = React.useState([]);
    let arr = [];
    let childKey;
    let childData;

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    let dir = () => {
        navigation('/form')
    }

    useEffect(() => {
        const dbRef = ref(db, 'posts');
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                childKey = childSnapshot.key;
                childData = childSnapshot.val();
                arr.push(childData)
            });
            // console.log(arr)
            setData(arr)
        })
    }, [])

    console.log(data)

    return (
        // image={data.length === 0 ? 'Null' : data.map((item,key)=>item.src)}
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                    {data != 0 ? data.map((item) => <Grid item xs={3}> <Card sx={{ maxWidth: 345, marginTop: '20px' }}><CardHeader avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">{item.hotelName.charAt(6)}</Avatar>} action={<IconButton aria-label="settings"> </IconButton>} title={item.hotelName} /><CardMedia component="img" image={item.src} height="194" alt="Paella dish" /><CardContent><Typography variant="p" color="text.secondary"><b>No of Rooms:</b> {item.noOfRooms}</Typography><br></br><Typography variant="p" color="text.secondary"><b> Price per room: </b>{item.perDayPrice}</Typography><br></br><div sx={{ alignItems: 'center', alignContent: 'center', display: 'flex', justifyContent: 'center' }}><Button sx={{ marginTop: '20px' }} onClick={dir} variant="contained">Book Now</Button></div></CardContent></Card></Grid>) : 'loading'}
                </Grid>
            </Box>
        </>
    );
}
