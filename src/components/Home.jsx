import React, { useState, useEffect } from 'react'
import Posts from './Posts'
import { db } from '../firebase'
import '../styles/Home.css'
import { useStateValue } from '../StateProvider'
import InstagramEmbed from 'react-instagram-embed';

function Home() {

    const [posts, setPosts] = useState([]);
    const [{user}] = useStateValue();

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map( doc => ({
                id : doc.id,
                post : doc.data()
            })))
        })
    }, [])

    return (
        <div className='home'>
        {
            posts.map(({id, post}) => (
                <Posts
                 key = {id}
                 postId = {id}
                 imgSrc={post.imgSrc}
                 userName={post.userName}
                 AvatarUrl={user.photoURL}
                 caption={post.caption}
                />
        ))
        }

            <div className="posts">
               <InstagramEmbed
                url='https://www.instagram.com/p/CL-6kwSAXo4/?utm_source=ig_web_button_share_sheet'
                maxWidth={320}
                hideCaption={false}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
                />
            </div>
        </div>
    )
}

export default Home
