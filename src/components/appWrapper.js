import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Contacts from './contacts';
import AddContact from './addContact';
import ContactReview from "./contactReview";
import ContactsImg from "./assets/contacts.svg";
import Buttons from "./buttons";
import Ban from "./assets/ban.svg";
import saves from "./assets/save.svg";


 
 
 const Wrapper = styled.div`

 width: 100%;
 display: flex;
 height: 90%;
 background-color: ${props => props.theme.pageBackgroung};
 color: ${props => props.theme.textColor};

 *{
    scrollbar-color: ${props => props.theme.textColor} #ffffff;
}
/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 16px;
}

*::-webkit-scrollbar-track {
  background: #ffffff;
}

*::-webkit-scrollbar-thumb {
  background-color: ${props => props.theme.pageBackgroung};
  border-radius: 10px;
  border: 3px solid #ffffff;
}

.Left{
width: 50%;
display: flex;
height:100%;


.buttonsBlock{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;

    
}
.buttonsBlock.bottom{
    justify-content: center;
    button{
        margin-right: 2rem;
    }
   
}

.ContList{
flex:1;
background-color: rgba(250, 250, 250, 0.5);
border-right: 5px solid  ${props => props.theme.textColor};


overflow: scroll;



}
.DetailedContact{
    flex:2;
    display: flex;
    flex-direction: column;
    background-color: rgba(250, 250, 250, 0.5);
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;

.ModalConfirmation{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-contact: center;
    align-items: center;
    height: 100%;
    padding-top: 3rem;

    .buttonWrapper{
        margin-top: 3rem;
        display: flex;
        width: 60%;
        justify-content: space-between;

        button{
            margin-left: 1rem;
        }
    }

}



    .contactMsg{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

    }

    .contactsImgDiv{
        border-radius: 50%;
        height: 250px;
        width: 250px;
        background-color: ${props => props.theme.colorBt};
        display: flex;
        justify-content: center;
        align-items: center;

    }
    

    img{
        width: 10rem;
        filter: ${props => props.theme.filterSvg};
    }

    form{
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       width: 70%;
       background-color: transparent !important;


     label{
         font-size: 0.8rem;
         padding-bottom; 0;
         margin-bottom: 0;
     }
     

       input{
        height: 3em;
        width: 100%;
        border-style:none;
       
       }
        input:focus {
        outline: none;
        }

       div{
           padding: 0.5rem;
           width: 100%;
        display: flex;
     /*   flex-direction: column !important;
     */
        justify-content: flex-start;
       
       }
    }
}



}

.Right{
    height: 100%;
    width: 50%;
    display: flex;  
    position: relative;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;






    form{
 
    }
   
}

.userReview{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    padding: 2rem;


    .avatarWrapper{
        width: 80% !important;
        display: flex;
        justify-content: flex-end;

        img{
         
            border-radius: 1rem;

        }
       
    span{
        border: 1px solid ${props => props.theme.textColor};
        border-radius: 1rem;
        }
    }

    .avatarWrapperlike{
        width: 80% !important;
        display: flex;
        justify-content: flex-end;

        img{
         
            border-radius: 1rem;

        }
       
    span{
        position: relative;
        border: 1px solid ${props => props.theme.textColor};
        border-radius: 1rem;
    }

    span::before{
        content: "♥";
        position: absolute;
        left: -15px;
        top: -10px;
        font-size:1.7rem;
        width: 2rem;
        height:  2rem;
        border: 1px solid ${props => props.theme.textColor};;
        border-radius: 2rem;
        background-color: #ffffff;
        text-align: center;
        color: #FF6666;
        z-index: 99999;

     


    }
      
      }

      form{
        padding: 0;
        padding-bottom: 2rem;
        .phone{
            width:100%;
            flex-direction:row !important;
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-start;


        
        }
        input{
            width: 100%;
        }
      }
  }

 form{
     min-width: 270px;
     width: 30%;
     padding: 5%;
     background-color: rgba(250, 250, 250, 0.5);
     border-radius: 2em;
  
 
 }

 /* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: ${props => props.theme.colorBt};
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
 
 `
 const ContList = styled.div`

 `


 
function AppWrapper(props){
    const [active, setActive] = useState("text");
    const [contact, setContact] = useState([]);
    const [saved, setSaved] = useState(false);
    const [canceled, setCanceled] = useState(false);
    const [del, setDel] = useState(null);
    const [showed, setShowed] =  useState(false);
    let navigate = useNavigate();




        
        function FetchContact(arg){

            const url = `https://my-contacts-book-api.herokuapp.com/api/contacts/${Number(arg)}`
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
                    setContact(data)
    
                })



        }



        
        function deleteContact(arg){
            setShowed(true);
       
                  const url = `https://my-contacts-book-api.herokuapp.com/api/contacts/${arg}`
                
                  const method = 'DELETE'
                  const token = localStorage.getItem('token');
          
                  const headers = new Headers({
                      authorization: `Bearer ${token}`,
                      "Content-Type": "application/json"
          
                  })
          
                  fetch(url, {
                      method: method,
                      headers: headers,
                  })
                      .then((response) => 
                           response.json()
                      )
                      .then((data) => {
                          console.log(data)
                       setSaved(true);
                     
                   
                    
                      })
                      document.location.reload()
                    
                }
 
        
        function CancelDel(){
            setDel(null)
        }
    

        useEffect(() => {
            FetchContact(active);
          }, [active] )




          useEffect(() => {
              if(canceled===true){
            FetchContact(active);
            setCanceled(false)
              }
          }, [canceled] )

    
          useEffect(() => {
            if(props.log_out===true){
         navigate("/")
         localStorage.removeItem("token")
            }
        }, [props.log_out] )
    
 
    return(
        <>


    
<Wrapper>
    <div className="Left">
        <div className="ContList">

        <Contacts setSaved={setSaved} saved={saved} active={setActive} setShowed={setShowed}/>
    
        </div>

        <div className="DetailedContact">
            {showed === true || contact.length === 0 ?
            <div className="contactMsg">
            <div className="contactsImgDiv">
            <img src={ContactsImg} alt="Contact image" />
            </div>
            <br />
            Choose a contact from the list on the left
            
            </div>
            :

            del !== null?

            <div className="ModalConfirmation">
                Are you sure?
            <div className="buttonWrapper">
                <Buttons iconBt={saves} textBt={"Yes"} passfunction={deleteContact} arg={del}/>
                <Buttons iconBt={Ban} textBt={"No"} passfunction={CancelDel}/>
            </div>

            </div>

            :
      
            <ContactReview cont={contact} setSaved={setSaved} setCanceled={setCanceled} canceled={canceled} 
          del={setDel}/>
            }
        </div>
    </div>

     <div className="Right">

        <AddContact />     

    </div>


      
       
 
</Wrapper>
 
        </>
    )
}
 
 
export default AppWrapper