import  { useEffect, useState } from 'react';
import {  useParams} from 'react-router-dom';


export default function UserProfile(){

    let url=useParams();
    let username=url.username;
    let[userObj,setUserObj]=useState({});

    useEffect(()=>{
        let userObj=JSON.parse(localStorage.getItem("user"))
        setUserObj({...userObj})
    },[username])

    return(
        <div className="container">
            <div className="cardpd mt-5 mb-5">
                <div className="row row-cols-1">
                    <div className="col-md-4">
                        <img src={userObj.profileImage}  className="img-fluid rounded-start w-100 h-100"  alt=""/>
                    </div>
                    <div className="col-md-8 d-block">
                        <div className="card-body">
                            <ul className="list-unstyled">
                                <h2  className="text-center">User Details</h2><hr className="bg-danger"/>
                                <li className=""><h6 className=""><strong>NAME</strong>: {userObj.username}</h6></li>
                                <li className=""><h6 className=""><strong>EMAIL</strong>: {userObj.mail}</h6></li>
                                <li className=""><h6 className=""><strong>Date Of Birth</strong>: {userObj.dob}</h6></li>  
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


