import React from 'react'
import { Link } from 'react-router-dom';

export default function NoPage() {
  return (
    <div><h1>Oops!</h1>
    <p>Sorry, an unexpected error has occurred.</p>
    <Link to="/">Back to log in</Link>
</div>
     
  )
}
