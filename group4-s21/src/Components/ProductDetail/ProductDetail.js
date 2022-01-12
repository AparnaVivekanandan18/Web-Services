// author: Samir Anwar Rana
import pic from './Teddybear.jpeg'
import './productdetail.css';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { faInstagram, faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import travel from '../Header/images/travel.jpg';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Logo from "../Header/images/logo.PNG";
import Search from "../Header/images/search-icon.png";
import Wishlist from "../Header/images/wishlist.png";
import Shoppingcart from "../Header/images/shopping-cart.png";
import Profile from "../Header/images/user.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom'
import { QuantityPicker } from 'react-qty-picker';
import Container from 'react-bootstrap/Container';
import backendurl from "../config.json"
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


function ProductDetail() {

    const params = useParams()

    const handleClick = (id) => {

        // let cartTmp = cart
        // cartTmp.push({ giftId: id, quantity: quantiyValue})
        // const username = { username: localStorage.getItem("email"), cart:  cartTmp};
        const username = { username: localStorage.getItem("email"), productId: id, quantity: quantiyValue };
        axios.post(backendurl.url+ "/user/addproduct/" , username).then((response) =>
            {
                alert("Added product to cart");

            }
        );
    }



    const addToWishList = async (typ,id) => {

        let wishlist = wl
        let items = []
        let found1 = false
        for(let i=0;i<wishlist.length;i++){
            if(wishlist[i].wishlistName==typ){
                items = wishlist[i].wishlistItems
                found1 = true;
                break;
            }
        }
        let found = false
        for(let i=0;i<items.length;i++)
        {
            if(items[i].giftId == id){
                items[i].quantity += quantiyValue
                found = true
                break
            }
        }

        if(!found){
            items.push({
                "giftId" : id,
                "quantity": quantiyValue
            })
        }

        if(!found1){
            wishlist.push({
                "wishlistName": typ,
                "wishlistItems": items
            })
        }

        console.log(wishlist)

        await axios.post(backendurl.url+"/user/addwishlist",{ username: localStorage.getItem("email"), wishlist: wishlist})
            .then(async (data)=>{
                alert("Added to wishlist");
                window.location.href="/my_wishlist"
            })

    }
    const getPickerValue = (value) =>{
        setqQuantiyValue(value)
        console.log(value) // Here you can get the value of the Quantity picker
    }

    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [showDropdown, setShowDropDown] = useState(false);
    const [productDetail, setProductDetail] = useState([]);
    const [backendUrl, setBackendUrl] = useState("http://localhost:9000")
    const [wlType, setWLType] = useState("");
    const [wl, setWL] = useState([]);
    const [wlTArray, setWLTArray] = useState([]);
    const [cart, setCart] = useState([]);
    const [dropdownOpen, setOpen] = useState(false);
    const [quantiyValue, setqQuantiyValue] = useState(1)
    const tempArray = [];

    async function navigateToCart(){
        window.location.href="/cart"
    };

    async function toggleDropDown(){
        setShowDropDown(!showDropdown)
    };

    async function updateProfile(){
        window.location.href="/update_profile"
    };

    async function logout(){
        localStorage.removeItem("email")
        window.location.href="/login"
    };

    const getCurrentUser=async ()=>{

        await fetch(backendurl.url+"/user/"+localStorage.getItem("email"))
            .then((res)=>res.json())
            .then((data)=>{
                let user = data.user[0]
                let wishlist = user.wishlist
                let tmp = []
                wishlist.map((obj)=>{
                    tmp.push(obj.wishlistName)
                })
                if(!tmp.includes("default")){tmp.push("default")}
                setWLTArray(tmp)
                setWL(wishlist)
                setCart(user.cart)
                setWLType("default")
            })

    }

    const getProductDetail=()=>
    {

        axios.get(backendurl.url+ "/products/displayProducts/" + params.id).then((response) =>
            {
                console.log("hello");
                console.log(response);

                tempArray.push(response.data.products[0]);
                setProductDetail(tempArray);
                console.log(productDetail);
            }
        );
    }

    const toggle = () => setOpen(!dropdownOpen);

    const clickedType = async (typ, id)=>{
        await setWLType(typ)
        await addToWishList(typ,id)
    }

    useEffect(()=>{
        getProductDetail()
        getCurrentUser()
    },[])

    return (
        <>
            <br></br><br></br><br></br>
            <h1 className="title-name">Product Details</h1>
            <div className="wallpaper">

                {productDetail.map(productDetail => (
                    <div className="body">
                        <br></br><br></br>
                        <Container>
                            <Row>
                                <Col>
                                    <img src={productDetail.productImage} className="fixImage" alt="teddybear"></img>
                                </Col>
                                <Col>
                                    <div className="right">
                                        <h2>{productDetail.productName}</h2>
                                        <h3 className="price">${productDetail.productPrice}</h3>
                                        <br></br>
                                        <p className="quantity">Description</p>
                                        <p className="text-body">{productDetail.productDescription}</p>

                                        <p className="quantity">Quantity</p>
                                        <QuantityPicker min={1} max={productDetail.productStockUnits} value={1} onChange={getPickerValue} smooth />
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <button className="button1" onClick={() => handleClick(productDetail.productId)}>Add to cart</button>
                                        {/* <button className="button2" onClick={() => addToWishList(productDetail.productId)} >Add to wishlist</button> */}
                                        <ButtonDropdown className="button2" isOpen={dropdownOpen} toggle={toggle}>
                                            <DropdownToggle caret>
                                                Add to wishlist
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {
                                                    wlTArray.map((val)=>{
                                                        return <DropdownItem onClick={() => clickedType(val, productDetail.productId)}>{val}</DropdownItem>
                                                    })
                                                }
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                ))}
            </div>
            <div className='footer-part'>
                <Row className='footer-home'>
                    <Col xs={2} md={1}>
                        <a href='/routeto'>
                            <FontAwesomeIcon icon={faInstagram} size='2x' /></a></Col>
                    <Col xs={2} md={1}>
                        <a href='/routeto'>
                            <FontAwesomeIcon icon={faFacebook} size='2x' /></a></Col>
                    <Col xs={2} md={1}>
                        <a href='/routeto'>
                            <FontAwesomeIcon icon={faLinkedin} size='2x' /></a></Col>
                </Row>
                &copy; Copyright 2021 Aldora private limited.
            </div>
        </>
    );
}

export default ProductDetail;