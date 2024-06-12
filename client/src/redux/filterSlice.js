import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name:"filter",
    initialState:{filterProducts:[],categoryvalue:'',searchvalue:'',pricevalue:''},
    reducers:{ FILTER_BY_CATEGORY(state,action){
            let {products,category}=action.payload
            if(category !=''){
                let filters = products.filter(item=>item.category==category)
                state.filterProducts=filters}
            state.categoryvalue =  category  },
        FILTER_BY_SEARCH(state,action){
            let {products,search}=action.payload
            if(search!=''){
              let filters=  products.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()))
                state.filterProducts=filters  }
            state.searchvalue=search  },
        FILTER_BY_PRICE(state,action){
            let {products,price}=action.payload
            if(price !=''){
                let filters = [...products].sort((a,b)=>{
                    return price=='low' ? a.price - b.price : b.price - a.price })
                state.filterProducts=filters}
            state.pricevalue=price } }})
export const {FILTER_BY_CATEGORY,FILTER_BY_SEARCH,FILTER_BY_PRICE}=filterSlice.actions
export default filterSlice
export const selectFilterProducts = state=>state.filter.filterProducts
export const selectSearch = state=>state.filter.searchvalue
export const selectCategory = state=>state.filter.categoryvalue
export const selectPrice = state=>state.filter.pricevalue
