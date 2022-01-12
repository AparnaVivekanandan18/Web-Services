import React, {useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {CardBody, Input} from "reactstrap";
import PersonalisedGifts from './PersonalisedGifts.json';
import './PersonalisedGiftsCorner.css'

function DisplayAllPersonalisedGifts() {
    const [gifts,setGifts]=useState([]);
    const tempArray = [];
    let incrementVar = 0;

    const getGifts=()=>
    {
        for (let i =0; i <PersonalisedGifts.length; i++)
        {
            tempArray.push(PersonalisedGifts[i]); //copying the JSON into a Local Array
        }
        setGifts(tempArray); //Setting the array
    }

    useEffect(()=>{
        getGifts()
    },[])

    return (
        <div>
            <br/>
            <Container fluid>
                <Row> {/*Row 1 starts here*/}
                    <Col>
                        <Card body outline color="success" className="mx-auto my-2">
                            <CardBody>
                                <h1>Personalized Gifts Corner</h1>
                                <h3>Find picture perfect prints to hang around the home with our personalised & unique wall art. Make it unique with message or photo!</h3>
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
                                <Row><h5>Sort by Price</h5></Row>
                                <Row>
                                    <div>
                                        <input type="radio" id="HighToLow" value="HighToLow"/>
                                        <label>Price(High To Low)</label><br/>
                                    </div>
                                </Row>
                                <Row>
                                    <div>
                                        <input type="radio" id="LowToHigh"  value="LowToHigh"/>
                                        <label>Price(Low To High)</label><br/>
                                    </div>
                                </Row>
                                <hr/>
                                <Row><h5>Recipient</h5></Row>
                                <Row>
                                    <div>
                                        <input type="radio" id="Her" value="Her"/>
                                        <label>Her</label><br/>
                                    </div>
                                </Row>
                                <Row>
                                    <div>
                                        <input type="radio" id="His" value="His"/>
                                        <label>His</label><br/>
                                    </div>
                                </Row>
                                <Row>
                                    <div>
                                        <input type="radio" id="Birthday" value="Birthday"/>
                                        <label>Birthday</label><br/>
                                    </div>
                                </Row>
                                <Row>
                                    <div>
                                        <input type="radio" id="Couples" value="Couples"/>
                                        <label>Couples</label><br/>
                                    </div>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col sm={10}> {/*Row 2 - Column 2*/}
                        <Card body outline color="success" className="mx-auto my-2">
                            <CardBody>
                                <Row>
                                    {gifts.map((iterateVariable)=>(
                                        <Col key={iterateVariable.id} sm={4}>
                                            <Card body outline color="success" className="mx-auto my-2">
                                                <CardBody>
                                                    <img src={iterateVariable.picture} className="imageStyle"/>
                                                </CardBody>
                                            </Card>
                                            <hr/>
                                            <h5>{iterateVariable.productName}</h5>
                                            <h3>{iterateVariable.Rate}</h3>
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
    );
}

export default DisplayAllPersonalisedGifts;