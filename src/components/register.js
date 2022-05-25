import React, { useEffect, useState } from "react"

import styled from 'styled-components';
import RegistrationForm from "./RegistrationForm";



 
 
const Pr = styled.div`
     width: 30%;
     margin: auto;
     margin-top:5%;
     min-height:150px;
`
 
 
function Signup(){
const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);
const [msg, setMsg] = useState("");
 
 
 
 
   const handleSignUp =  (username, first_name, last_name, mail, password) => {
       
        const url = 'https://newappcontacts.herokuapp.com/api/auth/register';
        const method = 'POST';
        const body = {
            username: username,
            first_name: first_name,
            last_name: last_name,
            email: mail,
            password: password
        };
        const headers = new Headers({
            'Content-type': 'application/json',
        });
        const config = {
            method: method,
            body: JSON.stringify(body),
            headers: headers,
        };
 
        fetch(url, config)
            .then((response) => {
                console.log('responsej', response.json());
                if (response.status === 201) {
                    return response.status
                } else {
                    return setMsg(response.status);
                }
 
            })
            .then((data) => {
                // Enter a valid email address.
                // This email is taken
                //
                console.log('user data', data);
               if (data === 201) {
               setLoading(true)
                //     setTimeout(() => {
                 //       setLoading(false)
                 //       return navigate('/validation');
 
                 //   }, 6000)
             } else {
              setError(true)
              setMsg(data);

              }
            })
 
    }
 
 
    return(
        <>
 
       
    
   
 
         <div style={{"marginTop": "0", "width":"100%", "padding":"0", "display":"flex", "justifyContent":"center"}}>
   
        { error === true ?
            <Pr>Something went wrong. Probably, this name was used.
            {msg}
            {
                <div onClick={()=>{document.location.reload()}}
                style={{'color':'blue', "textDecoration":"underline", "cursor":"pointer"}}>Go back</div>
            }
            </Pr>
    :
        loading === true ?
        <Pr>Thanks for your registration. Now you can login with your credentials.
        </Pr>
        :
        <RegistrationForm handleSignUp={handleSignUp}/>
 }
 
</div>
 
 
  

     
   
        </>
    )
}
 
 
export default Signup