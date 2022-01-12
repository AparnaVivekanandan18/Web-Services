// author: Samir Anwar Rana
import React, {useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {CardBody, Input} from "reactstrap";
import './WeddingGifts.css'
import '../Header/Header.css';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { faInstagram, faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import travel from '../Header/images/travel.jpg';
import Logo from "../Header/images/logo.PNG";
import Search from "../Header/images/search-icon.png";
import Wishlist from "../Header/images/wishlist.png";
import Shoppingcart from "../Header/images/shopping-cart.png";
import Profile from "../Header/images/user.png";
import Axios from "axios";
import backendurl from "../config.json"

function WeddingGifts()  {
    const [gifts,setGifts]=useState([]);
    const tempArray = [];
    const [tempGift, setTempGift] = useState([]);
    const [tr, setTr] = useState(true);
    let incrementVar = 0;
    const [searchTerm, setSearchTerm] = React.useState("");

  const [email, setEmail] = useState(localStorage.getItem("email"))
  const [showDropdown, setShowDropDown] = useState(false)

  async function navigateToCart(){
    window.location.href="/cart"
  };

  function handleChange(value){
    setGifts(tempGift);
    setSearchTerm(value);
  };

   function navigateToProduct(id){
      window.location.href="/weddinggifts/" + id;
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

  
  


  const getProducts=()=>
  {
      Axios.get(backendurl.url + "/products/displayWeddingProducts").then((response) =>
          {
            console.log("hello");
              console.log(response);
              for(let i =0; i<response.data.products.length; i++)
              {
                  tempArray.push(response.data.products[i])
              }
          
                setGifts(tempArray);
                setTempGift(tempArray);
                console.log(tempArray);
              
           
             
          }
      );
  }

  useEffect(()=>{
      getProducts()
  },[])
   
  React.useEffect(() => {
    const results = gifts.filter(gifts =>
      gifts.categories.includes(searchTerm)
    );
    setGifts(results);
  }, [searchTerm]);

    return (
        <>
        <div>
            <br/>
            <Container fluid>
                <Row> {/*Row 1 starts here*/}
                    <Col>
                        <Card body outline color="success" className="mx-auto my-2">
                            <CardBody>
                                <h1 className="title-style">Wedding Gifts</h1>
                                <h3></h3>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row> {/*Row 2 starts here*/}
                    <Col sm={2}> {/*Row 2 - Column 1*/}
                        <Card body outline color="success" className="mx-auto my-2">
                            <CardBody>
                                <Row><h3>Filters</h3></Row>
                                <hr/>
                                <Row><h5>Recipient</h5></Row>
                                <Row>
                                    <div>
                                        <input type="radio" name="radio" id="Her" onClick={() => handleChange("Her")}  value="Her"/>
                                        <label>Her</label><br/>
                                    </div>
                                </Row>
                                <Row>
                                    <div>
                                        <input type="radio" name="radio" id="His" onClick={() => handleChange("His")}  value="His"/>
                                        <label>His</label><br/>
                                    </div>
                                </Row>
                                <Row>
                                    <div>
                                        <input type="radio" name="radio" id="Birthday" onClick={() => handleChange("Birthday")} value="Birthday"/>
                                        <label>Birthday</label><br/>
                                    </div>
                                </Row>
                                <Row>
                                    <div>
                                        <input type="radio" name="radio" id="Couples" onClick={() => handleChange("Couple")}  value="Couples"/>
                                        <label>Couples</label><br/>
                                    </div>
                                </Row>
                                <Row>
                                    <div>
                                        <input type="radio" name="radio" id="none" onClick={() => handleChange("")}  value="None"/>
                                        <label>None</label><br/>
                                    </div>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col sm={10}> {/*Row 2 - Column 2*/}
                        <Card body outline color="success" className="mx-auto my-2">
                            <CardBody>
                                <Row>
                                    {gifts.map(iterateVariable =>(
                                        <Col key={iterateVariable.id} sm={4}>
                                            <Card body outline color="success" className="mx-auto my-2">
                                                <CardBody>
                                                  <div className="container" onClick={() => navigateToProduct(iterateVariable.productId)} >
                                                  <img src={iterateVariable.productImage} className="image" />
                                                  <div className="overlay">
                                                    <div className="text">Click to buy</div>
                                                  </div>
                                                  </div>                                           
                                                    {/* <img src={iterateVariable.productImage} onClick={navigateToProduct} className="imageStyle"/> */}
                                                </CardBody>
                                            </Card>
                                            <hr/>
                                            <h4>{iterateVariable.productName}</h4>
                                            <h5>Produce Price: ${iterateVariable.productPrice}</h5>
                                            <br/>
                                        </Col>
                                    ))}
                                </Row>              
                            </CardBody>
                        </Card>
                    </Col>
                </Row> {/*Row 2 ends here*/}
            </Container>
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

export default WeddingGifts;