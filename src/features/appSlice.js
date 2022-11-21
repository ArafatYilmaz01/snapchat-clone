import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: 0,
  status: 'idle',
};



export const appSlice = createSlice({
  name: 'app',
  initialState:{
user:null,
selectImage:null
  },
  reducers: {
     login: (state, action) => {
      state.value += action.payload;
    },
    logout: (state) =>{
      state.user=null;
    },
    selectImage:(state,action)=>{
      state.selectedImage+=action.payload;
    },
    resetImage:(state)=>{
      state.selectedImage=null
    }
  },

});

export const { login,logout,selectImage,resetImage } = appSlice.actions;

export const selectUser = (state) => state.app.user;
export const selectSelectedImage = (state) => state.app.selectedImage;



export default appSlice.reducer;
