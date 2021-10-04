import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BrowserRouter,Route, useHistory,useRouteMatch } from 'react-router-dom'
import {GrLocation,GrFavorite} from 'react-icons/Gr';
import { Tabs,Tab } from 'react-bootstrap';
import SubmitReview from './SubmitReview';
import ProductReview from './ProductReview';

export default function ProductDetails(props){

    let pathinfo=useRouteMatch()
    console.log(pathinfo)
    let addtoCart=props.addtoCart
    let userDetails=localStorage.getItem('user')
    let productname=localStorage.getItem("productname")
    
    let [productObj,setProductObj]=useState('')
    //to fetch card data
    useEffect(()=>{    
        axios.get(`/product/getproduct/${productname}`)
        .then(res=>{  
            setProductObj(res.data.message)
            console.log(res.data.message)
        })
        .catch(err=>console.log(err.message))
    },[productname])


    //For wishlist----
    const addProductToList=(productObj)=>{
        if(userDetails!==null){
        let username=localStorage.getItem("username")
         
        let newObj={username,productObj}
        console.log(newObj)
         
        axios.post("/user/addtolist",newObj)
         
         .then(res=>{
        let responseObj=res.data;
        alert(responseObj.message)
        // setStateChange(!stateChange)
        console.log(responseObj)
         })
         .catch(err=>{
        console.log("Error in adding to wishlist",err)
        alert("Something went wrong in adding to wishlist")
      })
    }
    else{
        alert("Please login to access the wishlist")
    }
    }

    return(
        <BrowserRouter>
        <div className="container mt-3 text-start">
            <div className="cardpd mt-5 mb-5">
                <div className="row row-cols-1">
                    <div className="col-md-4">
                        <img src={productObj.productImage}  className="productimg rounded-start"  alt=""/>
                    </div>
                        <div className="col-md-8 d-block mx-auto">
                            <div className="card-body">
                                <ul className="list-unstyled g-6">
                                    <li className="list-inline-item pe-6 "> <h6 className="cardpds"><strong>NAME</strong>: {productObj.productname}</h6></li>
                                    <li className="list-inline-item"><button id="btn1" className="outline-primary"><GrFavorite size = '30px'className="mt-1 mb-1" onClick={()=>{addProductToList(productObj)}} /></button></li>
                                </ul> 
                                <h5 className="cardpds"><strong>LOCATION</strong>:<a ><GrLocation size = '30px' className="mb-1"/></a>{productObj.brand}</h5>
                                <h5 className="cardpds"><strong>PRICE:RS</strong>-{productObj.price}/-</h5> 
                                <p  className="cardpds"><strong>DESCRIPTION:</strong> {productObj.productdescription}</p>
                                <div>
                                    <button className="btn btn-primary ms-2 mt-2" onClick={()=>addtoCart(productObj)}>Book Now</button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            {/* Ratings and reviews */}

            <Tabs defaultActiveKey="productreview" transition={false} id="noanim-tab-example" className="mb-3">
                
                <Tab eventKey="review" title="Reviews">
                     <ProductReview prdName={productObj.productname}/>
                </Tab>

                {userDetails !== null ?

                <Tab eventKey="submitreview" title="Submit Review">
                    <SubmitReview prdName={productObj.productname}/>
                </Tab>
                 : <h1></h1>
                }
            </Tabs> 
            
       
       </BrowserRouter>
    )
 
}


