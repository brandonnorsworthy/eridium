import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_MESSAGE } from '../utils/mutations';
import './Content.css'
import { io } from "socket.io-client";
import moment from 'moment'

let socket = null;
let messageOnCooldown = false;

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function Content(props) {
    const [mounted, setMounted] = useState(false);
    const [addMessage] = useMutation(ADD_MESSAGE);

    async function beforeMount() {
        if (!mounted) {
            setMounted(true);
            let socketMounted = false;
            while (!(socketMounted)) {
                if (window.location.hostname === 'eridium.herokuapp.com') {
                    socket = io();
                } else {
                    socket = io("localhost:3001");
                }

                if (socket) {
                    socketMounted = socket.connected;
                    break;
                }
                await sleep(2000)
                console.log('socket connection status', socket.connected)
                if (socket) {
                    socketMounted = socket.connected;
                    break;
                }
            }
            assignRoom();
        }
    }
    beforeMount();

    function assignRoom() {
        console.log('joining room', props.activeChannel)
        socket.emit('room', props.activeChannel);
    }

    useEffect(() => {
        assignRoom();
    }, [props.activeChannel])

    useEffect(() => {
        if (socket) {
            let errorPTag = document.getElementById('errorp')
            if (errorPTag) {
                errorPTag.remove()
            }
            let messageContainer = document.getElementById('message-list')
            socket.on('message', function (msg) {
                console.log('incoming', msg)
                let newEl = createListElement(msg);
                messageContainer.insertBefore(newEl, messageContainer.firstChild);
            })
        } else {
            console.log('Rerendered, and socket null')
            let errorPTag = document.createElement('p')
            errorPTag.setAttribute('id', 'errorp')
            document.getElementById("message-list").appendChild(errorPTag)
        }
    }, []);

    function createListElement(message) {
        console.log('creating message', message)
        let liEl = document.createElement('li');
        liEl.classList.add('message-container');
        liEl.setAttribute('key', message.id);
        liEl.innerHTML = `
        <img class="message-profile-pic" src=${/* TODO message authors profile */"https://via.placeholder.com/50"} alt="profile"></img>
        <div>
            <div class="message-top">
                <p class="message-username">${/* TODO message author username */message.id}</p>
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
                socket.emit('message', e.target.value.trim());

                // Mutation added so that message saves to database
                await addMessage({
                    variables: {
                        message_body: e.target.value.trim(),
                        message_author: socket.id //TODO replace with username
                    }
                });

                e.target.value = '';
                setTimeout(function () { messageOnCooldown = false }, 1000);
            }
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
