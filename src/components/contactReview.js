import React, { useState, useEffect } from "react";
import Buttons from "./buttons";
import deletes from "./assets/delete.svg";
import edits from "./assets/edit.svg";
import saves from "./assets/save.svg";
import Ban from "./assets/ban.svg";
import user from "./assets/user.svg";


function ContactReview(props){
const [error, setError] = useState(false)
const [id, setId] = useState('')
const [first_name, setFirst_name] = useState('')
const [last_name, setLast_name] = useState('')
const [is_favourate, setIs_favourite] = useState('')
const [country_code, setCountry_code] = useState('')
const [phone_number, setPhone_number] = useState('')
const [abled, setAbled] = useState(false)
const [conf, setConf] = useState(false)

const [contact_picture, setContact_picture] = useState('')


useEffect(() => {
    if(props.cont){
        setFirst_name(props.cont.first_name)
        setLast_name(props.cont.last_name)
        setIs_favourite(props.cont.is_favourate)
        setCountry_code(props.cont.country_code)
        setPhone_number(props.cont.phone_number)
        setContact_picture(props.cont.contact_picture)
        setId(props.cont.id)

    }
    else{
        setFirst_name('no data')
        setLast_name('no data')
        setIs_favourite('no data')
        setPhone_number('no data')
        setContact_picture('no data')
        setId('no data')

    }
   
  }, [props.cont]);

  useEffect(() => {
    if(abled===true){
        props.setCanceled(true)
    }  
  }, [props.cont]);
  

  useEffect(() => {
    if(props.deleting===true){
        console.log("id", props.cont.id)
       deleteContact(props.cont.id)
    }  
  }, [props.deleting]);

  useEffect(() => {
    if(props.deleteConfirmation===true){
       setConf(true)
    }  
  }, [props.deleteConfirmation]);





  function checker(numId){
    if(!numId.hasAttribute('checked')){
        numId.setAttribute('checked')
        setIs_favourite(true)
    }
    else{
        numId.removeAttribute('checked')
        setIs_favourite(false)
    }
  }


    function able(){
        let inputs = document.querySelectorAll('.inp')
        for (const inp of inputs) {
            inp.removeAttribute('disabled');
          }

        setAbled(true)
    }

    function save(){
        let inputs = document.querySelectorAll('.inp')

        props.setSaved(true)
    
        for (const inp of inputs) {
            inp.setAttribute('disabled', '');
          }
        
        
          
    }


    function cancelbt(){
        save()
        props.setCanceled(true)
        setAbled(false)   

    }



    function deleteContact(arg){
     

      props.setDeleted(true)
     
      if(conf === true){
     
            const url = `https://my-contacts-book-api.herokuapp.com/api/contacts/${arg}`
            const method = 'DELETE'
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
                .then(() => {
                    save();
                    props.setDeleted(false);
                 
                  

    
                })

            }

            
      



    }


    function addDefaultSrc(ev){
        ev.target.src = user
    }

    function setter(arg){
        props.del(arg)
    }
 

    function editContact(arg){

        const url = `https://my-contacts-book-api.herokuapp.com/api/contacts/${arg}`;
        const method = "PATCH";

        const formData = new FormData();
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("country_code", country_code);
        formData.append("phone_number", phone_number);
        formData.append("is_favourate", is_favourate);
        const token = localStorage.getItem('token');
        const headers = new Headers({
            authorization: `Bearer ${token}`

        })

        const config = {
            method: method,
            body: formData,
            headers: headers,
        };
 
        fetch(url, config)
 
            .then((response) => {
               
                  if (response.status === 200) {
                    save()
                    return response.json()
                      
                }
                else{
                    return setError(true)
                }
 
               
            })
                   
    }
    

return(
<div className="userReview">
<div className="buttonsBlock">
 
   
<Buttons iconBt={edits} textBt="Edit" passfunction={able} />
<Buttons iconBt={deletes} textBt={"Delete"} passfunction={setter} arg={id}/>

</div>

{console.log("deletConf", props.deleteConfirmation)}

<h3>{first_name} {last_name}</h3>

{

    is_favourate===true ?
<div className="avatarWrapperlike">
   <span> <img onError={addDefaultSrc} src={contact_picture} alt={"user_avatar"}/></span> 
</div>

    :
<div className="avatarWrapper">
   <span> <img onError={addDefaultSrc} src={contact_picture} alt={"user_avatar"}/></span> 
</div>
    
}


  
<form>


    <div>
    <label for="fname">First name</label>  <input id="fname" className="inp" type="text" value={first_name} onChange={e => setFirst_name(e.target.value)} disabled ></input>
    </div>
    <div>
    <label for="lname">Last name</label>  <input id="lname" className="inp" type="text" value={last_name} onChange={e => setLast_name(e.target.value)} disabled ></input>
    </div>

    <div className="phone">
    <label  style={{"display":"flex", "flexDirection":"column", "marginRight":"1rem", "width":"10%"}} for="code">Code:<input style={{"width":"100%"}} id="code" className="inp" type="text" value={country_code} onChange={e => setCountry_code(e.target.value.replace(/\D/g, ''))} disabled ></input></label> 
    <label style={{"display":"flex", "flexDirection":"column", "width":"85%"}} for="phoneNum">Phone number:<input tyle={{"width":"100%"}}  id="phoneNum" className="inp" type="text" value={phone_number} onChange={e => setPhone_number(e.target.value.replace(/\D/g, ''))} disabled ></input></label> 
    </div>


    <div>
    <label style={{"display":"flex", "flexDirection":"column"}} for={`chb${id}`}>Favourite:
            <label class="switch">
            <input id={`chb${id}`} type="checkbox" className="inp"  checked={is_favourate}
            onChange={e => setIs_favourite(!is_favourate)} disabled></input>
            <span class="slider round"></span>
    </label>
    </label>
    </div>
   
</form>

<>

{
    abled===true ?

        <div className="buttonsBlock bottom">
    <Buttons iconBt={Ban} textBt={"Cancel"} passfunction={cancelbt}/>
    <Buttons iconBt={saves} textBt={"Save"} passfunction={editContact} arg={(props.cont.id)}/>
        </div>

    :

    <></>


}

</>
          
</div>




)

}


export default ContactReview