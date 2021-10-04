import axios from "axios"
import { useState,useEffect} from "react"



function ProductReview(props){
    //let url=useParams()
    let prdName=props.prdName;
    let [reviewItem,setReviewItem]=useState([])
    let [reviewUpdate,setReviewUpdate]=useState(false)

    // To get Reviews
    useEffect(()=>{
        console.log("qwert")
        console.log(prdName)
        axios.get(`/user/getreviews/${prdName}`)
        .then(res=>{
           if(res.data.message==="No Reviews Found"){
               setReviewUpdate(false)
           }
           else{
               setReviewUpdate(true)
               setReviewItem([...res.data.message])
           }
        //    console.log(res.data.messsage)
        })
        .catch(err=>console.log(err))
    },[prdName])
    
    return(
        <div>
            {reviewUpdate ?
            <div className="mt-5">
            <h1 className="text-center mt-5" style={{fontWeight:"lighter"}}>Customer Reviews </h1>
                    <div className="row mt-5">
                        {
                        reviewItem.map((reviewObj,ind)=>{
                            return(
                                <div className="col-md-4">
                                    <div className="card shadow" style={{height:"230px"}}>
                                        <div className="card-body">
                                            <h6 className="">{reviewObj.username}</h6><hr></hr>
                                            <p className=""><span style={{ color: "#FDCC0D"}}><i class="fas fa-star"></i></span>{reviewObj.rating} out of 5</p>
                                            <p className="text-success">{reviewObj.review}</p>                   
                                        </div>                  
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
            </div>
            
            :<h3 style={{fontWeight:"lighter"}}>Be the first one to review</h3>
            }
            
        </div>
        )
}

export default ProductReview;

