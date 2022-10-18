import {createSlice} from '@reduxjs/toolkit'

export const userlice= createSlice({
    name: "user",
    initialState:{ value:{first_name:"",last_name:"",email:""}},
        reducers:{
            login:(state, action)=>{
                state.value=action.payload
            }, 
            logout:(state)=>{
                state.value={first_name:"",last_name:"",email:""}
            }  
    },
})
export const {login}= userlice.actions
export const {logout}= userlice.actions
export default userlice.reducer