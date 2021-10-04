import axios from 'axios'
import {useState,useEffect} from'react'
import CartImg from './Images/empty-cart.png'
import {FaTrashAlt} from 'react-icons/fa'
import {useHistory} from 'react-router-dom'

function UserCart(props){

    let history=useHistory();

    let cartObj=props.cartObj;
    let addtoCart=props.addtoCart;
    let removefromCart=props.removefromCart;
    let deletefromCart=props.deletefromCart;
    let [grandTotal,setGrandTotal]=useState(0)

    // To Find Grand Total
    useEffect(()=>{
      console.log("Grand")
      let gt=0;
      if(cartObj!==null){
          cartObj.products.map((cartObj,ind)=>{
          gt+=cartObj.totalprice
          })
      }
      setGrandTotal(gt)
    },[cartObj])

     // On Checkout 
     const onCheckout=()=>{
     history.push({pathname:'/checkout',state:cartObj})
    }
    

    return(
        <div className="container1">
            {
            cartObj ?
            <div className="row row-cols-1 row-cols-md-2  d-flex justify-content-center mt-5 text-center">
                <div className="col col-md-8">
                   {cartObj.products.map((prdObj,ind)=>{
                      return(
                        <div className="card mb-3">
                            <div className="row row-cols-1">
                                <div className="col-md-4">
                                   <img src={prdObj.productImage} className="img-fluid rounded-start w-100 h-100" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body text-start">
                                      <a className="btn"><FaTrashAlt className="btdel btdel-danger" onClick={()=>deletefromCart(prdObj)}/></a>
                                      <h3>Name:{prdObj.productname}</h3>
                                      <h6>Rs.{prdObj.price}</h6>
                                      <h5>Location:{prdObj.brand}</h5>
                                      <button type="button" className="btn btn-success" id="but2" onClick={()=>addtoCart(prdObj)} >+</button>
                                      <input type="number" id="but1" value={prdObj.quantity} size="40px"></input>
                                      <button type="button" className="btn btn-danger" id="but"onClick={()=>removefromCart(prdObj)}>-</button>
                                      <h5>Total Price: Rs.{prdObj.totalprice}</h5>
                                    </div>
                                 </div>
                           </div>
                         </div>
                      )
                      })
                      }

                      <div className="col col-md-4">
                          <div className="card">
                              <div className="card-header" >
                                  <p className="h3">Cart summary</p>
                              </div>
                              <div className="card-body">
                                  <p className="h3 ">Grand Total:{grandTotal}</p>              
                                  <button className="btn btn-primary d-block mx-auto" onClick={()=>onCheckout()}>CHECKOUT</button>
                              </div>
                        </div>
                      </div>
                  </div>
                </div>
        
      : 
       <div className="d-flex justify-content-center"><img src={CartImg} alt=""/></div> }
    </div>

    )
}

export default UserCart;


