import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  password: yup.string().min(8).max(32).required(),
});

const RegisterForm = () => {
    const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const postUser = (e) => {
    axios.post('http://localhost:5000/api/register', e)
      .then(console.log("send"))
      .catch((error) => {
        if( error.response ){
            console.log(error.response.data); // => the response payload 
        }
    });
  }
  const onSubmitHandler = (e) => {
    
    postUser(e)
   
  };
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <h2>Lets sign you in.</h2>
      <br />

      <input
        {...register("first_name")}
        placeholder="Name"
        type="text"
        required
        className="input"
      />
        <p>{errors.first_name?.message}</p>
        <br />
      <input
        {...register("last_name")}
        placeholder="Last Name"
        type="text"
        required
        className="input"
      />
      <p>{errors.last_name?.message}</p>
      <br />
      <input {...register("email")} placeholder="email" type="email" required className="input"/>
      <p>{errors.email?.message}</p>
      <br />

      <input
        {...register("password")}
        placeholder="password"
        type="password"
        required
        className="input"
      />
      <p>{errors.password?.message}</p>
      <br />

      <button type="submit" className="btm">Sign in</button>
      <Link to="/">Back</Link>

    </form>
  );
};

export default RegisterForm;
