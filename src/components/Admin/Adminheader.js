import { Link } from "react-router-dom"


export default function Adminheader()
{
return(
            
            <div>
            <nav className=" navbar navbar-expand-lg navbar-light bg-dark ">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon bg-light"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <div className="d-flex mx-auto ">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item"><Link to="/admin/adminprofile" className="nav-link text-white">Admin Profile</Link></li>
                                <li className="nav-item dropdown ">
                                    <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Location Operations
                                    </a>
                                    <ul className="dropdown-menu adminPro" aria-labelledby="dropdownMenuLink">
                                        <li><Link to="/admin/addproduct" className=" dropdown-item nav-link text-dark">Add Location</Link></li>
                                        <li><Link to="/admin/viewproduct" className=" dropdown-item nav-link text-dark">View Location</Link></li>
                                        
                                    </ul>
                                </li>
                                <li class="nav-item"><Link to="/admin/reviewmanagement" className="nav-link text-white">Review Management</Link></li>
                                <li class="nav-item"><Link to="/admin/customercare" className="nav-link text-white">Customer-Support</Link> </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            </div>

           
    )
}