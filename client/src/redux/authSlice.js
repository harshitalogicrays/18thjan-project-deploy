import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{isLoggedIn:false , userEmail:null,userName:null,userId:null,userRole:null},
    reducers:{
        LogInUser(state,action){
            let {email,name,id,role}=action.payload
            state.isLoggedIn=true
            state.userEmail=email
            state.userName=name
            state.userId=id
            state.userRole=role},
        LogoutUser(state,action){
            state.isLoggedIn=false; state.userEmail=null; state.userName=null
            state.userId=null; state.userRole=null}}
})
export const {LogInUser,LogoutUser}=authSlice.actions
export default authSlice
export const selectIsLoggedIn = state => state.auth.isLoggedIn
export const selectUserEmail = state => state.auth.userEmail
export const selectUserName = state => state.auth.userName
export const selectUserId = state => state.auth.userId
export const selectUserRole = state => state.auth.userRole