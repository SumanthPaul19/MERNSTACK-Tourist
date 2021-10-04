import React from 'react'
import card1 from './Images/cycling.jpg'
import card2 from './Images/himalayas1.jfif'
import card3 from './Images/resorts.jfif'
import { FaGlobe,FaGlobeAmericas,FaMoneyBillAlt,FaUsers} from 'react-icons/fa';
import {Link} from 'react-router-dom'



export default function Grids(){
    return(

        <div>
            <div className="container mt-5">
               
                <div className="btn-group d-flex justify-content-center ">
                <div className="row">
                    <div className="cols">
                        <Link to="/products"><button className="btn ps-4 pe-4 pt-2 pb-2 btn-dark btn-outline-primary text-light ">All</button></Link>
                        <Link to="/collections"><button className="btn ps-4 pe-4 pt-2 pb-2 btn-dark btn-outline-primary text-light">Activities</button></Link>
                        <Link to="/bangalore"><button className="btn ps-4 pe-4 pt-2 pb-2 btn-dark btn-outline-primary text-light">Tours</button></Link>
                        <Link to="/collections"><button className="btn ps-4 pe-4 pt-2 pb-2 btn-dark btn-outline-primary text-light">Rentals</button></Link>
                        <Link to="/staycations"><button className="btn ps-4 pe-4 pt-2 pb-2 btn-dark btn-outline-primary text-light">Staycations</button></Link>
                    </div>
                </div>

                </div>


                {/* Grids-2 */}
                <div className="hero container row mt-5 mb-5 text-center p-3">
                   <div className="row">
                        <div className="col"><FaGlobeAmericas size = '20px'/> 24,000+ Travel Experiences</div>
                        <div className="col"><FaGlobe size = '20px'/> 20+ States</div>
                        <div className="col"><FaMoneyBillAlt size = '20px'/> Best Price Guaranteed</div>
                        <div className="col"><FaUsers size = '20px'/> 1M+ Users</div>
                   </div>
                </div>


                {/* Card group-1 */}
                    <div className="card-group containers">

                        <div className="card m-3" id="find" > 
                            <div  className="card-body">
                                <h5  className="card-title mt-5" id="findcard">Find The Perfect Escape</h5>
                                <hr className="bg-warning" ></hr>
                                <h5 className="card-text" id="findcard">Discover your ideal Experience</h5>      
                            </div>
                        </div>
                                               
                        <div className="cards m-3 ">
                            <div className="card-img">
                                <a href="#"><img src={card1} className="card-img"  height="350" alt="..."/></a>
                            </div>
                            <div className="cards-content">          
                                <h3 className="cards-title text-center">Multi Day Tours!</h3>
                                <p className="cards-body">Explore the paradise on earth: majestic mountains, calm lakes and a cool climate.</p>
                            </div>
                        </div>

                        <div className="box m-3 ">
                            <div className="box-img">
                                <a href="#"><img src={card2} className="card-img " height="350" alt="..."/></a>
                            </div>
                            <div className="box-content">
                                <h3>Exotic Staycations!</h3>
                                <p>Find comfort in the lap of nature with the pinch of luxury in the beautifully styled rooms and other comfort facilities.</p>
                            </div>
                        </div>


                        <div className="cards m-3 ">
                            <div className="card-img">
                                <a href="#"><img src={card3} className="card-img" height="350" alt="..."/></a>
                            </div>
                            <div className="cards-content"> 
                                <h3 className="cards-title text-center">Hill Experiences!</h3>
                                <p className="cards-body">A certain kind of beauty that you will otherwise find amiss in any of the other destinations and valleys.</p>
                            </div>
                        </div>
                    </div>
                
            </div>
        </div>

    )
}