import React, { Component } from "react";

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }



    render() {
        return (
            <div className="nk-chat-panel" data-simplebar="init">
                <div className="simplebar-wrapper" style={{ margin: '-20px -28px' }}>
                    <div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer" /></div>
                    <div className="simplebar-mask">
                        <div className="simplebar-offset" style={{ right: '0px', bottom: '0px' }}>
                            <div className="simplebar-content-wrapper" style={{ height: '100%', overflow: 'hidden scroll' }}>
                                <div className="simplebar-content" style={{ padding: '20px 36px' }}>
                                    {this.props.Contents.map((Content, i) => {
                                        let time = Date.parse(Content.Time);
                                        let date = new Date(time);
                                        date = new Date(date.getTime() - date.getTimezoneOffset() * 60000)

                                        var dayString = ("0" + date.getUTCDate()).slice(-2) + "/" +
                                            ("0" + (date.getUTCMonth() + 1)).slice(-2) + "/" +
                                            date.getUTCFullYear() + " ";
                                        var timeString = ("0" + date.getUTCHours()).slice(-2) + ":" +
                                            ("0" + date.getUTCMinutes()).slice(-2);

                                        var current = new Date();
                                        current = new Date(current.getTime() - current.getTimezoneOffset() * 60000)
                                        if (
                                            date.getDate() === current.getDate() &&
                                            date.getMonth() === current.getMonth() &&
                                            date.getYear() === current.getYear()
                                        ) {
                                            dayString = "";
                                        }

                                        var dateString = dayString + timeString;

                                        if (Content.Content !== "") {
                                            let is_me = true;
                                            if (this.props.Me.MyName !== Content.UserName && Content.UserName !== "") {
                                                is_me = false;
                                            }

                                            let PathAvatar = "";
                                            this.props.user.forEach((UserInfor) => {
                                                if (UserInfor.UserName === Content.UserName) {
                                                    PathAvatar = UserInfor.PathAvatar;
                                                }
                                            });

                                            let no_avt = <div className="chat-avatar">
                                                <div className="user-avatar bg-purple">
                                                    <span>IT</span>
                                                </div>
                                            </div>

                                            let avt = <div className="chat-avatar">
                                                <div className="chat-media user-avatar">
                                                    <img src={PathAvatar} alt="" />
                                                    <span className="status dot dot-lg dot-success" />
                                                </div>
                                            </div>


                                            return (<div key={i} className={`chat ${is_me ? 'is-me' : 'is-you'}`}>
                                                {!is_me && avt}

                                                <div className="chat-content">
                                                    <div className="chat-bubbles">
                                                        <div className="chat-bubble">
                                                            <div className="chat-msg">
                                                                {Content.Content !== "" ? <>{Content.Content}</> : <></>}
                                                                {Content.PathImage !== undefined &&
                                                                    <img src={`http://localhost:4000/${Content.PathImage}`} />
                                                                }

                                                            </div>
                                                            <ul className="chat-msg-more">
                                                                <li className="d-none d-sm-block">
                                                                    <a href="#" className="btn btn-icon btn-sm btn-trigger"><em className="icon ni ni-reply-fill" /></a>
                                                                </li>
                                                                <li>
                                                                    <div className="dropdown">
                                                                        <a href="#" className="btn btn-icon btn-sm btn-trigger dropdown-toggle" data-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                        <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                                                                            <ul className="link-list-opt no-bdr">
                                                                                <li className="d-sm-none">
                                                                                    <a href="#"><em className="icon ni ni-reply-fill" /> Reply</a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#"><em className="icon ni ni-pen-alt-fill" /> Edit</a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#"><em className="icon ni ni-trash-fill" /> Remove</a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <ul className="chat-meta">
                                                        {!is_me &&
                                                            <li>{Content.UserName}</li>
                                                        }

                                                        <li>{dateString}</li>
                                                    </ul>
                                                </div>
                                            </div>)
                                        }
                                    })}
                                    <div style={{ float: "left", clear: "both" }}
                                        ref={(el) => { this.messagesEnd = el; }}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="simplebar-placeholder" style={{ width: 'auto', height: '776px' }} />
                </div>
                <div className="simplebar-track simplebar-horizontal" style={{ visibility: 'hidden' }}><div className="simplebar-scrollbar" style={{ width: '0px', transform: 'translate3d(0px, 0px, 0px)', display: 'none' }} /></div>
                <div className="simplebar-track simplebar-vertical" style={{ visibility: 'visible' }}><div className="simplebar-scrollbar" style={{ height: '212px', transform: 'translate3d(0px, 181px, 0px)', display: 'block' }} /></div>
            </div>
        );
    }
}