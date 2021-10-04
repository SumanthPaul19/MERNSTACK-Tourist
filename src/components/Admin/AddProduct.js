import axios from 'axios';
import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
// import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {FaBackward} from 'react-icons/fa';



export default function AddProduct(){

    // let history=useHistory();

    const {register,handleSubmit,formState:{errors}}=useForm();

    const[file,setFile]=useState(null)

    //when form is submitted
    const onFormSubmit=(productObj)=>{

        //create FormData Object
        let formData=new FormData();
        //add image to formdata obj
        formData.append('photo',file,file.name)
        //add userobj to formdata obj
        formData.append("productObj",JSON.stringify(productObj))

        //pass it to userApi  by making http post request
        axios.post('/product/createproduct',formData)
        .then(res=>{
            console.log(res.data)
            alert(res.data.message)

        })
        // history.push('/adminprofile')
        
    }

    //when file is selected
    const onFileSelect=(event)=>{
        setFile(event.target.files[0])
    }

    return(
        <div className="body2">
        
        <div className="containerreg">
            <h1 className="head-1 text-center text-info mt-4">Add Products to your Product List</h1>
            <form className="inputs w-50 mx-auto mb-5" onSubmit={handleSubmit(onFormSubmit)}>
                    {/* product-name */}
                    <label htmlFor="pn" className="mt-3">Location-Name</label>
                    <input type="text" id="pn" {...register('productname',{required:true,minLength:2})} className="form-control mb-3 rounded-pill" />
                    {/*productname validation */}
                    {errors.productname?.type=== 'required' && <p className="text-danger">*Location-name is required</p>}
                    {errors.productname?.type=== 'minLength' && <p className="text-danger">*Min-Length should be 2</p>}

                    {/*Location ID */}
                    <label htmlFor="pi" className="mt-3">Location-Id</label>
                    <input type="text" id="pi" {...register('locationId',{required:true,minLength:2})} className="form-control mb-3 rounded-pill" />
                    {/*LocationID validation */}
                    {errors.locationId?.type=== 'required' && <p className="text-danger">*Location-ID is required</p>}
                    {errors.locationId?.type=== 'minLength' && <p className="text-danger">*Min-Length should be 2</p>}

                    <label htmlFor="pi" className="mt-3">Placing-Id(a-your dream starts here cards,b-top rated experiences,c-exotic homestays</label>
                    <input type="text" id="pi" {...register('placingId',{minLength:1})} className="form-control mb-3 rounded-pill" />
                    {/*PlacingID validation */}
                    {/* {errors.locationId?.type=== 'required' && <p className="text-danger">*Placing-ID is required</p>} */}
                    {/* {errors.locationId?.type=== 'minLength' && <p className="text-danger">*Min-Length should be 1</p>} */}

                    {/*category-ID*/}
                    <label htmlFor="pi" className="mt-3">Category-Id</label>
                    <input type="text" id="pi" {...register('Category',{required:true,minLength:5})} className="form-control mb-3 rounded-pill" />
                    {/*category-ID validation */}
                    {errors.CategoryId?.type=== 'required' && <p className="text-danger">*CategoryId-ID is required</p>}
                    {errors.CategoryId?.type=== 'minLength' && <p className="text-danger">*Min-Length should be 5</p>}

                    {/*repeatID  */}
                    <label htmlFor="pi" className="mt-3">Repeat-Id(Trending Adventures)</label>
                    <input type="text" id="pi" {...register('repeatId')} className="form-control mb-3 rounded-pill" />

                     {/* price */}
                     <label htmlFor="pr">Price</label>
                    <input type="number" id="pr" {...register('price',{required:true})} className="form-control mb-3 rounded-pill" />
                    {/*price validation */}
                    {errors.price && <p className="text-danger">*Please enter the price</p>}

                    {/* brand */}
                    <label htmlFor="b">Location</label>
                    <input type="text" id="b" {...register('brand',{required:true})} className="form-control mb-3" />
                    {/*brand validation */}
                    {errors.brand && <p className="text-danger">*please enter brand</p>}

                    {/* TEXT AREA */}
                    <label htmlFor="ta">Description</label>
                    <textarea id="ta" {...register('productdescription',{required:true})} className="form-control mb-3" />
                    {/* text area validation */}
                    {errors.productdescription && <p className="text-danger">*Description is required</p>}

                    {/* PHOTO */}
                    <label htmlFor="">Location-Image</label>
                    <input type="file" name="photo" className="form-control mb-3" onChange={(e=>(onFileSelect(e)))}/>

                    <button type="submit" className="btnr  btnr-success text-white rounded-pill">Add Product</button>
            </form>
        </div>
        </div>
    )
}