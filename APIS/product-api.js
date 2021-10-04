//create express app
const exp=require('express')
const productApi=exp.Router();
const expressErrorHandler=require('express-async-handler')
const multerObj=require("./middlewares/fileUpload")


productApi.use(exp.json())


//get products using ASYNC AND AWAIT----------------------------------------------------
productApi.get("/getproducts", expressErrorHandler(async(req,res,next)=>{

    let productCollectionObj=req.app.get("productCollectionObj")

    let productList=await productCollectionObj.find().toArray()
    
    res.send({message:productList})
}))

//get product by product name using ASYNC AND AWAIT---------------------------------------------------
productApi.get("/getproduct/:productname", expressErrorHandler(async(req,res,next)=>{

    let productCollectionObj=req.app.get("productCollectionObj")

    let pn=req.params.productname;
    let productObj=await productCollectionObj.findOne({productname:pn})
    if(productObj===null){

        res.send({message:"No product found"})

    }
    else{

        res.send({message:productObj})

    }
}))

//create product using ASYNC AND AWAIT----------------------------------
productApi.post("/createproduct",multerObj.single('photo'), expressErrorHandler(async(req,res,next)=>{

    let productCollectionObj=req.app.get("productCollectionObj")

    //getproduct
    let newProduct=JSON.parse(req.body.productObj);
    //search for user
    let product=await productCollectionObj.findOne({productname:newProduct.productname})

    //if user is null
    if(product===null){
        //add new property productImage to newuser
        newProduct.productImage=req.file.path;

        //create product
        await productCollectionObj.insertOne(newProduct)
        res.send({message:"New Trip created"})

    }
    else{

        res.send({message:"Trip already existed"})

    }
}))

//update product using ASYNC AND AWAIT----------------------------------------------
productApi.put("/updateproduct/:productname",  expressErrorHandler(async(req,res,next)=>{

    let productCollectionObj=req.app.get("productCollectionObj")

    //get modified obj
    let modifiedProduct=req.body;

    await productCollectionObj.updateOne({productname:modifiedProduct.productname},{$set:{...modifiedProduct}})

    res.send({message:"Trip updated"})
}))

//delete product name using ASYNC AND AWAIT-------------------------------------------
productApi.delete("/deleteproduct/:productname", expressErrorHandler(async(req,res,next)=>{

    let productCollectionObj=req.app.get("productCollectionObj")

    let pn=req.params.productname;
    //delete
    let product=await productCollectionObj.findOne({productname:pn})
    
    if(product===null){
        res.send({message:"Trip not existed to delete"})
    }
    else{
        await productCollectionObj.deleteOne({productname:pn})
        res.send({message:"Trip deleted"})
    }
}))



//export
module.exports=productApi;