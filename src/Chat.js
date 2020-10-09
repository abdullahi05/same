import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Chat.css'

import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import AttachFileSharpIcon from '@material-ui/icons/AttachFileSharp';
import MoreVertSharpIcon from '@material-ui/icons/MoreVertSharp';
import EmojiEmotionsSharpIcon from '@material-ui/icons/EmojiEmotionsSharp';
import MicSharpIcon from '@material-ui/icons/MicSharp';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from "firebase";

function Chat() {
    const [input, setInput] = useState ("");
    const [seed, setSeed] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch]  = useStateValue();

    useEffect(() => {
        if(roomId){
            db.collection("rooms")
              .doc(roomId)
              .onSnapshot((snapshot) =>  setRoomName
              (snapshot.data().name));

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc')
              .onSnapshot(snapshot => (
                  setMessages(snapshot.docs.map(doc => doc.data()))
              ))
        }

    }, [roomId])

    useEffect (() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('you typed >>>>',input);

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        })

        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

                <div className="chat__headerInfo">
                    <h2>{roomName}</h2>
                    <p>last seen {" "}
                        {new Date(
                            messages[messages.length -1]?.
                            timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                      <SearchSharpIcon/>
                    </IconButton>

                    <IconButton>
                      <AttachFileSharpIcon/>
                    </IconButton>

                    <IconButton>
                      <MoreVertSharpIcon/>
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                    <span className="chat__name">{message.name}</span>
                        {message.message}
                    <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
            </div>

            <div className="chat__footer">
                <EmojiEmotionsSharpIcon/>

                <form>
                    <input value={input} onChange = {e => setInput(e.target.value)} placeholder="type a message" type="text"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>

                <MicSharpIcon/>
            </div>
        </div>
    )
}

export default Chat
