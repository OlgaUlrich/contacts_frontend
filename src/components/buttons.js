import React from "react";
import styled from 'styled-components';


const But = styled.button`

border-radius: 1rem;
background-color: ${props => props.theme.colorBt};
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
padding: 1rem;

border: none;

color: ${props => props.theme.colorBtTxt};
img{
    width: 1rem !important;
    margin-right:0.5rem;
    filter: ${props => props.theme.filterSvg};
}

`

function Buttons(props){

    return(
        <>
        {props.arg ?

        <But onClick={()=>props.passfunction(props.arg)}>

        <img src={props.iconBt} />
        <span>{props.textBt}</span>


        </But>
        :

        <But onClick={()=>props.passfunction()}>

        <img src={props.iconBt} />
        <span>{props.textBt}</span>


        </But>


        
        
        }
        </>
        

    )

}


export default Buttons