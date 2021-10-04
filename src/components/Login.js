import axios from 'axios'
import{useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import form from './Images/login2.jpg'

export default function Login(props)



{
    let{register,handleSubmit,formState:{errors}}=useForm()
    let history=useHistory()

    const FormSubmit=(credentials)=>
    {
          
    axios.post('/user/login',credentials)
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
        //props.setWishStatus(true)
         
         console.log(res.data)        
         history.push(`/home`)
         }
         //if login failed
         else
         {
             alert(responseObj.message)
         }
     })
     }                  
 
    return(
        <div className="row">
            <div className="col-md-6">
            <img src={form} alt="" className="mt-5 ms-5 float-end" width="400" height="400"/>
            </div>

        <div className="col-md-6">    
        <form className="inputs w-75 mx-auto" onSubmit={handleSubmit(FormSubmit)}>

            <h2 className="mt-5">DO YOU HAVE AN ACCOUNT?</h2>


            {/* username */}
            <label htmlFor="un" className="mt-3">Username</label>
            <input type="text" id="un" {...register('username',{required:true,minLength:5})} className="form-control mb-3 rounded-pill" />
            {/*username validation */}
            {errors.username?.type=== 'required' && <p className="text-danger">*Username is required</p>}
            {errors.username?.type=== 'minLength' && <p className="text-danger">*Min-Length should be 5</p>}

            {/* password */}
            <label htmlFor="pw">Password</label>
            <input type="password" id="pw" {...register('password',{required:true})} className="form-control mb-3 rounded-pill" />
            {/*password validation */}
            {errors.password && <p className="text-danger">*Password is required</p>}

            <button type="submit" className="btnr btn-primary rounded-pill w-100" >Login</button>
            <div>
              <Link className="" to="/register"><button  className="btnr btnr-outline-info rounded-pill w-100 mt-3">SignUp</button></Link>

            </div>
            
        </form>
        </div>
        </div>
        
    )
}
