import React, { Component } from 'react'

export default class Option extends Component {
    render() {
        return (
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
        )
    }
}
