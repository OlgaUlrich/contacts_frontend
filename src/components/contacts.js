
import React, {useState, useEffect } from "react";
import styled from "styled-components"
import user from "./assets/user.svg"
    
const Contactswrapper = styled.div`


&:hover .contactsCard{
    cursor: pointer;

}

.contactsCard{
        padding-left: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border: 1px solid rgb(220,220,220);
        text-transform: capitalize;

        span{
            background-color: ${props => props.theme.colorBt};
            width: 3rem;
            height: 3rem;
            border-radius: 1.5rem;
        
        }
        div{
            padding-left: 0.7rem;
        }
        img{
            width: 3rem;
            height: 3rem;
            border-radius: 1.5rem;
            filter: ${props => props.theme.filterSvg};
            

        }
       
    }
 
 `


function Contacts(props) {
const [data, setData] = useState([])



function addDefaultSrc(ev){
    ev.target.src = user
}

    
    const fetchContacts = () => {
        const url = "https://newappcontacts.herokuapp.com/api/contacts/"
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
                setData(data);
                props.setSaved(false)

            })

    }

    useEffect(() => {   
        
        fetchContacts()

 }, [])


 useEffect(() => {   
    if(props.saved===true){
    fetchContacts()
    }

}, [props.saved])

 return (
    <>

     
    


    
    


            <Contactswrapper>
                  
            {Array.from(data).sort(function(a,b){
                if(a.last_name.toLowerCase() < b.last_name.toLowerCase()) { return -1}
                if(a.last_name.toLowerCase() > b.last_name.toLowerCase()) { return 1}
                return 0;
            }).map(item =>{
                return(
                    <div className="contactsCard" key={item.id} onClick={()=>{props.active(item.id)
                                                                                    props.setShowed(false)}} passFunction={()=>fetchContacts}>

                    <span>
                      <img onError={addDefaultSrc} src={item.contact_picture} alt={"user_avatar"}/>
                    </span>

                    

                        <div>{item.first_name} {item.last_name}</div>

                     
                    </div>
                )
            })}
            </Contactswrapper>

    </>

);
}

export default Contacts;