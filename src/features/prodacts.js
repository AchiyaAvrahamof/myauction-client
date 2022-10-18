import {createSlice} from '@reduxjs/toolkit'

export const productslice= createSlice({
    name: "product",
    initialState:{ value:[]},
        reducers:{
            setProducts:(state, action)=>{
                state.value=action.payload
            }, 
             
    },
})
export const {setProducts}= productslice.actions

export default productslice.reducer