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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useState } from 'react';
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
    update,
    remove,
    onValue
} from '../firebase/firebase'
import swal from 'sweetalert';





export default function BasicTable() {
    let arr = [];
    const [data, setData] = React.useState([]);
    const [name, setName] = useState()
    const [cnic, setCnic] = useState()
    const [address, setAddress] = useState()
    const [contactNo, setContactNo] = useState()
    const [noOfPerson, setNoOfPerson] = useState()
    const [noOfDayStay, setNoOfDayStay] = useState()
    const navigation = useNavigate();
    const [show, setShow] = useState(false);


    const edit = (e) => {

        let name = prompt('Enter Your Name')
        let cnic = prompt('Enter Your Cnic Number')
        let address = prompt('Enter Your Address')
        let contactNo = prompt('Enter Your Contact No')
        let noOfPerson = prompt('No Of Persons')
        let noOfDayStay = prompt('No Of Day Stay')

        console.log(e)
        const dbRef = ref(db, `Bookings/`);
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                let childKey = childSnapshot.key;
                update(ref(db, `Bookings/${childKey}/${e}`), {
                        name,
                        cnic,
                        address,
                        contactNo,
                        noOfPerson,
                        noOfDayStay,
                    })
                        .then(() => {
                            console.log("data changed successfully");
                            navigation('/accdet')
                        })
                        .catch((err) => {
                            console.log("unsuccessfully");
                        })
            });
        })
    }

    const dele = (e) => {
        console.log(e)
        const dbRef = ref(db, `Bookings/`);
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                let childKey = childSnapshot.key;
                remove(ref(db, `Bookings/${childKey}/${e}`))
            });
        })

    }


    useEffect(() => {

        const dbRef = ref(db, `Bookings/`);
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                let childKey = childSnapshot.key;
                let childData = childSnapshot.val();
                onValue(ref(db, `Bookings/${childKey}/`), (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        let childKey1 = childSnapshot.key;
                        let childData1 = childSnapshot.val();
                        arr.push(childData1)
                        console.log(childData1)
                    });
                })
                setData(arr)
            });
        })

    }, [])
    console.log(data)


    return (
        <TableContainer component={Paper} sx={{ marginTop: '40px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Stay</TableCell>
                        <TableCell align="right">CNIC</TableCell>
                        <TableCell align="right">Address</TableCell>
                        <TableCell align="right">Mobile</TableCell>
                        <TableCell align="right">Persons</TableCell>
                        <TableCell align="right">Edit</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data !== 0 ? data.map((item, index) => <TableRow><TableCell sx={{ color: 'black' }} key={index} component="th" scope="row">{item.name}</TableCell><TableCell align="right">{item.noOfDayStay}</TableCell><TableCell align="right">{item.cnic}</TableCell><TableCell align="right">{item.address}</TableCell><TableCell align="right">{item.contactNo}</TableCell><TableCell align="right">{item.noOfPerson}</TableCell><TableCell align="right"><Button variant="text" onClick={() => { edit(item.newkey) }}><EditIcon /></Button></TableCell><TableCell align="right"><Button variant="text" onClick={() => { dele(item.newkey) }}><DeleteIcon /></Button></TableCell></TableRow>) : 'loading'}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
