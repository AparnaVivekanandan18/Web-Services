/*author: Anjali Chaudhary */
import React, { Component } from 'react';
import './RegistrationForm.css';
import axios from 'axios';
import backendurl from "../config.json"

class RegistrationForm extends Component {
   
    constructor(props) {
        super(props); 
        this.backendUrl = "http://localhost:9000"
        this.state = {
            form: {
                firstname: {
                    value: "",
                    error: "Field should not be empty"
                },
                lastname: {
                    value: "",
                    error: "Field should not be empty"
                },
                username: {
                    value: "",
                    error: "Field should not be empty"
                },
                password: {
                    value: "",
                    error: "Field should not be empty"
                },
                confirmpassword: {
                    value: "",
                    error: "Field should not be empty"
                }
            },
            error: false,
            loading: false,
            errorMsg: ""
        }
    };

    handleInp = async (event) => {
        let id = event.target.id
        let form = this.state.form
        form[id].value = event.target.value

        if(id=="firstname")
        {
            if (/^[a-zA-Z\s]+$/.test(form.firstname.value)){
                form.firstname.error = ""
            } else {
                form.firstname.error =  form.firstname.value=="" ? "Field should not be empty" : "Firstname should only contain alphabets."
            }
        }
        else if(id=="lastname")
        {
            if (/^[a-zA-Z\s]+$/.test(form.lastname.value)){
                form.lastname.error = ""
            } else {
                form.lastname.error = form.lastname.value=="" ? "Field should not be empty" : "Lastname should only contain alphabets."
            }
        }
        else if(id=="username")
        {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(form.username.value)){
                form.username.error = ""
            } else {
                form.username.error =  form.username.value=="" ? "Field should not be empty" : "Username is not in a valid formate (abc@xyz.com)."
            }
        }
        else if(id=="password")
        {
            if(form.password.value.length < 8){
                form.password.error = form.password.value=="" ? "Field should not be empty" : "Password length should be atleast 8."
            } else {
                form.password.error = ""
            }
        }
        else
        {
            if(form.password.value != form.confirmpassword.value){
                form.confirmpassword.error = form.confirmpassword.value == "" ? "Field should not be empty" : "Password not matching"
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

    register = async () => {
        await this.setState({loading: true})
        await axios.post(backendurl.url+"/user/register", this.state.form)
        .then((data)=>{
            if(data.data.message=="success"){
                this.setState({errorMsg : "", loading: false})
                localStorage.setItem("email",this.state.form.username.value)
                window.location.href = "/homepage"
            } else {
                this.setState({errorMsg: "Some error occured, please try after sometimes.", loading: false})
            }
        })
    }
    
    htmlContent = () => {
        return (         
            <div className="row col-md-12 set-row-register">
                <div class="card set-card-style-register">
                    <div class="card-body set-card-register">
                        <h4 class="card-title">Sign Up</h4>
                        <hr></hr>
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <td className="tl-c1">First Name</td>
                                    <td>:</td>
                                    <td className="tl-c2"><input type="text" id="firstname" class="form-control" placeholder="Enter firstname" value={this.state.form.firstname.value} onChange={this.handleInp}/></td>
                                </tr>
                                <tr>
                                    <td className="tl-c1"></td>
                                    <td></td>
                                    <td className="tl-c2e">{this.state.form.firstname.error}</td>
                                </tr>
                                <tr>
                                    <td className="tl-c1">Last Name</td>
                                    <td>:</td>
                                    <td className="tl-c2"><input type="text" id="lastname" class="form-control" placeholder="Enter lastname" value={this.state.form.lastname.value} onChange={this.handleInp}/></td>
                                </tr>
                                <tr>
                                    <td className="tl-c1"></td>
                                    <td></td>
                                    <td className="tl-c2e">{this.state.form.lastname.error}</td>
                                </tr>
                                <tr>
                                    <td className="tl-c1">Username</td>
                                    <td>:</td>
                                    <td className="tl-c2"><input type="email" id="username" class="form-control" placeholder="Enter email (abc@xyz.com)" value={this.state.form.username.value} onChange={this.handleInp}/></td>
                                </tr>
                                <tr>
                                    <td className="tl-c1"></td>
                                    <td></td>
                                    <td className="tl-c2e">{this.state.form.username.error}</td>
                                </tr>
                                <tr>
                                    <td className="tl-c1">Password</td>
                                    <td>:</td>
                                    <td className="tl-c2"><input type="password" id="password" class="form-control" placeholder="Enter password" value={this.state.form.password.value} onChange={this.handleInp}/></td>
                                </tr>
                                <tr>
                                    <td className="tl-c1"></td>
                                    <td></td>
                                    <td className="tl-c2e">{this.state.form.password.error}</td>
                                </tr>
                                <tr>
                                    <td className="tl-c1">Confirm Password</td>
                                    <td>:</td>
                                    <td className="tl-c2e"><input type="password" id="confirmpassword" class="form-control" placeholder="Re-Enter password" value={this.state.form.confirmpassword.value} onChange={this.handleInp}/></td>
                                </tr>
                                <tr>
                                    <td className="tl-c1"></td>
                                    <td></td>
                                    <td className="tl-c2e">{this.state.form.confirmpassword.error}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="btn btn-success set-btn-style-register" disabled={this.state.error} onClick={this.register}>
                            {
                                !this.state.loading
                                ?
                                <React.Fragment>
                                    Register&nbsp;&nbsp;&nbsp;
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    Registering&nbsp;&nbsp;&nbsp;
                                    <div class="spinner-border spinner-border-sm" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </React.Fragment>
                            }
                        </button>
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
export default RegistrationForm;