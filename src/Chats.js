import React, { useState, useEffect } from "react";
import "./Chats.css";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { db, auth } from "./firebase";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { selectUser } from "./features/appSlice";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCameraImage } from "./features/cameraSlice";

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot =>
        setPosts(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }))
        )
      );
  }, []);
  const takeSnap=() =>{
      dispatch(resetCameraImage());
    navigate("/")
  };
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className="chats__avatar"
        />
        <div className="chats__search">
          <SearchIcon className="chats__searchIcon" />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubbleIcon className="chats__chatIcon" />
      </div>
      <div className="chat__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read }
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>
      <RadioButtonUncheckedIcon 
      className='chats__takePicIcon'
      onClick={takeSnap}
      fontSize='large'
      />
    </div>
  );
}

export default Chats;
