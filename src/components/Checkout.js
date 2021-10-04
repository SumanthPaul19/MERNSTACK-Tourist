import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {useHistory,useLocation} from 'react-router-dom'
import {animateScroll as scroll} from 'react-scroll'


function Checkout(props){

    const {register,handleSubmit,formState:{errors}}=useForm();

    let location=useLocation()
    let cartObj=location.state;
    // console.log(cartObj)
    let [grandTotal,setGrandTotal]=useState(0)
    let userDetails=JSON.parse(localStorage.getItem('user'))
    let history=useHistory()

    // Submit Order
    const onFormsubmit=(userObj)=>{
        let username=userDetails.username
        let myOrders=[userObj,cartObj,username]
        console.log(myOrders)

        axios.post('/user/myorders',myOrders)
        .then(res=>{
            alert(res.data.message)
            props.setCartCount(0)
            scroll.scrollToTop()
            history.push('/orders')
        })
        .catch(err=>console.log(err))
    }

    // To find Total Price
    useEffect(()=>{
        let gt=0
        cartObj.products.map((prdObj)=>{
            gt += prdObj.totalprice
            
        })
        setGrandTotal(gt)
    },[cartObj])

    return(
        <div>
            <h1 className="head-1 text-center ">Checkout</h1><hr className=" bg-danger "/>
            <div className="container w-100">
                    <div className="row">
                    <div className="col-md-8">
                        <form className="paymentform mx-auto" onSubmit={handleSubmit(onFormsubmit)}>

                                {/* delivery details */}
                                <div className="checkout  mt-5 p-2">
                                        <div className="card-title">
                                            <h2 className="yourdetail mt-2">Delivery details</h2>
                                        </div>
                            
                                        {/* name */}
                                        <label className=" form-control-label  mt-2" >Name*</label>
                                        <input type="text" className=" form-control w-100 " required {...register('name')}></input>
                                        {errors.name?.type=== 'required' && <p className="text-danger">*Username is required</p>}

                                        {/* Email */}
                                        <label className=" form-control-label  mt-2" >Email*</label>
                                        <input type="email" className=" form-control w-100 " required {...register('email')}></input>
                                        {/*password validation */}
                                        {errors.email && <p className="text-danger">*Enter your email address</p>}
                                
                                        {/* mobile */}
                                        <label className=" form-control-label  mt-2" >Phone Number*</label>
                                        <input type="text" className=" form-control w-100 " required {...register('mobile',{minLength:10,maxLength:10})}></input>
                                        {errors.mobile?.type==='required' && <p className="text-danger">*mobile number is required</p>}
                                        {errors.mobile?.type==='minLength' && <p className="text-danger">*Please enter your 10 digit mobile number</p>}
                                        {errors.mobile?.type==='maxLength' && <p className="text-danger">*Please enter your 10 digit mobile number</p>}

                                </div>

                                {/* payment method */}

                                <div className="checkout  mt-5 mb-5">
                                        <div className="card-title">
                                            <h2 className="text-center">Payment Method</h2>
                                        </div>

                                        <h4 className="text-center text-dark mb-5" style={{fontWeight:"lighter"}}>Card details <i class="far fa-credit-card"></i></h4>
                                        
                                            {/* radio */}    
                                            <div className="row mt-2 ms-2 me-2">
                                                <div className="col-md-6 ">
                                                    <label for="cardnumber">Card Number</label> 
                                                    <input type="number" className="form-control" id="cardnumber" placeholder="Enter your Card number" autoComplete="off" required {...register('cardnumber',{required:true,minLength:16,maxLength:16})}/> 
                                                    {errors.cardnumber?.type==='required' && <p className="text-danger">* Please enter your 16 digit card number</p>} 
                                                    {errors.cardnumber?.type==='maxLength' && <p className="error text-danger" style={{marginLeft:'100px'}}>Invalid card number(16 digits)</p>}             
                                                    {errors.cardnumber?.type==='minLength' && <p className="error text-danger" style={{marginLeft:'100px'}}>Invalid card number(16 digits)</p>}                 
                                                </div>
                                                <div className="col-md-6">
                                                    <label for="cardholdername">Cardholder's Name</label> 
                                                    <input type="text" className="form-control" id="cardholdername" placeholder="Enter the Cardholder's Name" autoComplete="off" required {...register('cardholdername')}/>
                                                    {errors.cardholdername?.type==='required' && <p className="text-danger">*Cardholder name is required</p>}
                                                </div>
                                            </div>

                                        <div className="row ms-2 me-2">
                                            <div className="col">
                                                <label className=" form-control-label ms-2 mt-4" >Expiry date</label>   
                                                <input type="month" className="form-control "   required {...register('expiry',{required:true})}/>
                                                {errors.expiry?.type==='required' && <p className="text-danger">*Expiry date is required</p>}                       
                                            </div>
                                            <div class="col">
                                                <label className=" form-control-label ms-2 mt-4" >CVV</label>  
                                                <input type="number" className="form-control " placeholder="Enter CVV number" aria-label="cvv"  required autoComplete="off" {...register('cvv',{required:true,minLength:3,maxLength:3})}/>
                                                {errors.cvv?.type==='minLength' && <p className="error text-danger" style={{marginLeft:'100px'}}>Invalid cvv(3 digits)</p>}    
                                                {errors.cvv?.type==='maxLength' && <p className="error text-danger" style={{marginLeft:'100px'}}>Invalid cvv(3 digits)</p>}   
                                                {errors.cvv?.type==='required' && <p className="text-danger">*Cvv is required</p>}                      
                                            </div>
                                    </div>
                                    <span style={{fontSize:"40px",color:"skyblue",marginTop:"20px"}}><i style={{marginLeft:"20px",color:"darkblue"}} class="fab fa-cc-visa"></i>
                                    <i style={{marginLeft:"20px",color:"orange"}} class="fab fa-cc-mastercard"></i>
                                    <i style={{marginLeft:"20px",color:"blue"}} class="fab fa-google-pay"></i>
                                    <i style={{marginLeft:"20px"}} class="fab fa-paypal"></i>
                                    </span>
                                            <div className="pb-3">
                                                <button type="submit" className="btn btn-success mx-auto  mt-2 d-flex justify-content-end">Proceed To Pay</button>
                                            </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-md-4">
                            <div className="checkout summary  mt-5">           
                                <div className="card-title">
                                    <h3 className="yourdetail ms-5 ">Summary</h3>
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                            <th>Product Name</th>
                                            <th> </th>
                                            <th className="text-center">Quantity</th>
                                            <th className="text-center">Price</th>
                                        </thead>
                                        <tbody>
                                            {
                                            cartObj.products.map(cartObj=>{
                                            return(
                                            <tr>
                                            <td>{cartObj.productname}</td>
                                            <td>X</td>
                                            <td className="text-center">{cartObj.quantity}</td>
                                            <td className="text-center">{cartObj.price}</td>
                                            </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </table>
                                        <hr></hr>
                                    <h5 className="text-success"><strong>Order Total</strong>:{grandTotal}</h5>
                                    </div>
                                </div>
                            </div>
                    </div>
            </div>
        </div>
    )
}

export default Checkout;