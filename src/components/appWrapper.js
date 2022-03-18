import React, {useState} from "react"

import styled from 'styled-components';
import { useFormik } from "formik";
import * as Yup from "yup"
//import { useNavigate } from "react-router-dom"
import Login from './authentication';
import Signup from './register';
import Contacts from './contacts';
import AddContact from './addContact';
import DarkModeToggle from "react-dark-mode-toggle";
 
 
 const Wrapper = styled.div`
 background-color: ${props => props.theme.pageBackgroung};
 color: ${props => props.theme.textColor};


 form{
     min-width: 270px;
     width: 30%;
     padding: 5%;
     background-color: rgba(250, 250, 250, 0.5);
     border-radius: 2em;

     button {
        position: relative;
        display: inline-block;
        margin: 15px;
        padding: 15px 30px;
        text-align: center;
        font-size: 18px;
        letter-spacing: 1px;
        text-decoration: none;
        color: #725AC1;
        background: transparent;
        cursor: pointer;
        transition: ease-out 0.5s;
        border-radius: 30px;
        border: 2px solid #725AC1;
        border-radius: 10px;
        box-shadow: inset 0 0 0 0 #725AC1;
       }
       
       button:hover {
        color: white;
        box-shadow: inset 0 -100px 0 0 #725AC1;
       }
       
       button:active {
        transform: scale(0.9);
       }
 }
 
 `
 
 
function AppWrapper(props){
    const [isDarkMode, setIsDarkMode] = useState(() => false);
    

        if (isDarkMode === false){
            props.settheme('light');
        } else if(isDarkMode === true){
            props.settheme('dark')
        }
        
    

 
 
 
    return(
        <>
<DarkModeToggle
      onChange={setIsDarkMode}
      checked={isDarkMode}
      size={80}
    />
    
<Wrapper>

      <AddContact />
      <Contacts />
       
 
</Wrapper>
 
        </>
    )
}
 
 
export default AppWrapper