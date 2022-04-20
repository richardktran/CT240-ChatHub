import { Component } from "react";
import socket from "../Socket.IO/Socket.js";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusOnline: "",
            statusUpdateOnline: true,
        }
    }

    //update status online when change props
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.statusOnline !== prevState.statusOnline) {
            if (prevState.statusUpdateOnline) {
                return {
                    statusOnline: nextProps.statusOnline,
                    statusUpdateOnline: true
                }
            } else {
                return {
                    statusUpdateOnline: true
                }
            }
        }
    }
    //when orther user disconnect
    componentDidUpdate(prevProps, prevState, snapshot) {
        socket.on("Server-send-online", Data => {
            this.setState({
                statusOnline: "online",
                statusUpdateOnline: false
            });
        });
        socket.on("Server-send-not-online", Data => {
            this.setState({
                statusOnline: "",
                statusUpdateOnline: false
            });
        });
    }

    render() {
        return (
            <div className="nk-chat-head">
                <ul className="nk-chat-head-info">
                    <li className="nk-chat-body-close">
                        <a href="#" className="btn btn-icon btn-trigger nk-chat-hide ml-n1"><em className="icon ni ni-arrow-left" /></a>
                    </li>
                    <li className="nk-chat-head-user">
                        <div className="user-card">
                            <div className="user-avatar bg-purple">
                                <div className="chat-media user-avatar">
                                    <img src={this.props.UserChat.PathAvatar} alt="" />
                                    <span className="status dot dot-lg dot-success" />
                                </div>
                            </div>
                            <div className="user-info">
                                <div className="lead-text">{this.props.UserChat.UserName}</div>
                                <div className="sub-text"><span className="d-none d-sm-inline mr-1">Online </span></div>
                                {/* {this.state.statusOnline} */}
                            </div>
                        </div>
                    </li>
                </ul>
                <ul className="nk-chat-head-tools">
                    <li>
                        <a href="#" className="btn btn-icon btn-trigger text-primary"><em className="icon ni ni-call-fill" /></a>
                    </li>
                    <li>
                        <a href="#" className="btn btn-icon btn-trigger text-primary"><em className="icon ni ni-video-fill" /></a>
                    </li>
                    <li className="d-none d-sm-block">
                        <div className="dropdown">
                            <a href="#" className="dropdown-toggle btn btn-icon btn-trigger text-primary" data-toggle="dropdown" aria-expanded="false"><em className="icon ni ni-setting-fill" /></a>
                            <div className="dropdown-menu dropdown-menu-right" style={{}}>
                                <ul className="link-list-opt no-bdr">
                                    <li>
                                        <a className="dropdown-item" href="#"><em className="icon ni ni-archive" /><span>Make as Archive</span></a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><em className="icon ni ni-cross-c" /><span>Remove Conversion</span></a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#"><em className="icon ni ni-setting" /><span>More Options</span></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li className="mr-n1 mr-md-n2" onClick={this.props.toggleOption}>
                        <a href="#" className="btn btn-icon btn-trigger text-primary chat-profile-toggle"><em className="icon ni ni-alert-circle-fill" /></a>
                    </li>
                </ul>
            </div>

        );
    }
}