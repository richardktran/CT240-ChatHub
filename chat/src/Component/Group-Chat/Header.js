import { Component } from "react";
import Manage from "./Manage";
import "./CSS/Header.scss";
let check = true;
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StatusManage: "hide",
            StatusSearch: "input-search",
            StatusBtnExit: "hide",
            valueSearch: "",
        }
    };
    StatusManage = false;
    ClickToManage = () => {
        this.StatusManage = !this.StatusManage;
        if (this.StatusManage) {
            this.setState({ StatusManage: "show" });
        } else {
            this.setState({ StatusManage: "hide" });
        }
    }
    InputSreachClick = () => {
        if (check) {
            //set layout ListGroupChat
            this.props.InputSreachClick(check);
            //set InputSreach
            this.setState({
                StatusSearch: "input-search searching",
                StatusBtnExit: ''
            });
            check = false;
        }
    }

    HandleContent = (event) => {
        const OldValueSearch = this.state.valueSearch;
        if (!(event.target.value === "" ||
            (event.target.value - OldValueSearch) === " ")) {
            this.props.HandleInputSearch(event.target.value.trim());
        }
        this.setState({ valueSearch: event.target.value });
    }

    ExitClick = () => {
        //set layout ListGroupChat
        this.props.InputSreachClick(check);
        //set InputSreach
        this.setState({
            StatusSearch: "input-search",
            StatusBtnExit: 'hide',
            valueSearch: ""
        });
        check = true;
    }

    ClickShowListGroup = () => {
        this.props.ClickShowListGroup();
        //set InputSreach
        this.ClickToManage();
    }

    componentWillUpdate(prevProps) {
        if (prevProps.check !== this.props.check) {
            if (!prevProps.check) {
                this.ExitClick();
            }
        }
    }

    render() {
        return (
            <>
                <div className="nk-chat-aside-head">
                    <div className="nk-chat-aside-user">
                        <div className="dropdown">
                            <a href="#" className="dropdown-toggle dropdown-indicator" data-toggle="dropdown" aria-expanded="false">
                                <div className="user-avatar">
                                    <img src={this.props.MyData} alt="" />
                                </div>
                                <div className="title">Chats</div>
                            </a>
                            <div className="dropdown-menu" style={{}}>
                                <ul className="link-list-opt no-bdr">
                                    <li>
                                        <a href="#"><span>Contacts</span></a>
                                    </li>
                                    <li>
                                        <a href="#"><span>Channels</span></a>
                                    </li>
                                    <li className="divider" />
                                    <li>
                                        <a href="#"><span>Help</span></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <ul className="nk-chat-aside-tools g-2">
                        <li>
                            <div className="dropdown">
                                <a href="#" className="btn btn-round btn-icon btn-light dropdown-toggle" data-toggle="dropdown">
                                    <em className="icon ni ni-setting-alt-fill" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <ul className="link-list-opt no-bdr">
                                        <li>
                                            <a href="#"><span>Settings</span></a>
                                        </li>
                                        <li className="divider" />
                                        <li>
                                            <a href="#"><span>Message Requests</span></a>
                                        </li>
                                        <li>
                                            <a href="#"><span>Archives Chats</span></a>
                                        </li>
                                        <li>
                                            <a href="#"><span>Unread Chats</span></a>
                                        </li>
                                        <li>
                                            <a href="#"><span>Group Chats</span></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li>
                            <a href="#" className="btn btn-round btn-icon btn-light">
                                <em className="icon ni ni-edit-alt-fill" />
                            </a>
                        </li>
                    </ul>

                </div>

                {/* Search sidebar */}
                <div className="nk-chat-aside-search">
                    <div className="form-group">
                        <div className="form-control-wrap">
                            <div className="form-icon form-icon-left">
                                <em className="icon ni ni-search" />
                            </div>
                            <input
                                type="text"
                                className="form-control form-round"
                                id="default-03"
                                placeholder="Search by name"
                                value={this.state.valueSearch}
                                onChange={this.HandleContent}
                                onClick={this.InputSreachClick}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}