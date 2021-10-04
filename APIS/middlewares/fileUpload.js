//import cloudinary based modules
const cloudinary=require("cloudinary").v2;
const multer=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary")

//configure cloudinary
cloudinary.config({
    cloud_name:'paulycloud',
    api_key:'259989412349571',
    api_secret:'06S59lnrJkBmbh1o_MJF0x7i9c8'
})

//configure multer storage-cloudinary(clStorage=CloudinaryStorage)
const clStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
        return{
            folder:"Project",
            public_id:file.fieldname+'-'+Date.now()
        }
    }
})

//configure multer
const multerObj=multer({storage:clStorage})


module.exports=multerObj;