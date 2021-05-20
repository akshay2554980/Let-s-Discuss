import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import Sidebarchat from "./Sidebarchat";
import db from "./firebase";  
import { useStateValue } from "./StateProvider";
function Sidebar() {

  const [{user}]=useStateValue();
  const [rooms, setrooms] = useState([]);

  useEffect(() => {
   const unsubscribe = db.collection('rooms').onSnapshot((snapshot)=>{
     setrooms(snapshot.docs.map((doc)=>({
       id:doc.id,data:doc.data()
     })))
   })
   return ()=>{
     unsubscribe();
   }
  },[]) 

  // if always live communication with the db is problem
  // then use return and use unsubscribe...
  // basically use cleanup function in useeffect
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar  src={user?.photoURL} />
        <div className="sidebar__headerRight">
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
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <input placeholder="Search or Start a new chat " type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
      <Sidebarchat  addNewChat/>
      {
        rooms.map((room)=>{  
        return <Sidebarchat 
            key={room.id}
             id={room.id}
           name={room.data.name}
        />
        })
      }  
      </div>
    </div>
  );
}

export default Sidebar;
