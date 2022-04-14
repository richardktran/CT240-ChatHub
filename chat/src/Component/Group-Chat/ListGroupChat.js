import { Component } from "react";
import ChatUser from "./User";
import "./CSS/ListGroupChat.scss"

export default class ListGroupChat extends Component {
    //set prop and state
    constructor(props) {
        super(props);
        this.state = {
            ListUserChat: [
                {
                    ID: String,
                    UserName: String,
                    PathAvatar: String
                }
            ]
        }

    }

    //update list chat and list user
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.CheckShowGroup) {
            let ListUserChat_Temp = [];
            nextProps.ListChat.forEach((element) => {
                try {
                    if (element.ID.indexOf("G") !== -1) {
                        ListUserChat_Temp.push({
                            ID: element.ID,
                            UserName: element.UserName,
                            PathAvatar: element.PathAvatar
                        });
                    }
                } catch (e) { }
            });
            if (ListUserChat_Temp !== prevState.ListUserChat) {
                return { ListUserChat: ListUserChat_Temp };
            }
            return null;
        } else {
            let ListUserChat_Temp = [];
            nextProps.ListChat.forEach((element) => {
                try {
                    if (element.ID.indexOf("G") !== -1) {
                        ListUserChat_Temp.push({
                            ID: element.ID,
                            UserName: element.UserName,
                            PathAvatar: element.PathAvatar
                        });
                    } else {
                        nextProps.ListUser.forEach((user) => {
                            if (user.UserName === element.UserName) {
                                ListUserChat_Temp.push({
                                    ID: element.ID,
                                    UserName: element.UserName,
                                    PathAvatar: user.PathAvatar
                                });
                            }
                        });
                    }
                } catch (e) { }
            });
            if (ListUserChat_Temp !== prevState.ListUserChat) {
                return { ListUserChat: ListUserChat_Temp };
            }
            return null;
        }
    }

    render() {
        return (
            <div className="nk-chat-aside-body" data-simplebar="init">
                <div className="simplebar-wrapper" style={{ margin: '0px' }}>
                    <div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer" /></div>
                    <div className="simplebar-mask">
                        <div className="simplebar-offset" style={{ right: '0px', bottom: '0px' }}>
                            <div className="simplebar-content-wrapper" style={{ height: '100%', overflow: 'hidden scroll' }}>
                                <div className="simplebar-content" style={{ padding: '0px' }}>
                                    <div className="nk-chat-list">
                                        <h6 className="title overline-title-alt">Messages</h6>
                                        <ul className="chat-list">
                                            {this.state.ListUserChat.map((User, i) => {
                                                return <ChatUser UserName={User.UserName}
                                                    PathAvatar={User.PathAvatar}
                                                    ID={User.ID}
                                                    IdData={this.props.ID}
                                                    ClickChatUser={this.props.ClickChatUser}
                                                    StatusSeen={this.props.StatusSeen}
                                                />
                                            })}

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="simplebar-placeholder" style={{ width: 'auto', height: '664px' }} />
                </div>
                <div className="simplebar-track simplebar-horizontal" style={{ visibility: 'hidden' }}><div className="simplebar-scrollbar" style={{ width: '0px', display: 'none' }} /></div>
                <div className="simplebar-track simplebar-vertical" style={{ visibility: 'visible' }}><div className="simplebar-scrollbar" style={{ height: '339px', transform: 'translate3d(0px, 0px, 0px)', display: 'block' }} /></div>
            </div>
        );
    }
}