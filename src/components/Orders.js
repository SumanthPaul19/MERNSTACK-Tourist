import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Orders(){

    let username=localStorage.getItem("username")
    let[orderObj,setOrderObj]=useState([])
    let [state,setState] =useState(true)
    let productname=localStorage.getItem("productname")

    useEffect(()=>{
        axios.get(`/user/getorders/${username}`)
        .then(res=>{
            if(res.data.message!=="No Orders Found"){
            setOrderObj([...res.data.message])
            console.log(res.data.message)
            }
        })
        .catch(err=>console.log(err))
    },[state])

    console.log(orderObj)

    //receipt
    const onReceipt=(productname)=>{

        console.log("hello")
   
           localStorage.setItem("productname",productname)
           setState(!state)
   
       }

    return(
        <div>
        <div>{orderObj.length > 0 ? 
            <div> 
                <h1 className="head-1 text-center mt-3">My Orders List</h1><hr className="bg-danger"/>
                    {orderObj &&
                        orderObj.map((product,index)=>{
                            return <>

                                {product.productDetails.products.map((prd,ind)=>{
                                    return <>
                                    <div className="cardpd mt-5 mb-5 w-75 d-block mx-auto">
                                        <div className="row col-md-12 col-sm-4">
                                            <div className="col-md-4">
                                                <img src={prd.productImage}  className="orderimg img-fluid "/>  
                                            </div>
                                            <div className="col-md-8 d-block mx-auto">
                                                <div className="card-body">
                                                    <h5 className="cardpds"><strong>Booking-ID</strong>:{product.userDetails.orderid}</h5>
                                                    <h5 className="cardpds"><strong>Product Name</strong>:{prd.productname}</h5> 
                                                    <h5 className="cardpds"><strong>Price :RS</strong>-{prd.price}/-</h5> 
                                                    <h5 className="cardpds"><strong>Quantity</strong>:{prd.quantity}</h5>
                                                    <h5 className="cardpds"><strong>Total Price:RS</strong>-{prd.totalprice}/-</h5> 
                                                    <h5 className="cardpds"><strong>Mobile:</strong> {product.userDetails.mobile}</h5>
                                                    <h5 className="cardpds"><strong>Payment :</strong>Successfull</h5> 
                                                    <h5 className="cardpds"><strong>Status :</strong>Booked</h5>
                                                </div>
                                                <button type="button" class="btn btn-primary" onClick={()=>onReceipt(prd.productname)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    Booking Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>  
                                </>

                                })}

                            </>
                        })
                    }
            </div>
            : <div className="text-center"><h1>No Orders Placed</h1></div>
            
                }
        </div>

        {/* Modal  */}
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Order Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body orderbg text-center">
                    {orderObj &&
                       orderObj.map((product,index)=>{
                        return <> 

                            {product.productDetails.products.map((prd,ind)=>{
                                if(prd.productname===productname){
                                        return <>
                                            <div>
                                                <div>
                                                    <img src={prd.productImage} width="100px" alt=""/>
                                                </div>
                                                <h5><strong>Booking Id:</strong>{product.userDetails.orderid}</h5> 
                                                <h5 ><strong>Name :</strong>{prd.productname}</h5> 
                                                <h5 ><strong>Price :</strong>{prd.price}</h5> 
                                                <h5 ><strong>Payment :</strong>Successfull</h5> 
                                                <h5><strong>Status :</strong>Booked</h5>
                                                <h3 className="text-center">Enjoy Your Trip!</h3>
                                            </div>                              
                                        </>
                                    }
                                })
                            }
                        </>
                       })
                    }                         
                    </div>                                
                </div>
            </div>
        </div>


        </div>
       
    )
}
