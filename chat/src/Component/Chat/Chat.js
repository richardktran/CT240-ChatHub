import { Component } from "react";
import MyChat from "./MyChat";
import UserChat from "./UserChat";
// import "./CSS/Chat.scss";

export default class Chat extends Component {
    // scrollToBottom = () => {
    //     this.messagesEnd.scrollIntoView({ behavior: "auto" });
    // }

    // componentDidMount() {
    //     this.scrollToBottom();
    // }

    // componentDidUpdate() {
    //     this.scrollToBottom();
    // }
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
                                        console.log(Content.PathImage)
                                        if (Content.Content !== "") {
                                            let is_me = true;
                                            if (this.props.Me.MyName !== Content.UserName && Content.UserName !== "") {
                                                is_me = false;
                                            }


                                            return (<div key={i} className={`chat ${is_me ? 'is-me' : 'is-you'}`}>
                                                {!is_me &&
                                                    <div className="chat-avatar">
                                                        <div className="user-avatar bg-purple">
                                                            <span>IT</span>
                                                        </div>
                                                    </div>
                                                }

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

                                                        <li>29 Apr, 2020 4:28 PM</li>
                                                    </ul>
                                                </div>
                                            </div>)
                                        }
                                    })}
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