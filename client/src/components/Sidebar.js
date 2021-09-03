import React from 'react';
import Auth from '../utils/auth';
import './Sidebar.css'

function Sidebar() {
    function displayServerBanner(e) {
        /* BRANDON server banner replace icon when clicked */
        document.getElementById("server-banner-dropdown").style.display = "flex"
    }

    function hideServerBanner(e) {
        /* BRANDON server banner replace icon when leave banner */
        document.getElementById("server-banner-dropdown").style.display = "none"
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
            if (!(target.tagName === 'DIV')) {
                target = target.parentElement
            }

            document.getElementById('active-channel').removeAttribute('id');
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
                    <img src={/* TODO eridium logo */"https://via.placeholder.com/50"} alt="eridium logo"></img>
                </div>
                {/*! TODO loop over all users current servers and display here example below */}
                <a href={/* TODO server link */"?"} className="server-icon">
                    <img src={/* TODO server icon */"https://via.placeholder.com/50"} alt="server icon"></img>
                </a>
            </nav>
            <nav id="content-list">
                <div className="no-select" id="server-banner" onMouseLeave={hideServerBanner}>
                    <div id="server-banner-button" onClick={displayServerBanner}>
                        <p><b>{/* TODO current server name */"current server name"}</b></p>
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
                            <span className="material-icons add-channel-icon">add</span>
                        </div>
                        {/* TODO loop the div below to create the text channels */}
                        <div className="category-channel" id="active-channel" onClick={newActiveChannel}>
                            <span className="text-channel-prefix">#</span>
                            <p>{/* TODO text channel name */"channel name here"}</p>
                        </div>
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
                    <div className="content-category" id="direct-message-channels">
                        <div className="category-name" onClick={hideChannels}>
                            <span className="material-icons hide-category-icon">expand_more</span>
                            <p>DIRECT MESSAGES</p>
                            <span className="material-icons add-channel-icon">add</span>
                        </div>
                        {/* TODO loop over the div below to generate the direct message channels */}
                        <div className="category-channel" onClick={newActiveChannel}>
                            <img className="direct-message-channel-prefix" src={/* TODO other users profile pic */"https://via.placeholder.com/20x20"} alt="user profile"></img>
                            <p>{/* TODO other users username */"users username here"}</p>
                        </div>
                    </div>
                </div>
                <div className="no-select" id="current-user" onMouseLeave={hideSettingsBanner}>
                    <img src={/* TODO current logged in users profile picture */"https://via.placeholder.com/30x30"} alt="user profile"></img>
                    <p>{/* TODO current logged in user */"currentusername"}</p>
                    <div id="current-user-settings-button" onClick={displaySettingsBanner}>
                        <span className="material-icons">settings</span>
                    </div>
                    <div id="current-user-settings-dropdown">
                        <button onClick={() => Auth.logout()}>
                            <a>Log Out</a>
                        </button>
                    </div>
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar
