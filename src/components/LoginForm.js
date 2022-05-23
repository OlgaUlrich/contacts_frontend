import React, {useState, useEffect, useLayoutEffect} from "react"
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { useFormik } from "formik";
import * as Yup from "yup";
import Buttons from "./buttons";
import hello from "./assets/hello.svg";

 
 
 
const Pr = styled.div`
     width: 20%;
     margin: auto;
     margin-top:5%;
`
 
const Wrapper = styled.div`
    color: ${props => props.theme.textColor};
    width: 70%;
    height: 100%;
    form{
     width: 30%;
     margin: auto;
     margin-top:5%;
 
     .InputWrapper{
         width: 100%;
         color:red;
         
    input{
    height: 3em;
    width: 100%;
    border-style:none;
    margin-right:10px;
    padding-left:15px;
    margin-top: 1rem;
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

 
function Login(props){
const [err, setError] = useState('');
const [form, setForm] = useState('login');
let navigate = useNavigate();   




 const  { handleSubmit, handleChange, values, touched, errors }= useFormik({
        initialValues: {
            username: '',
            password: '',
            name: 'olga', 
            pass: 'Q1q1q1qwe%',
 
        },
        validationSchema: Yup.object({
            username: Yup.string().min(2,  "Length of min username 2").required('Required'),
            password: Yup.string().min(8,  "Length of min password 8").required('Required'),
           
        }),
        onSubmit: (values, onSubmitProps) =>{

            LoginRequest(values.username, values.password)
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
 
        
       
       
        }
    })
 
 function getData(){
 }
const LoginRequest = (username, password) =>{
    const url = "https://my-contacts-book-api.herokuapp.com/api/auth/login";
        const method = "POST";
            const body = {
                username: username,
                password: password,
            };
   
        const headers = new Headers({
            "Content-type": "application/json",
         
        });
        const config = {
            method: method,
            body: JSON.stringify(body),
            headers: headers,
        };
 
        fetch(url, config)
 
            .then((response) => {
               
                  if (response.status === 200) {
                    return response.json()
                }
                else{
                    return setError(true)
                }
 
               
            })
            .then((data) => {
                localStorage.setItem('token', data.token);
                navigate('/app');
                props.existSet(true);
            })                  
       
    };
 
 
 
    return(
        <>

            <Wrapper>
 
             {err ?
   
              <Pr>
              No active account found with the given credentials.
            {
                <div onClick={()=>{document.location.reload()}}
                style={{'color':'blue', "textDecoration":"underline", "cursor":"pointer"}}>Go back</div>
            }
            </Pr>
   
    :
<>
 
  {
      form === "login"
  }
        <form onSubmit={handleSubmit}>
        <h1>Login</h1>  
          <div className="InputWrapper">
        <input type="text" value={props.useCred === true ? values.username = values.name : values.username} placeholder="Username" onChange={handleChange} name="username"/>
        {touched.username && errors.username ? (
            <div>{errors.username}</div>
        ):null}
        </div>
 
      <div className="InputWrapper">
      <input type='password' placeholder="Password" value={props.useCred === true ? values.password = values.pass : values.password} onChange={handleChange} name="password"/>
      {touched.password && errors.password ? (
            <div>{errors.password}</div>
        ):null}
      </div>
 
        <div  className="ButtonWrapper">
        <Buttons iconBt={hello} textBt="Log in"> 
           </Buttons>
        </div>
 
        </form>
        </>
    }
    </Wrapper>


 
        </>
    )
}
 
 
export default Login