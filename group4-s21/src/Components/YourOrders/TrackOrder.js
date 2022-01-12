import { faInstagram, faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import "./TrackOrder.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from 'react-router-dom';
import backendurl from "../config.json";

function TrackOrder() {

  const params = useParams();
  const [orderData, setorderData] = useState([]);

  async function navigateToCart(){
    window.location.href="/cart"
  };

  async function navigateToOrders(){
    window.location.href="/orderhistory"
  };

  async function navigateToLogin(){
    window.location.href="/login"
  };

  // API call to get the status of the order
  const trackOrder = async() => {
    await Axios.get(backendurl.url+"/order/getOrder/"+params.id).then((data)=>{
      data.data.order.map((d) => {
        setorderData(d);
      })
    })
}

useEffect(() => {
  trackOrder()
},[]);

  return (
    <>
      <div className='orders-body'>
          <div className='order-history-breadcrumbs'>
          <Breadcrumb>
                <Breadcrumb.Item href="#">Your orders</Breadcrumb.Item>
                <Breadcrumb.Item href="/orderhistory">Order history</Breadcrumb.Item>
                <Breadcrumb.Item active>Track order</Breadcrumb.Item>
          </Breadcrumb>   
          </div>
         <div class='review-title'>
             Shipment tracking
         </div>
      </div>

    <div class="px-1 px-md-4 py-5 mx-auto ">
    <div class="card tracking-card">
        <div class="row d-flex justify-content-between px-3 top">
            <div class="d-flex">
                <h5>ORDER <span class="text-primary font-weight-bold">#{orderData.orderId}</span></h5>
            </div>
            <div class="d-flex flex-column text-sm-right">
                <p class="mb-0">Expected Arrival <span>{orderData.deliveryDate}</span></p>
            </div>
        </div> 
        {/* Based on the order status display the progress accordingly */}
        <div class="row d-flex justify-content-center">
            <div class="col-12">
                <ul id="progressbar" class="text-center">
                    {orderData.orderStatus === 'delivered' || orderData.orderStatus === 'shipped' || orderData.orderStatus === 'in transit' ||   orderData.orderStatus === 'ordered'? (<li class="active step0"></li>) : (<li class="step0"></li>)}
                    {orderData.orderStatus === 'delivered' || orderData.orderStatus === 'shipped' || orderData.orderStatus === 'in transit' ? (<li class="active step0"></li>) : (<li class="step0"></li>)}
                    {orderData.orderStatus === 'delivered' || orderData.orderStatus === 'in transit' ? (<li class="active step0"></li>) : (<li class="step0"></li>)}
                    {orderData.orderStatus === 'delivered' ? (<li class="active step0"></li>) : (<li class="step0"></li>)}
                </ul>
            </div>
        </div>
        <div class="row justify-content-between top">
            <div class="row d-flex icon-content"> <img class="icon" src="https://i.imgur.com/9nnc9Et.png" />
                <div class="d-flex flex-column">
                    <p class="font-weight-bold">Order<br></br>Processed</p>
                </div>
            </div>
            <div class="row d-flex icon-content"> <img class="icon" src="https://i.imgur.com/u1AzR7w.png" />
                <div class="d-flex flex-column">
                    <p class="font-weight-bold">Order<br></br>Shipped</p>
                </div>
            </div>
            <div class="row d-flex icon-content"> <img class="icon" src="https://i.imgur.com/TkPm63y.png" />
                <div class="d-flex flex-column">
                    <p class="font-weight-bold">Order<br></br>En Route</p>
                </div>
            </div>
            <div class="row d-flex icon-content"> <img class="icon" src="https://i.imgur.com/HdsziHP.png" />
                <div class="d-flex flex-column">
                    <p class="font-weight-bold">Order<br></br>Arrived</p>
                </div>
            </div>
        </div>
    </div>
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

export default TrackOrder;
