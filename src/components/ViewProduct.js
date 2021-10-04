import { useEffect, useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router";
import { Link,Route,BrowserRouter } from "react-router-dom";
import ProductDetails from './ProductDetails'
import {FaBackward} from 'react-icons/fa';

export default function ViewProduct(props){

    let addtoCart=props.addtoCart;
    let[userObj,setUserObj]=useState({});
    let history=useHistory();
    
    const [deleteState,setDeleteState]=useState(true);
    let[product,setProduct]=useState([])
    useEffect(()=>{
        axios.get('/product/getproducts')
        .then(res=>{
            let productObj=res.data
            setProduct([...productObj.message])
        })
        setUserObj({...userObj})
    },[username,deleteState])

    // On card click it should go to product detail page
    const onCardClick=(productname)=>{
        localStorage.setItem("productname",productname)
        history.push('/productdetails')
    }

    //delete users
    const onClickdelete=(productObj)=>{

        //Make Request to delete item
        axios.delete(`/product/deleteproduct/${productObj.productname}`)
        .then(res=>{
            alert(res.data.message)
            setDeleteState(!deleteState)
        })
        .catch(err=>console.log(err))
    }

    let username=localStorage.getItem("username")

    return(
        <div> 
            {username ==="admin" &&
                <Link to="/adminprofile"><a className="float-start mt-5"><FaBackward  size = '30px'/></a></Link>
            }
        <BrowserRouter>
        
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            
            {product &&
                product.map((productObj,index)=>{
                    return(
                        <div class="col" key={index}>
                            <div class="card w-75 mx-auto mt-5">
                                <Link to="/productdetails"><img src={productObj.productImage} class="card-img-top" alt="..." width="300" height="300" onClick={()=>onCardClick(productObj.productname)}/></Link>
                                <div class="card-body">
                                    <h5 class="card-title text-start">Name : {productObj.productname}</h5>
                                    <h5 class="text-start">Location : {productObj.brand}</h5>
                                    <h5 class="text-start">Price : {productObj.price}</h5>
                                    
                                    {username !== "admin" ?
                                        <div class="d-flex float-end">
                                            <button className="btn btn-primary float-end" onClick={()=>addtoCart(productObj)}>Book Now</button>  
                                        </div>
                                        :
                                        <div class="d-flex float-end">
                                            <button className="btn btn-warning float-end" onClick={()=>onClickdelete(productObj)}>Delete</button>  
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
          <ProductDetails/>
        </Route>


        </BrowserRouter>
        </div>
    )
}

