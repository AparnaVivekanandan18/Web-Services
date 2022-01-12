import './ContactUs.css';
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

function ContactUs() {
  
  useEffect(() =>{

  },[])

  function handleSubmit(){
      alert("Your form has been submitted successfully");
  }

  return (
    <>
      <div className="contactusbody">
      <section class="mb-4">

<h2 class="header-color">Contact us</h2>
<hr></hr>
<p class="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
    a matter of hours to help you.</p>

<div class="row">

    <div class="col-md-9 mb-md-0 mb-5">
        <form id="contact-form" name="contact-form" action="mail.php" method="POST">

            <div class="row">

                <div class="col-md-6">
                    <div class="md-form mb-0">
                    <label for="name" class="">Your name</label>
                        <input type="text" id="name" name="name" class="form-control"/>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="md-form mb-0">
                    <label for="email" class="">Your email</label>
                        <input type="text" id="email" name="email" class="form-control"/>
                    </div>
                </div>

            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="md-form mb-0">
                    <label for="subject" class="">Subject</label>
                        <input type="text" id="subject" name="subject" class="form-control"/>
                    </div>
                </div>
            </div>

            <div class="row">

                <div class="col-md-12">
                    <div class="md-form">
                    <label for="message">Your message</label>
                        <textarea type="text" id="message" name="message" rows="2" class="form-control md-textarea"></textarea>
                    </div>
                </div>
            </div>

        </form>

        <div class="text-center text-md-left">
            <button class="button-style" onClick={handleSubmit}>Send</button>
        </div>
        <div class="status"></div>
    </div>

    <div class="col-md-3 text-center">
        <ul class="list-unstyled mb-0">
            <li><i class="fas fa-map-marker-alt fa-2x"></i>
                <p>6299 South St, Halifax, NS, Canada</p>
            </li>

            <li><i class="fas fa-phone mt-4 fa-2x"></i>
                <p>+ 01 234 567 89</p>
            </li>

            <li><i class="fas fa-envelope mt-4 fa-2x"></i>
                <p>contact@aldoragiftscorner.com</p>
            </li>
        </ul>
    </div>


</div>

</section>
       
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

export default ContactUs;
