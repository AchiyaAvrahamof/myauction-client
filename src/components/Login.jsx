import React from 'react'
import {useDispatch} from "react-redux"
import{login} from '../features/user'
import{logout} from '../features/user'
export default function () {
  const dispatch=useDispatch()

  return (
    <div>
      <button onClick={()=> {dispatch(login({ name:"achiya",age:21,email:"achiyaav001"}))}}>Login</button>
      <button onClick={()=> {dispatch(logout())}}>logout</button>

    </div>
  )
}
