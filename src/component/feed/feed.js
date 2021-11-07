import React, { useState, useEffect } from 'react'
import './feed.css'
import CreateIcon from '@material-ui/icons/Create'
import Inputoption from './inputoption'
import ImageIcon from '@mui/icons-material/Image';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import EventIcon from '@mui/icons-material/Event';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import Posts from '../Post/Post';
import { auth, db } from '../../firebase'
import firebase from 'firebase/compat/app';
import { logout } from '../../features/userSlice';
import { useDispatch } from 'react-redux';


const Feed = ({ user }) => {

    const [input, setInput] = useState('');
    const [post, setPost] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        db.collection('posts').orderBy("timeStamp", "desc").onSnapshot(snapshot => {
            setPost(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        })

    }, [])

    console.log(user)
    console.log(user.email)
    // console.log(post)

    const sendPost = (e) => {
        e.preventDefault();
        //    console.log(post)
        db.collection('posts').add({
            name: user.displayName,
            discription: user.email,
            message: input,
            photoURL: user.photoURL || '',
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput('')
    }

    const Logouts = () => {
        dispatch(logout());
        auth.signOut();
    }


    return (
        <div className='feed'>
                <button onClick={Logouts}>logout</button>
            <div className='feed__inputContainer'>
                <div className='feed__input'>
                    <CreateIcon />
                    <form>
                        <input type='text' placeholder='Write ' onChange={(e) => setInput(e.target.value)} />
                        <button type='submit' onClick={sendPost}>send</button>
                    </form>
                </div>

                <div className='feed__inputoptions'>
                    <Inputoption Icon={ImageIcon} title='photo' color='#70B5F9' />
                    <Inputoption Icon={SubscriptionsIcon} title='Subscription' color='#E7A33E' />
                    <Inputoption Icon={EventIcon} title='Event' color='#C0CBCD' />
                    <Inputoption Icon={CalendarViewDayIcon} title='Write article' color='#7FC15E' />

                </div>

            </div>

            <div className=''>
                {post.map((elem, ind) => {
                    // console.log(elem)

                   return <Posts key={ind}
                        name={elem.data.name}
                        description={elem.data.discription}
                        message={elem.data.message}
                        photoUrl={elem.data.photoURL}
                    />
                })}

            </div>

        </div>
    )
}

export default Feed
