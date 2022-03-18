
import React, {useState, useEffect } from "react";


import styled from "styled-components"

import { useNavigate } from "react-router-dom";
    
    
function Contacts() {
const [data, setData] = useState([])
    
    const fetchPosts = () => {
        const url = "https://my-contacts-book-api.herokuapp.com/api/contacts/"
        const method = 'GET'

        const token = localStorage.getItem('token');

        const headers = new Headers({
            authorization: `Bearer ${token}`

        })

        fetch(url, {
            method,
            headers: headers,
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log('janzuhjgjhgjh', data);
                setData(data)

            })

    }

    useEffect(() => {   
        
        fetchPosts()

 }, [])

 return (
    <>

     
    


    
    


            <div>
                
{Array.from(data).map(item =>{
    return(
        <div key={item.id}>
        
            <span style={{'color': 'red'}}>{item.id}</span>
            <span>{data[0].country_code}</span>
            <span>{item.phone_number}</span>
            <span>{item.first_name}</span>
            <span>{item.last_name}</span>
            <span>{item.is_favourate}</span>
            <span>  <img src={item.contact_picture} alt='' width="60px" /></span>
        </div>
    )
})}
            </div>

    </>

);
}

export default Contacts;