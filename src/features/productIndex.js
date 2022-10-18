import {createSlice} from '@reduxjs/toolkit'

export const productIndexslice= createSlice({
    name: "productIndex",
    initialState:{ value:0},
        reducers:{
            setProductIndex:(state, action)=>{
                state.value=action.payload
            }, 
             
    },
})
export const {setProductIndex}= productIndexslice.actions

export default productIndexslice.reducer