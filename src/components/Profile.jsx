import React from 'react'
import {useSelector} from 'react-redux'
export default function () {
  const user= useSelector((state)=> state.user.value)
  return (
    <div>
        <h1>profile page</h1>
        <p>Name: {user.name}</p>
        <p>Age: {user.age}</p>
        <p>Email: {user.email}</p>
    </div>
  )
}
