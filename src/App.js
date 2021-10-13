import React, { useEffect} from 'react'
import './styles/App.css'
import Home from './components/Home'
import Header from './components/Header'
import Login from './components/Login'
import UploadPost from './components/UploadPost';
import { useStateValue } from './StateProvider'

function App() {

    const [{ user }] = useStateValue();
    
    return (
        <div className='App'>
                {!user ? (
                                <Login />
                            ) : (
                            <div>
                                <Header />
                                <UploadPost userName={user.displayName} />
                                <Home />
                            </div>
                        )
                }
        </div>
    )
}

export default App
