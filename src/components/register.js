import React, { useEffect, useState } from "react"

import styled from 'styled-components';
import RegistrationForm from "./RegistrationForm";



//import { useNavigate } from "react-router-dom";
 
 
 
const Pr = styled.div`
     width: 30%;
     margin: auto;
     margin-top:5%;
     min-height:150px;
`
 
 
function Signup(){
const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);
 
 
  //let navigate = useNavigate()
 
 
   const handleSignUp =  (username, first_name, last_name, mail, password) => {
       
        console.log('u clicked sign up continue');
        const url = 'https://my-contacts-book-api.herokuapp.com/api/auth/register';
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
                console.log('responsej', response.status);
                if (response.status === 201) {
                    return response.status
                } else {
                    return response.json();
                }
 
            })
            .then((data) => {
                // Enter a valid email address.
                // This email is taken
                //
                console.log('user data', data);
               // if (data === 201) {
                 //   setLoading(true)
                //     setTimeout(() => {
                 //       setLoading(false)
                 //       return navigate('/validation');
 
                 //   }, 6000)
             //   } else {
             //       setError(true)
              //  }
            })
 
    }
 
 
    return(
        <>
 
       
        <div style={{"display":"flex", "flexDirection":"column", "width":"100%", "height":"100vh"}}>
   
 
         <div style={{"flex": "auto"}}>
        <h1>Registration</h1>
        { error === true ?
            <Pr>Something went wrong, please, try again
            {
                <div onClick={()=>{document.location.reload()}}
                style={{'color':'blue', "textDecoration":"underline", "cursor":"pointer"}}>Go back</div>
            }
            </Pr>
    :
        loading === true ?
        <Pr>Thanks for your registration. Our hard working monkeys are preparing a digital message called E-Mail that will be sent to you soon. Since monkeys arent good in writing the message could end up in you junk folder. Our apologies for any inconvienience. Thank for patience.
        </Pr>
        :
        <RegistrationForm handleSignUp={handleSignUp}/>
 }
 
</div>
 
 
  
    </div>
     
   
        </>
    )
}
 
 
export default Signup