import './AboutUs.css';
import React, {useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {CardBody, Input} from "reactstrap";
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

function AboutUs() {
  
  useEffect(() =>{

  },[])

  return (
    <>
      <div className="aboutusbody">
          <Container fluid>
          <div>
                <h1 className="header-color">About Us</h1>
            </div>
            <div>
                <hr></hr>
                <h3 className="header3-style">------  OUR STORY ------</h3>
            </div>
            <div className="content-text-style">
                Founded by Anjal Chaudhary, Samir Rana, Aparna Vivekanandan and Reshma Unnikrishnan.
            </div>
            <div className="content-text-style">
            The choice of presenting a person a gift is an act of self-gratification and a good way of strengthening
            a relationship. In earlier days, customers used to visit local shops in-person to purchase their required gifts. In
            today’s contemporary world, the arrival of E-Commerce websites has made this task convenient and
            accessible. However, when customers arbitrarily search on browser, they are rendered with various resulting
            websites. This creates difficulty to match their needs of purchasing a unique gift. 
            </div>
            <div>
                
            </div>
            <div className="content-text-style">
            Hence, Aldora Gifts Corner, functioning round the clock, benefits the customers to view or shop their pleasant gifts by reviewing its
            appropriate details and description based on the specific categories.
            Aldora Gifts Corner is an online gift shopping store. This will be a one
            place where customers can shop any types of gifts for their loved ones
            
            </div>
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

export default AboutUs;
