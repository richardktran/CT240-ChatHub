import { Component } from "react";
import ChatUser from "./User";

export default class Search extends Component {
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
                                        <h6 className="title overline-title-alt">User Searching</h6>
                                        <ul className="chat-list">
                                            {this.props.ListUser.map((User, i) => {
                                                return <ChatUser UserName={User.UserName}
                                                    PathAvatar={User.PathAvatar}
                                                    ID=""
                                                    AddFriend={true}
                                                    ClickChatUser={this.props.ClickCreateRoom}
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