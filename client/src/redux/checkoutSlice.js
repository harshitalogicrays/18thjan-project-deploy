import { createSlice } from "@reduxjs/toolkit";
const checkoutSlice=createSlice({
    name:"checkout",
    initialState:{shipping:{}},
    reducers:{
        STORE_ADDRESS(state,action){
            state.shipping=action.payload } }})
export const {STORE_ADDRESS}=checkoutSlice.actions
export default checkoutSlice
export const selectShippingAddress=(state)=>state.checkout.shipping