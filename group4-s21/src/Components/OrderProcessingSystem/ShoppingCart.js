import React, {useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {CardBody, Input} from "reactstrap";
import './ShoppingCart.css'
import Axios from "axios";
import axios from "axios";
import {QuantityPicker} from "react-qty-picker";
import backendurl from "../config.json";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faLinkedin} from "@fortawesome/free-brands-svg-icons";

function ShoppingCart()
{
    let [curProducts,setCurProducts]=useState([]);
    let tempArrayCurrentUserProducts = [];

    let [products,setProducts]=useState([]);
    let tempProductArray = [];

    let[subTotal, setSubTotal] = useState([]); //State Variable for Setting the Sub Total Amount
    let[discountTot, setdiscountTot] = useState([]); //State Variable for setting Discounted Total Amount

    let[couponAppliedIndicator, setCouponAppliedIndicator] = useState(0); //State Variable for setting Whether the coupon is applied once or not
    let[couponMessage, setCouponMessage] = useState(""); // Coupon Message
    let[validateCouponMsg, setValidateCouponMsg] = useState(""); // Coupon Validation Message

    let[noOfCartItems, setNoOfCartItems] = useState(""); // Setting the number of cart items


    function navigateToOrderPlacement(id)
    {
        window.location.href="/orderplacement"
    };

    const getUserProductIds= async ()=>
    {
        let currentUser= localStorage.getItem("email") //Fetching the current logged in userID
        await Axios.get(backendurl.url+"/user/"+currentUser).then((response) =>
            {
                tempArrayCurrentUserProducts = response.data.user[0].cart
                setCurProducts(tempArrayCurrentUserProducts)
            }
        );

        let finalSum = 0;
        let noOfItemsInCart = tempArrayCurrentUserProducts.length
        setNoOfCartItems(noOfItemsInCart)
        for(let j=0;j<tempArrayCurrentUserProducts.length;j++)
        {
            let productId = tempArrayCurrentUserProducts[j].giftId;
            await Axios.get(backendurl.url+"/products/getProducts/"+productId).then((response) =>
                {
                    // temp is the temporary array,
                    console.log(response)
                    let temp = response.data.products[0]
                    temp.productCount = tempArrayCurrentUserProducts[j].quantity

                    temp.totalSum = response.data.products[0].productPrice * temp.productCount
                    finalSum = Math.round(finalSum + temp.totalSum)
                    tempProductArray.push(temp)

                }
            );
        }
        setSubTotal(finalSum)
        setdiscountTot(finalSum)
        setProducts(tempProductArray)
        localStorage.setItem("discountApplied",JSON.stringify(""))
        localStorage.setItem("orderDiscountAmount",JSON.stringify(""))
        localStorage.setItem("products",JSON.stringify(tempProductArray))
    }

    useEffect(()=>{
        getUserProductIds()
    },[])

    const changeCount = async (products,value) =>{
        console.log("products",products)
        console.log("value",value) // incremented/decremented value comes here

        //Initialising the values
        let prevTotalPrice = 0;
        let newTotalPrice = 0;

        let currentUser= localStorage.getItem("email") //Fetching the current logged in userID
        await Axios.get(backendurl.url+"/user/"+currentUser).then((response) =>
            {
                for(let k = 0; k < response.data.user[0].cart.length; k++)
                {
                    if(response.data.user[0].cart[k].giftId == products.productId)
                    {
                        prevTotalPrice = subTotal;
                        var a = parseInt(prevTotalPrice)
                        if(couponAppliedIndicator)
                        {
                            var b = (0.25 * (parseInt(products.productPrice)))
                        }
                        else
                        {
                            var b = parseInt(products.productPrice)
                        }

                        if(value > response.data.user[0].cart[k].quantity) //Incrementation is happening --> updated 'value' will be higher than previous quantity
                        {
                            newTotalPrice = a + b;
                            setSubTotal(newTotalPrice)
                            setdiscountTot(newTotalPrice)
                        }
                        if(value < response.data.user[0].cart[k].quantity) //Decrementation is happening --> updated 'value' will be lower than previous quantity
                        {
                            newTotalPrice = a - b;
                            setSubTotal(newTotalPrice)
                            setdiscountTot(newTotalPrice)
                        }
                    }
                }
            }
        );

        // API to update the incremented or decremented quantity to the Mongo Database
        const user = { username: localStorage.getItem("email"), productId: products.productId, quantity: value};
        // console.log("user",user)
        await axios.post(backendurl.url+"/user/updateCartProductQuantity",user).then((response) =>
            {
                //console.log(response)
            }
        );
    }

    const deleteProduct = async(products) =>{

        const user = { username: localStorage.getItem("email"), productId: products.productId};
        await axios.post(backendurl.url+"/user/deleteCartProduct",user).then((response) =>
            {
                console.log(response)
            }
        );
        window.location.reload(); //Refreshing the Page
    }

    const applyCoupon = async(totalAmount,couponAppliedIndicator) => {
        let inputCouponValue = document.getElementById("couponValue").value
        if(inputCouponValue.trim() == "")
        {
            setCouponAppliedIndicator(0) //Now the Coupon is removed - State Changed
            setCouponMessage(" ")
            setValidateCouponMsg("")
            setdiscountTot(totalAmount)
        }
        else if(inputCouponValue != "SUMMER150")
        {
            if(couponAppliedIndicator === 1)
            {
                setValidateCouponMsg("Coupon is already applied - Dont try again!")
            }
            else
            {
                console.log("couponvalue",inputCouponValue)
                setValidateCouponMsg("Enter the valid Coupon Code")
                setCouponMessage("")
            }
        }
        else
        {
            let currentUser= localStorage.getItem("email") //Fetching the current logged in userID
            await Axios.get(backendurl.url+"/user/"+currentUser).then((response) =>
                {
                    if(response.data.user[0].discountEligible == "true")
                    {
                        let percentage = (25/100);
                        let discountAmount = percentage * subTotal;
                        let finalDicountedTotal = Math.round(subTotal - discountAmount);
                        setdiscountTot(finalDicountedTotal)
                        localStorage.setItem("discountApplied",JSON.stringify("true"))
                        localStorage.setItem("orderDiscountAmount",JSON.stringify(finalDicountedTotal))
                        console.log("finalDicountedTotal",finalDicountedTotal)
                        setCouponAppliedIndicator(1) //Now the Coupon is Applied - State Changed
                        setCouponMessage("Coupon Applied")
                    }
                    else
                    {
                        setValidateCouponMsg("Oops! your account is not eligible for discount - Purchase more at ALDORA to reach eligibility!")
                    }
                }
            );
        }

    }

    return (
        <div>
            {/*{ noOfCartItems ? (<p> Cart has ietms </p>) :(<p>Cart has no items </p>) }*/}
            { noOfCartItems // If Cart is 'Empty' then render the page accordingly
                ?
                (
                    <>
                    <div className="AddToCart">
                        <Container fluid>
                            {/*Row 1 starts here*/}
                            <Row>
                                <Col>
                                    <Card body outline color="success" className="mx-auto my-2">
                                        <CardBody>
                                            <h3 className="h3Class">SHOPPING CART - '{noOfCartItems}' Item(s)</h3>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            {/*Row 1 Ends here*/}

                            {/*Row 2 starts here*/}
                            <Row>
                                {/*Column 1 starts here*/}
                                <Col sm={8}>
                                    {products.map((iterateVariable)=>(
                                        // Sub Column iteration starts here
                                        <Col key={iterateVariable.id}>
                                            <Card body outline color="success" className="mx-auto my-2">
                                                <CardBody>
                                                    <a href="" className="imageLinkClass"><img src={iterateVariable.productImage} width="140" height="140"/></a>
                                                    <div className="row">
                                                        <div className="col-md-8"><a href="" className="labelStyling">{iterateVariable.productName}</a></div>
                                                        <div className="col-md-4"><label className="priceStyling">${iterateVariable.productPrice}</label></div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4"><label className="inStock">In Stock</label></div>
                                                    </div>
                                                    <br/><br/>
                                                    <div className="quantityAndDeleteButton">
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                {/*<button type="button" className="buttonClass" onClick={()=>this.decrement("decrementTeddyObjValue")} value="decrementTeddyObjValue" id="decrementTeddyObjValue">-</button>*/}
                                                                {/*<label className="inputClass">{(iterateVariable.productCount?iterateVariable.productCount:1)}</label>*/}
                                                                {/*<button type="button" className="buttonClass" onClick={()=>increment(iterateVariable)}>+</button>*/}
                                                                <QuantityPicker min={1} max={iterateVariable.productStockUnits} value={(iterateVariable.productCount?iterateVariable.productCount:1)} onChange={(value)=>changeCount(iterateVariable,value)} smooth />
                                                            </div>
                                                            <div className= "col-md-4">
                                                                <div className="deleteButton"><button type="button" className="btn btn-danger" onClick={()=>deleteProduct(iterateVariable)}>Delete</button></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    ))}
                                    {/*Sub Column iteration ends here*/}
                                    <Col>
                                        <Card body outline color="success" className="mx-auto my-2">
                                            <CardBody>
                                                <p className="subTotal">SubTotal ({noOfCartItems})items: ${subTotal} </p>
                                                <a href="homepage" className="continueShoppingLink">Continue Shopping</a>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Col>
                                {/*Column 1 ends here*/}

                                {/*Column 2 starts here*/}
                                <Col sm={4}>
                                    <Card body outline color="success" className="mx-auto my-2">
                                        <CardBody>
                                            <div>
                                                <Row>
                                                    <h3 className="h3Class">The Subtotal Amount ({noOfCartItems}) item</h3>
                                                </Row>
                                                <Row><p className="paraClass">Amount: ${subTotal}</p></Row>
                                                <Row><p className="paraClass">Charges: $0</p></Row>
                                                <hr/>
                                                <Row>{(<div className="errorMsg">{(couponAppliedIndicator?couponMessage:"")}</div>)}</Row>
                                                <Row><p className="paraClass">Total: ${discountTot}</p></Row>
                                                <Row><Button type="submit" variant="primary" onClick={() => navigateToOrderPlacement()}>Proceed To Checkout</Button></Row>
                                            </div>
                                        </CardBody>
                                    </Card>

                                    <Card body outline color="success" className="mx-auto my-3">
                                        <CardBody>
                                            <Row>
                                                <div>
                                                    <p className="couponClass">*Enter - 'SUMMER150' to avail 25% off*</p>
                                                    <Input type="text" placeholder="Enter the Coupon Code" id="couponValue"/>
                                                    {(<div className="errorMsg">{(couponAppliedIndicator?validateCouponMsg:validateCouponMsg)}</div>)}
                                                    <br/>
                                                    <Button type="submit" variant="primary" onClick={(e)=>applyCoupon(subTotal,couponAppliedIndicator)}>Apply Coupon</Button>
                                                </div>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                {/*Column 2 ends here*/}

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
                )

                :

                (
                    <>
                        <div className="AddToCart">
                            <Container fluid>
                                {/*Row 1 starts here*/}
                                <Row>
                                    <Col>
                                        <Card body outline color="success" className="mx-auto my-2">
                                            <CardBody>
                                                <h3 className="h3Class">No Items in Cart</h3>
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
                )
            }
        </div>
    );

}//Function Ends Here

export default ShoppingCart;