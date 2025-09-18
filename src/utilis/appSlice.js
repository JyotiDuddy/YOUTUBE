import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name:"app",
    initialState:{
        isMenuopen:true
    },
    reducers:{
        toggleMenu:(state,action)=>{
            state.isMenuopen = !state.isMenuopen
        },
        closeMenu:(state,action)=>{
            state.isMenuopen = false
        }
    }
})
export default appSlice.reducer;
export const{toggleMenu,closeMenu} = appSlice.actions