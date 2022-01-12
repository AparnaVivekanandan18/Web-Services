/*author: Anjali Chaudhary */
import React, { Component } from 'react';
import './login.css';
import axios from 'axios';
import backendurl from "../config.json"

class login extends Component {
  
   
    constructor(props) {
        super(props); 
        this.backendUrl = "http://localhost:9000"
        this.state = {
            form: {
                username: "",
                password: ""
            },
            error: false,
            loading: false
        }
    };

    handleInp = (event) => {
        let id = event.target.id
        let form = this.state.form
        form[id] = event.target.value
        this.setState({form : form})
    }

    authorize = async () => {
        await this.setState({loading: true})
        await axios.post(backendurl.url+"/user/authorize" , this.state.form)
        .then((data)=>{
            if(data.data.message=="success"){
                localStorage.setItem("email",this.state.form.username)
                this.setState({error: false, loading: false})
                window.location.href = "/homepage"
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
                        <h4 class="card-title">Sign In</h4>
                        <hr></hr>
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <td className="tl-c1">Username</td>
                                    <td>:</td>
                                    <td className="tl-c2"><input type="email" id="username" class="form-control" placeholder="Enter email (abc@xyz.com)" value={this.state.form.username} onChange={this.handleInp}/></td>
                                </tr>
                                <tr>
                                    <td className="tl-c1">Password</td>
                                    <td>:</td>
                                    <td className="tl-c2"><input type="password" id="password" class="form-control" placeholder="Enter password" value={this.state.form.password} onChange={this.handleInp}/></td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="btn btn-success set-btn-style-login" onClick={this.authorize} disabled={this.state.form.username=="" || this.state.form.password==""}>
                            
                            {
                                !this.state.loading
                                ?
                                <React.Fragment>
                                    Sign In&nbsp;&nbsp;&nbsp;
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    Signing In&nbsp;&nbsp;&nbsp;
                                    <div class="spinner-border spinner-border-sm" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </React.Fragment>
                            }
                        </button>
                        <table className="table table-borderless set-tb-login">
                            <tbody>
                                <tr>
                                    <td className="tl-c11"><hr></hr></td>
                                    <td className="tl-c12">OR</td>
                                    <td className="tl-c13"><hr></hr></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="set-div-login">
                            <a href="/registration" className="set-a-login"><u>Don't have account ? Register here.</u></a>
                        </div>
                        <div>
                            <a href="/forgot_password" className="set-a-login"><u>Forgot password ?</u></a>
                        </div>
                        {
                            this.state.error
                            ?
                            <div class="alert alert-danger set-alert-style-r" role="alert">
                                Not authorized, please provide valid credentials !
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
export default login;