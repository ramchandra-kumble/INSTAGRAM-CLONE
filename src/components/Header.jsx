import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../styles/Header.css'
import auth from '../firebase'
function Header() {
    const history = useHistory();
    const logout = () => {
        auth.signOut().then(() => {
            alert('sign out successful')
            history.push('/login');
        })
    }
    return (
        <div>
            <div className='app_header'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKo5XgOrtcaYXbgrtK6pgeyVVS7wf5bXQHUg&usqp=CAUhttps://pngimage.net/wp-content/uploads/2018/06/font-instagram-png-2.png" alt="logo" className="header_logo"/>
                { /*<button onClick={logout}><Link to='/login'>Logout</Link></button>*/ }
            </div>
        </div>
    )
}

export default Header
