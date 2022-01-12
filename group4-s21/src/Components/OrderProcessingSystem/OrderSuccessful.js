import React, {useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {CardBody, Input} from "reactstrap";
import './OrderPlacement.css'
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import backendurl from "../config.json";
import Axios from "axios";


function OrderSuccessful()
{

    const deleteCart= async ()=>
    {
        // Deleting the Entire Cart
        const user = { username: localStorage.getItem("email")};
        await axios.post(backendurl.url+"/user/deleteWholeCart",user).then((response) =>
            {
                console.log(response)
            }
        );
    }

    useEffect(()=>{
        deleteCart()
    },[])

    return (
        <>
            <div className="AddToCart">
                <Container fluid>
                    {/*Row 1 starts here*/}
                    <Row>
                        <Col>
                            <Card body outline color="success" className="mx-auto my-2">
                                <CardBody>
                                    <h3 className="h3Class">Order Successful !</h3>
                                    <br/><br/>
                                    <a href="homepage">Want to Shop? Click Here</a>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    {/*Row 1 Ends here*/}
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

}//Function Ends Here

export default OrderSuccessful;