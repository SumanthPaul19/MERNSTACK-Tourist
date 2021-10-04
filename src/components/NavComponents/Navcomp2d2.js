import React from 'react'
import ab4 from '../Images/ab4.jpg'
import ab3 from '../Images/ab3.jpg'
import ab7 from '../Images/ab7.jpg'
import ab8 from '../Images/ab8.jpg'
import ab9 from '../Images/ab9.jpg'
import abs1 from '../Images/abs1.PNG'
import abs2 from '../Images/abs2.PNG'
import abs3 from '../Images/abs3.PNG'
import abs4 from '../Images/abs4.PNG'

 
export default function AboutUs(){
    return(
        <div>
            
            <div className="img-overlay ">
            <img src={ab4} className="d-block w-100" height="480" alt="..."/>
           {/* Grid */}
            <div className="ABgrid row mt-2 mb-5 text-center p-3">
                    <h1 className="head-1 text-center">WE ARE THRILLEX!</h1><hr className=" bg-danger "/>
                    <div className="col"><li className="list-unstyled "><h3 className="font-size:20px">12,000+</h3></li><li className="list-unstyled"><h3 className="font-size:20px">Activities</h3></li> </div>
                    <div className="col"><li className="list-unstyled"><h3 className="font-size:20px">125+</h3></li> <li className="list-unstyled"><h3 className="font-size:20px">Destinations</h3></li> </div>
                    <div className="col"><li className="list-unstyled"><h3 className="font-size:20px">5000+</h3></li><li className="list-unstyled"><h3 className="font-size:20px">Suppliers</h3></li>  </div>
                    <div className="col"><li className="list-unstyled"><h3 className="font-size:20px">1M+</h3></li><li className="list-unstyled"><h3 className="font-size:20px">Users</h3></li> </div>
            </div>
         {/* Carousel */}
         <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                <img src={ab3} className="d-block w-100" height="350" alt="..."/>
                
            </div>
            <div className="carousel-item" data-bs-interval="2000">
                <img src={ab8} className="d-block w-100" height="350" alt="..."/>
                
            </div>
            <div className="carousel-item">
                <img src={ab9} className="d-block w-100 " height="350" alt="..."/>
            
            </div>
            <div className="carousel-item">
                <img src={ab7} className="d-block w-100 " height="350" alt="..."/>
                
            </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span >Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span>Next</span>
            </button>
            </div>
                <div>
                    <h1 className="head-1 text-center mt-5 mb-2">OUR JOURNEY</h1><hr className=" bg-danger "/>
                    <h5 className="text-center mb-3">Back in 2011, when people started buying books online, when they started booking flights online, we started with a vision to sell activities and experiences (the last mile of travel) online. It seemed like an impossible vision to almost all VCs we met then; today Thrillophilia is the country’s most thrilling name when it comes to activities and experiences. With more than 40 M online traffic, we have catered to more than 2Million+ customers. Started with experiences in Bangalore, today Thrillophilia sells experiences of 15 Asian countries with Dubai, Thailand, Singapore and Bali leading the charts after India.</h5>
                </div>
                <a className="" href="#" ><img src={abs1} alt="" width="100%"/></a>
                <a className="" href="#" ><img src={abs2} alt="" width="100%"/></a>
                <a className="" href="#" ><img src={abs3} alt="" width="100%"/></a>
                <a className="" href="#" ><img src={abs4} alt="" width="100%"/></a>

         
            </div>
          
        </div>
    )
}