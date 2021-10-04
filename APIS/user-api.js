//create express app
const exp=require('express');
const userApi=exp.Router();
const expressErrorHandler=require("express-async-handler");
const checkToken=require("./middlewares/verifyToken");
//using bcrypt for hashing password
const bcryptjs= require('bcryptjs');
//using web token
const jwt=require("jsonwebtoken");

const multerObj=require("./middlewares/fileUpload")


userApi.use(exp.json())



//get users using ASYNC AND AWAIT-------------------------------------------------------------

userApi.get("/getusers", expressErrorHandler( async(req,res,next)=>{


    let userCollectionObj=req.app.get("userCollectionObj")

    let userList=await userCollectionObj.find().toArray()
    res.send({message:userList})
}))

//get user by username using ASYNC AND AWAIT-------------------------------------------
userApi.get("/getuser/:username", expressErrorHandler( async(req,res,next)=>{

    let userCollectionObj=req.app.get("userCollectionObj")

    let un=req.params.username;
    let userObj=await userCollectionObj.findOne({username:un})
    if(userObj===null){
        res.send({message:"No user found"})
    }
    else{
        res.send({message:userObj})
    }
}))

//create user using ASYNC AND AWAIT--------------------------------------------
userApi.post("/createuser",multerObj.single('photo'), expressErrorHandler( async(req,res,next)=>{

    let userCollectionObj=req.app.get("userCollectionObj")

    //getuser
    let newUser=JSON.parse(req.body.userObj);
    //search for user
    let user= await userCollectionObj.findOne({username:newUser.username})

    //if user is null
    if(user===null){


        //hash the password
        let hashedPw=await bcryptjs.hash(newUser.password,7)
        //replace the plain password with hashed password
        newUser.password=hashedPw;
        //add new property profileImage to newUser
        newUser.profileImage=req.file.path;

        //create user
        await userCollectionObj.insertOne(newUser)
        res.send({message:"New user created"})
    }
    else{
        res.send({message:"User already existed"})
    }
}))

//update user using ASYNC AND AWAIT-----------------------------------------
userApi.put("/updateuser/:username", expressErrorHandler( async(req,res,next)=>{

    let userCollectionObj=req.app.get("userCollectionObj")

    //get modified obj
    let modifiedUser=req.body;

     //hash the password
     let hashedPw=await bcryptjs.hash(modifiedUser.password,7)
     //replace the plain password with hashed password
     modifiedUser.password=hashedPw;

    await userCollectionObj.updateOne({username:modifiedUser.username},{$set:{...modifiedUser}})

    res.send({message:"User updated"})
}))

//delete username using ASYNC AND AWAIT------------------------------------------------------
userApi.delete("/deleteuser/:username", expressErrorHandler( async(req,res,next)=>{
    
    let userCollectionObj=req.app.get("userCollectionObj")
    
    let un=req.params.username;
    //delete
    let user=await userCollectionObj.findOne({username:un})
    if(user===null){
        res.send({message:"User not existed to delete"})
    }
    else{
        await userCollectionObj.deleteOne({username:un})
        res.send({message:"User deleted"})
    }
}))


//user login
userApi.post("/login", expressErrorHandler( async(req,res,next)=>{
    
    let userCollectionObj=req.app.get("userCollectionObj")

    //get user  credentials
    let credentials=req.body;

    //check for username
    let user=await userCollectionObj.findOne({username:credentials.username})

    //if user not found
    if(user===null){
        res.send({message:"Invalid username"})
    }
    else{
        //compare passwords
        let status =await bcryptjs.compare(credentials.password, user.password)
        console.log("status is",status)
        //if password not matched
        if(status===false){
            res.send({message:"Invalid Password"})
        }
        else{
            //create and send token
            let token= await jwt.sign({username:credentials.username},process.env.SECRET,{expiresIn: 10 })
            //send token to client
            res.send({message:"Login success",token:token,username:credentials.username,userObj:user})
        }
    }
}))



// Add Product to cart
userApi.post('/addtocart',expressErrorHandler(async(req,res,next)=>{

    let userCartCollectionObj=req.app.get("userCartCollectionObj")

    let cartObj=req.body
    delete cartObj.prdObj.description
    cartObj.prdObj.quantity=1
    cartObj.prdObj.price=parseInt(cartObj.prdObj.price)
    cartObj.prdObj.totalprice=cartObj.prdObj.price
    // Checking whether user has prd or not
    let prdPresent=await userCartCollectionObj.findOne({username:cartObj.username})
    console.log(prdPresent)
    if(prdPresent===null){
        // IF user has no product
        userCartCollectionObj.insertOne({username:cartObj.username,products:[
            {
                productname:cartObj.prdObj.productname,
                locationId:cartObj.prdObj.locationId,
                price:cartObj.prdObj.price,
                brand:cartObj.prdObj.brand,
                productdescription:cartObj.prdObj.productdescription,
                productImage:cartObj.prdObj.productImage,
                quantity:cartObj.prdObj.quantity,
                totalprice:cartObj.prdObj.totalprice   
            }
            
        ]})
        
        res.send({message:"New Trip Added"})
    }
    
    else{
        let filteredPrd=prdPresent.products.filter(prdObj=>prdObj.productname===cartObj.prdObj.productname)
        // If user has prd,but not the selected one
        if(filteredPrd.length===0){
            prdPresent.products.push(cartObj.prdObj)
            await userCartCollectionObj.updateOne({username:cartObj.username},{$set:{...prdPresent}})
            res.send({message:"New Trip Added"})
        }
        else{
            // If user has the selected prd, increase the count
            prdPresent.products.forEach((prdObj,ind) => {
                if(prdObj===filteredPrd[0]){
                    filteredPrd[0].quantity=filteredPrd[0].quantity+1
                    filteredPrd[0].totalprice=filteredPrd[0].totalprice+filteredPrd[0].price
                    prdPresent.products=[...prdPresent.products.slice(0,ind),filteredPrd[0],...prdPresent.products.slice(ind+1)]
                }
            });
            await userCartCollectionObj.updateOne({username:cartObj.username},{$set:{...prdPresent}})
            res.send({message:"New Trip Added"})
        }
    }
}))



// Remove product in cart
userApi.post('/removefromcart',expressErrorHandler(async(req,res)=>{

    let userCartCollectionObj=req.app.get("userCartCollectionObj")

    let cartObj=req.body
    delete cartObj.prdObj.description
    // Getting the present data
    let prdPresent=await userCartCollectionObj.findOne({username:cartObj.username})
    let filteredPrd=prdPresent.products.filter(prdObj=>prdObj.productname===cartObj.prdObj.productname)
    //If only 1Prd present 
    if(prdPresent.products.length===1){
        prdPresent.products.forEach((prdObj,ind)=>{
            // If quantity is One
            if(prdObj.quantity===1){
                res.send({message:"Quantity is 1"})
            }else{
            // If quantity is more than one
                    filteredPrd[0].quantity=filteredPrd[0].quantity-1
                    filteredPrd[0].totalprice=filteredPrd[0].totalprice-filteredPrd[0].price
                    prdPresent.products=[...prdPresent.products.slice(0,ind),filteredPrd[0],...prdPresent.products.slice(ind+1)]
                    userCartCollectionObj.updateOne({username:cartObj.username},{$set:{...prdPresent}})
                    res.send({message:"quantity is decreased"})
            }
        })
    }else{
        // If more then one prd
        prdPresent.products.map((prdObj,ind)=>{
            // If prd has only one count, leave it
            if(prdObj===filteredPrd[0] && prdObj.quantity===1){
                res.send({message:"quantity is 1"})
            }// If prd don't have quantity 1,decrease it
            else if(prdObj===filteredPrd[0] && prdObj.quantity>1){
                filteredPrd[0].quantity=filteredPrd[0].quantity-1
                filteredPrd[0].totalprice=filteredPrd[0].totalprice-filteredPrd[0].price
                prdPresent.products=[...prdPresent.products.slice(0,ind),filteredPrd[0],...prdPresent.products.slice(ind+1)]
                userCartCollectionObj.updateOne({username:cartObj.username},{$set:{...prdPresent}})
                res.send({message:"quant is decreased"})
            }
        })
    }
}))

// Delete Prd from Cart
userApi.post('/deletefromcart',expressErrorHandler(async(req,res)=>{

    let userCartCollectionObj=req.app.get("userCartCollectionObj")
    
    let cartObj=req.body
    // Getting the present data
    let prdPresent=await userCartCollectionObj.findOne({username:cartObj.username})
    let filteredPrd=prdPresent.products.filter(prdObj=>prdObj.productname===cartObj.prdObj.productname)
    // if Only 1 prd is there
    if(prdPresent.products.length===1){
        userCartCollectionObj.deleteOne({username:cartObj.username})
        res.send({message:"Item Deleted from Cart"})
    }else{
        // Delete the selected one
    prdPresent.products.forEach((prdObj,ind)=>{
        // If prd don't have quantity 1,decrease it
        if(prdObj===filteredPrd[0]){
            prdPresent.products=[...prdPresent.products.slice(0,ind),...prdPresent.products.slice(ind+1)]
            userCartCollectionObj.updateOne({username:cartObj.username},{$set:{...prdPresent}})
            res.send({message:"Item Deleted From Cart"})
        }
    })
    }
}))


//add to wish list
userApi.post("/addtolist",expressErrorHandler(async(req,res,next)=>{

    let wishlistCollectionObj=req.app.get("wishlistCollectionObj")

    //get user cart obj
    let wishlistObj=req.body;

    //find user in usercartcollection
    let userInList=await wishlistCollectionObj.findOne({username:wishlistObj.username})

    //if user not existed in list
    if(userInList===null){
        //new wishlistObj
        let products=[];
        products.push(wishlistObj.productObj)
        let newUserListObj={username:wishlistObj.username,products:products};

        //console.log(newUserListObj)
        //insert
        await wishlistCollectionObj.insertOne(newUserListObj)
        res.send({message:"Your Trip added to wishlist"})
    }
    //if user already existed in cart
    else{
        userInList.products.push(wishlistObj.productObj)
        //update
        await wishlistCollectionObj.updateOne({username:wishlistObj.username},{$set:{...userInList}})
        res.send({message:"Trip Added to wishlist"})
    }
}))

//delete from wishlist
userApi.post('/deletefromlist',expressErrorHandler(async(req,res,next)=>{

    let wishlistCollectionObj=req.app.get("wishlistCollectionObj")

    let wishlistObj=req.body;
    let prdPresent=await  wishlistCollectionObj.findOne({username:wishlistObj.username})
    let filteredPrd=prdPresent.products.filter(prdObj=>prdObj.productname===wishlistObj.prdObj.productname)
    console.log(filteredPrd)
    // if Only 1 prd is there
    if(prdPresent.products.length===1){
        wishlistCollectionObj.deleteOne({username:wishlistObj.username})
        res.send({message:"Item Deleted from wishlist"})
    }
    else{
        //delete the selectd one
        prdPresent.products.forEach((prdObj,ind)=>{
            if(prdObj===filteredPrd[0]){
                prdPresent.products=[...prdPresent.products.slice(0,ind),...prdPresent.products.slice(ind+1)]
                wishlistCollectionObj.updateOne({username:wishlistObj.username},{$set:{...prdPresent}})
                res.send({message:"Item Deleted From Wishlist"})
            }
        })
    }
}))


//getting from Wishlist collection
userApi.get("/getwishlist/:username",expressErrorHandler(async(req,res,next)=>{
    let wishlistCollectionObj=req.app.get("wishlistCollectionObj")

    let un=req.params.username;
    let listObj=await wishlistCollectionObj.findOne({username:un})
    res.send({message:listObj})
}))


// Store review Info
userApi.post('/addreview',expressErrorHandler(async(req,res)=>{

    let reviewCollectionObj=req.app.get("reviewCollectionObj")

    let reviewObj=req.body;
    reviewObj.status="pending"
    await reviewCollectionObj.insertOne(reviewObj)
    res.send({message:"Review Submitted"})
}))


//get review
userApi.get('/getreviews/:productname',expressErrorHandler(async(req,res)=>{
    
    let productname=req.params.productname
    // console.log(productname)
    let reviewCollectionObj=req.app.get("reviewCollectionObj")
    
    let prd=await reviewCollectionObj.find({productName:productname}).toArray()
    // console.log(prd)
    let filteredPrd=prd.filter(prdObj=>prdObj.status==="accepted")
    if(filteredPrd.length===0){
        res.send({message:"No Reviews Found"})
    }
    else{
        res.send({message:filteredPrd})
    }
}))








//Add Products to myorders
userApi.post('/myorders',expressErrorHandler(async(req,res)=>{

    let orderCollectionObj=req.app.get("orderCollectionObj")
    let userCartCollectionObj=req.app.get("userCartCollectionObj")

    let myorders=req.body;
    //deleting unwanted info
    delete myorders[0].cardholdername
    delete myorders[0].cardnumber
    delete myorders[0].cvv
    delete myorders[0].expiry

    //to generate order id
    let orderId =parseInt(Date.now() + Math.random())
    //creating myOrder Obj
    let myOrder={
        username:myorders[2],
        orders:[{
            userDetails:{
                orderid:orderId,
                name:myorders[0].name,
                email:myorders[0].email,
                mobile:myorders[0].mobile,
                paymentStatus:"Success"
            },
            productDetails:myorders[1],
        }]
    }
    let prdPresent=await orderCollectionObj.findOne({username:myOrder.username})
    if(prdPresent===null){
        await userCartCollectionObj.deleteOne({username:myorders[2]})
        await orderCollectionObj.insertOne(myOrder)
        res.send({message:"Trip Booked"})
    }
    else{
        await userCartCollectionObj.deleteOne({username:myorders[2]})
        prdPresent.orders.push(myOrder.orders[0])
        await orderCollectionObj.updateOne({username:myOrder.username},{$set:{...prdPresent}})
        res.send({message:"Trip is Booked"})
    }
}))

//get myorder items
userApi.get('/getorders/:username',expressErrorHandler(async(req,res)=>{

    let orderCollectionObj=req.app.get("orderCollectionObj")
    
    let username=req.params.username
    let myOrders=await orderCollectionObj.findOne({username:username})
    if(myOrders===null){
        res.send({message:"No Orders Found"})
    }
    else{
        res.send({message:myOrders.orders})
    }
}))


// //get myorder id
// userApi.get('/getorder/:id',expressErrorHandler(async(req,res)=>{

//     let orderCollectionObj=req.app.get("orderCollectionObj")
    
//     let id=req.params.id
//     console.log(req.body)
//     let orderId=orders.userDetails.orderid;
//     let myOrders=await orderCollectionObj.findOne({orderId:id})
//     console.log(myOrders)
//     if(myOrders===null){
//         res.send({message:"No Orders Found"})
//     }
//     else{
//         res.send({message:myOrders.orders})
//     }
// }))

//contact us
userApi.post('/contactus',expressErrorHandler(async(req,res)=>{

    let contactCollectionObj=req.app.get("contactCollectionObj")

    let contactObj=req.body;
    await contactCollectionObj.insertOne(contactObj)
    res.send({message:"Your questions has be noted,Thank you!!!"})
}))








//get products 
userApi.get("/getproducts/:username",expressErrorHandler(async(req,res,next)=>{
    let userCartCollectionObj=req.app.get("userCartCollectionObj")

    let un=req.params.username;
    let cartObj=await userCartCollectionObj.findOne({username:un})
    res.send({message:cartObj})
}))


//testing route
userApi.get('/testing', checkToken, (req,res,next)=>{

    res.send({message:"Private Data"})
})

//export
module.exports=userApi;













// //Order Api
// //add to order list
// userApi.post("/addtoorderlist",expressErrorHandler(async(req,res,next)=>{

//     let orderCollectionObj=req.app.get("orderCollectionObj")

//     //get user order obj
//     let orderObj=req.body;

//     //find user in ordercartcollection
//     let userInList=await orderCollectionObj.findOne({username:orderObj.username})

//     //if user not existed in list
//     if(userInList===null){
//         //new orderlistObj
//         let products=[];
//         products.push(orderObj.productObj)
//         let newUserListObj={username:orderObj.username,products:products};

//         //console.log(newUserListObj)
//         //insert
//         await orderCollectionObj.insertOne(newUserListObj)
//         res.send({message:"Your Order is Placed Successfully"})
//     }
//     //if user already existed in orderlist
//     else{
//         userInList.products.push(orderObj.productObj)
//         //update
//         await orderCollectionObj.updateOne({username:orderObj.username},{$set:{...userInList}})
//         res.send({message:"Your Order is Placed"})
//     }
// }))

// //getting from orderlist collection
// userApi.get("/getorderlist/:username",expressErrorHandler(async(req,res,next)=>{
//     let orderCollectionObj=req.app.get("orderCollectionObj")

//     let un=req.params.username;
//     let orderObj=await orderCollectionObj.findOne({username:un})
//     res.send({message:orderObj})
// }))

