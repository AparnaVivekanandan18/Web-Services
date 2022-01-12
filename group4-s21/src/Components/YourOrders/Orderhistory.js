import { faInstagram, faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import "./Orderhistory.css";
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from "react";
import Axios from "axios";
import backendurl from "../config.json";

function OrderHistory() {

  const [orderData, setorderData] = useState([]);
  const [orderDetails, setorderDetails] = useState([]);
  let orderProducts = [];
  let productsArray = [];

  async function navigateToCart(){
    window.location.href="/cart"
  };

  async function navigateToLogin(){
    window.location.href="/login"
  };


  function navigateToTrackOrder(id){
    window.location.href="/trackorder/" + id;
  };

  function navigateToCancelOrder(id){
    window.location.href="/cancelorder/" + id;
};

function navigateToCreateReview(id){
  window.location.href="/createreview/" + id;
};


// Consuming API for getting the order details  
  const getOrdersList=() => {
     Axios.get(backendurl.url+"/order/"+localStorage.getItem("email")).then((data)=>{
            setorderDetails(data.data.order);
            console.log(data.data.order);
    })

  //  for(let j=0;j<orderProducts.length;j++)
  //  {
  //      let productId = orderProducts[j];
  //      await Axios.get(backendurl.url+"/products/getProducts/"+productId).then((data)=>{
  //       data.data.products.map(item => {
  //         productsArray.push(item);
  //       })

  //       orderData.map(order => {
  //         productsArray.map(prd => {
  //           if(order.products[0].giftId === prd.productId){
  //              order.products[0]["productName"] = prd.productName;
  //              order.products[0]["productImage"] = prd.productImage;
  //              order.products[0]["productDescription"] = prd.productDescription;
  //           }
  //         })
  //       })
  //      })
  //  }
   
}

  useEffect(() => {
    getOrdersList();
  },[]);


  return (
    <>
      <div className='orders-body'>
          <div className='order-history-breadcrumbs'>
          <Breadcrumb>
                <Breadcrumb.Item href="#">Your orders</Breadcrumb.Item>
                <Breadcrumb.Item active>Order history</Breadcrumb.Item>
          </Breadcrumb>   
          </div>
          <div>
            {/* Rendering values from the API response to displaye the orders dynamically */}
            {orderDetails.map(order => (
              <div className='order-item'>
                <div className='order-item-heading'>
                    <div className='order-item-heading-1'>
                        <div><b>Order placed</b></div>
                        <div>{order.orderPlacedDate}</div>
                    </div>
                    <div className='order-item-heading-1'>
                    {order.orderStatus === 'delivered' ? (<div><b>Shipped to</b></div> ) : (<div><b>Ship to</b></div> )}
                        <div>Tessa</div>
                    </div>
                    <div className='order-item-heading-1'>   
                        <div><b>Total</b></div>
                        <div>${order.orderAmount}</div>
                    </div>
                    <div className='order-item-heading-4'>
                        <div><b>Order# {order.orderId}</b></div>
                    </div>
                </div>
                <div className='order-item-body'>
                    <div className='order-item-body-1'>
                    {order.orderStatus === 'delivered' ? (<div><b>Delivered on {order.orderDeliveryDate}</b></div>) : (<div><b>Estimated delivery on {order.orderDeliveryDate}</b></div>)}

                        <div className='image-desc'>
                        <img src={order.products[0].productImage} width='100' height='100'/>
                        </div>
                        <div className='order-item-body-2-desc'>
                        <p>{order.products[0].productName}</p>
                        </div>
                    </div>
                  
                    <div className='order-item-body-2'>
                        {order.orderStatus === 'delivered' ? (<Button variant="light">Buy again</Button>) : (<div className='order-btn'><Button variant="light" onClick={() => navigateToCancelOrder(order.orderId)}>Cancel Order</Button></div>)}
                        {order.orderStatus === 'delivered' ? (<div className='review-display' onClick={() => navigateToCreateReview(order.products[0].giftId)}><u>Write a review</u></div>) : (<div><Button variant="light" onClick={() => navigateToTrackOrder(order.orderId)}>Track Order</Button></div>)}
                    </div>
                </div>
          </div>
            ))}
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

export default OrderHistory;
