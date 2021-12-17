import React from 'react'
import { Button } from 'react-bootstrap'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
    auth,
    push,
    createUserWithEmailAndPassword
} from '../firebase/firebase';

import { db, set, ref } from '../firebase/firebase';
import { Link } from "react-router-dom";
import PhoneIcon from '@mui/icons-material/Phone';
import { useNavigate } from 'react-router'
import { useDispatch } from "react-redux";


export default function Login() {
    const unique_id = uuid();
    const [hotelName, sethotelName] = useState()
    const [noOfRooms, setNoOfRooms] = useState()
    const [perDayPrice, setPerDayPrice] = useState()
    const [src, setSrc] = useState()

    const dispatch = useDispatch();

    const submit = () => {
        const submit = {
            hotelName,
            noOfRooms,
            perDayPrice
        }


        const postListRef = ref(db, 'posts');
        const newPostRef = push(postListRef);
        set(newPostRef, {
            hotelName,
            noOfRooms,
            perDayPrice,
            src,
            unique_id
        });
        sethotelName('')
        setNoOfRooms('')
        setPerDayPrice('')
        setSrc('')
    }



    return (
        <div style={{ display: "flex", alignItems: 'center', justifyContent: "center", backgroundPosition: "center", marginTop: "100px" }}>
            <form method="post" action="" className="login" style={{ borderRadius: "30px" }}>
                <header>Hotel Entry Form</header>
                <div className="field">
                    <span className='mt-5'>
                        {/* <PersonOutlineIcon style={{ marginTop: "10px" }} /> */}
                    </span>

                    <input placeholder="Enter The Name Of Hotel" value={hotelName} onChange={(e) => sethotelName(e.target.value)} type='text' />
                </div>
                <div className="field">
                    <span className='mt-5'>
                        {/* <PersonOutlineIcon style={{ marginTop: "10px" }} /> */}
                    </span>
                    <input placeholder="Enter No of Rooms" value={noOfRooms} onChange={(e) => setNoOfRooms(e.target.value)} type='number' />
                </div>
                <div className="field">
                    <span className='mt-5'>
                        {/* <PhoneIcon style={{ marginTop: "10px" }} /> */}
                    </span>
                    <input placeholder="Per Day Price" value={perDayPrice} onChange={(e) => setPerDayPrice(e.target.value)} type='number' />
                </div>
                <div className="field">
                    <span className='mt-5'>
                        {/* <PhoneIcon style={{ marginTop: "10px" }} /> */}
                    </span>
                    <input placeholder="Enter Src Of Hotel Image" value={src} onChange={(e) => setSrc(e.target.value)} type='text' />
                </div>

                <Button className='submit' onClick={submit}>Submit</Button>

            </form>

        </div>
    )
}
