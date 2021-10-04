import './App.css';
import {useState,useEffect} from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Logo from './components/Images/logo.png'
import Register from './components/Register'
import UserCart from './components/UserCart'
import UserProfile from './components/UserProfile'
import ProductDetails from './components/ProductDetails'
import AdminLogin from './components/Admin/AdminLogin'
import AdminBody from './components/Admin/Adminbody'
import UserWishlist from './components/UserWishlist'
import Orders from './components/Orders'
import { BrowserRouter,Route,Switch,Link,Redirect,useHistory } from 'react-router-dom'
import { FaFacebookF ,FaInstagram,FaTwitterSquare,FaLinkedin,FaYoutube } from 'react-icons/fa'
import axios from 'axios';

import Navcomp2a1 from './components/NavComponents/Navcomp2a1'
import Navcomp2a2 from './components/NavComponents/Navcomp2a2'
import Navcomp2a3 from './components/NavComponents/Navcomp2a3'
import Navcomp2a4 from './components/NavComponents/Navcomp2a4'
import Navcomp2b1 from './components/NavComponents/Navcomp2b1'
import Navcomp2b2 from './components/NavComponents/Navcomp2b2'
import Navcomp2b3 from './components/NavComponents/Navcomp2b3'
import Navcomp2b4 from './components/NavComponents/Navcomp2b4'
import Navcomp2c1 from './components/NavComponents/Navcomp2c1'
import Navcomp2c2 from './components/NavComponents/Navcomp2c2'
import Navcomp2d1 from './components/NavComponents/Navcomp2d1'
import Navcomp2d2 from './components/NavComponents/Navcomp2d2'
import Navcomp2d3 from './components/NavComponents/Navcomp2d3'
import Checkout from './components/Checkout';
import ViewProduct from './components/ViewProduct';
import Search from './components/Search'
import './dynamiccards.css'


function App() {
  
  let userDetails=localStorage.getItem('user')
  let [cartCount,setCartCount]=useState(0);
  const [userLoginState, setUserLoginState] = useState(false);
  const [cartObj,setCartObj]=useState('');
  let [pageMonitor,setPageMonitor]=useState(1)

  console.log(cartCount)

  const [cartMonitor,setCartMonitor]=useState(1);


  useEffect(()=>{
    let username=localStorage.getItem("username")
    axios.get(`/user/getproducts/${username}`)
    .then(res=>{
        setCartObj(res.data.message)
        if(res.data.message!==null){
            setCartCount(res.data.message.products.length)    
        }
        else{
            setCartCount(0)
        }
        
    })
    .catch(err=>{
        console.log("Error on reading cart",err)
        alert("Something went wrong in getting cart")
    })
  },[pageMonitor,userLoginState,cartMonitor])

   
  // Adding items to cart
   const addtoCart=(prdObj)=>{
    if(userDetails!==null){
    let userDetails=JSON.parse(localStorage.getItem('user'))
    let username=userDetails.username
    let cartObj={username,prdObj}
    console.log(cartObj)
     // Make req to save data in cart
     axios.post('/user/addtocart',cartObj)
     .then(res=>{
         alert("Trip is added to Cart")
         setCartMonitor(1)
         setPageMonitor(pageMonitor+1)
         console.log(cartObj)
     })
     .catch(err=>console.log(err))
    }
    else{
      alert("Please login to access the cart")
    }
  }


// Remove Items from cart
const removefromCart=(prdObj)=>{
    let userDetails=JSON.parse(localStorage.getItem('user'))
    let username=userDetails.username
    let cartObj={username,prdObj}
    // Make Req to remove item from cart
    axios.post('/user/removefromcart',cartObj)
    .then(res=>{
        setCartMonitor(2)
        alert("Trip is removed")
        setPageMonitor(pageMonitor+1)
    })
    .catch(err=>console.log(err))
  }


// Delete Items from Cart
const deletefromCart=(prdObj)=>{
    let userDetails=JSON.parse(localStorage.getItem('user'))
    let username=userDetails.username
    let cartObj={username,prdObj}
     // Make Req to Delete item from cart
     axios.post('/user/deletefromcart',cartObj)
     .then(res=>{
         alert(res.data.message)
         setCartMonitor(3)
         setPageMonitor(pageMonitor+1)
     })
     .catch(err=>console.log(err))
  }

  
  let[userObj,setUserObj]=useState({});
  
  let username=localStorage.getItem("username")


  useEffect(()=>{
      let userObj=JSON.parse(localStorage.getItem("user"))
      setUserObj({...userObj})
      // let userObj=JSON.parse(localStorage.getItem("user"))
      // setUserObj({...userObj})
  },[username])

  //search
  let [data,setData]=useState([])
  useEffect(()=>{
    axios.get(`product/getproducts`)
    .then(res=>{
        data=res.data;
        setData([...data.message])
        console.log('data is ',data)
    })
  },[])
  console.log(data)


  const onLogout = () => {
    localStorage.clear();
    setUserLoginState(false)
  }


  return (

    <div>
    <BrowserRouter>
          <nav className="first navbar navbar-expand-lg navbar-light sticky-top">
            <div className="container-fluid">
            <Link className="navbar-brand text-light" to="/home"><img src={Logo} width="100" className=""  alt=""/></Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent2" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent2">
                <div className="App d-flex mx-auto">
                        <Search placeholder="Search Destinations,Tours" data={data}/>
                </div>

                <ul className="nav-link list-unstyled">
                    {! userLoginState ?
                      <li><Link className="log navbar-brand text-light"  to="/login">Login</Link></li> :
                          <ul className="list-inline-item  ">
                                <li className="list-inline-item " ><span><img src={userObj.profileImage} width="40px" className="rounded-circle" alt="" /></span></li>
                                <li className="list-inline-item"><span><h5 className="text-white ">{userObj.username}</h5></span></li> 
                          
                                <li className="list-inline-item">
                                  
                                  { username!=="admin" ?
                                  <div  className="dropdown">
                                    <a className="btn  dropdown-toggle text-white" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">My Account</a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <li><Link className="dropdown-item" to="/home">Home</Link></li>
                                        <li><Link className="dropdown-item" to="/userprofile">My Profile</Link></li>
                                        <li><Link className="dropdown-item" to="/userwishlist">My WishList</Link></li>
                                        <li><Link className="dropdown-item" to="/orders">My Orders</Link></li>
                                        <li><Link className="dropdown-item" to="/products">Products</Link></li>
                                    </ul>
                                    <li className="list-inline-item">
                                        <Link className="nav-link text-white" to="/usercart">Cart<span className="badge bg-light text-dark ms-1 me-1">{cartCount}</span></Link>
                                    </li>
                                  </div>:<div></div>
                                  }     
                                </li>
                              <li className="list-inline-item"><Link className="log navbar-brand text-light m-2"  to="/home" onClick={() => onLogout()}>Logout</Link></li>
                          </ul>
                      } 
                  </ul>

              </div>
            </div>
          </nav>

          {/* 2nd Navbar */}
          { username!=="admin" ?
          <div>
          <nav className=" navbar navbar-expand-lg navbar-light bg-dark ">
              <div className="container-fluid">
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon bg-light"></span>
                  </button>
                  <div className="collapse navbar-collapse " id="navbarSupportedContent">
                      <div className="d-flex mx-auto ">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-light pe-5" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Trending Locations
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                      <li><Link className="dropdown-item" to="/delhi">Delhi</Link></li>
                                      <li><Link className="dropdown-item" to="/mumbai">Mumbai</Link></li>
                                      <li><Link className="dropdown-item" to="/jaipur">Jaipur</Link></li>
                                      <li><Link className="dropdown-item" to="/bangalore">Bangalore</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-light pe-5" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Adventure Sports
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                      <li><Link className="dropdown-item" to="/scubadiving">Scuba Diving</Link></li>
                                      <li><Link className="dropdown-item" to="/trekking">Trekking</Link></li>
                                      <li><Link className="dropdown-item" to="/bungeejump">Bungee Jump</Link></li>
                                      <li><Link className="dropdown-item" to="/cliffjumping">Cliff Jumping</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-light pe-5" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Explore
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                      <li><Link className="dropdown-item" to="/staycations">Staycations</Link></li>
                                      <li><Link className="dropdown-item" to="/collections">Collections</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-light pe-5" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    More
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                      <li><Link className="dropdown-item" to="/contactus">Contact-Us</Link></li>
                                      <li><Link className="dropdown-item" to="/aboutus">About Us</Link></li>
                                      <li><Link className="dropdown-item" to="/privacypolicy">Privacy Policy</Link></li>
                                    </ul>
                                </li>
                            </ul>
                      </div>
                  </div>
              </div>
            </nav>
          </div> : <div></div>
          }
 


    <Switch>
    <Route path="/home">
        <Home addtoCart={addtoCart}/>
      </Route>

      <Route path="/login">
        <Login setUserStatus={setUserLoginState} />
      </Route>

      <Route path="/register">
        <Register/>
      </Route>

      <Route path="/productdetails">
        <ProductDetails addtoCart={addtoCart} setCartMonitor={setCartMonitor}/>
      </Route>


      <Route path="/userprofile">
        <UserProfile />
      </Route>

      <Route path="/usercart">
        <UserCart cartObj={cartObj} addtoCart={addtoCart} removefromCart={removefromCart} deletefromCart={deletefromCart}/>
      </Route>

      <Route path="/admin">
        <AdminLogin setUserStatus={setUserLoginState}/>
      </Route>

      {/* This for search operations */}
      <Route path="/productdetails/:productname">
        <ProductDetails addtoCart={addtoCart} setCartMonitor={setCartMonitor}/>
      </Route>

      <Route path="/adminbody">
        <AdminBody/>
      </Route>

      <Route path="/userwishlist">
        <UserWishlist addtoCart={addtoCart}/>
      </Route> 

      <Route path='/checkout'>
        <Checkout setCartCount={setCartCount} />
      </Route>

      <Route path='/orders'>
        <Orders/>
      </Route>

      <Route path="/products">
        <ViewProduct addtoCart={addtoCart}/>
      </Route>

      <Route path="/delhi">
        <Navcomp2a1 addtoCart={addtoCart} />
      </Route>
      <Route path="/mumbai">
        <Navcomp2a2 addtoCart={addtoCart}/>
      </Route>
      <Route path="/jaipur">
        <Navcomp2a3 addtoCart={addtoCart}/>
      </Route>
      <Route path="/bangalore">
        <Navcomp2a4 addtoCart={addtoCart}/>
      </Route>

      <Route path="/scubadiving">
        <Navcomp2b1 addtoCart={addtoCart}/>
      </Route>
      <Route path="/trekking">
        <Navcomp2b2 addtoCart={addtoCart}/>
      </Route>
      <Route path="/bungeejump">
        <Navcomp2b3 addtoCart={addtoCart}/>
      </Route>
      <Route path="/cliffjumping">
        <Navcomp2b4 addtoCart={addtoCart}/>
      </Route>

      <Route path="/staycations">
        <Navcomp2c1 addtoCart={addtoCart}/>
      </Route>
      <Route path="/collections">
        <Navcomp2c2 addtoCart={addtoCart}/>
      </Route>
     

      <Route path="/contactus">
        <Navcomp2d1 />
      </Route>

      <Route path="/aboutus">
        <Navcomp2d2 />
      </Route>
      <Route path="/privacypolicy">
        <Navcomp2d3 />
      </Route>

      <Route path="/">
        <Redirect to="/home"/>
      </Route>

      <Route path="/adminbody">
        <Redirect to="/adminbody"/>
      </Route>

    </Switch>

    </BrowserRouter>

    <div className="footer bg-dark p-3 mt-1">
          <h1 className="text-center text-dark">𝓣𝓱𝓻𝓲𝓵𝓵𝓮𝔁.𝓬𝓸𝓶</h1>
            <div className="d-flex justify-content-center p-5"> 
              <div className="rows">
                  <div className="cols">
                    <a className="w-100 p-5" href="https://www.facebook.com/"><FaFacebookF size = '30px'/></a>
                    <a className="w-100 p-5" href="https://www.instagram.com/accounts/login/"><FaInstagram size = '30px'/></a>
                    <a className="w-100 p-5" href="https://twitter.com/login?lang=en"><FaTwitterSquare size = '30px'/></a>
                    <a className="w-100 p-5" href="https://www.linkedin.com/signup"><FaLinkedin size = '30px'/></a>
                    <a className="w-100 p-5" href="https://www.youtube.com/account"><FaYoutube size = '30px'/></a>
                  </div>
              </div>
            </div>
            <h3 className="text-center text-light mb-3">© 2021 Thrillex.com All rights reserved.</h3>
            <p className="text-center text-light">
              The content and images used on this site are copyright protected and copyrights vests with the respective owners. The usage of the content and images on this website is intended to promote the works and no endorsement of the artist shall be implied. Unauthorized use is prohibited and punishable by law.
            </p>
      </div>


    </div>
  );
}

export default App;
