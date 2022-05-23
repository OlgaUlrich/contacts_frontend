import React, {useState, useEffect, useLayoutEffect} from "react"
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Login from "./LoginForm";
import Signup from "./register";
import Buttons from "./buttons";
import save from "./assets/save.svg";
import logout from "./assets/logout.svg";
import hello from "./assets/hello.svg";
 
const MainWrap = styled.div`
width: 100%;
height: 100%;
display: flex;
background-color: #252525;


.rightNav{
    background-image: url("./assets/bg.jpeg");
    background-repeat: no-repeat;
    background-position: center; 
    background-color: #fff;
    height:100%;
   width:70%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    display: flex;

    .question{
        background-color: rgba(242, 241, 239, 0.5);
        height: 100%;
        position: relative;

    div{
          padding: 2rem;
    }
    }
}
.leftNav{
    background-color: rgba(242, 241, 239, 0.5);
    width:30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;


    form{
      width:100%;
    }

  h1{
    text-align:center;
  }
    
    button{
        width: 200px !important;
        height: 40px !important;
    }
}

}

`
 
 
 
 
function Authentication(props){
const [err, setError] = useState('');
const [form, setForm] = useState('login');
const [useCred, setUseCred] = useState(false)

let navigate = useNavigate();   
let name = "olga"
let pass = "Q1q1q1qwe%"


useEffect(() => {
   if(localStorage.getItem('token')){
    return navigate("/app");
  }

  }, [localStorage.getItem('token')]);

 
 
 
    return(
       



      
   <> 
<MainWrap> 
<div className="leftNav">
  {
      form === "login"
    
      ?
    <Login useCred={useCred} name={name} pass={pass} existSet={props.existSet}/>

      :
 

      form === "registrate"

      ?
    <Signup />

      :

      <></>

  }
  
 </div>


<div className="rightNav">
{
    form === "login" ?

   <>
    <div className="question">
<div>
  Don't want to registrate?
  <br/>
  <br/>
  Just use ready credentials.
  <br/>
  <br/>
  <Buttons textBt="Use" iconBt={save} passfunction={setUseCred} arg={Boolean(true)} >  </Buttons>
  <br/>
  <br/>
  or
  <br/> 
  <br/>
  <br/>
  <Buttons textBt="Registration" iconBt={logout} passfunction={setForm} arg="registrate"></Buttons>
  </div>

    </div>


   </>
   :
   <div className="question">
     <div>
     Do you already have an account?
     <br/>
  <br/>
   <Buttons textBt="Login" iconBt={hello} passfunction={setForm} arg='login'></Buttons>
    </div>
  </div>

}
  
</div>
 
 </MainWrap>



 </>
      
    )
}
 
 
export default Authentication