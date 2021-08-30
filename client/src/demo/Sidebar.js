import React from 'react'
import './../components/Sidebar.css'

function DemoSidebar() {
    return (
        <aside className="no-select">
            <nav id="server-list">
                <div id="eridium-logo">
                    <img src="https://via.placeholder.com/50x150" alt="eridium logo"></img>
                </div>
                {/* TODO loop over all users current servers and display here */}
                <a href="?" className="server-icon">
                    <img src="https://via.placeholder.com/222x150" alt="server icon"></img>
                </a>
                <a href="?" className="server-icon" id="active-server">
                    <img src="https://via.placeholder.com/150x440" alt="server icon"></img>
                </a>
                <a href="?" className="server-icon">
                    <img src="https://via.placeholder.com/75x150" alt="server icon"></img>
                </a>

            </nav>
            <nav id="content-list">
                <div className="no-select" id="server-banner">
                    {/* TODO prevent this from possible overflow when servername is long */}
                    <p><b>the eridium server for the cool people of earth</b></p>
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
                        <div className="category-channel">
                            <span className="text-channel-prefix">#</span>
                            <p>general</p>
                        </div>
                        <div className="category-channel">
                            <span className="text-channel-prefix">#</span>
                            <p>coding-chat</p>
                        </div>
                        <div className="category-channel">
                            <span className="text-channel-prefix">#</span>
                            <p>late-night-chitchat-for-the-elite-personell</p>
                        </div>
                        <div className="category-channel">
                            <span className="text-channel-prefix">#</span>
                            <p>spoonkid-gaming</p>
                        </div>
                        <div className="category-channel">
                            <span className="text-channel-prefix">#</span>
                            <p>counting</p>
                        </div>
                        <div className="category-channel" id="active-channel">
                            <span className="text-channel-prefix">#</span>
                            <p>random-yt-vids</p>
                        </div>
                        <div className="category-channel">
                            <span className="text-channel-prefix">#</span>
                            <p>api-stuff</p>
                        </div>
                    </div>
                    <div className="content-category" id="voice-channels">
                        <div className="category-name">
                            <span className="material-icons hide-category-icon">expand_more</span>
                            <p>VOICE CHANNELS</p>
                            <span class="material-icons add-channel-icon">add</span>
                        </div>
                        <div className="category-channel">
                            <span className="material-icons voice-channel-prefix">volume_down</span>
                            <p>lobby</p>
                        </div>
                        <div className="category-channel">
                            <span className="material-icons voice-channel-prefix">volume_down</span>
                            <p>study room 2 with a really long name for qa</p>
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
                        <div className="category-name">
                            <span className="material-icons hide-category-icon">expand_more</span>
                            <p>DIRECT MESSAGES</p>
                            <span class="material-icons add-channel-icon">add</span>
                        </div>
                        <div className="category-channel">
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
                <div id="current-user">
                    <img src="https://via.placeholder.com/770x150" alt="user profile"></img>
                    <p>jeremeyblanks1986tomswalmartarea</p>
                    <span className="material-icons">settings</span>
                </div>
            </nav>
        </aside>
    )
}

export default DemoSidebar
