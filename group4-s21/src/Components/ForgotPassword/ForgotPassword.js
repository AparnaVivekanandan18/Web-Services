/*author: Anjali Chaudhary */
import React, { Component } from 'react';
import './ForgotPassword.css';
import axios from 'axios';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import backendurl from "../config.json"
class ForgotPassword extends Component {
  
   
    constructor(props) {
        super(props); 
        this.backendUrl = "http://localhost:9000"
        this.state = {
            username: "",
            error: false,
            loading: false,
            errorMsg: "Field should not be empty"
        }
    };

    handleInp = (event) => {
        let value =  event.target.value
        let errorMsg = ""
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)){
            errorMsg = ""
        } else {
            errorMsg =  value=="" ? "Field should not be empty" : "Username is not in a valid formate (abc@xyz.com)."
        }
        this.setState({username : value, errorMsg : errorMsg})
    }

    authorizeEmail = async () => {
        await this.setState({loading: true})
        await axios.post(backendurl.url+"/user/authorize" , { username: this.state.username})
        .then((data)=>{
            if(data.data.message=="success"){
                this.setState({error: faLessThanEqual, loading: false})
                window.location.href = "/forgot_password_update?username="+this.state.username
            } else {
                this.setState({error: true, loading: false})
            }
        })
    }
    
    htmlContent = () => {
        return (         
            <div className="row col-md-12 set-row-login">
                <div class="card set-card-style-login">
                    <div class="card-body set-card-login">
                        <h4 class="card-title">Forgot Password ?</h4>
                        <hr></hr>
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <td className="tl-c1">Username</td>
                                    <td>:</td>
                                    <td className="tl-c2"><input type="email" id="username" class="form-control" placeholder="Enter email (abc@xyz.com)" value={this.state.username} onChange={this.handleInp}/></td>
                                </tr>
                                <tr>
                                    <td className="tl-c1"></td>
                                    <td></td>
                                    <td className="tl-c2e">{this.state.errorMsg}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="btn btn-success set-btn-style-login" onClick={this.authorizeEmail} disabled={this.state.errorMsg!=""}>
                            
                            {
                                !this.state.loading
                                ?
                                <React.Fragment>
                                    Next&nbsp;&nbsp;&nbsp;
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    Next&nbsp;&nbsp;&nbsp;
                                    <div class="spinner-border spinner-border-sm" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </React.Fragment>
                            }
                        </button>
                        {
                            this.state.error
                            ?
                            <div class="alert alert-danger set-alert-style-r" role="alert">
                                Not a valid username :(
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
export default ForgotPassword;