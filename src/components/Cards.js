import {useEffect,useState} from 'react'
import img1 from './Images/Carousel2.jpg'
import img2 from './Images/Carousel1.jpg'
import img3 from './Images/carousel3.png'
import { Link,useHistory,useParams } from 'react-router-dom'
import axios from 'axios'
import { Modal,Button } from 'react-bootstrap';

export default function Cards(props){

    let addtoCart=props.addtoCart;

    const[show,setShow]=useState(false);
    const[show1,setShow1]=useState(false);
    const[show2,setShow2]=useState(false);
    const[show3,setShow3]=useState(false);
    const[show4,setShow4]=useState(false);
    const[show5,setShow5]=useState(false);
    const[show6,setShow6]=useState(false);
    const handleClose = () => {setShow(false);setShow1(false);setShow2(false);setShow3(false);setShow4(false);setShow5(false);setShow6(false) }

    
    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);
    const handleShow2 = () => setShow2(true);
    const handleShow3 = () => setShow3(true);
    const handleShow4 = () => setShow4(true);
    const handleShow5 = () => setShow5(true);
    const handleShow6 = () => setShow6(true);


    let [userObj,setUserObj]=useState({});
    let url=useParams();
    let history=useHistory();
    let username=url.username;
    let [product,setProduct]=useState([])
    useEffect(()=>{
        axios.get('/product/getproducts')
        .then(res=>{
            let productObj=res.data
            setProduct([...productObj.message])
        })
        setUserObj({...userObj})
    },[username])

  const onCardClick=(productname)=>{
    localStorage.setItem("productname",productname)
    history.push('/productdetails')
    console.log("Product card",productname)
  }


  


    return(
        //card group-1
        <div className="container mt-5">

                    {/* Ending Carousel */}
                    <div id="carouselExampleDark1" className="carousel carousel-dark slide mt-5 mb-5" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleDark1" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleDark1" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleDark1" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active" data-bs-interval="10000">
                                <img src={img1} className="d-block w-100" alt="..."/>
                            </div>
                            <div className="carousel-item" data-bs-interval="2000">
                                <img src={img2} className="d-block w-100" alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img src={img3} className="d-block w-100" height="303" alt="..."/>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark1" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark1" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                    <h1 className="head-1 text-center mt-3">Destinations Near You!</h1> <hr className="bg-danger"/>
                    
                    <div className="btn-group d-flex justify-content-center">
                        <div className="row">
                            <div className="cols">
                               
                                <Button variant="outline-warning m-3 rounded-pill" onClick={handleShow}>
                                       Delhi
                                </Button>

                                    <Modal centered show={show} size="lg" onHide={handleClose} aria-labelledby="example-modal-sizes-title-lg">
                                        <Modal.Header >
                                        <Modal.Title id="example-modal-sizes-title-lg">Delhi</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="Modal">
                                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                                        {product &&
                                            product.map((productObj,index)=>{
                                                if(productObj.locationId==="Delhi"){
                                                return(
                                                    <div class="col" key={index}>
                                                        <div className="product_card w-100 mx-auto mt-5" height="300px">
                                                        <Link to="/productdetails"><img src={productObj.productImage} class="card-img-top" width="300" height="300" alt="..." onClick={()=>onCardClick(productObj.productname)}/></Link>
                                                            <div className="card-body">
                                                                <h5 class="card-title text-start">Name : {productObj.productname}</h5>
                                                                <h5 class="text-start">Location : {productObj.brand}</h5>
                                                                <h5 class="text-start">Price : {productObj.price}</h5>
                                        
                                                                
                                                                    <div class="d-flex float-end">
                                                                        <button className="btn btn-primary float-end" onClick={()=>addtoCart(productObj)}>Book Now</button>  
                                                                    </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            })

                                            }
                                        </div>

                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>


                                    <Button variant="outline-info m-3 rounded-pill" onClick={handleShow1}>
                                       Bangalore
                                    </Button>
                                   
                                    <Modal centered show={show1} size="lg" onHide={handleClose} aria-labelledby="example-modal-sizes-title1-lg">
                                       
                                        <Modal.Header>
                                        <Modal.Title id="example-modal-sizes-title1-lg">Bangalore</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="Modal">
                                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                                        {product &&
                                            product.map((productObj,index)=>{
                                                if(productObj.locationId==="Bangalore"){
                                                return(
                                                    <div class="col" key={index}>
                                                        <div className="product_card w-100 mx-auto mt-5" height="300px">
                                                        <Link to="/productdetails"><img src={productObj.productImage} class="card-img-top" width="300" height="300" alt="..." onClick={()=>onCardClick(productObj.productname)}/></Link>
                                                            <div className="card-body">
                                                                <h5 class="card-title text-start">Name : {productObj.productname}</h5>
                                                                <h5 class="text-start">Location : {productObj.brand}</h5>
                                                                <h5 class="text-start">Price : {productObj.price}</h5>
                                        
                                                                
                                                                    <div class="d-flex float-end">
                                                                        <button className="btn btn-primary float-end" onClick={()=>addtoCart(productObj)}>Book Now</button>  
                                                                    </div>
                                                                     


                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            })

                                            }
                                        </div>

                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>

                                    <Button variant="outline-warning m-3 rounded-pill" onClick={handleShow2}>
                                       Mumbai
                                    </Button>

                                    <Modal centered show={show2} size="lg" onHide={handleClose} aria-labelledby="example-modal-sizes-title-lg">
                                        <Modal.Header >
                                        <Modal.Title id="example-modal-sizes-title-lg">Escapes in Mumbai!</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="Modal">
                                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                                        {product &&
                                            product.map((productObj,index)=>{
                                                if(productObj.locationId==="Mumbai"){
                                                return(
                                                    <div class="col" key={index}>
                                                        <div className="product_card w-100 mx-auto mt-5" height="300px">
                                                        <Link to="/productdetails"><img src={productObj.productImage} class="card-img-top" width="300" height="300" alt="..." onClick={()=>onCardClick(productObj.productname)}/></Link>
                                                            <div className="card-body">
                                                                <h5 class="card-title text-start">Name : {productObj.productname}</h5>
                                                                <h5 class="text-start">Location : {productObj.brand}</h5>
                                                                <h5 class="text-start">Price : {productObj.price}</h5>
                                        
                                                               
                                                                    <div class="d-flex float-end">
                                                                        <button className="btn btn-primary float-end" onClick={()=>addtoCart(productObj)}>Book Now</button>  
                                                                    </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            })

                                            }
                                        </div>

                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                
                                
                                    <Button variant="outline-info m-3 rounded-pill" onClick={handleShow3}>
                                       Jaipur
                                </Button>

                                    <Modal centered show={show3} size="lg" onHide={handleClose} aria-labelledby="example-modal-sizes-title-lg">
                                        <Modal.Header >
                                        <Modal.Title id="example-modal-sizes-title-lg">Escapes in Jaipur!</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="Modal">
                                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                                        {product &&
                                            product.map((productObj,index)=>{
                                                if(productObj.locationId==="Jaipur"){
                                                return(
                                                    <div class="col" key={index}>
                                                        <div className="product_card w-100 mx-auto mt-5" height="300px">
                                                        <Link to="/productdetails"><img src={productObj.productImage} class="card-img-top" width="300" height="300" alt="..." onClick={()=>onCardClick(productObj.productname)}/></Link>
                                                            <div className="card-body">
                                                                <h5 class="card-title text-start">Name : {productObj.productname}</h5>
                                                                <h5 class="text-start">Location : {productObj.brand}</h5>
                                                                <h5 class="text-start">Price : {productObj.price}</h5>
                                        
                                                               
                                                                    <div class="d-flex float-end">
                                                                        <button className="btn btn-primary float-end" onClick={()=>addtoCart(productObj)}>Book Now</button>  
                                                                    </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            })

                                            }
                                        </div>

                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                        
                                    <Button variant="outline-warning m-3 rounded-pill" onClick={handleShow4}>
                                       Pune
                                </Button>

                                    <Modal centered show={show4} size="lg" onHide={handleClose} aria-labelledby="example-modal-sizes-title-lg">
                                        <Modal.Header >
                                        <Modal.Title id="example-modal-sizes-title-lg">Escapes in Pune!</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="Modal">
                                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                                        {product &&
                                            product.map((productObj,index)=>{
                                                if(productObj.locationId==="Pune"){
                                                return(
                                                    <div class="col" key={index}>
                                                        <div className="product_card w-100 mx-auto mt-5" height="300px">
                                                        <Link to="/productdetails"><img src={productObj.productImage} class="card-img-top" width="300" height="300" alt="..." onClick={()=>onCardClick(productObj.productname)}/></Link>
                                                            <div className="card-body">
                                                                <h5 class="card-title text-start">Name : {productObj.productname}</h5>
                                                                <h5 class="text-start">Location : {productObj.brand}</h5>
                                                                <h5 class="text-start">Price : {productObj.price}</h5>
                                        
                                                                    <div class="d-flex float-end">
                                                                        <button className="btn btn-primary float-end" onClick={()=>addtoCart(productObj)}>Book Now</button>  
                                                                    </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            })

                                            }
                                        </div>

                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>

                                    <Button variant="outline-info m-3 rounded-pill" onClick={handleShow5}>
                                      Chandigarh
                                </Button>

                                    <Modal centered show={show5} size="lg" onHide={handleClose} aria-labelledby="example-modal-sizes-title-lg">
                                        <Modal.Header >
                                        <Modal.Title id="example-modal-sizes-title-lg">Escapes in Chandigarh!</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="Modal">
                                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                                        {product &&
                                            product.map((productObj,index)=>{
                                                if(productObj.locationId==="Chandigarh"){
                                                return(
                                                    <div class="col" key={index}>
                                                        <div className="product_card w-100 mx-auto mt-5" height="300px">
                                                        <Link to="/productdetails"><img src={productObj.productImage} class="card-img-top" width="300" height="300" alt="..." onClick={()=>onCardClick(productObj.productname)}/></Link>
                                                            <div className="card-body">
                                                                <h5 class="card-title text-start">Name : {productObj.productname}</h5>
                                                                <h5 class="text-start">Location : {productObj.brand}</h5>
                                                                <h5 class="text-start">Price : {productObj.price}</h5>
                                                  
                                                                    <div class="d-flex float-end">
                                                                        <button className="btn btn-primary float-end" onClick={()=>addtoCart(productObj)}>Book Now</button>  
                                                                    </div>
                                        
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            })

                                            }
                                        </div>

                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    
                                    <Button variant="outline-warning m-3 rounded-pill" onClick={handleShow6}>
                                      Chennai
                                </Button>

                                    <Modal centered show={show6} size="lg" onHide={handleClose} aria-labelledby="example-modal-sizes-title-lg">
                                        <Modal.Header >
                                        <Modal.Title id="example-modal-sizes-title-lg">Escapes in Chennai!</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="Modal">
                                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                                        {product &&
                                            product.map((productObj,index)=>{
                                                if(productObj.locationId==="Chennai"){
                                                return(
                                                    <div class="col" key={index}>
                                                        <div className="product_card w-100 mx-auto mt-5" height="300px">
                                                        <Link to="/productdetails"><img src={productObj.productImage} class="card-img-top" width="300" height="300" alt="..." onClick={()=>onCardClick(productObj.productname)}/></Link>
                                                            <div className="card-body">
                                                                <h5 class="card-title text-start">Name : {productObj.productname}</h5>
                                                                <h5 class="text-start">Location : {productObj.brand}</h5>
                                                                <h5 class="text-start">Price : {productObj.price}</h5>
                                                             
                                                                    <div class="d-flex float-end">
                                                                        <button className="btn btn-primary float-end" onClick={()=>addtoCart(productObj)}>Book Now</button>  
                                                                    </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            })

                                            }
                                        </div>

                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                
                            </div>
                        </div>
                    </div>

      
                    
                

        </div>  
    )
}