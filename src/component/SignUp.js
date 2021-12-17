import React from 'react'
import { Button } from 'react-bootstrap'
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import {
    auth,
    signInWithEmailAndPassword
} from '../firebase/firebase';
import { useState } from 'react';
import {  useNavigate } from 'react-router';
import { db, onValue, ref } from '../firebase/firebase'
import { Link } from 'react-router-dom';
import {  useDispatch } from "react-redux";



export default function SignUp() {

    const dispatch = useDispatch();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const navigation = useNavigate()
    // const dataFromRedux = useSelector((a) => a);

    const signUp = () => {
        const signUpData = {
            email,
            password
        }
        signInWithEmailAndPassword(auth, signUpData.email, signUpData.password)
            .then((success) => {
                console.log(success)
                const refrence = ref(db, `/users /${success.user.uid}`)
                onValue(refrence, (snapShot) => {
                    if (snapShot.exists()) {
                        console.log(snapShot.val());
                        let userObj = snapShot.val()
                        navigation('/', { state: userObj })
                    }
                    dispatch({
                        type: "DATAFROMLOGIN",
                        email,
                        password
                    });

                });
                // console.log(text);

                setEmail('')
                setPassword('')


            })
            .catch((err) => {
                console.log(err.message)
                setError(err.message)
                setEmail('')
                setPassword('')
            })

        console.log(signUpData)

    }
    return (
        <div style={{ display: "flex", alignItems: 'center', justifyContent: "center", backgroundPosition: "center", marginTop: "100px" }}>
            <form method="post" action="" className="login" style={{ borderRadius: "30px" }}>
                <header>LOGIN FORM</header>
                <div className='py-5 my-5 text-danger text-bold' style={{color:'red',paddingBottom:'20px'}}>
                    {error}
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
                <Button className='submit' onClick={signUp}>Submit</Button>
                <div className="">
                    <p>Already have an Account? <Link className="link" to="/login">SignUp</Link></p>
                </div>
            </form>
        </div>
    )
}

