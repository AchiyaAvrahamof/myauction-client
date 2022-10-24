import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  password: yup.string().min(8).max(32).required(),
});

const RegisterForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const postUser = (e) => {
    axios.get(`${process.env.REACT_APP_SECRET_NAME_backendURL}/api/register`)
    .then(()=>console.log("work"))
    axios.post(`${process.env.REACT_APP_SECRET_NAME_backendURL}/api/register`, e)
      .then(()=>{
        alert("Signup secssefully")
        navigate("/")})
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
      <h2>Lets sign you in. To start</h2>
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
