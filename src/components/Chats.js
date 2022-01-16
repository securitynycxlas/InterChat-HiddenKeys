import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import {auth} from '../firebase';

import {useAuth} from '../contexts/AuthContext';
import axios from 'axios';


const Chats = () =>{

    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading]  = useState(false);
    const handleLogout = async () => {
        await auth.signOut();

        history.push('/')
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }

    useEffect(() => {
        if(!user) {
            history.push('/');

            return;      
         }

         axios.get('https://api.chatengine.io/users/me/', {
             headers: {
                 "project-id": "e9b9dc05-c271-423a-b26c-164e478da232",
                 "user-name": user.email,
                 "user-secret": user.uid,
             }

         })
         .then(() => {
             setLoading(false);
         })
         .catch(() => {
             let formdata = new FormData();
             formdata.append('email', user.email);
             formdata.append('username', user.displayName);
             formdata.append('secret', user.uid)

             getFile(user.photoUrl)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name);

                    axios.post('https://api.chatengine.io/users/',
                        formdata,
                        { headers:{"private-key": "a46506be-882a-4a9b-9e44-e789501c3ed4" }}
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
                })
         })
    }, [user, history]);


    if(!user || loading) return 'Loading...'
    return (
        <div className='chats-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    InterChat
                </div>
                <div onClick={handleLogout} className='logout-tab'>
                    Logout
                </div>
            </div>


            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="e9b9dc05-c271-423a-b26c-164e478da232"
                userName={user.email}
                userSecret={user.uid}
            />

            </div>
    );
}


export default Chats;