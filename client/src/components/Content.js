import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_MESSAGE } from '../utils/mutations';
import { useQuery } from '@apollo/client';
import { QUERY_CHANNEL_MESSAGE } from '../utils/queries';
import './Content.css'
import { io } from "socket.io-client";
import moment from 'moment'
import Auth from '../utils/auth.js'
import DefaultImage from '../private/default.png'

let socket = null;
let messageOnCooldown = false;

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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


function Content(props) {
    const [mounted, setMounted] = useState(false);
    const [addMessage] = useMutation(ADD_MESSAGE);
    let messages = null
    
    const { data } = useQuery(QUERY_CHANNEL_MESSAGE, { variables: { channel_id: props.activeChannel } })
    messages = data?.channel_messages?.messages || [];

    async function beforeMount() {
        if (!mounted) {
            setMounted(true);
            let socketMounted = false;
            while (!(socketMounted)) {
                if (window.location.hostname === 'www.eridium.chat' || window.location.hostname === 'eridium.herokuapp.com') {
                    socket = io();
                } else {
                    socket = io("localhost:3001");
                }

                if (socket) {
                    socketMounted = socket.connected;
                    break;
                }
                await sleep(2000)
                if (socket) {
                    socketMounted = socket.connected;
                    break;
                }
            }
            socket.emit('channel', props.activeChannel);
        }
    }
    beforeMount();

    useEffect(() => {
        socket.emit('channel', props.activeChannel);
    }, [props.activeChannel])

    useEffect(() => {
        if (socket) {
            let errorPTag = document.getElementById('errorp')
            if (errorPTag) {
                errorPTag.remove()
            }
            let messageContainer = document.getElementById('message-list')
            socket.on('message', function (msg) {
                let newEl = createListElement(msg);
                messageContainer.insertBefore(newEl, messageContainer.firstChild);
            })
        } else {
            let errorPTag = document.createElement('p')
            errorPTag.setAttribute('id', 'errorp')
            document.getElementById("message-list").appendChild(errorPTag)
        }
    }, []);

    function createListElement(message) {
        let liEl = document.createElement('li');
        liEl.classList.add('message-container');
        liEl.setAttribute('key', message.id);
        liEl.innerHTML = `
        <img class="message-profile-pic" src=${DefaultImage} style="background-color:#${intToRGB(hashCode(message.id))};" alt="profile"></img>
        <div>
            <div class="message-top">
                <p class="message-username">${message.username}</p>
                <p class="message-times">
                    <span class="message-timestamp">${/* TODO message timestamp */moment().format("h:mm a")}</span>
                    &nbsp;•&nbsp;
                    <span class="message-timeago">${/* TODO how long ago message occured */moment().fromNow()}</span>
                </p>
            </div>
            <div class="message-content">
                <p>
                    ${message.message}
                </p>
            </div>
        </div>`

        return liEl
    }

    async function formSubmit(e) {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            if (socket && !messageOnCooldown) {
                messageOnCooldown = true;
                socket.emit('message', { id: Auth.getProfile().data._id, username: Auth.getUsername(), message: e.target.value.trim() });

                // Mutation added so that message saves to database
                await addMessage({
                    variables: {
                        body: e.target.value.trim(),
                        user_id: Auth.getProfile().data._id,
                        channel_id: props.activeChannel
                    }
                });

                e.target.value = '';
                setTimeout(function () { messageOnCooldown = false }, 1000);
            }
        }
    }

        const tempMessages = messages.slice().reverse()

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
                <ul id="message-list">
                    {
                        (tempMessages !== null) ? tempMessages.map((message, i) => (
                            <li key={i} className="message-container" id={message._id}>
                                <img className="message-profile-pic" src={message.user_id.profile_picture ? message.user_id.profile_picture : DefaultImage} style={{backgroundColor: `#${intToRGB(hashCode(message.user_id._id))}`}} alt="profile"></img>
                                <div>
                                    <div className="message-top">
                                        <p className="message-username">{message.user_id.username}</p>
                                        <p className="message-times">
                                            <span className="message-timestamp">{'1:11 am'}</span>
                                            &nbsp;•&nbsp;
                                            <span className="message-timeago">{'7 hours ago'}</span>
                                        </p>
                                    </div>
                                    <div className="message-content">
                                        <p>
                                            {message.body}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        )) : <></>
                    }
                </ul>
            </div>
        </main>
    )
}

export default Content
