import React from "react";
import { useSelector } from "react-redux";
import { selectCameraImage, resetCameraImage } from "./features/cameraSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CreateIcon from "@mui/icons-material/Create";
import NoteIcon from "@mui/icons-material/Note";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CropIcon from "@mui/icons-material/Crop";
import TimerIcon from "@mui/icons-material/Timer";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { db, storage } from "./firebase";
import firebase from 'firebase/compat/app';
import {selectUser} from "./features/appSlice";
function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    if (!cameraImage) {
      navigate("/");
    }
  }, [cameraImage, navigate]);
  const closePreview = () => {
    dispatch(resetCameraImage);
    navigate("/");
  };

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");
    uploadTask.on(
      "state_changed",
      null,
      error => {
        //ERROR function
        console.log(error);
      },
      () => {
        //COMPLATE function
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then(url => {
            db.collection("posts").add({
              imageUrl: url,
              username: "Arafat Yilmaz",
              read: false,
              profilePic: user.profilePic,
              time: firebase.firestore.FieldValue.serverTimestamp()
            });
            navigate("/chats");
          });
      }
    );
  };
  return (
    <div className="preview">
      <CloseIcon onClick={closePreview} className="preview__close" />
      <div className="preview__toolbarRight">
        <CloseIcon />
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="" />
      <div onClick={sendPost} className="preview__footer">
        <h2>Send Now</h2>
        <SendIcon className="preview__sendIcon" />
      </div>
    </div>
  );
}

export default Preview;
