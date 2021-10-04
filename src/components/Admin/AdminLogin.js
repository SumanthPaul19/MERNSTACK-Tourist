import React, { useState } from 'react'
import{useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import {FaUserCog} from 'react-icons/fa'

export default function AdminLogin(props)
{



    let{register,handleSubmit,formState:{errors}}=useForm()
    let history=useHistory()
    const onFormSubmit=(credentials)=>
    {
          
    axios.post('/admin/adminlogin',credentials)
    .then(res=>
     {
         let responseObj=res.data;
 
         //if login success
         if(responseObj.message==="Login success")
          { 
         //save token to browsers's local memory
         localStorage.setItem('token',responseObj.token);
         localStorage.setItem('username',responseObj.username);
        //will have entire obj to give it to userProf
         localStorage.setItem('user',JSON.stringify(responseObj.userObj));
         
         //localstorrage predefined object
         
         //update state
         props.setUserStatus(true)
         
         console.log(res.data)        
         history.push(`/adminbody`)//when using url parameter
         }
         //if login failed
         else
         {
             alert(responseObj.message)
         }
     })
     }                  
 
    return(
        <div className="adminlogin">
        <div  className="form1 border border-sm rounded w-75 mx-auto m-3">
        <h1 className="hf text-center m-2" style={{fontFamily:'PT Sans Narrow'}}><FaUserCog size="40px" /><strong>Sign in</strong></h1>
        
        <form  className="inputs w-50 mx-auto mt-3" onSubmit={handleSubmit(onFormSubmit)}>    
         <br />
 
        {/* username */}
        <label htmlFor="un" className="lb1">Username</label>
        <input type="text" id="un" {...register('username',{required:true,minLength:4})} className="form-control mb-3"/>
        {/* username validation */}
         {errors.username?.type==='required' && <p className="text-danger">*Username is required</p>}
         {errors.username?.type==='minLength' && <p className="text-danger">*Minimum length should be 4</p>}
 
         {/* password */}
        <label htmlFor="pw" className="lb1">Password</label>
        <input type="password" id="pw" {...register('password',{required:true})} className="form-control mb-3"/>
         {/* password validation */}
         {errors.password && <p className="text-danger">*Password is required</p>}
          
         <button type="submit" className="btnr btnr-outline-info d-block mx-auto text-white mb-3">Login</button>
 
         </form> 
         </div>
         </div>
    )
}