import { Component } from "react";
import "./CSS/Manager.scss";

export default class Manager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Manager: []
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let Manager = [];
        const firstElementID = nextProps.ID[0];
        if (firstElementID === "U") {
            Manager = [
                "Add Group",
                "Delete Friend",
                "Media",
            ]
        } else {
            Manager = [
                "Add User",
                "Out Group",
                "Media",
                "Member",
            ]
        }
        if (Manager !== prevState.Manage) {
            return { Manager: Manager }
        }
        return null;
    }
    render() {
        return (

            <ul className="chat-profile-options">
                {
                    this.state.Manager.map((Element, index) => {
                        return (
                            <div
                                onClick={() => this.props.ClickItemManagerInformation(index)}
                            >
                                {/* <li>
                                        <p>{this.state.Manager[index]}</p>
                                    </li> */}
                                <li>
                                    <a className="chat-option-link" href="#">
                                        <em className="icon icon-circle bg-light ni ni-edit-alt" />
                                        <span className="lead-text">{this.state.Manager[index]}</span>
                                    </a>
                                </li>
                            </div>
                        )
                    })
                }
            </ul>
        );
    }
}