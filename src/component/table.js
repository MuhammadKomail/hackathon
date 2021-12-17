import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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




export default function BasicTable() {
    let arr = [];
    const [data, setData] = React.useState([]);

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                const dbRef = ref(db, `Booking${uid}`);
                onValue(dbRef, (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        let childKey = childSnapshot.key;
                        let childData = childSnapshot.val();
                        arr.push(childData)
                        console.log(childData)
                    });
                    console.log(arr)
                    setData(arr)
                })


            }
        }

        );


    }, [])
    console.log(data)


    return (
        <TableContainer component={Paper} sx={{ marginTop: '40px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>heading 1</TableCell>
                        <TableCell align="right">heading 2</TableCell>
                        <TableCell align="right">heading 3</TableCell>
                        <TableCell align="right">heading 4</TableCell>
                        <TableCell align="right">heading 5</TableCell>
                        <TableCell align="right">heading 6</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>


                    {data != 0 ? data.map((item, index) => <><TableRow> <TableCell sx={{ color: 'black' }} key={index} component="th" scope="row">{data.name}</TableCell><TableCell align="right">{data.noOfDayStay}</TableCell><TableCell align="right">{data.cnic}</TableCell><TableCell align="right">{data.address}</TableCell><TableCell align="right">{data.contactNo}</TableCell><TableCell align="right">{data.noOfPerson}</TableCell></TableRow></>) : 'loading'}
                    {/* {data == 0?<h1>No data Found</h1>:Null} */}


                </TableBody>
            </Table>
            {data.name}
        </TableContainer>
    );
}
