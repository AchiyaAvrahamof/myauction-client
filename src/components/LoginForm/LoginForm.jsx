import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";    

import './LoginForm.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import{login} from '../../features/user'
import { Link } from 'react-router-dom';

const loginSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required")
  });
    export default function LoginForm() {
        const dispatch=useDispatch()

    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const navigate = useNavigate();
    const postUser = (e) => {
      axios.post(`${process.env.backendURL}/api/login`, e)
      .then((res) =>{ 
        const data = res.data
        setError(data.error)
        setMessage(data.message)
                if(data.error){
                  return navigate("/RegisterForm")
                }
                if(!data.error){
                  dispatch(login({ first_name:data.first_name,last_name:data.last_name,email:data.email}))
                  
                    return navigate("/Products")
                }
            })
          }

          const  handleSubmit = (values, { setSubmitting }) => {
            
                postUser(values)
                
          }
          console.log(error+message);

          return (
        <div className="allDiv">
         <>
        <h1 className="title">Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <label>

                  <Field  type="email" name="email" className="input"/>
                  <ErrorMessage name="email" component="div" />
                   
                </label>
                <label>

                  <Field  type="password" name="password" className="input"/>
                  <ErrorMessage name="password" component="div" />
                </label>
                <br />
                <button type="submit" disabled={isSubmitting} className="btm">
                  Submit
                </button>
                <Link to="/RegisterForm">Register now</Link>
              </Form>
            );
          }}
        </Formik>
      </>

        </div>
      )
    }
