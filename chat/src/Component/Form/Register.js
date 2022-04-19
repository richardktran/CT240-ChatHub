import { Component } from 'react';

import "./CSS/StyleForm.scss"

export default class Register extends Component {
    render() {
        return (
            <div className="center-container">
                <div className="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white">
                    <div className="nk-block pt-5 nk-auth-body">
                        <div className="brand-logo pb-5 mt-5">
                            <a href="#" className="logo-link">
                                <img className="logo-light logo-img logo-img-lg" src="./images/logo.jfif" srcSet="./images/logo2x.png 2x" alt="logo" />
                                <img className="logo-dark logo-img logo-img-lg" src="./images/logo1.jpg" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark" />
                            </a>
                        </div>
                        <div className="nk-block-head">
                            <div className="nk-block-head-content">
                                <h5 className="nk-block-title">Sign Up</h5>
                            </div>
                        </div>
                        <form action="http://localhost:4000/Register/Store" method="post" enctype="multipart/form-data" className="form-validate is-alter" autoComplete="off" noValidate="novalidate">
                            <div className="form-group">
                                <div className="form-label-group">
                                    <label className="form-label" htmlFor="email-address">Username</label>
                                </div>
                                <div className="form-control-wrap">
                                    <input autoComplete="off" type="text" className="user form-control form-control-lg"
                                        required id="email-address" placeholder="Enter your username"
                                        name="Username" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <label className="form-label" htmlFor="password">Password</label>
                                </div>
                                <div className="form-control-wrap">
                                    <a tabIndex={-1} href="#" className="form-icon form-icon-right passcode-switch lg" data-target="password">
                                        <em className="passcode-icon icon-show icon ni ni-eye" />
                                        <em className="passcode-icon icon-hide icon ni ni-eye-off" />
                                    </a>
                                    <input autoComplete="new-password" type="password"
                                        className="pass form-control form-control-lg"
                                        required
                                        id="password" placeholder="Enter your password"
                                        name="Password" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <label className="form-label" htmlFor="password">Confirm Password</label>
                                </div>
                                <div className="form-control-wrap">
                                    <a tabIndex={-1} href="#" className="form-icon form-icon-right passcode-switch lg" data-target="password">
                                        <em className="passcode-icon icon-show icon ni ni-eye" />
                                        <em className="passcode-icon icon-hide icon ni ni-eye-off" />
                                    </a>
                                    <input autoComplete="new-password" type="password"
                                        className="pass form-control form-control-lg"
                                        required
                                        placeholder="Confirm your password"
                                        name="rePassword" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <label className="form-label" htmlFor="password">Choose your avatar</label>
                                </div>
                                <div className="form-control-wrap">
                                    <input
                                        type="file"
                                        className="user pass form-control form-control-lg"
                                        required
                                        placeholder="Confirm your password"
                                        name="image" />
                                </div>
                            </div>
                            {this.props.MessageError &&
                                <div className="alert alert-danger alert-icon">
                                    <em className="icon ni ni-cross-circle" />
                                    {this.props.MessageError}
                                </div>
                            }


                            <div className="form-group">
                                <input className="btn btn-lg btn-primary btn-block" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <div className="form-note-s2 pt-4">Already have an account ?
                            <a href="http://localhost:3000">
                                {' '}Sign in instead
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}