import React, {useState} from "react"

import styled from 'styled-components';
import { useFormik } from "formik";
import * as Yup from "yup"
 
 
 
const Wrapper = styled.div`
    form{
     width: 30%;
     margin: auto;
      margin-top:5%;
     min-height:150px;
 
   
 
     .InputWrapper{
         width: 100%;
         color:red;
        input{
    height: 3em;
    width: 100%;
    border-style:none;
    margin-right:10px;
    padding-left:15px;
}
input:focus {
    outline: none;
    }
     }
     .ButtonWrapper{
         display: flex;
         justify-content:center;
         padding-top:3rem;
         button{
         padding: 2rem 5rem 2rem 5rem;
         border-radius:28px;
       
         }
 }
 
 
`
 
 
 
 
 
 
function RegistrationForm(props){
      const  { handleSubmit, handleChange, values, touched, errors }= useFormik({
        initialValues: {
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            password: ''
        },
        validationSchema: Yup.object({
            /* email: Yup.string().max(30, "Email should be shorter than 30 letters").required("Requared"), */
            username: Yup.string().min(2, "Username should be longer than 2 letters").required('Required'),
            email: Yup.string().email('invalid email address').required('Required'),
            first_name: Yup.string().min(2, "First name should be longer than 2 letters").required('Required'),
            last_name: Yup.string().min(2, "Last name should be longer than 2 letters").required('Required'),
            password: Yup.string().matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
              ),
            /* max(30, "Email should be shorter than 30 letters") */
        }),
        onSubmit: (values, onSubmitProps) =>{
            props.handleSignUp(values.username, values.first_name, values.last_name, values.email, values.password)
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
 
       
        }
    })
 
 
 
    return(
  <Wrapper>
 <form onSubmit={handleSubmit}>
         <div className="InputWrapper">
        <input type="text" value={values.username} placeholder="Username" onChange={handleChange} name="username"/>
        {touched.username && errors.username ? (
            <div>{errors.username}</div>
        ):null}
        </div>
        <div className="InputWrapper">
        <input type="text" value={values.email} placeholder="Email" onChange={handleChange} name="email"/>
        {touched.email && errors.email ? (
            <div>{errors.email}</div>
        ):null}
        </div>
        <div className="InputWrapper">
        <input type="text" value={values.first_name} placeholder="First name" onChange={handleChange} name="first_name"/>
        {touched.first_name && errors.first_name ? (
            <div>{errors.first_name}</div>
        ):null}
        </div>
        <div className="InputWrapper">
        <input type="text" value={values.last_name} placeholder="Last name" onChange={handleChange} name="last_name"/>
        {touched.last_name && errors.last_name ? (
            <div>{errors.last_name}</div>
        ):null}
        </div>
        <div className="InputWrapper">
        <input type="text" value={values.password} placeholder="Password" onChange={handleChange} name="password"/>
        {touched.password && errors.password ? (
            <div>{errors.password}</div>
        ):null}
        </div>
         <div  className="ButtonWrapper">
        <button className="subBut" type="submit">Submit</button>
        </div>  
        </form>          
 
</Wrapper>
    )
}
 
 
export default RegistrationForm