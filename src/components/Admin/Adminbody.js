import Adminheader from "./Adminheader";
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import AddProduct from './AddProduct';
import ViewProduct from "../ViewProduct";
import React from 'react'
import AdminProfile from './AdminProfile'
import ReviewMangement from "./ReviewManagement";
import Customercare from "./Customercare";
import {Suspense,Lazy} from 'react'
// const ViewProduct = React.lazy(()=>import('../ViewProduct'))



export default function Adminbody(){


    return(
        <BrowserRouter>
        <Adminheader />
        <div className="admin">
            <Switch>
                <Route path="/admin/adminprofile">
                    <AdminProfile/>
                </Route>

                <Route path="/admin/addproduct">
                    <AddProduct />
                </Route>

                <Route path="/admin/viewproduct">
                    <ViewProduct />
                </Route>
                
                <Route path="/admin/reviewmanagement">
                    <ReviewMangement/>
                </Route>

                <Route path="/admin/customercare">
                    <Customercare/>
                </Route>


                <Route path="/adminbody">
                    <Redirect to="/admin/adminprofile"/>
                </Route>
            </Switch>
        </div>
        </BrowserRouter>

    )
}