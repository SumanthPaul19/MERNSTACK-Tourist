import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Customercare(){

    let[contactobj,setContactobj]=useState([])

    useEffect(()=>{
        axios.get(`/admin/getcontact`)
        .then(res=>{ 
        setContactobj([...res.data.message])
           
        })
        .catch(err=>console.log(err.message))
    },[])

console.log(contactobj)

    return(
        <div>
        {
        contactobj.length !== 0 ?

       <div className="row"> 

                {
                contactobj.map((Obj,ind)=>{
                    
                return(
                   
                    <div className="col-md-3 col-sm-3 col-lg-3 mt-3 me-3">
                    <div className="customercare card mb-4" >
                    <div className="card-body">
                        <p ><strong>Name:</strong>{Obj.username}</p>
                        <p ><strong>Email:</strong>{Obj.mail}</p>
                        <p ><strong>Questions:</strong>{Obj.question}</p>
                    </div>
                    </div>
                    </div>
                   
                )
            })
            }
       </div> :<p>Questions here?</p>
        }
       </div>  
    )
}