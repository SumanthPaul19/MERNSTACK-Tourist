import React from 'react'
import Cards from './Cards'
import Footer from './Footer'
import axios from 'axios';
import { useParams,useHistory} from 'react-router-dom';
import { useState,useEffect,Suspense} from 'react';
const Carousel = React.lazy(() =>import('./Carousel'));
const Grids = React.lazy(()=>import('./Grids'))

export default function Home(props){

    let addtoCart=props.addtoCart

    let [userObj,setUserObj]=useState({});
    let url=useParams();
    let username=url.username;
    let history=useHistory();
    let [product,setProduct]=useState([]);

    
    useEffect(()=>{
        axios.get('/product/getproducts')
        .then(res=>{
            let productObj=res.data
            setProduct([...productObj.message])
        })
        setUserObj({...userObj})
    },[username])

    const onCardClick=(productname)=>{
        localStorage.setItem("productname",productname)
        history.push('/productdetails')
        console.log("hh",productname)
    }


    return(
        <div className="">
            <Suspense fallback={<div>Loading...</div>}>
                <Carousel/>
            </Suspense>

        <div className="container">
            <Suspense fallback={<div>Loading...</div>}>
                <Grids/>
            </Suspense>

        {/* dynamic cards */}
        <h1 className="head-1 text-center mt-5">Trending Adventures!</h1><hr className="bg-danger"/>
          <div class="wrapper row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4"> 
            {product &&
                product.map((productObj,index)=>{
                    if(productObj.placingId==="a")
                    return(
                        <div className="container col" key={index}>
                            <div className="product_card w-100 mx-auto mt-3" height="300px">
                            <img src={productObj.productImage} className="card-img-top" width="300" height="300" alt="..." onClick={()=>onCardClick(productObj.productname)}/>                    
                                <div className="card-body" >
                                    <h5 className="card-title text-start">Name : {productObj.productname}</h5>
                                    <h5 className="text-start">Price : {productObj.price}</h5>
                                    <h5 className="text-start">Location : {productObj.brand}</h5>
                                        <div className="d-flex float-end">
                                            <button className="btn btn-primary float-end" onClick={()=>addtoCart(productObj)}>Book Now</button>  
                                        </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
            {/* Dynamic cards-2 */}
            <h1 className="head-1 text-center mt-5">Top Rated Experiences!</h1><hr className="bg-danger"/>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            
            {product &&
                product.map((productObj,index)=>{
                    if(productObj.placingId==="b")
                    return(
                        <div className="container col" key={index}>
                            <div className="product_card w-100 mx-auto mt-3" height="300px">
                            <img src={productObj.productImage} className="card-img-top" width="300" height="300" alt="..." onClick={()=>onCardClick(productObj.productname)}/>
                                <div className="card-body" >
                                    <h5 className="card1-title text-start">Name : {productObj.productname}</h5>
                                    <h5 className="text-start">Price : {productObj.price}</h5>
                                    <h5 className="text-start">Location : {productObj.brand}</h5>
                                        <div className="d-flex float-end">
                                            <button className="btn btn-primary float-end"  onClick={()=>addtoCart(productObj)}>Book Now</button>  
                                        </div>
                                </div>
                            </div>
                        </div>
                    )
                })

            }
        </div>
        {/* dynamic cards-3 */}
            <h1 className="head-1 text-center mt-5">Exotic Home Stays!</h1><hr className="bg-danger"/>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            
            {product &&
                product.map((productObj,index)=>{
                    if(productObj.placingId==="c")
                    return(
                        <div className="container col" key={index}>
                            <div className="product_card w-100 mx-auto mt-3" height="300px">
                           <img src={productObj.productImage} className="card-img-top" width="300" height="300" alt="..." onClick={()=>onCardClick(productObj.productname)}/>   
                                <div className="card-body" >
                                    <h5 className="card-title text-start">Name : {productObj.productname}</h5>
                                    <h5 className="text-start">Price : {productObj.price}</h5>
                                    <h5 className="text-start">Location : {productObj.brand}</h5>
                                        <div className="d-flex float-end">
                                            <button className="btn btn-primary float-end"  onClick={()=>addtoCart(productObj)}>Book Now</button>  
                                        </div>
                                    

                                </div>
                            </div>
                        </div>
                    )
                })

            }
        </div>

          <Cards addtoCart={addtoCart}/>
        </div>
          
        <div className="">
          <Footer/>
          </div>
          
    </div>
    )
}