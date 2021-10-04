import React from 'react'
import c1 from './Images/bgs11.jpg'
import c2 from './Images/bgs4.jpg'
import c3 from './Images/ab1.jpg'

export default function Carousel(){
  return(
    <div>
      {/* 1st Caurousel */}
        <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="2000">
              <img src={c1} className="d-block w-100 " height="400" alt="..."/>
              <div className="carousel-caption d-none d-md-block">
                <h4>Explore The World!!</h4>
              </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src={c2} className="d-block w-100" height="400" alt="..."/>
            <div className="carousel-caption d-none d-md-block">
              <h4>Experiential journeys will make you a storyteller</h4>
            </div>
          </div>
          <div className="carousel-item">
            <img src={c3} className="d-block w-100" height="400" alt="..."/>
            <div className="carousel-caption d-none d-md-block">
              {/* <h4 className="text-dark">Best Luxury Deals and Packages</h4> */}
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
    </div>
</div>


  )
}