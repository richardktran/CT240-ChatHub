import React, { Component } from 'react'
import axios from 'axios';
import ListUserChat from '../Infomation/ListUserChat';
import Manager from '../Infomation/Manager';

export default class Option extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            ID: "",
            StatusManager: "",
            StatusListChatUser: "hide",
            StatusMedia: "hide",
            ListUser: [],
            StatusListUser: true,
            ShowGroupOption: false,
        });
    }
    //handle manager information
    ClickItemManagerInformation = (Item) => {
        const FirstElementID = this.props.ID[0];
        switch (Item) {
            case 0:
                this.setState({
                    StatusManager: "hide",
                    StatusListChatUser: "ListChatUser",
                    StatusListUser: true,
                    ShowGroupOption: !this.state.ShowGroupOption
                });
                break;
            case 1:
                if (FirstElementID === 'U') {
                    if (window.confirm("Do you want delete this chat?")) {
                        this.props.ClickDeleteChat(1);
                    }
                } else {
                    if (window.confirm("Do you want out this group?")) {
                        this.props.ClickDeleteChat(0);
                    }
                }
                break;
            case 2:

                break;
            case 3:
                //case click member
                axios.post('/api/getListUser', {
                    ID: this.props.ID
                })
                    .then(Response => {
                        this.setState({
                            ListUser: Response.data.ListUser,
                            StatusListUser: false
                        })
                    })
                    .catch(error => { });
                this.setState({
                    StatusManager: "hide",
                    StatusListChatUser: "ListChatUser",
                    ShowGroupOption: !this.state.ShowGroupOption
                });
                break;
            default:
                break;
        }
    }
    exitGroupOption = () => {
        this.setState({
            ShowGroupOption: false,
            StatusManager: "",
        });
    }
    //click button add group
    ClickAddGroup = (ListUserAddGroup) => {
        ListUserAddGroup.push(this.props.UserChat.UserName);
        let ID;
        this.props.ListChat.forEach((Element) => {
            if (Element.UserName === this.props.UserChat.UserName) {
                ID = Element.ID;
            }
        })
        let DataUserAddGroup = {
            ID: ID,
            ListUser: ListUserAddGroup
        }
        this.props.ClickAddGroup(DataUserAddGroup);
        this.exitGroupOption();
    }
    //click chat user
    ClickChatUser = (UserName) => {
        this.props.ClickCreateRoom(UserName);
        this.ExitAddGroup();
    }
    //click exit add group
    ExitAddGroup = () => {
        this.setState({
            StatusManager: "",
            StatusListChatUser: "hide"
        });
    }
    //click exit media
    ExitMedia = () => {
        this.setState({
            StatusMedia: "hide",
            StatusManager: ""
        })
    }
    //when change props
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.UserChat.UserName[0] === "G") {
            if (nextProps.ID !== prevState.ID) {
                return {
                    ID: nextProps.ID,
                    StatusListUser: true
                };
            } else {
                return null;
            }
        }
        if (nextProps.ID !== prevState.ID) {
            return {
                ID: nextProps.ID,
                StatusListUser: true
            };
        }
        return null;
    }
    render() {
        return (
            <div className="nk-chat-profile visible" data-simplebar="init">
                <div className="simplebar-wrapper" style={{ margin: '0px' }}>
                    <div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer" /></div>
                    <div className="simplebar-mask">
                        <div className="simplebar-offset" style={{ right: '0px', bottom: '0px' }}>
                            <div className="simplebar-content-wrapper" style={{ height: '100%', overflow: 'hidden scroll' }}>
                                <div className="simplebar-content" style={{ padding: '0px' }}>
                                    <div className="user-card user-card-s2 my-4">
                                        <div className="user-avatar md bg-purple">
                                            <div className="chat-media md user-avatar">
                                                <img src={this.props.UserChat.PathAvatar} alt="" />
                                                <span className="status dot dot-lg dot-success" />
                                            </div>
                                        </div>
                                        <div className="user-info">
                                            <h5>{this.props.UserChat.UserName}</h5>
                                            <div className="sub-text"><span className="d-none d-sm-inline mr-1">Online </span></div>
                                            {/* {this.state.statusOnline} */}
                                        </div>
                                        <div className="user-card-menu dropdown">
                                            <a href="#" className="btn btn-icon btn-sm btn-trigger dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><em className="icon ni ni-more-h" /></a>
                                            <div className="dropdown-menu dropdown-menu-right" style={{}}>
                                                <ul className="link-list-opt no-bdr">
                                                    <li>
                                                        <a href="#"><em className="icon ni ni-eye" /><span>View Profile</span></a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><em className="icon ni ni-na" /><span>Block Messages</span></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-profile">
                                        <div className="chat-profile-group">
                                            {this.state.ShowGroupOption &&
                                                <ListUserChat
                                                    ExitGroupOption={this.exitGroupOption}
                                                    // ExitAddGroup={this.ExitAddGroup}
                                                    UserChat={this.props.UserChat.UserName}
                                                    StatusListChatUser={this.state.StatusListChatUser}
                                                    ListUser={this.props.ListUser}
                                                    ListUserGroup={this.state.ListUser}
                                                    StatusListUser={this.state.StatusListUser}
                                                    ClickCreateRoom={this.ClickChatUser}
                                                    ListChat={this.props.ListChat}
                                                    ClickAddGroup={this.ClickAddGroup}
                                                />
                                            }
                                        </div>
                                        {!this.state.ShowGroupOption &&
                                            <div className="chat-profile-group">
                                                <a href="#" className="chat-profile-head" data-toggle="collapse" data-target="#chat-options">
                                                    <h6 className="title overline-title">Options</h6>
                                                    <span className="indicator-icon"><em className="icon ni ni-chevron-down" /></span>
                                                </a>
                                                <div className="chat-profile-body collapse show" id="chat-options">
                                                    <div className="chat-profile-body-inner">


                                                        <Manager
                                                            ID={this.props.ID}
                                                            StatusManager={this.state.StatusManager}
                                                            ClickItemManagerInformation={this.ClickItemManagerInformation}
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {/* .chat-profile-group */}
                                        <div className="chat-profile-group">
                                            <a href="#" className="chat-profile-head" data-toggle="collapse" data-target="#chat-settings">
                                                <h6 className="title overline-title">Settings</h6>
                                                <span className="indicator-icon"><em className="icon ni ni-chevron-down" /></span>
                                            </a>
                                            <div className="chat-profile-body collapse show" id="chat-settings">
                                                <div className="chat-profile-body-inner">
                                                    <ul className="chat-profile-settings">
                                                        <li>
                                                            <div className="custom-control custom-control-sm custom-switch">
                                                                <input type="checkbox" className="custom-control-input" id="customSwitch2" />
                                                                <label className="custom-control-label" htmlFor="customSwitch2">Notifications</label>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <a className="chat-option-link" href="#">
                                                                <em className="icon icon-circle bg-light ni ni-bell-off-fill" />
                                                                <div>
                                                                    <span className="lead-text">Ignore Messages</span>
                                                                    <span className="sub-text">You won’t be notified when message you.</span>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a className="chat-option-link" href="#">
                                                                <em className="icon icon-circle bg-light ni ni-alert-fill" />
                                                                <div>
                                                                    <span className="lead-text">Something Wrong</span>
                                                                    <span className="sub-text">Give feedback and report conversion.</span>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        {/* .chat-profile-group */}
                                        <div className="chat-profile-group">
                                            <a href="#" className="chat-profile-head" data-toggle="collapse" data-target="#chat-photos">
                                                <h6 className="title overline-title">Shared Photos</h6>
                                                <span className="indicator-icon"><em className="icon ni ni-chevron-down" /></span>
                                            </a>
                                            <div className="chat-profile-body collapse show" id="chat-photos">
                                                <div className="chat-profile-body-inner">
                                                    <ul className="chat-profile-media">
                                                        <li>
                                                            <a href="#"><img src="./images/slides/slide-a.jpg" alt="" /></a>
                                                        </li>
                                                        <li>
                                                            <a href="#"><img src="./images/slides/slide-b.jpg" alt="" /></a>
                                                        </li>
                                                        <li>
                                                            <a href="#"><img src="./images/slides/slide-c.jpg" alt="" /></a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        {/* .chat-profile-group */}
                                    </div>
                                    {/* .chat-profile */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="simplebar-placeholder" style={{ width: 'auto', height: '752px' }} />
                </div>
                <div className="simplebar-track simplebar-horizontal" style={{ visibility: 'hidden' }}><div className="simplebar-scrollbar" style={{ width: '0px', display: 'none' }} /></div>
                <div className="simplebar-track simplebar-vertical" style={{ visibility: 'visible' }}><div className="simplebar-scrollbar" style={{ height: '402px', transform: 'translate3d(0px, 0px, 0px)', display: 'block' }} /></div>
            </div>
        )
    }
}
