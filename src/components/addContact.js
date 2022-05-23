import React, {useState, useEffect} from "react"
import styled from 'styled-components';
import { useFormik, Field } from "formik";
import * as Yup from "yup";
import Buttons from "./buttons";
import save from "./assets/add.svg"

 
 
 
const Pr = styled.div`

     margin: auto;
     margin-top:5%;
`
 
const Wrapper = styled.div`
width: 100%;
display: flex;


.form-initial{
   position: fixed;
   top: 100px;
 

   right: -500px;
   width: 0px;

   transition: width 3s, right 3s;
}

form.form-initial.show{
     
    right: 0px;
    width: 500px;


    
}

    form{
        .fav{
            margin-top: 1rem;
            display: flex;
            justify-content: flrx-start;
            align-items: center;
        }
 
        svg{
            width: 4rem;
            color: ${props => props.theme.colorBt};
        }
   
 
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
const [err, setError] = useState(false);
const [fav, setFav] = useState(false);
const [isFavourite, setIs_favourite]= useState(false)


useEffect(() => {
    console.log('isFavourite', isFavourite)
  }, [isFavourite] )




 const  { handleSubmit, handleChange, setFieldValue, values, touched, errors }= useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            country_code: '',
            phone_number: '',
            is_favourate: isFavourite,
            contact_picture: null,
 
        },
        validationSchema: Yup.object({
            first_name: Yup.string().min(2,  "Length of min first name 2").max(40, "Length of max first name 40").required('Required'),
            last_name: Yup.string().min(2,  "Length of min last name 2").max(40, "Length of max last name 40").required('Required'),
            country_code: Yup.number().typeError('you must specify a number').required('Required'),
            phone_number: Yup.number().typeError('you must specify a number').required('Required'),


        
           
        }),
        onSubmit: (values, onSubmitProps) =>{
           NewContactRequest(values.first_name, values.last_name, values.country_code, values.phone_number, values.is_favourate, values.contact_picture)
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
       
        }
    })
 
 
const NewContactRequest = (first_name, last_name, country_code, phone_number, is_favourate, contact_picture) =>{
    const url = "https://my-contacts-book-api.herokuapp.com/api/contacts/";
        const method = "POST";

        const formData = new FormData();

        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("country_code", country_code);
        formData.append("phone_number", phone_number);
        formData.append("is_favourate", isFavourite);
        formData.append("contact_picture", contact_picture);

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
               
                  if (response.status === 201) {
                  return  document.location.reload()
                }
                else{
                    return setError(true)
                }
 
               
            })
                   
       
    };
 
 
 
    return(

            <Wrapper>
 
             {err ?
   
              <Pr>
             Try again, please.
            {
                <div onClick={()=>{document.location.reload()}}
                style={{'color':'blue', "textDecoration":"underline", "cursor":"pointer"}}>Go back</div>
            }
            </Pr>
   
    :
        <form onSubmit={handleSubmit} className="form-initial">
            <h2>Add new contact</h2>
          <div className="InputWrapper">
        <input type="text" value={values.first_name} placeholder="*First name" onChange={handleChange} name="first_name"/>
        {touched.first_name && errors.first_name ? (
            <div>{errors.first_name}</div>
        ):null}
        </div>
 
        <div className="InputWrapper">
        <input type="text" value={values.last_name} placeholder="*Last name" onChange={handleChange} name="last_name"/>
        {touched.last_name && errors.last_name ? (
            <div>{errors.last_name}</div>
        ):null}
        </div>

        <div className="InputWrapper">
        <input type="text" value={values.country_code} placeholder="*Country code" onChange={ev=>{setFieldValue("country_code",ev.target.value.replace(/\D/g, '')) }}  name="country_code"/>
        {touched.country_code && errors.country_code ? (
            <div>{errors.country_code}</div>
        ):null}
        </div>

        <div className="InputWrapper">
        <input type="text" value={values.phone_number} placeholder="*Phone number" onChange={ev=>{setFieldValue("phone_number",ev.target.value.replace(/\D/g, '')) }} name="phone_number"/>
        {touched.phone_number && errors.phone_number ? (
            <div>{errors.phone_number}</div>
        ):null}


        </div>

    <div className="fav">
    <label for="fav" style={{"display":"flex", "flexDirection":"column"}}>Favourite:
            <label class="switch">
            <input id="fav" type="checkbox" className="inp"  checked={isFavourite}
              onChange={e => setIs_favourite(!isFavourite)}  ></input>
           
            <span class="slider round"></span>
            </label>
    </label>
    </div>

        <label for="inp">

               
                <div style={{"display":"flex", "justifyContent":"flex-end", "alignContent":"center"}}>
                <input style={{"display":"none"}} type="file" id="inp" onChange={(event) => {setFieldValue("contact_picture", event.currentTarget.files[0])
                                                                                                console.log(event.currentTarget.files[0])
                                                                                                console.log('kiri?', values.contact_picture)
                                                                                            }} 
                                                                                                 />
                  <div className="labelText" style={{"display":"flex", "flexDirection":"column"}}> 
                  <span>* Add Avatar </span>
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="image" class="svg-inline--fa fa-image fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"></path></svg>
                  </div> 
                </div> 
               </label>
    

        <span>
            * Fields should be filled
        </span>
 
        <div  className="ButtonWrapper">
        <Buttons iconBt={save} textBt="Add"> 
           </Buttons>
        </div>
 
        </form>
    }
    </Wrapper>

    )
}
 
 
export default AddContact