import React from 'react';
import {BrowserRouter as Router} from "react-router-dom"
import { Routes ,Route } from 'react-router-dom';

import './App.css';
import WebcamCapture from './WebcamCapture';
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Login from './Login';
import {login,logout,selectUser} from "./features/appSlice"
import { useEffect } from 'react';
import {auth} from "./firebase";
function App() {
  const user = useSelector(selectUser)
  const dispatch=useDispatch();

useEffect(()=>{
  auth.onAuthStateChanged((authUser) =>{
    if(authUser) {
      dispatch(login({
        username:authUser.displayName,
        profilePic: authUser.photoURL,
        id:authUser.uid,
      }));
   
    }
    else{
      dispatch(logout())
    }
  })
},[])
  return (
    <div className="app">
    <Router>
      {!user ? (
        <Login />
      ) : (
        <>
        <img className="app__logo" src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg" alt="" />
      <div className='app__body'>
      <div className="app__bodyBackground" >
      <Routes>
      <Route exact path='/' element={<WebcamCapture/>} />
      <Route path='/preview' element={<Preview/>} />
      <Route path='/chats' element={<Chats/>} />
      <Route path='/chats/view' element={<ChatView/>} />
      </Routes>
      </div>
    
    </div>
    </>
  )}
     
    </Router>
      
    </div>
  );
}

export default App;
