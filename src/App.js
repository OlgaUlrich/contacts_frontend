import logo from './logo.svg';
import './App.css';

import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components"
import React, {useState} from 'react';
import AppWrapper from './components/appWrapper';
import Signup from './components/register';
import Login from './components/authentication';
import AddContact from './components/addContact';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  const [theme, setTheme] = useState("light")

  const lightTheme = {
    pageBackgroung: "pink",
    textColor: "blue"
  
  }
  
  const darkTheme = {
    pageBackgroung: "black",
    textColor: "white"
  
  }
  
  const themes = {
    light: lightTheme,
    dark: darkTheme,
  }
  
  return (
    <div className="App">
    
    <GlobalStyle />
    <BrowserRouter>
    <ThemeProvider theme={themes[theme]} >
 
    
       <Routes>
          <Route path='/' element={<Login theme={theme} settheme={setTheme}/>} exact/>
          <Route path='/register' element={<Signup theme={theme} settheme={setTheme}/>} exact/>
          <Route path='/app' element={<AppWrapper theme={theme} settheme={setTheme}/>} exact/>
       </Routes>

    </ThemeProvider>



    </ BrowserRouter>
    </div>
  );
}

export default App;
