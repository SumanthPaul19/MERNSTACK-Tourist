import React, { useState,useEffect } from 'react'
import axios from 'axios'



 
export default function AdminProfile(){
   
 let [user,setUser]=useState();
 useEffect(()=>{
    axios.get('/user/getusers')
    .then(res=>{
        let userObj=res.data
        setUser([...userObj.message])
    })
    
},[user])
 
const DeleteUser=(prdObj)=>{
   
     // Make Req to Delete item from cart
     axios.delete(`/user/deleteuser/${prdObj.username}`)
     .then(res=>{
         alert(res.data.message)
        // setCartMonitor(3)
        // setPageMonitor(pageMonitor+1)
     })
     .catch(err=>console.log(err))
    
  }
 
    return(
 
           
        <div className="usermanagement">
            <h1 className="text-center">User Management</h1>
        {
        user &&
        <table className="table table-bordered text-center w-75 mx-auto mt-5">
            <thead className="bg-dark">
                <th className="text-light">Name</th>
                <th className="text-light">Mail</th>
                <th className="text-light">image</th>
                <th className="text-light">Delete</th>
            </thead>
            <tbody className="bg-light">
                {user &&
                    user.map((userobj,index)=>{
                        return <tr>
                            <td>{userobj.username}</td>
                            <td>{userobj.mail}</td>
                            <td>
                                <img src={userobj.profileImage} width="60px" alt=""/>
                            </td>
                            <td><button className="btn btn-danger" onClick={()=>{DeleteUser(userobj)}}>X</button></td>
                        </tr>
                    })
                }
            </tbody>
        </table>
        
            }
    </div>
    )
}