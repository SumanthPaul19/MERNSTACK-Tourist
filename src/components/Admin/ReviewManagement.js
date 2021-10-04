import { Tabs,Tab } from "react-bootstrap";
import axios from 'axios';
import { useEffect, useState } from 'react'



function ReviewMangement(){

    let[reviewobj,setReviewobj]=useState([])
    let[acceptedreview,setAcceptedreview]=useState([])
    let [changeState,setChangeState]=useState(1)
    
    
    // to get all pending reviews
    useEffect(()=>{
        axios.get(`/admin/getreviews/pending`)
        .then(res=>{ 
            setReviewobj([...res.data.message])
        
        })
        .catch(err=>console.log(err.message))
    },[changeState])
   
    //To get Accepted reviews 
    useEffect(()=>{
        axios.get(`/admin/getreviews/accepted`)
        .then(res=>{ 
            setAcceptedreview([...res.data.message])
            setChangeState(changeState+1)
        })
        .catch(err=>console.log(err.message))
    },[changeState])
    

   //   delete review
    const deletereview=(prdId)=>{ 
    axios.delete(`/admin/deletereview/${prdId}`)
    .then(res=>{
        alert(res.data.message)
    })
    .catch(err=>console.log(err))
    setChangeState(changeState+1)
    }
    
    //  accepted review
    const acceptreview=(reviewobj)=>{    
         axios.post(`/admin/acceptreview`,reviewobj)
         .then(res=>{
             alert(res.data.message)
             setAcceptedreview([...acceptedreview])

         })
         .catch(err=>console.log(err))
        //  setChangeState(changeState+1)
     }
     
    
 

    return(
     <div className="reviewm">
           <Tabs defaultActiveKey="Pending Reviews" transition={false} id="noanim-tab-example"className="mt-5">
                <Tab eventKey="Pending Reviews" title={
                     <span>
                      Pending Reviews</span>
                }><div>
                 <div className="row mt-5">

                         {
                           reviewobj.map((reviewObj,ind)=>{
                            if(reviewObj.status==="pending"){
                              return(
                            <div className="col-md-3">
                                <div className="card reviewm mb-4" style={{height:"350px"}} >
                                <div className="card-body">
                                    <p ><strong>Productname:</strong>{reviewObj.productName}</p>
                                    <p style={{lineHeight:"3px"}}><strong>Status:</strong>{reviewObj.status}</p>
                                    <p style={{lineHeight:"3px"}}><strong>Rating:</strong>{reviewObj.rating}</p>
                                    <h6>Message:<p className="text-success">{reviewObj.review}</p></h6>
                                    
                                        </div>
                                    <div className="card-footer">
                                    <button className=" btn btn-danger " style={{marginRight:"70px"}} onClick={()=>deletereview(reviewObj._id)}> Dismiss</button>
                                    <button className="btn btn-success" onClick={()=>acceptreview(reviewObj)}>Accept</button>
                                        </div>                              
                                </div>

                            </div>
                              )
                            }
                           })
                        }
                         </div>
            </div>
                    </Tab>
                
                    <Tab eventKey="Accepted" title={
                    <span>
                        Accepted Reviews
                    </span>
                }>
                    <div>
                 <div className="row mt-5">
                         {
                           acceptedreview.map((reviewObj,ind)=>{
                            if(reviewObj.status==="accepted"){
                              return(
                            <div className="col-md-3">
                                <div className="card reviewm mb-4" style={{height:"270px",borderBlockColor:"green"}} >
                                <div className="card-body">
                                <p ><strong>Loation name:</strong>{reviewObj.productName}</p>
                                    <p style={{lineHeight:"3px"}}><strong>Status:</strong>{reviewObj.status}</p>
                                    <p style={{lineHeight:"3px"}}><strong>Rating:</strong>{reviewObj.rating}</p>
                                    <h6>Message:<p className="text-success">{reviewObj.review}</p></h6>
                                    
                                        </div>
                                                                 
                                </div>

                            </div>
                              )
                            }
                           })
                        }
                         </div>
            </div>
                
           
                    
                </Tab>                 
            </Tabs>
     </div>
    )
}

export default ReviewMangement;


// 49 line  setAcceptedreview([...acceptedreview])