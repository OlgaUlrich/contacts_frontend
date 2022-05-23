import styled, { createGlobalStyle } from "styled-components";


export const colorMain = "#353849"
export const colorSecondMain = "#232734"
export const colorText = "#ffffff"
export const colorAccent = "#03cc90"
export const formColor = "#3f4354"



export const GlobalStyle = createGlobalStyle`


body, html{
    height: 100vh;
    background-color: ${colorMain};
 
}


header{
    height: 80px;
    display:flex;
    justify-content: space-between;

    div{
        display: flex;
        align-items: center;
    }
}


body{
 
    width: 100%;
    margin: 0;
    padding: 0;
}

html{
     margin: 0;
     padding: 0;
     width: 100%;
}

h3{
    font-size: 2rem;
    text-transform: capitalize;
}


input{
    border-radius: 1rem;
}
`


