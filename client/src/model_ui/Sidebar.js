import React from 'react'
import './Sidebar.css'

function Sidebar() {
    return (
        <aside>
            <nav id="server-list">
                <div id="eridium-logo">
                    <img src="https://via.placeholder.com/45x45" alt="eridium logo"></img>
                </div>
                {/* loop over all users current servers and display here */}
                <a href="?" className="server-icon">
                    <img src="https://via.placeholder.com/45x45" alt="server icon"></img>
                </a>
                <a href="?" className="server-icon">
                    <img src="https://via.placeholder.com/45x45" alt="server icon"></img>
                </a>
                <a href="?" className="server-icon">
                    <img src="https://via.placeholder.com/45x45" alt="server icon"></img>
                </a>
            </nav>
            <nav id="content-list">
                <div id="server-banner">
                    {/* TODO prevent this from possible overflow when servername is long */}
                    <p><b>the eridium server for the cool people of earth</b></p>
                    <span className="material-icons">
                        expand_more
                    </span>
                </div>
                {/* loop over all server contents / channels */}
            </nav>
        </aside>
    )
}

export default Sidebar
