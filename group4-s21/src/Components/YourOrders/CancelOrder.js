import { faInstagram, faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import "./CancelOrder.css";
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from 'react-router-dom';
import backendurl from "../config.json";

function CancelOrder() {

  const [cancelReason, setcancelReason] = useState("");
  const [cancelDescription, setcancelDescription] = useState("");

  const params = useParams();

  async function navigateToCart(){
    window.location.href="/cart"
  };

  async function navigateToLogin(){
    window.location.href="/login"
  };

  async function navigateToOrders(){
    window.location.href="/orderhistory"
  };

  // Function to cancel the order 
  const cancelOrder = async() => {
    console.log("Inside cancel order")
    await Axios.post(backendurl.url+"/order/updateOrderStatus/"+params.id,{
      orderStatus: "Cancelled",
      cancelReason: cancelReason,
      cancelDescription: cancelDescription
    }).then((data)=>{
      if(data.data.message == "success"){
        alert("Order has been cancelled.");
      }else {
        alert("Problem in cancelling the order.");
      }      
    })
} 

useEffect(() => {
  console.log(params.id);
},[]);

  return (
    <>
      <div className='orders-body'>
          <div className='order-history-breadcrumbs'>
          <Breadcrumb>
                <Breadcrumb.Item href="#">Your orders</Breadcrumb.Item>
                <Breadcrumb.Item href="/orderhistory">Order history</Breadcrumb.Item>
                <Breadcrumb.Item active>Cancel order</Breadcrumb.Item>
          </Breadcrumb>   
          </div>
         <div class='review-title'>
             Cancel Order
         </div>
          <div className='order-id'>
            Order #{params.id}
          </div>
        
        <form>
        <div className='sub-section'>
             <div className='sub-section-title'>
             Reason for cancellation
             </div>
             <div className='add-headline-cancel'>
             <select onChange={(e) => { setcancelReason(e.target.value)}}>
             <option value="1">Select your reason</option>
              <option value="Damaged product">Damaged product</option>
              <option value="Did not meet expectation">Did not meet expectation</option>
              <option value="Changed my mind">Changed my mind</option>
              <option value="Delay in estimated delivery">Delay in estimated delivery</option>
              <option value="Others">Others</option>
            </select>
             </div>
         
         </div>

         <div className='rating-last'>
             <div className='rating-title-cancel'>
             Please explain your reason
             </div>
             <div className='add-headline-cancel'>
             <textarea id="review-desc" name="review-desc" rows="4" cols="50" onChange={(e) => { setcancelDescription(e.target.value);}}/>
              </div>
         </div>

         <div className='cancel-submit'>
         <Button variant="light" onClick={cancelOrder}>Cancel order</Button>
         </div>
        </form>

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

export default CancelOrder;
