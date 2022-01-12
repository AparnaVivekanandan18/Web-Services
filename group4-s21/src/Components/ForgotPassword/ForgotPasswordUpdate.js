/*author: Anjali Chaudhary */
import React, { Component } from 'react';
import './ForgotPasswordUpdate';
import axios from 'axios';
import backendurl from "../config.json"
class ForgotPasswordUpdate extends Component {
  
   
    constructor(props) {
        super(props); 
        this.backendUrl = "http://localhost:9000"
        this.state = {
            form: {
                password: {
                    value: "",
                    error: ""
                },
                confirmpassword: {
                    value: "",
                    error: ""
                },
                username: ""
            },
            error: false,
            loading: false
        }
    };

    componentWillMount = () => {
        let form = this.state.form
        form.username = window.location.href.split("?username=").length > 1 ? window.location.href.split("?username=")[1] : ""
        this.setState({form: form})
    }

    handleInp = (event) => {
        let id = event.target.id
        let form = this.state.form
        form[id].value = event.target.value

        if(id=="password")
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

        this.setState({form : form})
    }

    updatePassword = async () => {
        await this.setState({loading: true})
        await axios.post(backendurl.url+"/user/updatePassword" , this.state.form)
        .then((data)=>{
            if(data.data.message=="success"){
                this.setState({loading: false, error: false})
                window.location.href = "/login"
            } else {
                this.setState({loading: false, error: true})
            }
        })
    }
    
    htmlContent = () => {
        return (         
            <div className="row col-md-12 set-row-login">
                <div class="card set-card-style-login">
                    <div class="card-body set-card-login">
                        <h4 class="card-title">Enter new password</h4>
                        <hr></hr>
                        <table className="table table-borderless">
                            <tbody>
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
                                    <td className="tl-c2"><input type="password" id="confirmpassword" class="form-control" placeholder="Re-Enter password" value={this.state.form.confirmpassword.value} onChange={this.handleInp}/></td>
                                </tr>
                                <tr>
                                    <td className="tl-c1"></td>
                                    <td></td>
                                    <td className="tl-c2e">{this.state.form.confirmpassword.error}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="btn btn-success set-btn-style-login" onClick={this.updatePassword} disabled={this.state.form.username=="" || this.state.form.password==""}>
                            
                            {
                                !this.state.loading
                                ?
                                <React.Fragment>
                                    Update&nbsp;&nbsp;&nbsp;
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    Updating&nbsp;&nbsp;&nbsp;
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
                                Some error occured, please try after sometimes !
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
export default ForgotPasswordUpdate;