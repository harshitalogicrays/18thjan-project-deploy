import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name:"order",
    initialState:{orders:[]},
    reducers:{
        STORE_ORDERS(state,action){
            state.orders=action.payload
        }
    }
})
export const {STORE_ORDERS}=orderSlice.actions
export default orderSlice
export const selectorders = state => state.order.orders