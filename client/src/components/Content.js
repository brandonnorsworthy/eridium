import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './Content.css'
import io from 'socket.io-client';
import moment from 'moment'

let socket = null
socket = io(`http://${window.location.hostname}:3011`, { transports: ["websocket"] });

function Content() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('chat message', function (msg) {
            setMessages([{ id: uuidv4(), message: msg }, ...messages]);
        });
    });

    function formSubmit(e) {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            socket.emit('chat message', e.target.value.trim());
            e.target.value = '';
        }
    }

    return (
        <main>
            <div id="content-banner">
                <span className="no-select" id="channel-type-icon">#</span>
                <p id="channel-name">{/* TODO current active channel */"active channel"}</p>
                <span id="channel-description">{/* TODO current active channel description */"active channels description"}</span>
                <a style={{ textDecoration: "none", color: "var(--primary-color" }} target="_blank" rel="noreferrer" href="https://github.com/brandonnorsworthy/eridium">GitHub</a>
                <a style={{ textDecoration: "none", color: "var(--primary-color" }} target="_blank" rel="noreferrer" href="https://www.figma.com/file/QZpdcLvg3Xf1BPy5zwutWF/Eridium?node-id=3%3A13">Figma</a>
                <a style={{ textDecoration: "none", color: "var(--primary-color" }} href="/demo">Demo</a>
            </div>
            <div id="main-content">
                <ul id="message-list">
                    {/* TODO loop over li tags to generate messages !!!!!ADD MOST RECENT TO BOTTOM */}
                    {
                        messages.map((message) => (
                            <li key={message.id} className="message-container">
                                <img className="message-profile-pic" src={/* TODO message authors profile */"https://via.placeholder.com/50"} alt="profile"></img>
                                <div>
                                    <div className="message-top">
                                        <p className="message-username">{/* TODO message author username */}username</p>
                                        <p className="message-times">
                                            <span className="message-timestamp">{/* TODO message timestamp */moment().format("h:mm a")}</span>
                                            &nbsp;•&nbsp;
                                            <span className="message-timeago">{/* TODO how long ago message occured */moment().fromNow()}</span>
                                        </p>
                                    </div>
                                    <div className="message-content">
                                        {/* example of @message */}
                                        {/* <p>grjioeroijga <span className="usertag">@jeremeyblanks19</span></p> */}
                                        <p>
                                            {message.message}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <div className="no-select" id="input-container" >
                    <textarea onKeyDown={formSubmit} placeholder="message in #random-yt-vids"></textarea>
                    <div id="selectables">
                        <div><b>B</b></div>
                        <div><i>I</i></div>
                        <div><u>U</u></div>
                        <div><s>S</s></div>
                        <div>{"</>"}</div>
                        <div><span className="material-icons">link</span></div>
                        <div><span className="material-icons">attach_file</span></div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Content
