// author: Samir Anwar Rana, Anjali Chaudhary
import './Header.css';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { faInstagram, faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import travel from './images/travel.jpg';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Logo from "./images/logo.PNG";
import Search from "./images/search-icon.png";
import Wishlist from "./images/wishlist.png";
import MyOrders from "./orders.png";
import Shoppingcart from "./images/shopping-cart.png";
import Profile from "./images/user.png";
import React, { useState, useEffect } from "react";
import backendurl from "../config.json";
import Axios from "axios";

//Use the import statements above in your classes

function Header() {

// use the methods here 

const [email, setEmail] = useState(localStorage.getItem("email"))
const [showDropdown, setShowDropDown] = useState(false)
const [backendUrl, setBackendUrl] = useState("http://localhost:9000")
const [countWL, setCountWL] = useState(0)
const [searchText, setsearchText] = useState("");

async function navigateToCart(){
  window.location.href="/shoppingcart"
};

async function toggleDropDown(){
  setShowDropDown(!showDropdown)
};

async function myProfile(){
  window.location.href="/my_profile"
};
  async function updateProfile(){
    window.location.href="/update_profile"
  };
 
  async function navigateToOrders(){
    window.location.href="/orderhistory"
  };


async function logout(){
  localStorage.removeItem("email")
  window.location.href="/login"
};

async function navigateToWishList(){
  window.location.href="/my_wishlist"
}

function searchTextFunction(searchText){
  console.log("Search text : "+searchText);
  if(searchText.toLowerCase() === "birthday" || searchText.toLowerCase() === "birthday gifts"){
    window.location.href="/birthdaygifts";
  }else if(searchText.toLowerCase() === "anniversary" || searchText.toLowerCase() === "anniversary gifts"){
    window.location.href="/anniversarygifts";
  }else if(searchText.toLowerCase() === "wedding" || searchText.toLowerCase() === "wedding gifts"){
    window.location.href="/weddinggifts";
  }else if(searchText.toLowerCase() === "bon voyage" || searchText.toLowerCase() === "bon voyage gifts"){
    window.location.href="/bonvoyagegifts";
  }else{
    Axios.get(backendurl.url+"/products/getProductsByName/"+searchText,{

    }).then((data)=>{
     console.log(data.data.products[0].productType);
     if( data.data.products[0].productType === 'Birthday'){
      window.location.href="/birthdaygifts/"+data.data.products[0]._id;
     }else if(data.data.products[0].productType === 'Wedding'){
      window.location.href="/weddinggifts/"+data.data.products[0]._id;
     }else if(data.data.products[0].productType === 'Anniversary'){
      window.location.href="/anniversarygifts"+data.data.products[0]._id;
     }else if(data.data.products[0].productType === 'Bon'){
      window.location.href="/bonvoyagegifts"+data.data.products[0]._id;
     }
    })
  }
}
  
  useEffect(async () =>{
    await fetch(backendurl.url+"/user/"+localStorage.getItem("email"))
        .then((res)=>res.json())
        .then(async (data)=>{
            let user = data.user[0]
            let wishlist = user.wishlist
            let count = 0
            for(let i=0;i<wishlist.length;i++)
            {
              count += wishlist[i].wishlistItems.length
            }
            setCountWL(count)
        })
  },[])

  return (
    <>
      <div className="title-bar">
      <div className="logo">
        <img src={Logo} width='250' height='65'></img>
      </div>
      <div className="search-box">
      <div className="search-bar">
      <input type = "text" id = "searchBar" oninput = "Search((this.value).toLowerCase())" onChange={(e) => { setsearchText(e.target.value)}} 
       placeholder = "Search..."/>
      </div>
      <span className="search-icon-bar">
        <img src={Search} onClick={() => searchTextFunction(searchText)} width='25' height='25'></img> 
      </span>
      </div>
      <div className='title-bar-section3'>
      <span className='icon1'>
          <img src={MyOrders} onClick={navigateToOrders} width='25' height='25'></img>
        </span>
        <span className='icon1'>
          <img src={Wishlist} onClick={navigateToWishList} width='25' height='25'></img>
          <sup><span class="badge badge-info set-wl-badge">{countWL}</span></sup>
        </span>
        <span className='icon2'>
          <img src={Shoppingcart} onClick={navigateToCart} width='25' height='25'></img>
        </span>
        <span className='icon2'>
          <img src={Profile} onClick={toggleDropDown} width='25' height='25'></img>
        </span>
      </div>
      </div>
      {
        showDropdown ? 
        <div className="set-dropdown">
          <h5 className="set-dropdown-h">{email}</h5>
          <hr className="set-dropdown-hr"></hr>
          <div className="set-dropdown-btn-1" onClick={myProfile}>
          <span className="set-dropdown-span" onClick={myProfile}>My Profile</span>
          </div>
          <hr className="set-dropdown-hr"></hr>
          <div className="set-dropdown-btn-1" onClick={logout}>
            <span className="set-dropdown-span" onClick={logout}>Logout</span>
          </div>
        </div>
        :
        ""
      }
      
      <div className='navbar-outer'>
        <Navbar collapseOnSelect expand="lg" bg="light" className='text-color'>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-center" activeKey="/homepage">
              <Nav.Link href="/homepage">Home</Nav.Link>
              <Nav.Link href="/homepage">         </Nav.Link>
              <Nav.Link href="/homepage">|        </Nav.Link>
              <Nav.Link href="/aboutus">About Us</Nav.Link>
              <Nav.Link href="/aboutus">         </Nav.Link>
              <Nav.Link href="/aboutus">|        </Nav.Link>
              <Nav.Link href="/contactus">Contact Us</Nav.Link>
              <Nav.Link href="/contactus">         </Nav.Link>
              <Nav.Link href="/contactus">|        </Nav.Link>
              <NavDropdown title="Shop" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/birthdaygifts">Birthday gifts</NavDropdown.Item>
                <NavDropdown.Item href="/weddinggifts">Wedding gifts</NavDropdown.Item>
                <NavDropdown.Item href="/anniversarygifts">Anniversary gifts</NavDropdown.Item>
                <NavDropdown.Item href="/bonvoyagegifts">Bon Voyage gifts</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

    </>

  );
}

export default Header;
