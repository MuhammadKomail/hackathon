import React from 'react'
import { Button } from 'react-bootstrap'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';
import {
    auth,
    createUserWithEmailAndPassword
} from '../firebase/firebase';
import { db, set, ref } from '../firebase/firebase';
import { Link } from "react-router-dom";
import PhoneIcon from '@mui/icons-material/Phone';
import { useNavigate } from 'react-router'
import { useDispatch } from "react-redux";


export default function Login() {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [contactNo, setContactNo] = useState()
    const navigation = useNavigate()
    const dispatch = useDispatch();

    const login = () => {
        const loginData = {
            firstName,
            lastName,
            contactNo,
            email,
            password
        }
        createUserWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then((success) => {
                let uid = success.user.uid;
                loginData.uid = uid;
                const refrence = ref(db, `/users /${loginData.uid}`)
                set(refrence, loginData);
                console.log(success)
                console.log(success.user.uid)
                dispatch({
                    type: "DATAFROMSIGNUP",
                    ...loginData
                });
                setFirstName('')
                setLastName('')
                setEmail('')
                setPassword('')
                setContactNo('')
                
                navigation('/')

            })
            .catch((err) => {
                console.log(err)
            })
        console.log(loginData)
    }


    return (
        <div style={{ display: "flex", alignItems: 'center', justifyContent: "center", backgroundPosition: "center",marginTop:"100px" }}>
            <form method="post" action="" className="login" style={{ borderRadius: "30px" }}>
                <header>SIGN UP FORM</header>
                <div className="field">
                    <span className='mt-5'>
                        <PersonOutlineIcon style={{ marginTop: "10px" }} />
                    </span>

                    <input placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} type='text' />
                </div>
                <div className="field">
                    <span className='mt-5'>
                        <PersonOutlineIcon style={{ marginTop: "10px" }} />
                    </span>
                    <input placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} type='text' />
                </div>
                <div className="field">
                    <span className='mt-5'>
                        <PhoneIcon style={{ marginTop: "10px" }} />
                    </span>
                    <input placeholder="Contact No" value={contactNo} onChange={(e) => setContactNo(e.target.value)} type='number' />
                </div>
                <div className="field">
                    <span className='mt-5'>
                        <EmailIcon style={{ marginTop: "10px" }} />
                    </span>
                    <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type='email' />
                </div>
                <div className="field">
                    <span className='mt-5'>
                        <LockIcon style={{ marginTop: "10px" }} />
                    </span>
                    <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
                </div>
                <Button className='submit' onClick={login}>Submit</Button>
                <div className="">
                    <p>Already have an Account? <Link className="link" to="/signup">login</Link></p>
                </div>
            </form>

        </div>
    )
}
