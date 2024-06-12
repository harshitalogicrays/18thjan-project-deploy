import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name:"category",
    initialState:{categories:[]},
    reducers:{
        STORE_CATEGORIES(state,action){
            state.categories=action.payload
        }
    }
})
export const {STORE_CATEGORIES}=categorySlice.actions
export default categorySlice
export const selectCategories = state => state.category.categories