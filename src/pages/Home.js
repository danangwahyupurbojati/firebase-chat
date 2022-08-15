import React, { useEffect, useState, useRef } from "react";
import firebase from "firebase/app";
import { useAuth } from "../contexts/AuthContext";
import { db } from '../firebase';

const Home = () => {
    const { user: currentUser, userRole } = useAuth();
    const [listUsers, setListUsers] = useState([]);
    const [chat, setChat] = useState("");
    const [text, setText] = useState("");
    const [msgs, setMsgs] = useState([]);

    const senderUser = currentUser && currentUser.uid;

    const selectUserToChat = async (user) => {
        setChat(user);

        const receiverUser = user.uid;
        const idChat = senderUser > receiverUser ? `${senderUser + receiverUser}` : `${receiverUser + senderUser}`;
        
        const chatReferance = db.collection('mails')
            .doc(idChat)
            .collection('chat')
            .orderBy('createdAt', 'asc');

        chatReferance.onSnapshot((querySnapshot) => {
            let messages = [];
            querySnapshot.docs.forEach((doc) => {
                messages.push(doc.data())
            })
            setMsgs(messages);
        })

    }

    const submitChat = async (e) => {
        e.preventDefault();

        const receiverUser = chat.uid;
        const idChat = senderUser > receiverUser ? `${senderUser + receiverUser}` : `${receiverUser + senderUser}`;
        const chatReferance = db.collection('mails').doc(idChat).collection('chat');

        await chatReferance.add({
            text,
            from: senderUser,
            to: receiverUser,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setText('');
    }
    
    useEffect(() => {
        const refereceUserDb = db.collection('members');
        const adminQuery = refereceUserDb.where("role", "not-in", ["admin"])
        const customerQuery = refereceUserDb.where("role", "in", ["admin"])

        const q = userRole && userRole.role === 'admin' ? adminQuery : customerQuery;

        const unsub = q.onSnapshot((querySnapshot) => {
            let users = [];
            querySnapshot.docs.forEach(doc => {
                users.push(doc.data())
            })
            setListUsers(users);
        })
    
        return unsub;
    }, [userRole]);
    
    return (
        <div className="home-container">
            <div className="user-container">
                {
                    listUsers.length > 0 && listUsers.map(user => (
                        <div
                            className={user.uid === chat.uid ? 'list-user' : 'unlist-user'}
                            key={user.uid}
                            onClick={() => selectUserToChat(user)}
                        >
                            <p>{user.name}</p>
                            <p>{user.role}</p>
                            <p>{user.isOnline ? 'online' : 'offline'}</p>
                        </div>
                    ))
                }
            </div>
            <div className="messages-container">
                {
                    chat ? (
                        <div>
                            <h3 className="chat-name">{chat.name}</h3>
                            <div>
                                {
                                    msgs.length > 0 && msgs.map((msg, i) => (
                                        <div 
                                            className={msg.from !== senderUser ? 'receiver-msg' : 'user-msg'}
                                            key={i}
                                        >
                                           <p>
                                                {msg.text}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                            <hr />
                            <form className="form-message" onSubmit={submitChat}>
                                <div className="message-form-wrapper">
                                    <input 
                                        type="text"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    />
                                </div>
                                <button type="submit">Kirim Pesan</button>
                            </form>
                        </div>
                    ) : (
                        <p>Select User To Chat</p>
                    )
                }
            </div>
        </div>
    )
}

export default Home