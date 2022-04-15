import { Component } from "react";
import axios from 'axios';

import HeaderListChat from "./Group-Chat/Header.js";
import ListGroupChat from "./Group-Chat/ListGroupChat";
import Search from "./Group-Chat/Search.js"
import HeaderChat from "./Chat/Header.js";
import Chat from "./Chat/Chat.js";
import Input from "./Chat/Input.js";
import Infomation from "./Infomation/Infomation.js";
import socket from "./Socket.IO/Socket.js";

export default class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //data of this user
            Me: {
                MyName: String,
                PathAvatar: String
            },
            //list all user
            user: [
                {
                    UserName: String,
                    PathAvatar: String,
                    statusOnline: false
                },
            ],
            //list user chat with this user
            ListChat: [
                {
                    ID: String,
                    UserName: String
                },
            ],
            //Content of chat
            ListChatContent: [
                {
                    ID: String,
                    Chat: [
                        {
                            _id: String,
                            UserName: String,
                            Content: String,
                            Time: new Date()
                        },
                    ]
                }
            ],
            //ID of group chat is being select
            IdData: "12345",
            StatusSeen: [],
            ListFriend: [],
            //state hide and show sreach
            StatusListGroupChat: "ListGroupChat",
            StatusSearch: "hide",
            //state result search
            Result: [
                {
                    UserName: String,
                    PathAvatar: String
                }
            ],
            checkSearch: true,
            CheckShowGroup: false,
            statusOnline: ""
        }
    }
    //click from list user
    ClickChatUser = (UserChatInformation, statusOnline) => {
        //content chat
        var chatContent = [];
        //user chat (1 user)
        var user = {};
        let StatusSeen = this.state.StatusSeen;
        for (let index in StatusSeen) {
            if (StatusSeen[index] === UserChatInformation) {
                StatusSeen.splice(index, 1);
            }
        }
        socket.emit("Client-send-seen", {
            UserName: this.state.Me.MyName,
            ID: UserChatInformation
        });
        //find the chat content
        this.state.ListChatContent.forEach((UserChat) => {
            if (UserChat.ID === UserChatInformation) {
                chatContent = UserChat.Chat;
            }
        });
        //find name and img of chat
        this.state.ListChat.forEach((UserChatInfo) => {
            if (UserChatInfo.ID === UserChatInformation) {
                user = UserChatInfo;
                this.state.user.forEach((UserInfo) => {
                    if (UserInfo.UserName === UserChatInfo.UserName) {
                        user = UserInfo;
                    }
                })
            }
        });
        this.setState({
            UserChat: user,
            Contents: chatContent,
            IdData: UserChatInformation,
            CheckShowGroup: false,
            StatusSeen: StatusSeen,
            statusOnline: statusOnline
        });
    }

    //send message
    HandleContentChat = (ContentData) => {
        let TimeData = new Date();
        //set data
        const ChatData = {
            Id: this.state.IdData,
            UserName: this.state.Me.MyName,
            Content: ContentData,
            Time: TimeData.getTime()
        };
        //get ListChatContent
        let StateListChatContent = this.state.ListChatContent;
        let ListChat = this.state.ListChat;
        if (!ContentData.File) {
            //Find elemet of ListChatContent by IdData
            let index;
            for (index = 0; index < StateListChatContent.length; index++) {
                if (StateListChatContent[index].ID === this.state.IdData) {
                    StateListChatContent[index].Chat.push(ChatData);
                    //swap element listChatContent
                    let temp = StateListChatContent[index];
                    StateListChatContent.splice(index, 1);
                    StateListChatContent.unshift(temp);

                    temp = ListChat[index];
                    ListChat.splice(index, 1);
                    ListChat.unshift(temp);
                    break;
                }
            }
            //set state
            this.setState({
                ListChat: ListChat,
                ListChatContent: StateListChatContent
            });
            //send message to server
        }
        socket.emit('Client-send-data', ChatData);
    }

    //handle message file
    HandleMessageFile = (fileMessage) => {
        let TimeData = new Date();
        //set data
        const ChatData = {
            Id: this.state.IdData,
            UserName: this.state.Me.MyName,
            Content: fileMessage,
            Time: TimeData.getTime()
        };
        //send message to server
        socket.emit('Client-send-data-file', ChatData);
    }

    //handle search
    InputSreachClick = (check) => {
        if (check) {
            this.setState({
                StatusListGroupChat: "hide",
                StatusSearch: "ListGroupChat",
            });
        } else {
            this.setState({
                StatusListGroupChat: "ListGroupChat",
                StatusSearch: "hide",
            });
        }
        if (check) {
            this.setState({
                checkSearch: check
            });
        }
    }

    //handle input search
    HandleInputSearch = (InputSearch) => {
        if (InputSearch === "") {
            this.setState({
                Result: []
            });
            return;
        }
        //array list user
        let ArrayUser = this.state.user;
        //array list result search
        let result = [];
        //check
        let count = 0;
        //convert from string InputSearch to Array value
        let value = Array.from(InputSearch);
        //loop each element in array list user
        ArrayUser.forEach((ElementUser, IndexUser) => {
            //loop each element in string value
            value.forEach((ElementKey, IndexKey) => {
                if (ElementUser.UserName.indexOf(ElementKey) !== -1) {
                    count++;
                }
            });
            //check elemet value
            if (count === value.length) {
                result.push({
                    UserName: ElementUser.UserName,
                    PathAvatar: ElementUser.PathAvatar
                });
            }
            count = 0;
        });

        //set result to state
        this.setState({
            Result: result
        });


    }

    //click create room
    ClickCreateRoom = (ValueUserName) => {
        //clear layout search
        this.setState({
            checkSearch: false,
            Result: [],
        });
        //this.InputSreachClick(this.state.checkSearch);
        //set data
        const Data = {
            UserName: ValueUserName,
            Me: this.state.Me.MyName
        }
        //client have data
        let ListUser = this.state.ListChat;
        let found = true;
        ListUser.forEach((element) => {
            if (element.UserName === Data.UserName) {
                this.ClickChatUser(element.ID);
                found = false;
            }
        });
        //check ListChatContent of user is exit?
        if (found) {
            socket.emit("Client-add-friend", Data);
        }

        this.ClickChatUser(ValueUserName);
        window.location.reload(false);

    }
    //click create room for list user group
    ClickCreateRoomInGroup = (ValueUserName) => {
        //set data
        const Data = {
            UserName: ValueUserName,
            Me: this.state.Me.MyName
        }
        //client have data
        let ListUser = this.state.ListChat;
        let found = true;
        ListUser.forEach((element) => {
            if (element.UserName === Data.UserName) {
                this.ClickChatUser(element.ID);
                found = false;
            }
        });
        //check ListChatContent of user is exit?
        if (found) {
            socket.emit("Client-add-friend", Data);
            socket.on("Server-send-add-friend-to-me", IdChat => {
                //set state userChat for new user
                ListUser.push({
                    ID: IdChat,
                    UserName: Data.UserName
                });
                //set state ListChatContent for new user
                let ListChatContent = this.state.ListChatContent;
                ListChatContent.push({
                    ID: IdChat,
                    Chat: []
                });
                this.setState({
                    ListChat: ListUser,
                    ListChatContent: ListChatContent
                });
                this.ClickChatUser(IdChat);
            });
        }
    }
    //click add group
    ClickAddGroup = (DataUserAddGroup) => {
        //add me to ListUserAddGroup
        DataUserAddGroup.ListUser.push(this.state.Me.MyName);
        socket.emit("Client-send-add-group", DataUserAddGroup);
    }
    //Click delete chat and out group
    ClickDeleteChat = (check) => {
        let ListChat = this.state.ListChat;
        let ListChatContent = this.state.ListChatContent;
        for (let index in ListChat) {
            if (ListChat[index].ID === this.state.IdData) {
                ListChat.splice(index, 1);
                ListChatContent.splice(index, 1);
                break;
            }
        }
        if (check === 1) {
            //Click delete chat
            socket.emit("Client-send-delete-chat", this.state.IdData);
        } else {
            //Click out group
            socket.emit("Client-send-out-group", {
                ID: this.state.IdData,
                UserName: this.state.Me.MyName
            });
        }
        this.setState({
            ListChat: ListChat,
            ListChatContent: ListChatContent
        });
        try {
            this.ClickChatUser(ListChat[0].ID);
        } catch (e) { }
    }
    //click show list group
    ClickShowListGroup = () => {
        if (!this.state.CheckShowGroup) {
            this.setState({
                CheckShowGroup: true
            });
        }
    }
    //life component
    componentWillMount() {
        //when first render componnet then set state: UserChat and Contents
        //after switch the first data to component chat
        let UserChatData, ContentsData, Id;
        UserChatData = this.state.user[0];
        ContentsData = this.state.ListChatContent[0].Chat;
        Id = this.state.ListChatContent[0].ID;
        this.setState({
            UserChat: UserChatData,
            Contents: ContentsData,
            IdData: Id,
            Result: []
        });
    }

    componentDidMount() {
        axios.get('/api/sourceDataChat')
            .then(Response => {
                this.setState({
                    Me: Response.data.Me,
                    user: Response.data.user,
                    ListChat: Response.data.ListChat,
                    ListChatContent: Response.data.ListChatContent,
                    StatusSeen: Response.data.ListStatusSeen
                });
                //check data
                this.props.CheckData(Response.data.ListChat,
                    Response.data.user);
                //send my information to server
                socket.emit("Client-send-my-information", Response.data.Me.MyName);
            })
            .catch(error => {
            });
    }

    componentWillUpdate(prevProps, prevState, snapshot) {
        if (this.state.ListChatContent !== prevState.ListChatContent) {
            socket.on('Server-send-data', Data => {
                console.log(Data)
                if (Data.PathImage) {
                    const ServerChatData = {
                        UserName: Data.UserName,
                        PathImage: Data.PathImage,
                        Time: Data.Time
                    };
                    //get list chat content
                    let StatusSeen = this.state.StatusSeen;
                    let ListChatContent = this.state.ListChatContent;
                    let ListChat = this.state.ListChat;
                    let index;
                    for (index in ListChatContent) {
                        if (ListChatContent[index].ID === Data.Id) {
                            ListChatContent[index].Chat.push(ServerChatData);
                            //swap element listChatContent
                            let temp = ListChatContent[index];
                            ListChatContent.splice(index, 1);
                            ListChatContent.unshift(temp);
                            temp = ListChat[index];
                            ListChat.splice(index, 1);
                            ListChat.unshift(temp);
                            break;
                        }
                    }
                    StatusSeen.push(Data.StatusSeen);
                    this.setState({
                        ListChatContent: ListChatContent,
                        StatusSeen: StatusSeen
                    });
                } else {
                    const ServerChatData = {
                        UserName: Data.UserName,
                        Content: Data.Content,
                        Time: Data.Time
                    };
                    //get list chat content
                    let StatusSeen = this.state.StatusSeen;
                    let ListChatContent = this.state.ListChatContent;
                    let ListChat = this.state.ListChat;
                    let index;
                    for (index in ListChatContent) {
                        if (ListChatContent[index].ID === Data.Id) {
                            ListChatContent[index].Chat.push(ServerChatData);
                            //swap element listChatContent
                            let temp = ListChatContent[index];
                            ListChatContent.splice(index, 1);
                            ListChatContent.unshift(temp);

                            temp = ListChat[index];
                            ListChat.splice(index, 1);
                            ListChat.unshift(temp);
                            break;
                        }
                    }
                    StatusSeen.push(Data.StatusSeen);
                    this.setState({
                        ListChatContent: ListChatContent,
                        StatusSeen: StatusSeen
                    });
                }
            });

            socket.on("Server-send-add-friend-to-me", Data => {
                let ListUser = this.state.ListChat;
                let ListChatContent = this.state.ListChatContent;
                //set state userChat for new user
                ListUser.push({
                    ID: Data.ID,
                    UserName: Data.UserName
                });
                //set state ListChatContent for new user
                ListChatContent.push({
                    ID: Data.ID,
                    Chat: []
                });
                //if new client, then set layout
                this.props.CheckData(ListUser,
                    this.state.user);
                //set data
                this.setState({
                    ListChat: ListUser,
                    ListChatContent: ListChatContent
                });
                this.ClickChatUser(Data.ID);
            });

            socket.on('Server-send-add-friend-to-user', Data => {
                console.log(Data)
                let ListChat = this.state.ListChat;
                let ListChatContent = this.state.ListChatContent;
                ListChat.push(Data);
                ListChatContent.push({
                    ID: Data.ID,
                    Chat: []
                });
                //if new client, then set layout
                this.props.CheckData(ListChat,
                    this.state.user);
                //set data
                this.setState({
                    ListChat: ListChat,
                    ListChatContent: ListChatContent
                });
                //request join room chat
                //join room
                let ListID = [];
                ListID.push(Data.ID);
                socket.emit('Client-join-room', ListID);
                window.location.reload(false);
            });
            socket.on("Server-send-add-group-to-me", Data => {
                let ListChat = this.state.ListChat;
                let ListChatContent = this.state.ListChatContent;
                ListChat.push({
                    ID: Data,
                    UserName: Data,
                    PathAvatar: "./img/Account/Group.png"
                });
                ListChatContent.push({
                    ID: Data,
                    PathAvatar: "./img/Account/Group.png",
                    Chat: []
                });
                this.setState({
                    ListChat: ListChat,
                    ListChatContent: ListChatContent
                });
                //request join room chat
                //join room
                let ListID = [];
                ListID.push(Data.ID);
                socket.emit('Client-join-room', ListID);
            })
            socket.on("Server-send-add-group", Data => {
                let ListChat = this.state.ListChat;
                let ListChatContent = this.state.ListChatContent;
                ListChat.push({
                    ID: Data.ID,
                    UserName: Data.ID,
                    PathAvatar: "./img/Account/Group.png"
                });
                ListChatContent.push({
                    ID: Data.ID,
                    PathAvatar: "./img/Account/Group.png",
                    Chat: []
                });
                this.setState({
                    ListChat: ListChat,
                    ListChatContent: ListChatContent
                });
                //request join room chat
                //join room
                let ListID = [];
                ListID.push(Data.ID);
                socket.emit('Client-join-room', ListID);
            });
            //listent event delete chat
            socket.on("Server-send-delete-chat", IdData => {
                let ListChat = this.state.ListChat;
                let ListChatContent = this.state.ListChatContent;
                for (let index in ListChat) {
                    if (ListChat[index].ID === IdData) {
                        ListChat.splice(index, 1);
                        ListChatContent.splice(index, 1);
                        break;
                    }
                }
                this.setState({
                    ListChat: ListChat,
                    ListChatContent: ListChatContent
                });
                try {
                    this.ClickChatUser(ListChat[0].ID);
                } catch (e) { }
            });
            //listent event out group
            socket.on("Server-send-out-group", Data => {

            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.Me !== prevState.Me) {
            //when first render componnet then set state: UserChat and Contents
            //after switch the first data to component chat
            try {
                let UserChatData, ContentsData, Id;
                UserChatData = this.state.user[0];
                ContentsData = this.state.ListChatContent[0].Chat;
                Id = this.state.ListChatContent[0].ID;
                this.setState({
                    UserChat: UserChatData,
                    Contents: ContentsData,
                    IdData: Id
                });
            } catch (e) { }
            //take list id to join room
            let ListId = [];
            this.state.ListChatContent.forEach(element => {
                ListId.push(element.ID);
            });
            //set MyUserName in component App
            this.props.GetUserName(this.state.Me.MyName);
            //request join room chat
            socket.emit('Client-join-room', ListId);
        }
    }

    render() {
        return (
            <div className="nk-chat chatcontainer">
                <div className="nk-chat-aside">
                    <HeaderListChat
                        ClickShowListGroup={this.ClickShowListGroup}
                        check={this.state.checkSearch}
                        MyData={this.state.Me.PathAvatar}
                        InputSreachClick={this.InputSreachClick}
                        HandleInputSearch={this.HandleInputSearch}
                        ChangePassword={this.props.ChangePassword}
                        ChangeAvatar={this.props.ChangeAvatar}
                    />
                    {
                        this.state.Result.length !== 0 &&
                        <Search
                            StatusSreach={this.state.StatusSearch}
                            ListUser={this.state.Result}
                            ClickCreateRoom={this.ClickCreateRoom}
                        />

                    }

                    <ListGroupChat
                        StatusSeen={this.state.StatusSeen}
                        CheckShowGroup={this.state.CheckShowGroup}
                        StatusListGroupChat={this.state.StatusListGroupChat}
                        ListUser={this.state.user}
                        ClickChatUser={this.ClickChatUser}
                        ID={this.state.IdData}
                        ListChat={this.state.ListChat}
                    />

                </div>

                <div className="nk-chat-body">
                    <HeaderChat
                        UserChat={this.state.UserChat}
                        statusOnline={this.state.statusOnline}
                    />

                    <Chat Me={this.state.Me}
                        user={this.state.user}
                        UserChat={this.state.UserChat}
                        Contents={this.state.Contents}
                    />
                    <Input
                        HandleContentChat={this.HandleContentChat}
                        HandleMessageFile={this.HandleMessageFile}
                    />

                    <div className="nk-chat-profile" data-simplebar="init">
                        <div className="simplebar-wrapper" style={{ margin: '0px' }}>
                            <div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer" /></div>
                            <div className="simplebar-mask">
                                <div className="simplebar-offset" style={{ right: '0px', bottom: '0px' }}>
                                    <div className="simplebar-content-wrapper" style={{ height: '100%', overflow: 'hidden scroll' }}>
                                        <div className="simplebar-content" style={{ padding: '0px' }}>
                                            <div className="user-card user-card-s2 my-4">
                                                <div className="user-avatar md bg-purple">
                                                    <span>IH</span>
                                                </div>
                                                <div className="user-info">
                                                    <h5>Iliash Hossain</h5>
                                                    <span className="sub-text">Active 35m ago</span>
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
                                                    <a href="#" className="chat-profile-head" data-toggle="collapse" data-target="#chat-options">
                                                        <h6 className="title overline-title">Options</h6>
                                                        <span className="indicator-icon"><em className="icon ni ni-chevron-down" /></span>
                                                    </a>
                                                    <div className="chat-profile-body collapse show" id="chat-options">
                                                        <div className="chat-profile-body-inner">
                                                            <ul className="chat-profile-options">
                                                                <li>
                                                                    <a className="chat-option-link" href="#"><em className="icon icon-circle bg-light ni ni-edit-alt" /><span className="lead-text">Nickname</span></a>
                                                                </li>
                                                                <li>
                                                                    <a className="chat-option-link chat-search-toggle" href="#"><em className="icon icon-circle bg-light ni ni-search" /><span className="lead-text">Search In Conversation</span></a>
                                                                </li>
                                                                <li>
                                                                    <a className="chat-option-link" href="#"><em className="icon icon-circle bg-light ni ni-circle-fill" /><span className="lead-text">Change Theme</span></a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
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
                </div>

            </div>


        );
    }
}