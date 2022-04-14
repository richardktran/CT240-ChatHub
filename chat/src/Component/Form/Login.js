import { Component } from "react";

import "./CSS/StyleForm.scss"

import axios from 'axios';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StateUserName: '',
            StatePassword: ''
        }
    }

    handleChangeUserName = (event) => {
        const UserName = ({ value: event.target.value });
        this.setState({
            StateUserName: UserName.value
        });
        this.props.GetUserNameOnChange(UserName.value);
    }

    handleChangePassword = (event) => {
        const Password = ({ value: event.target.value });
        this.setState({
            StatePassword: Password.value
        });
    }

    OnSubmitLogin = () => {
        const username = this.state.StateUserName;
        const password = this.state.StatePassword;
        axios.post('/api/login', {
            UserName: username,
            Password: password
        })
            .then(Response => {
                console.log(Response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="center-container">
                <div className="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white">
                    <div className="nk-block pt-5 nk-auth-body">
                        <div className="brand-logo pb-5 mt-5">
                            <a href="html/index.html" className="logo-link">
                                <img className="logo-light logo-img logo-img-lg" src="./images/logo.png" srcSet="./images/logo2x.png 2x" alt="logo" />
                                <img className="logo-dark logo-img logo-img-lg" src="./images/logo-dark.png" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark" />
                            </a>
                        </div>
                        <div className="nk-block-head">
                            <div className="nk-block-head-content">
                                <h5 className="nk-block-title">Log In</h5>
                            </div>
                        </div>
                        <form action="http://localhost:4000/api/login" method="post" className="form-validate is-alter" autoComplete="off" noValidate="novalidate">
                            <div className="form-group">
                                <div className="form-label-group">
                                    <label className="form-label" htmlFor="email-address">Username</label>
                                </div>
                                <div className="form-control-wrap">
                                    <input autoComplete="off" type="text" className="form-control form-control-lg"
                                        required id="email-address" placeholder="Enter your username"
                                        onChange={this.handleChangeUserName} name="UserName" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <a className="link link-primary link-sm" tabIndex={-1} href="http://localhost:4000/ForgotPassword">
                                        Forgot Password?
                                    </a>
                                </div>
                                <div className="form-control-wrap">
                                    <a tabIndex={-1} href="#" className="form-icon form-icon-right passcode-switch lg" data-target="password">
                                        <em className="passcode-icon icon-show icon ni ni-eye" />
                                        <em className="passcode-icon icon-hide icon ni ni-eye-off" />
                                    </a>
                                    <input autoComplete="new-password" type="password"
                                        className="form-control form-control-lg"
                                        required
                                        id="password" placeholder="Enter your password"
                                        onChange={this.handleChangePassword} name="Password" />
                                </div>
                            </div>
                            {this.props.MessageError &&
                                <div className="alert alert-danger alert-icon">
                                    <em className="icon ni ni-cross-circle" />
                                    {this.props.MessageError}
                                </div>
                            }


                            <div className="form-group">
                                <input className="btn btn-lg btn-primary btn-block" type="submit" value="Login" />
                            </div>
                        </form>
                        <div className="form-note-s2 pt-4"> New on our platform?
                            <a href="http://localhost:3000/Register">
                                {' '}Create an account
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}