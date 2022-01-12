import HomePage from "./Components/HomePage/HomePage";
import RouteTo from "./Components/HomePage/RouteTo";
import Login from "./Components/Login/login"
import RegistrationForm from './Components/ProfileComponent/RegistrationForm'
import ProfileComponent from './Components/ProfileComponent/ProfileComponent'

import ShoppingCart from './Components/OrderProcessingSystem/ShoppingCart'
import OrderPlacement from './Components/OrderProcessingSystem/OrderPlacement'
import OrderSuccessful from "./Components/OrderProcessingSystem/OrderSuccessful";

import DisplayAllPersonalisedGifts from "./Components/PersonalisedGiftsCorner/DisplayAllPersonalisedGifts";
import PerosnalisedGiftDetailPage from "./Components/PersonalisedGiftsCorner/PerosnalisedGiftDetailPage";
import ProductDetail from './Components/ProductDetail/ProductDetail'
import React, { useState,useEffect } from "react";
import Orderhistory from './Components/YourOrders/Orderhistory';
import CreateReview from './Components/YourOrders/CreateReview';
import TrackOrder from './Components/YourOrders/TrackOrder';
import CancelOrder from './Components/YourOrders/CancelOrder';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ForgotPasswordUpdate from "./Components/ForgotPassword/ForgotPasswordUpdate";
import UpdateProfile from "./Components/ProfileComponent/UpdateProfile"
import GiftCategories from "./Components/BirthdayGifts/BirthdayGifts"
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from "react-router-dom";
import WeddingGifts from "./Components/WeddingGifts/WeddingGifts";
import AnniversaryGifts from "./Components/AnniversaryGifts/AnniversaryGifts";
import BonVoyageGifts from "./Components/BonVoyageGifts/BonVoyageGifts";
import BirthdayGifts from "./Components/BirthdayGifts/BirthdayGifts";
import WishList from "./Components/WishList/WishList";
import Header from "./Components/Header/Header";
import AboutUs from "./Components/AboutUs/AboutUs";
import ContactUs from "./Components/ContactUs/ContactUs";

function App() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    return (
            <React.Fragment>
               {
                   localStorage.getItem("email")
                   ?
                    <React.Fragment>
                        <Header/>
                        <Router>
                            <Switch>
                                <Route exact path="/">
                                    <Redirect to="/homepage" />
                                </Route>
                                <Route path="/homepage">
                                    <HomePage />
                                </Route>
                                <Route path='/shoppingcart'>
                                    <ShoppingCart/>
                                </Route>
                                <Route path='/my_wishlist'>
                                    <WishList/>
                                </Route>
                                <Route path='/displayPersonalisedGifts'>
                                    <DisplayAllPersonalisedGifts/>
                                </Route>
                                <Route path='/displayPersonalisedGiftsDetail'>
                                    <PerosnalisedGiftDetailPage/>
                                </Route>
                                <Route path="/routeto">
                                    <RouteTo />
                                </Route>
                                <Route path="/birthdaygifts/:id">
                                    <ProductDetail />
                                </Route>
                                <Route path="/weddinggifts/:id">
                                    <ProductDetail />
                                </Route>
                                <Route path="/anniversarygifts/:id">
                                    <ProductDetail />
                                </Route>
                                <Route path="/bonvoyagegifts/:id">
                                    <ProductDetail />
                                </Route>
                                <Route path="/orderhistory">
                                    <Orderhistory />
                                </Route>
                                <Route path="/createreview/:id">
                                    <CreateReview />
                                </Route>
                                <Route path="/cancelorder/:id">
                                    <CancelOrder />
                                </Route>
                                <Route path="/trackorder/:id">
                                    <TrackOrder />
                                </Route>
                                <Route path="/my_profile">
                                    <UpdateProfile/>
                                </Route>
                                <Route path="/birthdaygifts">
                                    <BirthdayGifts/>
                                </Route>
                                <Route path="/weddinggifts">
                                    <WeddingGifts/>
                                </Route>
                                <Route path="/contactus">
                                    <ContactUs/>
                                </Route>
                                <Route path="/anniversarygifts">
                                    <AnniversaryGifts/>
                                </Route>
                                <Route path="/bonvoyagegifts">
                                    <BonVoyageGifts/>
                                </Route>
                                <Route path="/aboutus">
                                    <AboutUs/>
                                </Route>
                                <Route path='/orderplacement'>
                                <OrderPlacement/>
                                </Route>
                                <Route path='/ordersuccessful'>
                                    <OrderSuccessful/>
                                </Route>
                                <Route path='*'>
                                    <Redirect to="/homepage" />
                                </Route>
                            </Switch>
                        </Router>
                    </React.Fragment>
                   :
                   <Router>
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/login" />
                            </Route>
                            <Route path="/registration">
                                <RegistrationForm/>
                            </Route>
                            <Route path="/forgot_password">
                                <ForgotPassword/>
                            </Route>
                            <Route path="/forgot_password_update">
                                <ForgotPasswordUpdate/>
                            </Route>
                            <Route path='/login'>
                                <Login/>
                            </Route>
                            <Route path='*'>
                                <Redirect to="/login" />
                            </Route>
                        </Switch>
                    </Router>
               } 
            </React.Fragment>
    );
}

export default App;
