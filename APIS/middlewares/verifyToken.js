const jwt=require("jsonwebtoken")
const checkToken=(req,res,next)=>{
    //get token from header of req obj
    

    try{
        let token=req.headers.authorization.split(" ")[1]
        jwt.verify(token,process.env.SECRET)
        next()

    }
    catch(err){
        if(err.message==="jwt malformed")
            res.send({message:"Token not existed . Unauthorised access"})
        if(err.message=="jwt expired")
        res.send({message:"Session expired..."})
    }
}

module.exports=checkToken;