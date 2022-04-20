import { Component } from "react";

export default class ChatUser extends Component {
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
            this.props.ClickChatUser(this.props.ID);
        } else {
            this.props.ClickChatUser(this.props.UserName);
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

    render() {
        return (
            <li className="chat-item" onClick={this.ClickChatUser}>
                <a className="chat-link chat-open" href="#">
                    <div className="chat-media user-avatar">
                        <img src={this.props.PathAvatar} alt="" />
                    </div>
                    <div className="chat-info">
                        <div className="chat-from">
                            <div className="name {this.state.StatusSeen}">{this.props.UserName}</div>
                        </div>
                    </div>
                </a>
            </li>
        );
    }
}