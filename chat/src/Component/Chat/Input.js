import { Component } from "react";

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ContentData: '',
            file: "",
            showOption: false
        }
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.SubmitMessage();
        }
    }

    handleSendMessage = () => {
        this.SubmitMessage();
    }

    toggleShowOption = () => {
        this.setState({
            ...this.state,
            showOption: !this.state.showOption
        });
    }

    SubmitMessage = () => {
        if (this.state.ContentData.trim() !== "") {
            if (this.state.file !== "") {
                if (this.state.file.type === "image/jpeg" || this.state.file.type === "image/png") {
                    //file is image
                    this.props.HandleContentChat(
                        {
                            ContentData: this.state.ContentData,
                            File: this.state.file
                        }
                    );
                } else {
                    //file is not image
                    this.props.HandleMessageFile(
                        {
                            ContentData: this.state.ContentData,
                            File: this.state.file
                        }
                    );
                }
            } else {
                this.props.HandleContentChat(
                    this.state.ContentData
                );
            }
        }
        this.setState({
            ContentData: '',
            file: ''
        });
    }



    changeFile = (event) => {
        try {
            const file = event.target.files[0];
            this.setState({
                file: file,
                ContentData: file.name
            });
        } catch (e) { }
    }

    HandleContent = (event) => {
        this.setState({ ContentData: event.target.value });
    }

    render() {
        return (
            <div className="nk-chat-editor">
                <div className="nk-chat-editor-upload ml-n1">
                    <a href="#"
                        className="btn btn-sm btn-icon btn-trigger text-primary toggle-opt"
                        data-target="chat-upload"
                        onClick={this.toggleShowOption}
                    >
                        <em className="icon ni ni-plus-circle-fill" />
                    </a>
                    <div className={`chat-upload-option ${this.state.showOption ? "expanded" : ""}`} data-content="chat-upload">
                        <ul className>
                            <li>
                                <a href="#"><label htmlFor="inputImage"><em class="icon ni ni-img-fill"></em></label></a>
                                {/* <label htmlFor="inputImage">
                                    <em className="icon ni ni-img-fill" />
                                </label> */}
                                <input type="file"
                                    className="form-control"
                                    id="inputImage"
                                    name="photo"
                                    aria-describedby="inputGroupFileAddon04"
                                    aria-label="Upload"
                                    accept=".jpg,.png"
                                    onChange={this.changeFile}
                                    style={{ display: 'none' }}
                                />
                            </li>
                            <li>
                                <a href="#"><label><em className="icon ni ni-camera-fill" /></label></a>
                            </li>
                            <li>
                                <a href="#"><em className="icon ni ni-mic" /></a>
                            </li>
                            <li>
                                <a href="#"><em className="icon ni ni-grid-sq" /></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="nk-chat-editor-form">
                    <div className="form-control-wrap">
                        {/* <textarea className="form-control form-control-simple no-resize" rows={1} id="default-textarea" placeholder="Type your message..." defaultValue={""} /> */}
                        <input className="form-control form-control-simple no-resize"
                            autocomplete="off"
                            type="text"
                            name="ContentChat"
                            value={this.state.ContentData}
                            onChange={this.HandleContent}
                            onKeyDown={this.handleKeyDown}
                            placeholder="Nhập tin nhắn"
                            style={{ paddingTop: 0 }}
                        >
                        </input>
                    </div>
                </div>
                <ul className="nk-chat-editor-tools g-2">
                    <li>
                        <a href="#" className="btn btn-sm btn-icon btn-trigger text-primary"><em className="icon ni ni-happyf-fill" /></a>
                    </li>
                    <li>
                        <button className="btn btn-round btn-primary btn-icon" onClick={this.handleSendMessage}>
                            <em className="icon ni ni-send-alt" />
                        </button>
                    </li>
                </ul>
            </div>

        );
    }
}