import axios from 'axios'
import {Link ,useHistory} from 'react-router-dom'
import { useState,useEffect } from 'react'
import listImg from './Images/empty.png'
function UserWishlist(props){

    let addtoCart=props.addtoCart
    let history=useHistory();

    const [state,setState]=useState(true);
    const [listObj,setListObj]=useState('');
    let username=localStorage.getItem("username")
    useEffect(()=>{
        axios.get(`/user/getwishlist/${username}`)
        .then(res=>{
            setListObj(res.data.message)
            if(res.data.message!==null){
                
            }     
        })
        .catch(err=>{
            console.log("Error on reading cart",err)
            alert("Something went wrong in getting wishlist")
        })
    },[username,state])

    // Delete Items from wishlist
    const deletefromList=(prdObj)=>{
        console.log(prdObj)
        let userDetails=JSON.parse(localStorage.getItem('user'))
        let username=userDetails.username
        let wishlistObj={username,prdObj}
         // Make Req to Delete item from cart
         axios.post('/user/deletefromlist',wishlistObj)
         .then(res=>{
             alert(res.data.message)
             setState(!state)    
         })
         .catch(err=>console.log(err))
    }

    return(
        <div className="wish ms-5">
            {listObj ? 
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3  row-cols-lg-4 g-4">
            {listObj &&
                listObj.products.map((product,index)=>{
                    return(
                        <div class="home1 col" key={index} >
                            <div className="product_card w-100 mx-auto mt-5" height="300px">
                            <Link to="/productdetails"> <img src={product.productImage} class="card-img-top" width="300" height="300" alt="..." /> </Link>
                                <div className="card-body">  ​​​​​​​​
                                    <h5 class="card-title text-start">Name : {product.productname}</h5>
                                    <h5 class="text-start">Location : {product.brand}</h5>
                                    <h5 class="text-start">Price : {product.price}</h5>
            
                                    <div class="d-flex float-end">
                                        <button className="btn btn-primary float-end" onClick={()=>addtoCart(product)}>Book Now</button>
                                        <button className="btn" type="submit" onClick={()=>deletefromList(product)}><i class="fas fa-trash-alt text-danger"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })

            }
            </div> : <div className="d-flex justify-content-center"><img src={listImg} alt=""/></div>
            }
        </div>
    )
}

export default UserWishlist;