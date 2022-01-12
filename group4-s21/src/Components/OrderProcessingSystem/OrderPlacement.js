import React, {useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {CardBody, Input} from "reactstrap";
import './OrderPlacement.css'
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import Axios from "axios";
import backendurl from "../config.json";

function OrderPlacement()
{
    //---------------------------------------------------------------------------------------------------------------------------------------
    let [discountApplied, setdiscountApplied] = useState([]);
    let [discountorderAmount, setorderAmount] = useState([]);
    //Fetching the values from local Storage.
    let product = JSON.parse(localStorage.getItem('products'))
    console.log("product",product)
    let sum = 0;
    for(let i=0; i<product.length;i++)
    {
        sum = sum + (product[i].totalSum)
        sum = Math.round(sum)
    }
    console.log("sum",sum)


    // Fetching the proper Discounted Value which is previously applied in SHOPPING CART
    let currentUser= localStorage.getItem("email") //Fetching the current logged in userID
    axios.get(backendurl.url+"/user/"+currentUser).then((response) =>
        {
            if(response.data.user[0].discountEligible == "true")
            {
                let discountApplied = JSON.parse(localStorage.getItem('discountApplied'))
                let orderAmount = JSON.parse(localStorage.getItem('orderDiscountAmount'))
                setdiscountApplied(discountApplied);
                setorderAmount(orderAmount)
                console.log(discountApplied)
                console.log(orderAmount)
            }
        }
    );

    //*------------------------------------------------------------------------------------------------------------------------------------------------------------
    // (dummy = productIds )- Assigning the array elements like this, will be ["01","02","03","04"]

    //Array should be like this - then only we can render the elements in HTML page - use "array.push()"
    // productIdArray [Array(4)]
    // 0: (4)["0000008", "0000004", "0000013", "0000001"]
    // length: 1
    // [[Prototype]]: Array(0)
    //productIdArray.push(productIds)
    //*------------------------------------------------------------------------------------------------------------------------------------------------------------

    //Validation variables for Order Placement page
    const [deliveryName, setDeliveryName] = useState("");  const [deliveryNameErr, setdeliveryNameErr] = useState("");
    const [apartmentNumber, setApartmentNumber] = useState(""); const [apartNumErr, setapartNumErr] = useState("");
    const [address, setAddress] = useState(""); const [addressErr, setAddressErr] = useState("");
    const [city, setCity] = useState(""); const [cityErr, setCityErr] = useState("");
    const [postalCode, setPostalCode] = useState(""); const [postalErr, setPostalErr] = useState("");

    const[orderId,setOrderId]= useState("")

    let delNameValid = "false"
    let apartNumValid = "false"
    let addressValid = "false";
    let cityValid = "false";
    let postalValid = "false";

    let canOrderPlaced = "false"

    const PlaceOrder = async () =>
    {
        let delName = deliveryName; let delNameErrMsg = ""; let isDelNameValid = "";
        let apartNo = apartmentNumber; let apartNoErrMsg = ""; let isApartValid = "";
        let addr = address; let addrErrMsg = ""; let isAddrValid = "";
        let delCity = city; let cityErrMsg = ""; let isCityValid = "";
        let delPin = postalCode; let postalCodeErrMsg = ""; let isPostalCodeValid = "";

        let modeOfPayment = document.getElementById("paymentDropdown").value;
        let expectedDeliveryDate = document.getElementById("datemin").value;

        // Validation for Delivery Name
        const alphaNumericValidator = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if(delName.trim() == "")
        {
            delNameErrMsg = "Required Delivery Name";
            setdeliveryNameErr(delNameErrMsg);
        }
        else if(alphaNumericValidator.test(delName))
        {
            delNameErrMsg = "Entered Name is irrelevant:Kindly check";
            setdeliveryNameErr(delNameErrMsg);
        }
        else
        {
            delNameErrMsg = "";
            setdeliveryNameErr(delNameErrMsg);
            delNameValid = "true";
            console.log("Delivery Name",isDelNameValid)
        }

        // Validation for Flat Number
        if(apartNo.trim() == "")
        {
            apartNoErrMsg = "Required Flat Number";
            setapartNumErr(apartNoErrMsg);
        }
        else
        {
            apartNoErrMsg = "";
            setapartNumErr(apartNoErrMsg);
            apartNumValid = "true";
            console.log("apart Valid",isApartValid)
        }

        // Validation for Address
        if(addr.trim() == "")
        {
            addrErrMsg = "Required Address";
            setAddressErr(addrErrMsg);
        }
        else
        {
            addrErrMsg = "";
            setAddressErr(addrErrMsg);
            addressValid = "true";
            console.log("address valid",isAddrValid)
        }

        // Validation for City
        //const numberValidator = /^\\d*$/
        if(delCity.trim() == "")
        {
            cityErrMsg = "Required City";
            setCityErr(cityErrMsg);
        }
        else if(/^[0-9]*$/.test(delCity))
        {
            cityErrMsg = "City can't be Numeric";
            setCityErr(cityErrMsg);
        }
        else
        {
            cityErrMsg = "";
            setCityErr(cityErrMsg);
            cityValid = "true";
            console.log("city valid",isCityValid)
        }

        // Validation for Postal Code
        if(delPin.trim() == "")
        {
            postalCodeErrMsg = "Required Pin Code";
            setPostalErr(postalCodeErrMsg);
        }
        else if(alphaNumericValidator.test(delPin))
        {
            postalCodeErrMsg = "Enter proper Pin Code";
            setPostalErr(postalCodeErrMsg);
        }
        else
        {
            postalCodeErrMsg = "";
            setPostalErr(postalCodeErrMsg);
            postalValid = "true";
            console.log("postal code valid",isPostalCodeValid)
        }

        // If all the fields entered correct - then the order can be placed.
        if(delNameValid == "true" && apartNumValid == "true" && addressValid == "true" && cityValid == "true" && postalValid == "true")
        {
            canOrderPlaced = "true"
            console.log("all validations achieved")
        }

        if(canOrderPlaced == "true")
        {
            console.log("Order placed")
            let userId= localStorage.getItem("email") //Fetching the current logged in userID

            // Fetching the existing orders - Forming unique OrderId
            let Id = ""
            await axios.get(backendurl.url+"/order/displayOrders").then((response) =>
                {
                    if(response.data.orders.length >= 1)
                    {
                        Id = 1000 + (response.data.orders.length)
                        console.log("id",Id)
                    }
                    else
                    {
                        Id = 1000 //Starting Default Order Id Series
                    }
                    console.log("Order Id Inserted",orderId)
                }
            );

            let orderIds = Id
            let orderStatus = "Ordered"
            let products = JSON.parse(localStorage.getItem('products'))

            let orderAddress = [{}] //Initialise as JSON Array
            orderAddress[0].deliveryName=deliveryName
            orderAddress[0].apartmentNumber = apartmentNumber
            orderAddress[0].address = address
            orderAddress[0].city = city
            orderAddress[0].postalCode = postalCode
            console.log("OrderAddress",orderAddress)

            let discountApplied = JSON.parse(localStorage.getItem('discountApplied'))
            let orderAmountTobeInserted = "";
            if(discountApplied == "true")
            {
                orderAmountTobeInserted = JSON.parse(localStorage.getItem('orderDiscountAmount'))
            }
            else
            {
                orderAmountTobeInserted = sum
            }

            console.log("orderAmountTobeInserted",orderAmountTobeInserted)
            let orderDeliveryDate = expectedDeliveryDate
            console.log("orderDeliveryDate",orderDeliveryDate)

            var today = new Date();
            var orderPlacedDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            console.log("orderPlacedDate",orderPlacedDate)

            const aldoraOrders
                = {
                orderId: orderIds,
                userId:userId,
                orderStatus:orderStatus,
                products:products,
                orderAddress:orderAddress,
                orderAmount:orderAmountTobeInserted,
                orderDeliveryDate:orderDeliveryDate,
                orderPlacedDate:orderPlacedDate };

            console.log("aldoraOrders",aldoraOrders)
            // Saving the Order to DB
            await axios.post(backendurl.url+ "/order/createOrder/", aldoraOrders).then((response) =>
                {
                    window.location.href="/ordersuccessful"
                }
            );
        }
    }

    const handleChange = (e) =>
    {
        console.log("nothing")
    }

    const handleBlur = () =>
    {
        console.log("nothing")
    }

    return (
        <>
            <div className="AddToCart">
                <Container fluid>
                    {/*Row 1 starts here*/}
                    <Row>
                        <Col>
                            <Card body outline color="success" className="mx-auto my-2">
                                <CardBody>
                                    <h5 className="h3Class">Order Placement Page</h5>
                                    <br/>
                                    <hr/>
                                    <p>Give the delivery address, expected delivery date to place the order - Review your order summary here</p>
                                    <a href="shoppingcart" className="continueShoppingLink">Go Back To Shopping Cart</a>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    {/*Row 1 Ends here*/}

                    {/*Row 2 starts here*/}
                    <Row>
                        {/*Sub Column 1 starts here*/}
                        <Col sm={8}>
                            <Card body outline color="success" className="mx-auto my-2">
                                <CardBody>
                                    <div>
                                        <label className="fontStyle">Delivery Name </label><br/>
                                        <input type="text"
                                               onChange={(e) => {setDeliveryName(e.target.value);}}
                                               onBlur={handleBlur}
                                               name=""
                                               placeholder="enter the name in which order to be delivered"
                                               autoComplete="off"
                                               className="form-control"
                                        />
                                        {(<div className="errorMsg">{deliveryNameErr}</div>)}
                                    </div>

                                    <div>
                                        <br/><label className="fontStyle">Plot/Flat/Apartment Number</label><br/>
                                        <input type="text"
                                               onChange={(e) => {setApartmentNumber(e.target.value);}}
                                               onBlur={handleBlur}
                                               name=""
                                               placeholder="enter your apartment number "
                                               autoComplete="off"
                                               className="form-control"
                                        />
                                        {(<div className="errorMsg">{apartNumErr}</div>)}
                                    </div>

                                    <div>
                                        <br/><label className="fontStyle">Address</label><br/>
                                        <input type="text"
                                               onChange={(e) => {setAddress(e.target.value);}}
                                               onBlur={handleBlur}
                                               name=""
                                               placeholder="enter your address , street name, locality"
                                               autoComplete="off"
                                               className="form-control"
                                        />
                                        {(<div className="errorMsg">{addressErr}</div>)}
                                    </div>

                                    <div>
                                        <br/><label className="fontStyle">City</label><br/>
                                        <input type="text"
                                               onChange={(e) => {setCity(e.target.value);}}
                                               onBlur={handleBlur}
                                               name=""
                                               placeholder="select the city you live in"
                                               autoComplete="off"
                                               className="form-control"
                                        />
                                        {(<div className="errorMsg">{cityErr}</div>)}
                                    </div>

                                    <div>
                                        <br/><label className="fontStyle">Postal Code</label><br/>
                                        <input type="text"
                                               onChange={(e) => {setPostalCode(e.target.value);}}
                                               onBlur={handleBlur}
                                               name=""
                                               placeholder="enter your postal code"
                                               autoComplete="off"
                                               className="form-control"
                                        />
                                        {(<div className="errorMsg">{postalErr}</div>)}
                                    </div>

                                    <div>
                                        <br/><label className="fontStyle">Mode of Payment</label><br/>
                                        <select id='paymentDropdown' className="form-control">
                                            <option value="1">Cash On Delivery</option>
                                            <option value="2">Credit Card</option>
                                            <option value="3">Debit Card</option>
                                        </select><br/>
                                    </div>

                                    <div>
                                        <label htmlFor="datemin" className="fontStyle">Expected Delivery Date</label><br/>
                                        <input type="date" id="datemin" name="datemin" min="2000-01-02" className="form-control"/>
                                    </div>

                                    <br/>
                                    <Button type="button" variant="primary" onClick={PlaceOrder}>Place Order</Button>
                                </CardBody>
                            </Card>
                        </Col>

                        {/*Sub Column 2 starts here*/}
                        <Col sm={4}>
                            <Card body outline color="success" className="mx-auto my-2">
                                <CardBody>
                                    <h5 className="h3Class">Order Summary</h5>
                                    <br/>
                                    <hr/>
                                    <div className="row">
                                        <div className="summaryProductName"><label className="fontStyle">Product Name</label></div>
                                        <div className="summaryProductCount"><label className="fontStyle">Quantity</label></div>
                                        <div className="summaryPrice"><label className="fontStyle">Price</label></div>
                                    </div>
                                    {product.map((iterateVariable)=>(
                                        <>
                                            <div className="row">
                                                <div className="summaryProductName"><label>{iterateVariable.productName}</label></div>
                                                <div className="summaryProductCount"><label>{iterateVariable.productCount}</label></div>
                                                <div className="summaryPrice"><label>{iterateVariable.productCount * iterateVariable.productPrice}</label></div>
                                            </div>
                                        </>
                                    ))}
                                    <br/>
                                    <hr/>
                                    <div className="row">
                                        <div className="total"><label className="fontStyle">Total:</label></div>
                                        <div className="amount"><label className="fontStyle">{discountApplied ?(discountorderAmount):(sum)}</label></div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    {/*Row 2 Ends here*/}
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

export default OrderPlacement;