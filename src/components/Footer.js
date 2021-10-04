import React from 'react'
import Spons from './Images/p.PNG'
import end from './Images/end.PNG'

export default function(){
    return(
        <div className="container mt-5">
            <h1 className="head-1 text-center">Our Partners</h1> <hr className="bg-danger"/>
           <a className="" href="#" ><img src={Spons} alt="" width="100%"/></a>

           {/* Horizontal card */}
           <div className="card container mt-5" >
                        <div className="row">
                            <div className="col-md-3">
                                <h6 className="text-dark mt-2 al1 ms-3"><strong>ABOUT</strong></h6>
                                <ul className="list-unstyled ms-3">
                                    <li className="mb-2 ">
                                        <a href="#" className="text-dark">We are Hiring</a>
                                        </li>
                                        <li className="mb-2">
                                        <a href="#" className="text-dark">Thrillex Reviews</a>
                                        </li>
                                        <li className="mb-2">
                                        <a href="#" className="text-dark">Terms & Conditions</a>
                                        </li>
                                        <li className="mb-2">
                                        <a href="#" className="text-dark">Privacy Policies</a>
                                        </li>
                                        <li className="mb-2">
                                        <a href="#" className="text-dark">Copyright Policies</a>
                                        </li>
                                        <li className="mb-2">
                                        <a href="#" className="text-dark">Support</a>
                                        </li>
                                    </ul>
                            </div>
                            <div className="col-md-3">
                                <h6 className="text-dark mt-2 al1"><strong> FOR SUPPLIES</strong></h6>
                                <ul className="list-unstyled"> 
                                    <li className="mb-4">
                                        <a href="#" className="text-dark">List Your Activities</a>
                                    </li>
                                    <li className="mb-2 text-dark mt-2 al1"><strong> For Brands</strong></li>
                                    <li className="mb-2">
                                        <a href="#" className="text-dark">Partners With Us</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="#" className="text-dark">Designation Marketing</a>
                                    </li>
                                    <li className="mb-2 text-dark mt-2 al1"><strong>For Travel Agents</strong></li> 
                                    <li className="mb-2">
                                        <a href="#" className="text-dark">Sign Up as a Agent</a>
                                    </li>  
                                    <li className="mb-2">
                                        <a href="#" className="text-dark">Agent Login</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <h6 className="text-dark mt-2 al1"><strong> FOR TRAVELLERS</strong></h6>
                                <ul className="list-unstyled"> 
                                    <li>
                                        <a href="#" className="text-dark">Gift an Experience</a>
                                    </li>
                                </ul>     
                            </div>
                            <div className="col-md-3">
                                <h6  className="text-dark mt-2 "><strong>TRAVEL DESTINATIONS</strong></h6>
                                <img src={end} className="img-fluid rounded-start" alt="..."/>      
                            </div>
                        </div>
                    </div>

           


        </div>
    )
}