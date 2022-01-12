/*author: Anjali Chaudhary */
import React, { Component } from 'react';
import './UpdateProfile.css';
import axios from 'axios';
import backendurl from "../config.json"

class UpdateProfile extends Component {
   
    constructor(props) {
        super(props); 
        this.backendUrl = "http://localhost:9000"
        this.state = {
            form: {
                firstname: {
                    value: "",
                    error: "",
                    flag: false,
                    uvalue: "",
                },
                lastname: {
                    value: "",
                    error: "",
                    flag: false,
                    uvalue: "",
                },
                username: {
                    value: "",
                    error: "",
                    flag: false,
                    uvalue: "",
                },
                password: {
                    value: "",
                    error: "",
                    flag: false,
                    uvalue: "",
                },
                confirmpassword: {
                    value: "",
                    error: "",
                    flag: false,
                    uvalue: "",
                },
                userId: ""
            },
            error: false,
            loadingS: false,
            loadingD: false,
            errorMsg: "",
        }
    };

    componentWillMount = async () => {

        await fetch(backendurl.url+"/user/"+localStorage.getItem("email"))
        .then((res)=>res.json())
        .then((data)=>{
            let user = data.user[0]
            let form = this.state.form
            form.username.value = user.username
            form.password.value = user.password
            form.confirmpassword.value = user.password
            form.firstname.value = user.firstname
            form.lastname.value = user.lastname
            form.username.uvalue = user.username
            form.password.uvalue = user.password
            form.confirmpassword.uvalue = user.password
            form.firstname.uvalue = user.firstname
            form.lastname.uvalue = user.lastname
            form.userId = user._id
            form.cart = user.cart
            form.wishlist = user.wishlist
            this.setState({form: form})
        })
    }

    handleInp = async (event) => {
        let id = event.target.id
        let form = this.state.form
        form[id].uvalue = event.target.value

        if(id=="firstname")
        {
            if (/^[a-zA-Z\s]+$/.test(form.firstname.uvalue)){
                form.firstname.error = ""
            } else {
                form.firstname.error =  form.firstname.uvalue=="" ? "Field should not be empty" : "Firstname should only contain alphabets."
            }
        }
        else if(id=="lastname")
        {
            if (/^[a-zA-Z\s]+$/.test(form.lastname.uvalue)){
                form.lastname.error = ""
            } else {
                form.lastname.error = form.lastname.uvalue=="" ? "Field should not be empty" : "Lastname should only contain alphabets."
            }
        }
        else if(id=="username")
        {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(form.username.uvalue)){
                form.username.error = ""
            } else {
                form.username.error =  form.username.uvalue=="" ? "Field should not be empty" : "Username is not in a valid formate (abc@xyz.com)."
            }
        }
        else if(id=="password")
        {
            if(form.password.uvalue.length < 8){
                form.password.error = form.password.uvalue=="" ? "Field should not be empty" : "Password length should be atleast 8."
            } else {
                form.password.error = ""
            }

            if(form.password.uvalue != form.confirmpassword.uvalue){
                form.confirmpassword.error = form.confirmpassword.uvalue == "" ? "Field should not be empty" : "Password not matching"
            } else {
                form.confirmpassword.error = ""
            }
        }
        else
        {
            if(form.password.uvalue != form.confirmpassword.uvalue){
                form.confirmpassword.error = form.confirmpassword.uvalue == "" ? "Field should not be empty" : "Password not matching"
            } else {
                form.confirmpassword.error = ""
            }
        }

        await this.setState({form : form})
        await this.setError()
    }

    setError = () => {

        let form = this.state.form
        console.log(form)
        if(form.firstname.error!="" || form.lastname.error != "" || form.username.error != "" || form.password.error != "" || form.confirmpassword.error != ""){
            this.setState({error: true})
        } else {
            this.setState({error: false})
        }
    }

    update = async () => {

        let form = this.state.form
        form.username.value = form.username.uvalue
        form.firstname.value = form.firstname.uvalue
        form.lastname.value = form.lastname.uvalue
        form.password.value = form.password.uvalue
        form.confirmpassword.value = form.confirmpassword.uvalue

        await this.setState({loadingS: true})
        await axios.post(backendurl.url+"/user/update", form)
        .then((data)=>{
            if(data.data.message=="success"){
                this.setState({errorMsg : "", loadingS: false, form: form})
                localStorage.setItem("email", form.username.value)
                window.location.href = "/my_profile"
            } else {
                this.setState({errorMsg: "Some error occured, please try after sometimes.", loadingS: false, form: form})
            }
        })
    }

    delete = async () => {

        await this.setState({loadingD: true})
        await axios.post(backendurl.url+"/user/delete", { userId : this.state.form.userId})
        .then((data)=>{
            if(data.data.message=="success"){
                this.setState({errorMsg : "", loadingD: false})
                localStorage.removeItem("email")
                window.location.href = "/login"
            } else {
                this.setState({errorMsg: "Some error occured, please try after sometimes.", loadingD: false})
            }
        })
    }

    setFlags = async (event) => {
        let id = event.target.id
        let form = this.state.form
        form[id].flag = !form[id].flag

        if(!form[id].flag)
        {
            form[id].uvalue = form[id].value
            form[id].error = ""
            if(id=="password") { form.confirmpassword.error = ""}
        }
        await this.setState({form: form})
    }
    
    htmlContent = () => {
        return (         
            <div className="row col-md-12 set-row-update">
                <div class="card set-card-style-update">
                    <div class="card-body set-card-update">
                        <div className="set-img-update"></div>
                        <h4 class="card-title">My Profile</h4>
                        <hr></hr>
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <td className="tl-c1-u">First Name</td>
                                    <td className="tl-c2-u">:</td>
                                    <td className="tl-c3-u"><input disabled={!this.state.form.firstname.flag} type="text" id="firstname" class="form-control" placeholder="Enter firstname" value={this.state.form.firstname.uvalue} onChange={this.handleInp}/></td>
                                    <td className="tl-c4-u" id="firstname" onClick={this.setFlags}>
                                        {
                                            !this.state.form.firstname.flag
                                            ?
                                            <svg id="firstname" style={{marginTop: "0.6em"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path id="firstname" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                            </svg>
                                            :
                                            <svg id="firstname" style={{marginTop: "0.5em", marginLeft: "-0.4em"}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                                <path id="firstname" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        }   
                                    </td>
                                </tr>
                                <tr>
                                    <td className="tl-c1-u"></td>
                                    <td className="tl-c2-u"></td>
                                    <td className="tl-c3e-u">{this.state.form.firstname.error}</td>
                                </tr>
                                <tr>
                                    <td className="tl-c1-u">Last Name</td>
                                    <td className="tl-c2-u">:</td>
                                    <td className="tl-c3-u"><input disabled={!this.state.form.lastname.flag} type="text" id="lastname" class="form-control" placeholder="Enter lastname" value={this.state.form.lastname.uvalue} onChange={this.handleInp}/></td>
                                    <td className="tl-c4-u" id="lastname" onClick={this.setFlags}>
                                        {
                                            !this.state.form.lastname.flag
                                            ?
                                            <svg id="lastname" style={{marginTop: "0.6em"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path id="lastname" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                            </svg>
                                            :
                                            <svg id="lastname" style={{marginTop: "0.5em", marginLeft: "-0.4em"}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                                <path id="lastname" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        }   
                                    </td>
                                </tr>
                                <tr>
                                    <td className="tl-c1-u"></td>
                                    <td className="tl-c2-u"></td>
                                    <td className="tl-c3e-u">{this.state.form.lastname.error}</td>
                                </tr>
                                <tr>
                                    <td className="tl-c1-u">Username</td>
                                    <td className="tl-c2-u">:</td>
                                    <td className="tl-c3-u"><input disabled={!this.state.form.username.flag} type="email" id="username" class="form-control" placeholder="Enter email (abc@xyz.com)" value={this.state.form.username.uvalue} onChange={this.handleInp}/></td>
                                    <td className="tl-c4-u" id="username" onClick={this.setFlags}>
                                        {
                                            !this.state.form.username.flag
                                            ?
                                            <svg id="username" style={{marginTop: "0.6em"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path id="username" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                            </svg>
                                            :
                                            <svg id="username" style={{marginTop: "0.5em", marginLeft: "-0.4em"}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                                <path id="username" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        }   
                                    </td>
                                </tr>
                                <tr>
                                    <td className="tl-c1-u"></td>
                                    <td className="tl-c2-u"></td>
                                    <td className="tl-c3e-u">{this.state.form.username.error}</td>
                                </tr>
                                <tr>
                                    <td className="tl-c1-u">Password</td>
                                    <td className="tl-c2-u">:</td>
                                    <td className="tl-c3-u"><input disabled={!this.state.form.password.flag} type="password" id="password" class="form-control" placeholder="Enter password" value={this.state.form.password.uvalue} onChange={this.handleInp}/></td>
                                    <td className="tl-c4-u" id="password" onClick={this.setFlags}>
                                        {
                                            !this.state.form.password.flag
                                            ?
                                            <svg id="password" style={{marginTop: "0.6em"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path id="password" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                            </svg>
                                            :
                                            <svg id="password" style={{marginTop: "0.5em", marginLeft: "-0.4em"}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                                <path id="password" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        }   
                                    </td>
                                </tr>
                                <tr>
                                    <td className="tl-c1-u"></td>
                                    <td className="tl-c2-u"></td>
                                    <td className="tl-c3e-u">{this.state.form.password.error}</td>
                                </tr>
                                {
                                    this.state.form.password.flag ?
                                    <React.Fragment>
                                        <tr>
                                            <td className="tl-c1-u">Confirm Password</td>
                                            <td className="tl-c2-u">:</td>
                                            <td className="tl-c3-u"><input type="password" id="confirmpassword" class="form-control" placeholder="Re-Enter password" value={this.state.form.confirmpassword.uvalue} onChange={this.handleInp}/></td>
                                        </tr>
                                        <tr>
                                            <td className="tl-c1-u"></td>
                                            <td className="tl-c2-u"></td>
                                            <td className="tl-c3e-u">{this.state.form.confirmpassword.error}</td>
                                        </tr>
                                    </React.Fragment>
                                    :
                                    ""
                                }
                                
                            </tbody>
                        </table>
                        <span>
                            <button className="btn btn-success set-btn-style-update" disabled={this.state.error} onClick={this.update}>
                                {
                                    !this.state.loadingS
                                    ?
                                    <React.Fragment>
                                        Save Changes&nbsp;&nbsp;&nbsp;
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        Saving&nbsp;&nbsp;&nbsp;
                                        <div class="spinner-border spinner-border-sm" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </React.Fragment>
                                }
                            </button>
                            <button className="btn btn-danger set-btn-style-update" onClick={this.delete}>
                                {
                                    !this.state.loadingD
                                    ?
                                    <React.Fragment>
                                        Delete Account&nbsp;&nbsp;&nbsp;
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        Deleting&nbsp;&nbsp;&nbsp;
                                        <div class="spinner-border spinner-border-sm" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </React.Fragment>
                                }
                            </button>
                        </span>
                        {
                            this.state.errorMsg != ""
                            ?
                            <div class="alert alert-danger set-alert-style-r" role="alert">
                                {this.state.errorMsg}
                            </div>
                            :
                            ""
                        }
                    </div>
                </div>               
            </div>
        ) 
    }

    render() {
        return (this.htmlContent());
    }
}
export default UpdateProfile;