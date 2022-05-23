import React, {useState} from "react";
import styled from 'styled-components';
import DarkModeToggle from "react-dark-mode-toggle";
import Logout from "./assets/logout.svg";
import Add from "./assets/add.svg";
import { useNavigate } from "react-router-dom";


const Header = styled.header`
     background-color: ${props => props.theme.textColor};
     display:flex;
     padding-left: 2rem;
     padding-right: 2rem;
     padding-top:1rem;
     padding-bottom:1rem;
     height: 50px;
     img{
         width: 3rem;
         height: 3rem;
         filter: ${props => props.theme.filterSvg};
     }
     .addContactBt{
     transform: rotate(0deg);
       transition: transform 2s;
       cursor: pointer;
     
       
     }
     
     .logoutBt{
         transform: rotate(180deg);
         margin-right: 1rem;
         cursor: pointer;
     }
     
     .addContactBt.turned{
         transform: rotate(45deg);
     }

 `


function HeaderNav(props){
    let navigate = useNavigate();   
    function setLogOut(){
        localStorage.removeItem("token")
        props.existSet(false)
        navigate("/");
    }

    function showAddForm(){
        const container = document.querySelector(".form-initial");
        container.classList.toggle("show");
        const btn = document.querySelector(".addContactBt");
        btn.classList.toggle("turned");
    }

    return(
props.exist 
?
<> 
<Header>

<div className="logoutBt" >
<img src={Logout} alt="logout_Icon" onClick={()=>setLogOut()}/>
</div>

<DarkModeToggle
onChange={props.setIsDarkMode}
checked={props.isDarkMode}
size={80}
/>

<div className="addContactBt" onClick={showAddForm}> 
<img src={Add} alt="add_Icon" />

</div>

</Header>

</>
       :
       <>
       
       
       
       </>
    )

}


export default HeaderNav