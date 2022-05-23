import React from "react";
import styled from 'styled-components';


const Footer = styled.footer`


background-color: ${props => props.theme.textColor};
color: ${props => props.theme.colorBtTxt};
width: 100%;
height: 10%;
border-top: 5px solid ${props => props.theme.colorBtTxt};
align-self: flex-end;

text{

    padding: 1rem;
}


`

function FooterNav(props){

    return(

<>
       <Footer>
<text>
Created by Olga Ulrich ❤️️
</text>
       </Footer>
        
       </>
    )

}


export default FooterNav