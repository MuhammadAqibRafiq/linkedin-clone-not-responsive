import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';
import { auth, db } from '../../firebase'
import './login.css';


const Login = () => {

    const [fullname, setFullname] = useState('');
    const [photo, setPhoto] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()

    const logintoapp = async (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(userAuth => {
            dispatch(login({
                uid: userAuth.uid,
                email: userAuth.user.email,
                displayName: userAuth.user.displayName,
                photoURL: userAuth.user.photoURL,
            }))
        })
    }

    const register = () => {
        if (!fullname) {
            return alert("Enter a fullname")
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then((userAuth) => {
                userAuth.user.updateProfile({
                    displayName: fullname,
                    photoURL: photo
                })
                    .then(() => {
                        dispatch(login({
                            uid: userAuth.uid,
                            email: userAuth.user.email,
                            displayName: userAuth.user.displayName,
                            photoURL: userAuth.user.photoURL,
                        }))
                    })
            })
            .catch((error) => alert(error));
    }

    return (
        <div>
            LOGIN FIRST
            <form className='t'>
                <input placeholder='FullName(required if registering)' type='text' value={fullname} onChange={e => { setFullname(e.target.value) }} />
                <br />
                <input placeholder='Photo(optional)' type='picture' value={photo} onChange={e => { setPhoto(e.target.value) }} />
                <br />
                <input placeholder='Email' type='email' value={email} onChange={e => { setEmail(e.target.value) }} />
                <br />
                <input placeholder='Password' type='password' value={password} onChange={e => { setPassword(e.target.value) }} />
                <br />
                <button onClick={logintoapp}>Login</button>
                <p>Not a member?<span onClick={register} style={{ cursor: 'pointer', color: "blue" }}>register now</span></p>
            </form>
        </div>
    )
}

export default Login
