import React, { useEffect, useState } from 'react'
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import { Avatar, IconButton } from '@material-ui/core'
import './Chat.css'
import { useParams } from 'react-router';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';
function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams(); // gives value from the url
  const [roomName, setroomName] = useState("");
  const [messages, setmessages] = useState([]);
  const [{user}]=useStateValue();
  useEffect(() => {
    if (roomId) {
      db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
        setroomName(snapshot.data().name);
      })
      db.collection('rooms').doc(roomId)
        .collection('messages')
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => (
        setmessages(snapshot.docs.map(doc =>doc.data()))))
    }
  }, [roomId])
  // whenever roomId changes this useeffect will run.  

  useEffect(() => {
   // console.log('useeffect used');
    setSeed(Math.floor(Math.random() * 1000));
  }, [roomId]);
 
 
  const sendMessage = (e) => {
    e.preventDefault();  //*** very important it do not let the app to reload......very imp remember this .. it stops the app from refreshing 
    db.collection('rooms').doc(roomId).collection('messages').add({
      message:input,
      name:user.displayName,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput("");
    // scrollMsg();
    var elem = document.querySelector('.chat__body');
    elem.scrollTop = elem.scrollHeight;
  }
  return (
    <div className="Chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>{
            messages.length===0?"No Activity":
            new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()
          }</p>
        </div>
        <div className="chat__righticons">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {
          messages.map(message => (

            <p className={`chat__message ${message.name===user.displayName && 'chat__receiver'}`}>
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">
                {
                  new Date(message.timestamp?.toDate()).toUTCString()
                }
              </span>
            </p>


          ))

        }
      </div>



      <div className="chat__footer">
        <InsertEmoticonIcon />
        {/* keeping a note of change in state of the input and update it useState  as i am calling setinput everytime when there a change in the state */}
        <form>
          <input placeholder="enter a message" type="text" 
            value={input} onChange={(e) => {
              setInput(e.target.value)
            }} />
          <button type="submit" onClick={sendMessage}>Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat
