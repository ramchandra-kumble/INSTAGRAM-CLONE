import { Button } from '@material-ui/core'
import React, { useState }  from 'react'
import '../styles/UploadPost.css'
import { storage , db} from '../firebase'
import { useStateValue } from  '../StateProvider'

function UploadPost() {
    const [caption, setCaption] = useState();
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [{user}] = useStateValue();
    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totoalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                alert(error.message)
            },
            () => {
                storage.ref('images').child(image.name).getDownloadURL()
                .then(url => {
                    db.collection('posts').add({
                        caption : caption,
                        imgSrc : url,
                        userName : user.displayName
                    })
                    setCaption('');
                    setImage(null);
                })
            }
        )
    }
    return (
        <div className='imageUpload'>
            <input type="text" value={caption} onChange={(e) => { setCaption(e.target.value) }} className="Uploadpost_caption" placeholder='Enter a caption...'/>
            <input type="file" onChange={handleChange} className='fileupload_btn'/>
            <Button className='uploadBtn' onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default UploadPost
