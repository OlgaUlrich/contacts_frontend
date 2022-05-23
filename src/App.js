import './App.css';
import DarkModeToggle from "react-dark-mode-toggle";
import Logout from "./components/assets/logout.svg";
import Add from "./components/assets/add.svg";
import { GlobalStyle } from "./GlobalStyle";
import styled, { ThemeProvider } from "styled-components"
import React, {useState, useEffect} from 'react';
import AppWrapper from './components/appWrapper';
import Signup from './components/register';
import Authentication from './components/authentication';
import FooterNav from './components/Footer';
import HeaderNav from './components/Header';

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

const Header = styled.header`
     background-color: ${props => props.theme.textColor};
     display:flex;
     padding-left: 2rem;
     padding-right: 2rem;
     padding-top:1rem;
     padding-bottom:1rem;
     img{
         width: 3rem;
         height: 3rem;
         filter: ${props => props.theme.filterSvg};
     }
     .addContactBt{
     transform: rotate(0deg);
       transition: transform 2s;
     
       
     }
     
     .logoutBt{
         transform: rotate(180deg);
         margin-right: 1rem;
     }
     
     .addContactBt.turned{
         transform: rotate(45deg);
     }

 `
 


function App() {
  const [theme, setTheme] = useState("light")
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  const [log_out, setLogOut] = useState(false)
  const [shH, setShH] = useState(null)

  const lightTheme = {
    pageBackgroung: "rgba(238,242,247,255)",
    textColor: "rgba(43,108,176,255)",
    colorBt: "rgba(43,108,176,255)",
    filterSvg: "invert(1.2) sepia(1.2) saturate(2) hue-rotate(185deg)",
    colorBtTxt: "rgba(227,229,255,255)"
  
  }
  
  const darkTheme = {
    pageBackgroung: "rgba(39,48,64,255)",
    textColor: "white",
    colorBt: "rgba(129,230,217,255)",
    filterSvg: "invert(0.1) sepia(0.1) saturate(0) hue-rotate(0)",
    colorBtTxt: "rgba(45,55,72,255)"
  }
  
  const themes = {
    light: lightTheme,
    dark: darkTheme,
  }

  useEffect(
    () => {
            if (isDarkMode === false){
            setTheme('light');
            localStorage.setItem('theme', 'light');
            } else if(isDarkMode === true){
            setTheme('dark');
                localStorage.setItem('theme', 'dark');
            } 
    
        }
    )


    useEffect(
      () => {
              if (localStorage.getItem('token')===null){
             setShH(false)
              } else{
                setShH(true)
              } 
      
          },
          [localStorage.getItem('token')]
      )


    function showAddForm(){
      const container = document.querySelector(".form-initial");
      container.classList.toggle("show");
      const btn = document.querySelector(".addContactBt");
      btn.classList.toggle("turned");
    }

  
  return (
    <div className="App">
    
    <GlobalStyle />
    <BrowserRouter>
    <ThemeProvider theme={themes[theme]} >

 
<HeaderNav existSet={setShH} exist={shH} setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}></HeaderNav>

    
   {console.log("ssh", shH)}
    
       <Routes>
          <Route path='/' element={<Authentication theme={theme} settheme={setTheme} existSet={setShH}/>} exact/>
          <Route path='/register' element={<Signup theme={theme} settheme={setTheme}/>} exact/>
          <Route path='/app' element={<AppWrapper theme={theme} settheme={setTheme} log_out={log_out}/>} exact/>
       </Routes>






       <FooterNav/>
    </ThemeProvider>



    </ BrowserRouter>




    </div>
  );
}

export default App;
