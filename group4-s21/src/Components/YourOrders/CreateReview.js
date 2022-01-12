
import { faInstagram, faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import "./CreateReview.css";
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from 'react-router-dom';
import backendurl from "../config.json";

function HomePage() {

  const params = useParams();
  const [productData, setproductData] = useState([]);
  const [startRating, setstartRating] = useState("");
  const [reviewHeadline, setreviewHeadline] = useState("");
  const [reviewDesc, setreviewDesc] = useState("");

  // Function to post review to the API
 async function createReview(){
    Axios.post(backendurl.url+"/products/addReview", {
            productId: params.id,
            startRating: startRating,
            reviewHeadline: reviewHeadline,
            reviewDesc: reviewDesc
        }).then((data)=>{
        if(data.data.message=="success"){
          alert("Review has been submitted successfully.");
        } else{
          console.log(JSON.stringify(data.data));
        }
    })
}

// API call to get product details to display
const getOrderDetails = async() => {
  await Axios.get(backendurl.url+"/products/getProducts/"+params.id).then((data)=>{
    data.data.products.map((d) => {
      setproductData(d);
    })
  })
}

useEffect(() => {
  getOrderDetails()
},[]);

  async function navigateToCart(){
    window.location.href="/cart"
  };

  async function navigateToLogin(){
    window.location.href="/login"
  };

  async function navigateToOrders(){
    window.location.href="/orderhistory"
  };

  return (
    <>
      <div className='orders-body'>
          <div className='order-history-breadcrumbs'>
          <Breadcrumb>
                <Breadcrumb.Item href="#">Your orders</Breadcrumb.Item>
                <Breadcrumb.Item href="/orderhistory">Order history</Breadcrumb.Item>
                <Breadcrumb.Item active>Create a review</Breadcrumb.Item>
          </Breadcrumb>   
          </div>
         <div class='review-title'>
             Create a review
         </div>
         <div class='product-display-review'>
            <div className='image-desc-review'>
            <img src={productData.productImage} width='70' height='70'/>
            </div>
            <div className='order-item-body-1-desc-review'>
                <p>{productData.productName}</p>
            </div>
         </div>
        
         <div className='rating'>
             <div className='rating-title'>
             Overall rating
             </div>
        <div className='rate-outer'>
         <div class="rate">
            <input type="radio" id="star5" name="rate" value="5" onChange={(e) => { setstartRating(e.target.value)}} />
            <label for="star5" title="text">5 stars</label>
            <input type="radio" id="star4" name="rate" value="4" onChange={(e) => { setstartRating(e.target.value)}}/>
            <label for="star4" title="text">4 stars</label>
            <input type="radio" id="star3" name="rate" value="3" onChange={(e) => { setstartRating(e.target.value)}}/>
            <label for="star3" title="text">3 stars</label>
            <input type="radio" id="star2" name="rate" value="2" onChange={(e) => { setstartRating(e.target.value)}}/>
            <label for="star2" title="text">2 stars</label>
            <input type="radio" id="star1" name="rate" value="1" onChange={(e) => { setstartRating(e.target.value)}}/>
            <label for="star1" title="text">1 star</label>
        </div>
        </div>
         </div>

         <div className='rating'>
             <div className='rating-title'>
             Add a headline
             </div>
             <div className='add-headline'>
              <input type="text" name="Name" size="20" onChange={(e) => { setreviewHeadline(e.target.value)}}/>  
              </div>
         </div>
      
         <div className='rating-last'>
             <div className='rating-title'>
             Add a detailed review
             </div>
             <div className='add-headline'>
             <textarea id="review-desc" name="review-desc" rows="4" cols="50" onChange={(e) => { setreviewDesc(e.target.value)}}/>
              </div>
         </div>

         <div className='review-submit'>
         <Button variant="light" onClick={createReview}>Submit review</Button>
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

export default HomePage;
