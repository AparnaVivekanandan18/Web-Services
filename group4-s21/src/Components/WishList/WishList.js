/*author: Anjali Chaudhary */
import React, { Component } from 'react';
import './WishList.css';
import axios from 'axios';
import { hidden } from 'chalk';
import backendurl from "../config.json"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class WishList extends Component {
  
   
    constructor(props) {
        super(props); 
        this.backendUrl = "http://localhost:9000"
        this.state = {
            userId : "",
            wishList : [],
            createWishlist : false,
            wname: "",
            werror: "Name should not be empty",
            display: [],
            selectedTab: "",
            loading: false
        }
    };

    componentWillMount = async () => {
        await fetch(backendurl.url+"/user/"+localStorage.getItem("email"))
        .then((res)=>res.json())
        .then(async (data)=>{
            let user = data.user[0]
            await this.setState({userId : user._id , wishList: user.wishlist})
        })
    }

    handleInp = (event) => {

        let val = event.target.value
        let error = val==""

        this.state.wishList.map((obj)=>{
            if(obj.wishlistName==val){
                error = true
            }
        })
        this.setState({wname: val , werror: error ? val=="" ? "Name should not be empty" : "Name already exist" : ""})
    }

    setSelectedWishlist = async (event) => {
        let id = event.target.id
        let wishlist = this.state.wishList
        console.log(id)
        if(id.split("?")[0]=="REMOVE")
        {
            wishlist = wishlist.filter((item)=>{
                if(item.wishlistName == id.split("?")[1]){
                    return false
                }
                return true;
            })
            await axios.post(backendurl.url+"/user/addwishlist",{ username: localStorage.getItem("email"), wishlist: wishlist})
            .then(async (data)=>{
                window.location.reload()
            })
        }
        else
        {
            let display = []
            this.setState({loading : true})
            for(let i=0;i<wishlist.length;i++)
            {
                if(wishlist[i].wishlistName==id){
                    let items = wishlist[i].wishlistItems
                    for(let j=0;j<items.length;j++)
                    {
                        console.log(items[j])
                        await axios.get(backendurl.url+ "/products/displayProducts/" + items[j].giftId).then((response) =>
                            {
                                console.log(response);
                                let res = response.data.products[0]
                                console.log(res);

                                res["quantity"] = items[j].quantity
                                display.push(res)
                            }
                        );
                    }
                    break;
                }
            }
            await this.setState({display : display,loading: false, selectedTab: id})
        }
    }

    createWishlist = () => {
        this.setState({createWishlist : !this.state.createWishlist, wname: "", werror: "Name should not be empty"})
    }

    okWishlist = async () => {

        let wishlist = this.state.wishList
        wishlist.push({
            "wishlistName" : this.state.wname,
            "wishlistItems" : []
        })
        await axios.post(backendurl.url+"/user/addwishlist",{ username: localStorage.getItem("email"), wishlist: wishlist})
        .then(async (data)=>{
            await this.createWishlist()
            window.location.reload()
        })
    }

    removeFromWishlist = async (event) => {
        let id = event.target.id
        let selectedTab = this.state.selectedTab
        let wishlist = this.state.wishList

        for(let i=0;i<wishlist.length;i++)
        {
            if(wishlist[i].wishlistName==selectedTab)
            {
                let items = wishlist[i].wishlistItems
                items = items.filter((item)=>{
                    if(item.giftId == id){
                        return false
                    }
                    return true;
                })
                wishlist[i].wishlistItems = items
                await axios.post(backendurl.url+"/user/addwishlist",{ username: localStorage.getItem("email"), wishlist: wishlist})
                .then(async (data)=>{
                    window.location.reload()
                })
            }
        }
    }
    
    htmlContent = () => {
        return (         
            <div className="row col-md-12">
                <div className="col-md-2 set-style-wl-left">
                    <div className="set-wl-div">
                        <span className="set-width-wl-btn" onClick={this.createWishlist}><u>Create Wishlist</u></span>
                    </div>
                    <hr></hr>
                    {
                        this.state.wishList.length > 0 ? 
                        this.state.wishList.map((obj)=>{
                            return <React.Fragment>
                                <div id={obj.wishlistName} className={ this.state.selectedTab==obj.wishlistName ? "set-wl-div-h" : "set-wl-div"}  onClick={this.setSelectedWishlist}>
                                    <span id={obj.wishlistName} className="set-width-wl-btn">{obj.wishlistName}</span>
                                    <span id={"REMOVE?"+obj.wishlistName} className="set-trash-wl">
                                        <svg id={"REMOVE?"+obj.wishlistName} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path id={"REMOVE?"+obj.wishlistName} d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path id={"REMOVE?"+obj.wishlistName} fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </span>
                                </div>
                                <hr></hr>
                            </React.Fragment>
                        })
                        : ""
                    }
                </div>
                <div className="col-md-10 set-style-wl-right">
                    {
                        this.state.selectedTab==""
                        ?
                        <div class="alert alert-info" role="alert" style={{textAlign: "center", marginTop: "2em"}}>
                            Please select wishlist set from left panel !
                        </div>
                        :
                        !this.state.loading 
                        ?
                        this.state.display.length == 0
                        ?
                        <div class="alert alert-success" role="alert" style={{textAlign: "center", marginTop: "2em"}}>
                            No item stored in this wishlist set !
                        </div>
                        :
                        this.state.display.map((productDetail)=>{
                            return <div class="card set-card-style-1-wll custom-class1-wll">
                                <div class="row col-md-12 card-body">
                                    <div className="col-md-2">
                                        <img class="set-img-style-wll custom-img-wll" src={productDetail.productImage} alt="Card image cap"/>
                                    </div>
                                    <div className="col-md-7 offset-md-3 set-style-div-2-wll">
                                        <table className="table table-borderless custom-table-wll">
                                            <tbody>
                                               <tr>
                                                    <td className="c1">Title</td>
                                                    <td>:</td>
                                                    <td className="c2">{productDetail.productName}</td>
                                                </tr>
                                                <tr>
                                                    <td className="c1">Description</td>
                                                    <td>:</td>
                                                    <td className="c2">{productDetail.productDescription}</td>
                                                </tr>
                                                <tr>
                                                    <td className="c1">Quantity</td>
                                                    <td>:</td>
                                                    <td className="c2">{productDetail.quantity}</td>
                                                </tr>
                                                <tr>
                                                    <td className="c1">Price</td>
                                                    <td>:</td>
                                                    <td className="c2">{productDetail.productPrice}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <button className="btn btn-sm btn-danger custom-button-wll" id={productDetail._id} onClick={this.removeFromWishlist}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        })
                        :
                        <div class="d-flex justify-content-center set-style-spinner-wl">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    }
                </div>

                <Modal isOpen={this.state.createWishlist} toggle={this.createWishlist}>
                    <ModalHeader toggle={this.createWishlist}>Create Wishlist</ModalHeader>
                    <ModalBody>
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <td className="wl-1">Wishlist Name</td>
                                    <td className="wl-2"><input type="text" class="form-control" placeholder="Enter Name" value={this.state.wname} onChange={this.handleInp}/></td>
                                </tr>
                                <tr>
                                    <td className="wl-1"></td>
                                    <td className="wl-2">{this.state.werror}</td>
                                </tr>
                            </tbody>
                        </table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.okWishlist} disabled={this.state.werror!=""}>Create</Button>{' '}
                        <Button color="secondary" onClick={this.createWishlist}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        ) 
    }

    render() {
        return (this.htmlContent());
    }
}
export default WishList;