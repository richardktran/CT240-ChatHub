import { Component } from "react";
import socket from "../Socket.IO/Socket.js";
import axios from 'axios'

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StatusSeen: "",
            StatusOnline: ""
        }
    }

    //click to user chat
    ClickChatUser = () => {
        if (this.props.ID !== "") {
            this.props.ClickChatUser(this.props.ID, this.state.statusOnline);
        } else {
            this.props.ClickChatUser(this.props.UserName, this.state.statusOnline);
        }
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.StatusSeen) {
            for (let index in nextProps.StatusSeen) {
                if (nextProps.StatusSeen[index] === nextProps.ID) {
                    return {
                        StatusSeen: "bold"
                    }
                }
            };
        }
        return {
            StatusSeen: ""
        }
    }
    //update status online when change props
    componentDidMount() {
        const Data = this.props.UserName;
        axios.post('/api/statusOnline', { UserName: Data })
            .then(Response => {
                if (Response.data !== "") {
                    this.setState({
                        statusOnline: "online"
                    });
                    this.ClickChatUser(this.props.IdData, "online");
                } else {
                    this.setState({
                        statusOnline: ""
                    })
                }
            })
            .catch(Error => { });
    }
    //when orther user disconnect
    componentDidUpdate(prevProps, prevState, snapshot) {
        socket.on("Server-send-online", Data => {
            const UserName = Data;
            if (this.props.UserName === UserName) {
                this.setState({
                    statusOnline: "online"
                });
            }
        });
        socket.on("Server-send-not-online", Data => {
            const UserName = Data;
            if (this.props.UserName === UserName) {
                this.setState({
                    statusOnline: ""
                });
            }
        });
    }

    render() {
        return (
            <li key={this.props.ID} className="chat-item" onClick={this.ClickChatUser}>
                <a className="chat-link chat-open" href="#">
                    <div className="chat-media user-avatar">
                        <img src={this.props.PathAvatar} alt="" />
                        <span className="status dot dot-lg dot-success" />
                    </div>
                    <div className="chat-info">
                        <div className="chat-from">
                            <div className="name {this.state.StatusSeen}">{this.props.UserName}</div>
                            <span className="time">3 Apr</span>
                        </div>
                        <div className="chat-context">
                            <div className="text">
                                <p>Hi Frank! How is you doing?</p>
                            </div>
                        </div>
                    </div>
                </a>
                <div className="chat-actions">
                    <div className="dropdown">
                        <a href="#" className="btn btn-icon btn-sm btn-trigger dropdown-toggle" data-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <ul className="link-list-opt no-bdr">
                                <li><a href="#">Mute</a></li>
                                <li className="divider" />
                                <li><a href="#">Hide</a></li>
                                <li><a href="#">Delete</a></li>
                                <li className="divider" />
                                <li><a href="#">Mark as Unread</a></li>
                                <li><a href="#">Ignore Messages</a></li>
                                <li><a href="#">Block Messages</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}