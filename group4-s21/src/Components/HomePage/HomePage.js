import './HomePage.css';
import { faInstagram, faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import bday from './bday.jpg';
import anniversary from './anniversary.jpg';
import travel from './travel.jpg';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Gift1 from "./gift-1.png";
import React, { useState, useEffect } from "react";

function HomePage() {
  
  useEffect(() =>{

  },[])

  return (
    <>
      <div className="wallpaper">
        <div className="home-page-center-1">
          <div className="home-page-center-1-content">
              <img src={Gift1} height='400' weight='400'></img>
          </div>
        </div>
        <div className="home-page-center-2">
          <div className="home-page-center-2-content">
            <h1>Find the Gifts which you would love to present at reasonable price.</h1>
            <br></br>
            <h6>Gift giving is a part of our culture, no matter where you are and how long you stay. Every gift from a friend is a wish for your happiness. Happiness is not as much in having as sharing. We make  a living by what we get, but we make a life by what we give.</h6>
            <br></br>
            <Button variant="light" href="/birthdaygifts">Shop now</Button>
          </div>
        </div>
      </div>
      <div className='second-part'>
        <div className='second-part-heading'>Featured Category</div>
        <div>
          <div className="card-1">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={bday} />
              <Card.Body>
                <Card.Title>Birthday gifts</Card.Title>
                <Card.Text>
                  Looking for presenting a surprise gift to your loved ones on their birthday ? Here are few hand picked ones for you.
                </Card.Text>
                <Button variant="light" href='/birthdaygifts'>Shop now</Button>
              </Card.Body>
            </Card>
            </div>
            <div className="card-2">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={anniversary} />
              <Card.Body>
                <Card.Title>Anniversary gifts</Card.Title>
                <Card.Text>
                  Surprise them with beautiful anniversary gifts. Remind them how much you care with a memorable gifts.
                </Card.Text>
                <Button variant="light" href='/anniversarygifts'>Shop now</Button>
              </Card.Body>
            </Card>
            </div>
            <div className="card-3">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={travel} />
              <Card.Body>
                <Card.Title>Bon Voyage gifts</Card.Title>
                <Card.Text>
                  "Leave your worries behind and enjoy your trip." Wish your loved ones a safe and happy journey with our Bon Voyage gifts.
                </Card.Text>
                <Button variant="light" href='/bonvoyagegifts'>Shop now</Button>
              </Card.Body>
            </Card>
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

export default HomePage;
