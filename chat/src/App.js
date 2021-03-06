import { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import './App.css';
import Login from "./Component/Form/Login.js";
import Register from "./Component/Form/Register";
import ChatApp from "./Component/ChatApp.js";
import ChangePassword from "./Component/Form/ChangePassword.js";
import ChangeAvatar from "./Component/Form/ChangeAvatar.js";
import FirstPage from "./Component/Manage/FirstPage.js";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MyUserName: 'null',
            statusChangePassword: "hide",
            statusChangeAvatar: "hide",
            statusMain: "",
            statusFirstPage: "hide",
            ListUser: []
        };
    }

    GetUserName = (UserName) => {
        this.setState({
            MyUserName: UserName
        });
    }

    ChangePassword = (check) => {
        if (check) {
            this.setState({
                statusChangePassword: "center-container",
                statusMain: "hide"
            });
        }
    }

    ChangeAvatar = (check) => {
        if (check) {
            this.setState({
                statusChangeAvatar: "center-container",
                statusMain: "hide"
            });
        }
    }

    CheckData = (ListChat, ListUser) => {
        this.setState({
            statusMain: "",
            statusFirstPage: "hide"
        });
    }
    render() {
        return (
            <Router>
                <div className={this.state.statusMain}>
                    <Switch>
                        <Route path='/chat'>
                            <ChatApp MyUserName={this.state.MyUserName}
                                GetUserName={this.GetUserName}
                                ChangePassword={this.ChangePassword}
                                ChangeAvatar={this.ChangeAvatar}
                                CheckData={this.CheckData}
                            />
                        </Route>
                        <Route path='/RegisterError'>
                            <Register MessageError={'User is exist'} />
                        </Route>
                        <Route path='/Register'>
                            <Register MessageError={''} />
                        </Route>
                        <Route path='/LoginError'>
                            <Login
                                GetUserNameOnChange={this.GetUserName}
                                MessageError={'User name or password is invalid'} />
                        </Route>
                        <Route path='/'>
                            <Login
                                GetUserNameOnChange={this.GetUserName}
                                MessageError={''}
                            />
                        </Route>
                    </Switch>
                </div>
                {/* <ChangePassword
                    statusChangePassword={this.state.statusChangePassword} />
                <ChangeAvatar
                    statusChangeAvatar={this.state.statusChangeAvatar} />
                <FirstPage
                    statusFirstPage={this.state.statusFirstPage}
                    ListUser={this.state.ListUser}
                    ClickCreateRoom={this.ClickCreateRoom}
                    MyUserName={this.state.MyUserName}
                /> */}
            </Router>
        );
    }
}