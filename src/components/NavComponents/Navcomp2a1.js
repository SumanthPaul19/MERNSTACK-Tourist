import { useEffect, useState } from "react";
import axios from 'axios'
import { Link,BrowserRouter,Route} from 'react-router-dom';
import { useHistory } from "react-router";
import ProductDetails from '../ProductDetails'
import {FaBackward} from 'react-icons/fa';

export default function ViewProduct(props){

    let addtoCart=props.addtoCart

    let username=localStorage.getItem("username")
    let[userObj,setUserObj]=useState({});

    let history=useHistory();

    let[product,setProduct]=useState([])
    useEffect(()=>{
        axios.get('/product/getproducts')
        .then(res=>{
            let productObj=res.data
            setProduct([...productObj.message])
        })
        setUserObj({...userObj})
    },[username])
 
    // On card click it should go to product detail page
    const onCardClick=(productname)=>{
        localStorage.setItem("productname",productname)
        history.push('/productdetails')
        console.log("hh",productname)
    }

    return(
        
        <div>
    
        <BrowserRouter>
        <h1 className="head-1 text-center mt-3">Escapes in Delhi!</h1> <hr className=" bg-danger "/>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            
            {product &&
                product.map((productObj,index)=>{
                    if(productObj.locationId==="Delhi") 
                    return(
                        <div class="col" key={index}>
                            <div class="product_card w-100 mx-auto mt-5" height="300px">
                            <Link to="/productdetails"><img src={productObj.productImage} class="card-img-top" width="300" height="300" alt="..." onClick={()=>onCardClick(productObj.productname)}/></Link>
                                <div class="card-body">
                                    <h5 class="cardpds card-title text-start"><strong>Name </strong> : {productObj.productname}</h5>
                                    <h5 class="cardpds text-start"><strong>Price </strong>: {productObj.price}</h5>
                                    <h5 class="cardpds text-start"><strong>Location</strong>Location: {productObj.brand}</h5>
                                    <h5 class="cardpds text-start"><strong>Description </strong>: {productObj.productdescription}</h5>
            
                                    {username !=="admin" && 
                                        <div class="d-flex float-end">
                                            <button className="btn btn-primary float-end" onClick={()=>addtoCart(productObj)}>Book Now</button>  
                                        </div>
                                        ||
                                        <div class="d-flex float-end">
                                            <button className="btn btn-warning float-end">Edit/Delete</button>  
                                        </div>

                                    }


                                </div>
                            </div>
                        </div>
                    )
                })

            }
        </div>

        
        
        
        <Route path="/productdetails">
            <ProductDetails />
        </Route>
        </BrowserRouter>
        </div>
    )
}