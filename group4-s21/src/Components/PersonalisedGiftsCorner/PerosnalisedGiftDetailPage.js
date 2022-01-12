import React, {useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {CardBody, Input} from "reactstrap";
import PersonalisedGiftsProductDetail from './PersonalisedGiftsProductDetail.json';
import './PersonalisedGiftsCorner.css'

function PerosnalisedGiftDetailPage()
{
   return (
        <div>
            <br/>
            <Container fluid>
                <Row> {/*Row 1 starts here*/}
                    <Col>
                        <Card body outline color="success" className="mx-auto my-2">
                            <CardBody>
                                <h3>Personalized Gifts Corner</h3>
                                <h5>Find picture perfect prints to hang around the home with our personalised & unique wall art. Make it unique with message or photo!</h5>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row> {/*Row 2 starts here*/}
                    <Col sm={4}> {/*Image Card*/}
                        <Card body outline color="success" className="mx-auto my-2">
                            <CardBody>
                                <div className="">
                                <img src= {PersonalisedGiftsProductDetail[0].picture} className="imageStyle"/>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm={5}> {/*Short Product Detail*/}
                        <Card body outline color="success" className="mx-auto my-2">
                            <CardBody>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm={3}> {/*Button*/}
                        <Card body outline color="success" className="mx-auto my-2">
                            <CardBody>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <hr/>
                <Row> {/*Row 3 starts here*/}
                    <Col>
                        <h5>Product Details</h5>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default PerosnalisedGiftDetailPage;