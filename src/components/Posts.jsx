import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import '../styles/Posts.css'
import Avatar from '@material-ui/core/Avatar'
import { useStateValue } from '../StateProvider'
function Posts({imgSrc, userName, caption, postId}) {


    const [comment, setComment] = useState();
    const [{user}] = useStateValue();
    const [getCommetns, setGetComments] = useState([]);
    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = db
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .onSnapshot((snapshot) => {
                setGetComments(snapshot.docs.map((doc) => doc.data()))
            });
        }
        return () => {
            unsubscribe(); 
        }
    }, [postId])

    const postComment = (e) => {
        e.preventDefault();
        db.collection('posts').doc(postId).collection('comments').add({
            text : comment,
            username : user.displayName 
        })
        setComment('');
    }

    return (
        <div className='post'>
        <div className="post_header">
            <Avatar
                className='post_Avatar' 
                src='https://i.pinimg.com/564x/c8/95/2d/c8952d6e421a83d298a219edee783167.jpg'
            />
            <h3>{userName}</h3>
        </div>
            <img className='postImg' src={imgSrc} alt="avatar" />
            <div className="postCaptionArea">
                <div className="postCaptionDiv"> 
                <small className='postCaption_name'><b>{userName}</b></small><h6 className='post_caption'>{caption}</h6>
                </div>
                <div className="postComments">
                {
                    getCommetns.map((comment) => (
                        <div className="postCaptionDiv"> 
                         <small className='postCaption_name'><b>{comment.username}</b></small><h6 className='post_caption'>{comment.text}</h6>
                        </div>
                    ))
                }
                </div>
                <div className='postCommentBox'>
                    <form  className='postCommentBox'>
                    <input type="text" className='postInput' placeholder='Add a comment..' value={comment} 
                            onChange={(e) => setComment(e.target.value)}/>
                    <button className='postCommetn_btn' disabled={!comment} type='submit' onClick={postComment}>POST</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Posts
