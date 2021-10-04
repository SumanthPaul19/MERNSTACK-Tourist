//create express app
const exp=require('express')
const app=exp();
const path=require("path")
require('dotenv').config()

//connect frontend and backend
app.use(exp.static(path.join(__dirname,'./dist/')))

//imports apis
const userApi=require("./APIS/user-api")
const productApi=require("./APIS/product-api")
const adminApi=require("./APIS/admin-api")

//evaluate path to execute specific api based on path
app.use("/user",userApi)
app.use("/product",productApi)
app.use("/admin",adminApi)

//for page reload  error 
app.get('/*', (req, res)=> {
    
    res.sendFile(path.join(__dirname, './dist/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

//get mongo client
const mc=require("mongodb").MongoClient;

//database Url
//const databaseUrl="mongodb+srv://sumanthpaul:sumanthpaul@cluster0.uu9fv.mongodb.net/Projectdb?retryWrites=true&w=majority"

//const databaseUrl="mongodb://sumanthpaul:sumanthpaul@cluster0-shard-00-00.uu9fv.mongodb.net:27017,cluster0-shard-00-01.uu9fv.mongodb.net:27017,cluster0-shard-00-02.uu9fv.mongodb.net:27017/Projectdb?ssl=true&replicaSet=atlas-y8k7y4-shard-0&authSource=admin&retryWrites=true&w=majority"

// const databaseUrl=process.env.DATABASE_URL

const databaseUrl=process.env.DATABASE_URL1

//connect to db
mc.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err){
        console.log("Error in the db connection",err)
    }
    else{
        //get database object
        databaseObj = client.db("Projectdb")

        //create collection Obj
        let userCollectionObj=databaseObj.collection("usercollection")
        let productCollectionObj=databaseObj.collection("productcollection")
        let adminCollectionObj=databaseObj.collection("admincollection")
        let userCartCollectionObj=databaseObj.collection("usercartcollection")
        let wishlistCollectionObj=databaseObj.collection("wishlistcollection")
        let reviewCollectionObj=databaseObj.collection("reviewcollection")
        let orderCollectionObj=databaseObj.collection("ordercollection")
        let contactCollectionObj=databaseObj.collection("contactcollection")

        //sharing collection to API's
        app.set("userCollectionObj",userCollectionObj)
        app.set("productCollectionObj",productCollectionObj)
        app.set("adminCollectionObj",adminCollectionObj)
        app.set("userCartCollectionObj",userCartCollectionObj)
        app.set("wishlistCollectionObj",wishlistCollectionObj)
        app.set("reviewCollectionObj",reviewCollectionObj)
        app.set("orderCollectionObj",orderCollectionObj)
        app.set("contactCollectionObj",contactCollectionObj)
        
        console.log("Database connected...")
    }
})


//handling unavailble paths
app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is not matched`})
})

//error handling middleware(for syntax errors)
app.use((err,req,res,next)=>{
    res.send({message:err.message})
})




//assign port number
//const port=8080; OR
const port=process.env.PORT ;
app.listen(port,()=>console.log(`Server running on port ${port}...`))