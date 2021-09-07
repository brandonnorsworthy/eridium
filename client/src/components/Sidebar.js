import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_SERVER_CHANNELS } from '../utils/queries';
import Auth from '../utils/auth';
import './Sidebar.css'
import Logo from '../private/logo@512.png'
import DefaultImage from '../private/default.png'

function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToRGB(i) {
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

function Sidebar(props) {
    let channels = null

    const { data } = useQuery(QUERY_SERVER_CHANNELS, { variables: { server_id: props.usersServers[0]._id } })
    channels = data?.server_channels.channels || [];

    useEffect(() => {
        if (channels[0] !== undefined) {
            props.setActiveChannel(channels[0]._id)
        }
    }, [channels])

    function displayServerBanner(e) {
        document.getElementById("server-banner-dropdown").style.display = "flex"
    }

    function hideServerBanner(e) {
        document.getElementById("server-banner-dropdown").style.display = "none"
    }

    function toggleModal() {
        document.querySelector('.modal').style.display = "flex"
    }

    function hideChannels(e) {
        /* if they clicked the add a new channel button immediately stop */
        let target = e.target
        if (!(target.textContent === 'add')) {
            if (!(target.tagName === 'DIV')) {
                target = target.parentElement
            }

            let nextSibling = target.nextElementSibling;

            if (target.dataset.hidden === 'true') {
                target.dataset.hidden = 'false'
                target.firstChild.textContent = 'expand_more'

                while (nextSibling) {
                    if (!(nextSibling.id === 'active-channel')) {
                        nextSibling.style.display = 'flex'
                    }
                    nextSibling = nextSibling.nextElementSibling;
                }
            } else {
                target.dataset.hidden = 'true'
                target.firstChild.textContent = 'chevron_right'

                while (nextSibling) {
                    if (!(nextSibling.id === 'active-channel')) {
                        nextSibling.style.display = 'none'
                    }
                    nextSibling = nextSibling.nextElementSibling;
                }
            }
        }
        return
    }

    function newActiveChannel(e) {
        /* if clicked channel is already active do nothing */
        let target = e.target
        if (!(target.id === 'active')) {
            //clear out content because we are going into a new channel
            // document.getElementById('message-list').innerHTML = ''

            if (!(target.tagName === 'DIV')) {
                target = target.parentElement
            }

            props.setActiveChannel(target.dataset.channel)

            let prevTarget = document.getElementById('active-channel')
            if (prevTarget.parentElement.firstChild.dataset.hidden === 'true') {
                prevTarget.style.display = 'none'
            }
            prevTarget.removeAttribute('id')
            target.setAttribute('id', 'active-channel');
        }
    }

    function displaySettingsBanner(e) {
        /* BRANDON server banner replace icon when clicked */
        document.getElementById("current-user-settings-dropdown").style.display = "flex"
    }

    function hideSettingsBanner(e) {
        /* BRANDON server banner replace icon when leave banner */
        document.getElementById("current-user-settings-dropdown").style.display = "none"
    }

    return (
        <aside className="no-select">
            <nav id="server-list">
                <div id="eridium-logo">
                    <img src={Logo} alt="eridium logo"></img>
                </div>
                {
                    props.usersServers ? props.usersServers.map((server) => (
                        <button key={server._id} id={server._id} className="server-icon">
                            <img src={server.icon ? server.icon : "https://via.placeholder.com/50"} alt="server icon"></img>
                        </button>
                    )) : <></>
                }
            </nav>
            <nav id="content-list">
                <div className="no-select" id="server-banner" onMouseLeave={hideServerBanner}>
                    <div id="server-banner-button" onClick={displayServerBanner}>
                        <p><b>{props.usersServers[0].name}</b></p>
                        <span className="material-icons">expand_more</span>
                    </div>
                    <div id="server-banner-dropdown">
                        <button>Edit Server</button>
                        <button>Create Invite</button>
                        <hr></hr>
                        <button className="warning">Leave Server</button>
                    </div>
                </div>
                {/* TODO loop over all server contents / channels */}
                <div id="content-categories">
                    <div className="content-category" id="text-channels">
                        <div className="category-name" onClick={hideChannels}>
                            <span className="material-icons hide-category-icon">expand_more</span>
                            <p>TEXT CHANNELS</p>
                            <span className="material-icons add-channel-icon" onClick={toggleModal}>add</span>
                        </div>
                        {
                            (channels !== null) ? channels.map((channel, i) => (
                                <div key={i} className="category-channel" data-channel={channel._id} id={i === 0 ? "active-channel" : ""} onClick={newActiveChannel}>
                                    <span className="text-channel-prefix">#</span>
                                    <p>{channel.name}</p>
                                </div>
                            )) : <></>
                        }
                    </div>
                    {/* commented out voice channels until implemented */}
                    <div style={{ display: "none" }} className="content-category" id="voice-channels">
                        <div style={{ display: "none" }} className="category-name" onClick={hideChannels}>
                            <span className="material-icons hide-category-icon">expand_more</span>
                            <p>VOICE CHANNELS</p>
                            <span className="material-icons add-channel-icon">add</span>
                        </div>
                        {/* TODO loop the div below to generate the voice channels */}
                        <div className="category-channel" onClick={newActiveChannel}>
                            <span className="material-icons voice-channel-prefix">volume_down</span>
                            <p>{/* TODO voice channel name */"voice channel name"}</p>
                        </div>
                    </div>
                    <div className="content-category" id="voice-channels">
                        <div className="category-name" onClick={hideChannels}>
                            <span className="material-icons hide-category-icon">expand_more</span>
                            <p>VOICE CHANNELS</p>
                            <span className="material-icons add-channel-icon">add</span>
                        </div>
                        <div className="category-channel">
                            <span className="material-icons voice-channel-prefix">volume_down</span>
                            <p>lobby</p>
                        </div>
                        <div className="category-channel">
                            <span className="material-icons voice-channel-prefix">volume_down</span>
                            <p>study channel 2 with a really long name for qa</p>
                        </div>
                        <div className="category-channel">
                            <span className="material-icons voice-channel-prefix">volume_down</span>
                            <p>late nights secondary really long name</p>
                        </div>
                        <div className="category-channel">
                            <span className="material-icons voice-channel-prefix">volume_down</span>
                            <p>interview practice</p>
                        </div>
                        <div className="category-channel">
                            <span className="material-icons voice-channel-prefix">volume_down</span>
                            <p>music enjoyers</p>
                        </div>
                        <div className="category-channel">
                            <span className="material-icons voice-channel-prefix">volume_down</span>
                            <p>afk</p>
                        </div>
                    </div>
                    <div className="content-category" id="direct-message-channels">
                        <div className="category-name" onClick={hideChannels}>
                            <span className="material-icons hide-category-icon">expand_more</span>
                            <p>DIRECT MESSAGES</p>
                            <span className="material-icons add-channel-icon">add</span>
                        </div>
                        <div className="category-channel" onClick={newActiveChannel}>
                            <img className="direct-message-channel-prefix" src="https://via.placeholder.com/150x150" alt="user profile"></img>
                            <p>brandon111</p>
                        </div>
                        <div className="category-channel">
                            <img className="direct-message-channel-prefix" src="https://via.placeholder.com/44x150" alt="user profile"></img>
                            <p>guiro33</p>
                        </div>
                        <div className="category-channel">
                            <img className="direct-message-channel-prefix" src="https://via.placeholder.com/10x150" alt="user profile"></img>
                            <p>andrewsupersaur</p>
                        </div>
                        <div className="category-channel">
                            <img className="direct-message-channel-prefix" src="https://via.placeholder.com/1450x150" alt="user profile"></img>
                            <p>mguppy</p>
                        </div>
                        <div className="category-channel">
                            <img className="direct-message-channel-prefix" src="https://via.placeholder.com/50x55" alt="user profile"></img>
                            <p>erinlim2001, erinlim2002, erinlim2003, erinlim2004</p>
                        </div>
                    </div>
                </div>
                <div className="no-select" id="current-user" onMouseLeave={hideSettingsBanner}>
                    <img src={DefaultImage} style={{ backgroundColor: `#${intToRGB(hashCode(Auth.getProfile().data._id))}` }} alt="user profile"></img>
                    <p>{/* TODO current logged in user */Auth.getUsername()}</p>
                    <div id="current-user-settings-button" onClick={displaySettingsBanner}>
                        <span className="material-icons">settings</span>
                    </div>
                    <div id="current-user-settings-dropdown">
                        <button onClick={() => Auth.logout()}>
                            <p>Log Out</p>
                        </button>
                    </div>
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar
