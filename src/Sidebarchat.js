import { Avatar } from '@material-ui/core'

import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import db from './firebase';
import './Sidebarchat.css'
function Sidebarchat({id,name,addNewChat}) {
    
    const [messages, setmessages] = useState([]);
useEffect(() => {
    if(id){
        db.collection('rooms').doc(id)
        .collection('messages')
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot)=>setmessages(snapshot.docs.map((doc)=>doc.data())))
    }
}, [id])
    const [seed, setSeed] = useState('');
    
useEffect(() => {
    setSeed(Math.floor(Math.random()*1000));
},[]);
function CreateChat(){
    const roomName=prompt('please enter name of room');

    if(roomName){
        db.collection('rooms').add({
            name:roomName
        })
    }
}

    return !addNewChat?(
        <Link to={`/rooms/${id}`}>
        <div className='Sidebarchat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="Sidebarchat__info">
        <h2>{name}</h2>   
        <p>{messages[0]?.message}</p>
        </div>
        </div>
        </Link>
    ):(
        <div onClick={CreateChat} className="Sidebarchat">
            <h2>Add New Chat</h2>
        </div>

    );
}

export default Sidebarchat
