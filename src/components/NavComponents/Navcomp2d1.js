import React from 'react'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
export default function TravelStories(){
    let history=useHistory();   
    const {register,handleSubmit,formState:{errors}}=useForm();

    const onFormSubmit=(userObj)=>{
        axios.post('/user/contactus',userObj)
        .then(res=>{
            console.log(res.data)
            alert(res.data.message)
        })
        
    }
    return(
        <div className="contactus mb-3">
           
            <div>
            <h1 className="text-center text-warning ">Contact Us</h1>
                <form className="inputs w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
                    {/* username */}
                    <label htmlFor="un" className="mt-3">Username</label>
                    <input type="text" id="un" {...register('username',{required:true,minLength:5})} className="form-control mb-3 rounded-pill" />
                    {/*username validation */}
                    {errors.username?.type=== 'required' && <p className="text-danger">*Username is required</p>}
                    {errors.username?.type=== 'minLength' && <p className="text-danger">*Min-Length should be 5</p>}

                    {/* email */}
                    <label htmlFor="e">Email</label>
                    <input type="mail" id="e" {...register('mail',{required:true})} className="form-control mb-3 rounded-pill" />
                    {/*password validation */}
                    {errors.mail && <p className="text-danger">*Enter email</p>}

                    <label htmlFor="q">Drop Your Queries Here...</label>
                    <textarea  id="q" {...register('question',{required:true})} className="form-control mb-3 rounded-pill" />
                    {/*password validation */}
                    {errors.question && <p className="text-danger">*Enter Your Queries</p>}


                    <button type="submit" className="btnr btn-outline-success text-white rounded-pill w-100 mb-3">Submit</button>
                    </form>
           </div>
        
        </div>
    
               
    )
}








