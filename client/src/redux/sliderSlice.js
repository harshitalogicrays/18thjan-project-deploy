import { createSlice } from "@reduxjs/toolkit";

const sliderSlice=createSlice({
    name:"slider",
    initialState:{sliders:[]},
    reducers:{
        STORE_SLIDERS(state,action){
            state.sliders=action.payload
        }
    }
})

export const {STORE_SLIDERS}=sliderSlice.actions
export default sliderSlice

export const selectSliders=(state)=>state.slider.sliders