import React, { useState } from 'react'
import auth, { provider } from '../firebase'
import { useStateValue } from '../StateProvider';
import '../styles/Login.css'
function Login() {
    const [{user}, dispatch] = useStateValue();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then(result => {
            alert('Sign in successfully')
            dispatch({
                type: 'SET_USER',
                user: result.user,
            })
        })
        .catch((error) => alert(error));
    }
    
    const signUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert('SignUp Successful')
        })
        .catch((e) => {
            alert(e);
        })
    }
    
    const GoogleLogin = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            alert('Sign in successfully')
            dispatch({
                type: 'SET_USER',
                user: result.user,
            })
        })
        .catch((error) => alert(error));
    }

    return (
        <div className="login_container">
        <div className='login'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKo5XgOrtcaYXbgrtK6pgeyVVS7wf5bXQHUg&usqp=CAUhttps://pngimage.net/wp-content/uploads/2018/06/font-instagram-png-2.png" alt="logo" className="login_logoIMg"/>
        <p>Email</p>
        <input type="text" onChange={(e) => setEmail(e.target.value)}/>
        <p>Password</p>
        <input type="password"  onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={signIn}>SignIn</button><button onClick={signUp}>Register</button>

        <div className='G_LoginBtn' onClick={GoogleLogin}>
        <img src="https://avatars.githubusercontent.com/u/7328930?v=4&s=40" alt=""/>
        </div>
        </div>
        </div>
    )
}

export default Login
