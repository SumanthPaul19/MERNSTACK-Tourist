//create express app
const exp=require('express')
const adminApi=exp.Router();//create mini express application
adminApi.use(exp.json())
const jwt=require('jsonwebtoken');
const expressErrorHandler = require('express-async-handler');
const { ObjectId } = require('mongodb');
 
 
adminApi.post("/adminlogin",expressErrorHandler( async(req,res,next)=>{
    
    let adminCollectionObj=req.app.get("adminCollectionObj")
    
    let credentials=req.body;

    //check for username
    let user=await adminCollectionObj.findOne({username:credentials.username})
    //if user not found
    if(user===null)
    {
        res.send({message:"Invalid username"})
    }
    else if(user.password!==credentials.password){
        res.send({message:"Invalid Password"})
    }
    else{
        //create and send token
        let token= await jwt.sign({username:credentials.username},process.env.SECRET,{expiresIn: 120 })
         //send token to client
         res.send({message:"Login success",token:token,username:credentials.username,userObj:user})
    }

}))


// Get pending or accepted review Details
adminApi.get('/getreviews/:status',expressErrorHandler(async(req,res)=>{
    let status=req.params.status

    let reviewCollectionObj=req.app.get("reviewCollectionObj")
    
    let prd=await reviewCollectionObj.find().toArray()
    
    let filteredPrd=prd.filter(prdObj=>prdObj.status===status)
    if(filteredPrd.length===0){
        res.send({message:"No Reviews Found"})
    }
    else{
        res.send({message:filteredPrd})
    }
}))


// To change review status to accept
adminApi.post('/acceptreview',expressErrorHandler(async(req,res)=>{

    let reviewCollectionObj=req.app.get("reviewCollectionObj")

    let reviewObj=req.body;
    let id=req.body._id;
    // console.log(id)
    reviewObj.status="accepted"
    let filteredReview=await reviewCollectionObj.findOne({_id:ObjectId(id)})
    filteredReview.status="accepted"
    await reviewCollectionObj.updateOne({_id:ObjectId(filteredReview._id)},{$set:{...filteredReview}})
    res.send({message:"Review Submitted"})
}))



//delete reviews
adminApi.delete('/deletereview/:id',expressErrorHandler(async(req,res,next)=>{

    let reviewCollectionObj=req.app.get("reviewCollectionObj")

    let id=req.params.id

    let deleted=await reviewCollectionObj.deleteOne({_id:ObjectId(id)})
    // console.log(deleted)
    if(deleted.deletedCount===0){
        res.send({message:"not existed"})
    }
    else{
        res.send({message:"review deleted"})
    }
}))


adminApi.get('/getcontact',expressErrorHandler(async(req,res)=>{

    let contactCollectionObj=req.app.get("contactCollectionObj")
    
    let prd=await contactCollectionObj.find().toArray()
    res.send({message:prd})
    
}))


//export 
module.exports=adminApi