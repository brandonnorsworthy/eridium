import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_MESSAGE } from '../utils/mutations';
import { v4 as uuidv4 } from 'uuid';
import './Content.css'
import io from 'socket.io-client';
import moment from 'moment'

let socket = null;
let socketMounted = false;
let portRequests = 1
let messageOnCooldown = false;
let location = 'http://localhost:3001/api/port'

async function askForPort() {
    if (!socketMounted) {
        console.log("askForPort() running")
        if (window.location.hostname === '10.0.0.149') {
            location = 'http://10.0.0.149:3001/api/port'
        }
        if (window.location.hostname === 'eridium.herokuapp.com') {
            location = '/api/port'
        }
        fetch(location)
            .then(res => res.json())
            .then(data => {
                setPortVariable(data.port)
                return;
            })
        console.log('askForPort() failed retrying in', Math.pow(2, portRequests) * 1000)
        await sleep(Math.pow(2, portRequests) * 1000)
        portRequests++
        if (portRequests < 6) {
            askForPort();
        }
    }
}

function setPortVariable(port) {
    let wsLocation = `http://localhost:${port}`
    if (window.location.hostname === 'eridium.herokuapp.com') {
        wsLocation = `http://eridium.herokuapp.com:${port}`
    }
    socket = io(wsLocation, {
        transports: ["websocket"],
    });
    socketMounted = true
}

function Content() {
    const [messages, setMessages] = useState([]);
    const [hasPort, setHasPort] = useState(!(socket === null))
    const [mounted, setMounted] = useState(false)

    const [formState, setFormState] = useState({ message_body: ''});
    const [addMessage] = useMutation(ADD_MESSAGE);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    async function beforeMount() {
        if (!mounted) {
            setMounted(true)
            console.log('beforeMount() starting')

            askForPort()

            let iteration = 1
            while (!hasPort) {
                console.log('beforeMount() socket is mounted:', socketMounted)
                if (socketMounted) {
                    setHasPort(true)
                    console.log('beforeMount() askForPort() mounted socket')
                    break;
                }
                console.log('beforeMount() Sleep and retry in:', Math.pow(2, iteration) * 1000)
                await sleep(Math.pow(2, iteration) * 1000)
                iteration++;
            }
        }
    }
    beforeMount();

    useEffect(() => {
        console.log('useEffect(): Rerendering, port-status:', hasPort)
        setMounted(true)
        if (hasPort) {
            console.log('useEffect(() => {hasPort === true)')
            socket.on('message', function (msg) {
                console.log('[INCOMING] chat message', messages.length)
                setMessages([{ id: uuidv4(), message: msg }, ...messages]);
            })
            let errorPTag = document.getElementById('errorp')
            if (errorPTag) {
                errorPTag.remove()
            }
        } else {
            let errorPTag = document.createElement('p')
            errorPTag.textContent = `not connected ${location}`
            errorPTag.setAttribute('id', 'errorp')
            document.getElementById("message-list").appendChild(errorPTag)
        }
    }, [messages, hasPort]);

    async function formSubmit(e) {

        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            if (socket && !messageOnCooldown) {
                messageOnCooldown = true;
                socket.emit('message', e.target.value.trim());
                setMessages([{ id: uuidv4(), message: e.target.value }, ...messages]);
                
                // Mutation added so that message saves to database
                const mutationResponse = await addMessage({
                    variables: {
                        message_body: formState.message_body,
                        message_author: 'mguppy'
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
                    <textarea onKeyDown={formSubmit} onChange={handleChange} value={formState.username} placeholder="message in #random-yt-vids"></textarea>
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

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default Content
