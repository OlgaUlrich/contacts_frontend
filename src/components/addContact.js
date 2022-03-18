import React, {useState} from "react"

import styled from 'styled-components';
import { useFormik } from "formik";
import * as Yup from "yup"
import Input, { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';
import 'react-phone-number-input/style.css';
//import { useNavigate } from "react-router-dom";
 
 
 
const Pr = styled.div`
     width: 20%;
     margin: auto;
     margin-top:5%;
`
 
const Wrapper = styled.div`
    form{
     width: 30%;
     margin: auto;
     margin-top:5%;
 
 
   
 
     .InputWrapper{
         width: 100%;
         color:red;
        input{
    height: 3em;
    width: 100%;
    border-style:none;
    margin-right:10px;
    padding-left:15px;
    margin-top: 1rem;
}
input:focus {
    outline: none;
    }
     }
     .ButtonWrapper{
         display: flex;
         justify-content:center;
         padding-top:3rem;
         button{
         padding: 2rem 5rem 2rem 5rem;
         border-radius:28px;
       
         }
 }
 
 
`
 
 
 
 
 
 
function AddContact(props){
const [err, setError] = useState('');
const [phoneNumber, setPhoneNumber] = useState();
const [country, setCountry] = useState();

const CountrySelect = ({ value, onChange, labels, ...rest }) => (
    <select {...rest} value={value} onChange={(event) => onChange(event.target.value || undefined)}>
      <option value="">{labels.ZZ}</option>
      {getCountries().map((country) => (
        <option key={country} value={country}>
          {labels[country]} +{getCountryCallingCode(country)}
        </option>
      ))}
    </select>
  );

// let navigate = useNavigate()
const [congrats, setCongrats] = useState(false)
 const  { handleSubmit, handleChange, setFieldValue, values, touched, errors }= useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            country_code: '',
            phone_number: '',
            is_favourate: false,
            contact_picture: null,
 
        },
        validationSchema: Yup.object({
            first_name: Yup.string().min(2,  "Length of min first name 2").required('Required'),
            last_name: Yup.string().min(2,  "Length of min last name 2").required('Required'),
            country_code: Yup.string().required('Required'),
            phone_number: Yup.string().required('Required'),


        
           
        }),
        onSubmit: (values, onSubmitProps) =>{
           NewContactRequest(values.first_name, values.last_name, country, values.phone_number, values.is_favourate, values.contact_picture)
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
 
       
        }
    })
 
 
const NewContactRequest = (first_name, last_name, country, phone_number, is_favourate, contact_picture) =>{
    const url = "https://my-contacts-book-api.herokuapp.com/api/contacts/";
        const method = "POST";

        const formData = new FormData();

        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("country_code", country);
        formData.append("phone_number", phone_number);
        formData.append("is_favourate", is_favourate);
        formData.append("contact_picture", contact_picture);

     
        const headers = new Headers({
            authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        const config = {
            method: method,
            body: formData,
            headers: headers,
        };
 
        fetch(url, config)
 
            .then((response) => {
               
                  if (response.status === 200) {
                    return response.json()
                }
                else{
                    return setError(true)
                }
 
               
            })
            .then((data) => {
                localStorage.setItem('token', data.token);
               console.log(data)
                //if(data){
                  //  localStorage.setItem("token", data.access);  
                   // localStorage.setItem("refresh", data.refresh);  
                   // return navigate('/');
                //}  
            })                  
       
    };
 
 
 
    return(
        <>
<div style={{"display":"flex", "flexDirection":"column", "width":"100%", "height":"100vh"}}>
      
        <h1>Login</h1>
    <div style={{"flex": "auto"}}>
            <Wrapper>
 
             {err ?
   
              <Pr>
              No active account found with the given credentials.
            {
                <div onClick={()=>{document.location.reload()}}
                style={{'color':'blue', "textDecoration":"underline", "cursor":"pointer"}}>Go back</div>
            }
            </Pr>
   
    :
        <form onSubmit={handleSubmit}>
          <div className="InputWrapper">
        <input type="text" value={values.first_name} placeholder="First name" onChange={handleChange} name="first_name"/>
        {touched.first_name && errors.first_name ? (
            <div>{errors.first_name}</div>
        ):null}
        </div>
 
        <div className="InputWrapper">
        <input type="text" value={values.last_name} placeholder="Last name" onChange={handleChange} name="last_name"/>
        {touched.last_name && errors.last_name ? (
            <div>{errors.last_name}</div>
        ):null}
        </div>

        <div className="InputWrapper">
        <input type="text" value={values.country_code} placeholder="Country code" onChange={handleChange} name="country_code"/>
        {touched.country_code && errors.country_code ? (
            <div>{errors.country_code}</div>
        ):null}
        </div>

        <div className="InputWrapper">
        <input type="text" value={values.phone_number} placeholder="Phone number" onChange={handleChange} name="phone_number"/>
        {touched.phone_number && errors.phone_number ? (
            <div>{errors.phone_number}</div>
        ):null}



<div>
      <label htmlFor="countrySelect">Country Select</label>
      <CountrySelect labels={en} value={country} onChange={setCountry} name="countrySelect" />
    </div>
    <div>
      <label htmlFor="phoneNumber">Phone Number</label>
      <Input country={country} value={phoneNumber} onChange={setPhoneNumber} placeholder="Enter phone number" name="phoneNumber" />
    </div>

<h2>{country} hjbjhg</h2>
        </div>


        <div className="InputWrapper">
        <input type="text" value={values.is_favourate} placeholder="Is favourate" onChange={handleChange} name="is_favourate"/>
        {touched.is_favourate && errors.is_favourate ? (
            <div>{errors.is_favourate}</div>
        ):null}
        </div>

        <label for="inp">

               
                <div style={{"display":"flex", "justifyContent":"flex-end", "alignContent":"center", "paddingRight":"5%"}}>
                <input style={{"display":"none"}} type="file" id="inp" onChange={(event) => {setFieldValue("contact_picture", event.currentTarget.files[0])
                                                                                                console.log(event.currentTarget.files[0])
                                                                                                console.log('kiri?', values.contact_picture)
                                                                                            }} 
                                                                                                 />
                  <div className="labelText"> Add Avatar </div> 
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="image" class="svg-inline--fa fa-image fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"></path></svg>
                </div> 
               </label>
 
        <div  className="ButtonWrapper">
        <button> Log in
           </button>
        </div>
 
        </form>
    }
    </Wrapper>
    </div>
 
 
  
 
</div>
 
        </>
    )
}
 
 
export default AddContact