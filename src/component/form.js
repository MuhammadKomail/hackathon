import React from 'react'
import { Button } from 'react-bootstrap'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useState } from 'react';
import { useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import {
    auth,
    push,
    createUserWithEmailAndPassword
} from '../firebase/firebase';
import {
    onAuthStateChanged,
    signOut,

    child,
    get
} from '../firebase/firebase'
import { db, set, ref } from '../firebase/firebase';
import { Link } from "react-router-dom";
import PhoneIcon from '@mui/icons-material/Phone';
import { useNavigate } from 'react-router'
import { useDispatch } from "react-redux";
import { Layout } from 'antd';

// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Card1 from './Card';

const settings = ['Logout'];


export default function UserForm() {
    const unique_id = uuid();
    const [name, setName] = useState()
    const [cnic, setCnic] = useState()
    const [address, setAddress] = useState()
    const [contactNo, setContactNo] = useState()
    const [noOfPerson, setNoOfPerson] = useState()
    const [noOfDayStay, setNoOfDayStay] = useState()
    const navigation = useNavigate();

    const dispatch = useDispatch();

    const submit = () => {
        const submit = {
            name,
            cnic,
            address,
            contactNo,
            noOfPerson,
            noOfDayStay
        }

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                const postListRef = ref(db, `Bookings/${uid}/`);
                const newPostRef = push(postListRef);
                const newkey = newPostRef.key;
                set(newPostRef, {
                    name,
                    cnic,
                    address,
                    contactNo,
                    noOfPerson,
                    noOfDayStay,
                    newkey
                });

            } else {
                navigation('/signup')
            }
        }

        );

        setName('')
        setCnic('')
        setAddress('')
        setContactNo('')
        setNoOfPerson('')
        setNoOfDayStay('')
    }

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
            } else {
                navigation('/signup')
            }
        }

        );
    }, [])


    return (

        <div style={{ display: "flex", alignItems: 'center', justifyContent: "center", backgroundPosition: "center", marginTop: "100px" }}>
            <form method="post" action="" className="login" style={{ borderRadius: "30px" }}>
                <header>Hotel Bookin Form</header>
                <div className="field">
                    <span className='mt-5'>
                        {/* <PersonOutlineIcon style={{ marginTop: "10px" }} /> */}
                    </span>

                    <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} type='text' />
                </div>
                <div className="field">
                    <span className='mt-5'>
                        {/* <PersonOutlineIcon style={{ marginTop: "10px" }} /> */}
                    </span>
                    <input placeholder="Cnic Number" value={cnic} onChange={(e) => setCnic(e.target.value)} type='number' />
                </div>
                <div className="field">
                    <span className='mt-5'>
                        {/* <PhoneIcon style={{ marginTop: "10px" }} /> */}
                    </span>
                    <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} type='text' />
                </div>
                <div className="field">
                    <span className='mt-5'>
                        {/* <PhoneIcon style={{ marginTop: "10px" }} /> */}
                    </span>
                    <input placeholder="Contact No" value={contactNo} onChange={(e) => setContactNo(e.target.value)} type='number' />
                </div>
                <div className="field">
                    <span className='mt-5'>
                        {/* <PhoneIcon style={{ marginTop: "10px" }} /> */}
                    </span>
                    <input placeholder="No of persons" value={noOfPerson} onChange={(e) => setNoOfPerson(e.target.value)} type='number' />
                </div>
                <div className="field">
                    <span className='mt-5'>
                        {/* <PhoneIcon style={{ marginTop: "10px" }} /> */}
                    </span>
                    <input placeholder="No Of Day Stay" value={noOfDayStay} onChange={(e) => setNoOfDayStay(e.target.value)} type='number' />
                </div>

                <Button className='submit' onClick={submit}>Submit</Button>

            </form>

        </div>
    )
}
