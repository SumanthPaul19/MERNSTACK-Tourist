import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useHistory } from 'react-router-dom'

function ReviewForm(props){
    let history=useHistory();
    let prdName=props.prdName;
    let {register,handleSubmit,formState:{errors}}=useForm()
    let userDetails=JSON.parse(localStorage.getItem('user'))
    //let url=useParams()

    // To Add Review
    const onFormSubmit=(userReview)=>{
        if(userDetails!==null){
            let username=userDetails.username
            userReview.productName=prdName
            userReview.username=username
             // Make req to save data in cart
             axios.post('/user/addreview',userReview)
             .then(res=>{
                 let responseObj=res.data
                 alert(responseObj.message)
                 history.push('/productdetails')
             })
             .catch(err=>console.log(err))
        }
        else{
            alert("Please Login To write a Review")
        }
        history.push('/productdetails')
    }


    return(
   
    <div>
        <form onSubmit={handleSubmit(onFormSubmit)} className="m-2">
            <label htmlFor="rate" className="form-check-label">RATING:</label>
            <div class="rating">
                    <input id="star5" name="star" type="radio" {...register('rating',{required:true})} value="5" class="radio-btn hide" />
                    <label for="star5" ><i class="far fa-star"></i></label>
                    <input id="star4" name="star" type="radio" {...register('rating',{required:true})} value="4" class="radio-btn hide" />
                    <label for="star4" ><i class="far fa-star"></i></label>
                    <input id="star3" name="star" type="radio" {...register('rating',{required:true})} value="3" class="radio-btn hide" />
                    <label for="star3" ><i class="far fa-star"></i></label>
                    <input id="star2" name="star" type="radio" {...register('rating',{required:true})} value="2" class="radio-btn hide" />
                    <label for="star2" ><i class="far fa-star"></i></label>
                    <input id="star1" name="star" type="radio" {...register('rating',{required:true})} value="1" class="radio-btn hide" />
                    <label for="star1" ><i class="far fa-star"></i></label>
                    <div class="clear"></div>
            </div>

            
            <label htmlFor="mgs2" className="form-label">Add your Review</label>
            <textarea id="mgs2"{...register('review',{required:true})} className="form-control mb-3 " autoComplete="off" placeholder="your Review"/>
            {errors.review && <p className="text-danger">*Review is required</p>}
            
            
            <button type="submit" className="btn btn-success btn-left mt-2 mb-4 "id="subbtn">Submit</button>
        </form>
    </div>
    )
}
export default ReviewForm;



