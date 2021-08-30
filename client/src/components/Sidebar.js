import React from 'react'
import './Sidebar.css'

function Sidebar() {
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
                <div className="no-select" id="server-banner">
                    <p><b>{/* TODO current server name */"current server name"}</b></p>
                    <span className="material-icons">expand_more</span>
                </div>
                {/* TODO loop over all server contents / channels */}
                <div id="content-categories">
                    <div className="content-category" id="text-channels">
                        <div className="category-name">
                            <span className="material-icons hide-category-icon">expand_more</span>
                            <p>TEXT CHANNELS</p>
                            <span class="material-icons add-channel-icon">add</span>
                        </div>
                        {/* TODO loop the div below to create the text channels */}
                        <div className="category-channel">
                            <span className="text-channel-prefix">#</span>
                            <p>{/* TODO text channel name */"channel name here"}</p>
                        </div>
                    </div>
                    {/* commented out voice channels until implemented */}
                    <div style={{display:"none"}} className="content-category" id="voice-channels">
                        <div className="category-name">
                            <span className="material-icons hide-category-icon">expand_more</span>
                            <p>VOICE CHANNELS</p>
                            <span class="material-icons add-channel-icon">add</span>
                        </div>
                        {/* TODO loop the div below to generate the voice channels */}
                        <div className="category-channel">
                            <span className="material-icons voice-channel-prefix">volume_down</span>
                            <p>{/* TODO voice channel name */"voice channel name"}</p>
                        </div>
                    </div>
                    <div className="content-category" id="direct-message-channels">
                        <div className="category-name">
                            <span className="material-icons hide-category-icon">expand_more</span>
                            <p>DIRECT MESSAGES</p>
                            <span class="material-icons add-channel-icon">add</span>
                        </div>
                        {/* TODO loop over the div below to generate the direct message channels */}
                        <div className="category-channel">
                            <img className="direct-message-channel-prefix" src={/* TODO other users profile pic */"https://via.placeholder.com/20x20"} alt="user profile"></img>
                            <p>{/* TODO other users username */"users username here"}</p>
                        </div>
                    </div>
                </div>
                <div id="current-user">
                    <img src={/* TODO current logged in users profile picture */"https://via.placeholder.com/30x30"} alt="user profile"></img>
                    <p>{/* TODO current logged in user */"currentusername"}</p>
                    <span className="material-icons">settings</span>
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar
