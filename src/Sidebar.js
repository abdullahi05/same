import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import {Avatar, IconButton} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {

    const [rooms,setRooms] = useState ([]);
    const [{user}, dispatch] = useStateValue();
    useEffect (() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({
                id:doc.id,
                data:doc.data(),
            }) ))
        ));

        return () => {
            unsubscribe();
        }

    }, [])
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <h4>{user?.displayName}</h4>
                <div className="sidebar__headerRight">
                    <IconButton>
                      <AddIcon/>
                    </IconButton>

                    <IconButton>
                      <MenuOpenIcon/>
                    </IconButton>

                    <IconButton>
                      <DonutLargeIcon/>
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                  <SearchIcon/>
                  <input placeholder="Search for yout friends" type="text"/>
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room => (
                    <SidebarChat key = {room.id} id={room.id} name={room.data.name}/>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
