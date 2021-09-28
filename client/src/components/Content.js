import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_MESSAGE } from '../utils/mutations';
import { useQuery, useLazyQuery } from '@apollo/client';
import { QUERY_CHANNEL_MESSAGE, QUERY_CHANNEL } from '../utils/queries';
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
    const [newMessages, setNewMessages] = useState([]);
    const [addMessage] = useMutation(ADD_MESSAGE);
    let channel = null
    let messages = null

    const { data: channelData } = useQuery(QUERY_CHANNEL, { variables: { channel_id: props.activeChannel } })
    channel = channelData?.channel || [];

    const { data: channelPreviousMessageData } = useQuery(QUERY_CHANNEL_MESSAGE, { variables: { channel_id: props.activeChannel } })
    messages = channelPreviousMessageData?.channel_messages?.messages || [];

    const [newChannel, { data: channelMessageData }] = useLazyQuery(QUERY_CHANNEL_MESSAGE, { variables: { channel_id: props.activeChannel } })

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
        setNewMessages([]);
        console.log('newChannel', props.activeChannel)
        newChannel()
        if (channelMessageData) {
            console.log('channelMessageData?.channel_messages?.messages', channelMessageData?.channel_messages?.messages)
            setNewMessages(channelMessageData.channel_messages.messages);
            console.log('newMessages', newMessages)
            messages = channelMessageData?.channel_messages?.messages
            console.log('messages', messages)

        }
        socket.emit('channel', props.activeChannel);
    }, [props.activeChannel])

    useEffect(() => {
        if (socket) {
            let errorPTag = document.getElementById('errorp')
            if (errorPTag) {
                errorPTag.remove()
            }
            socket.on('message', function (payload) {
                newMessageElements(payload);
            })
        } else {
            let errorPTag = document.createElement('p')
            errorPTag.setAttribute('id', 'errorp')
            document.getElementById("message-list").appendChild(errorPTag)
        }
    }, []);

    function newMessageElements(message) {
        setNewMessages(newMessages => [...newMessages,
        {
            _id: message.id,
            body: message.body,
            createdAt: moment(),
            user_id: {
                _id: message.user_id,
                profile_picture: null,
                username: message.username
            },
        }])
    }

    async function formSubmit(e) {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            if (socket && !messageOnCooldown) {
                messageOnCooldown = true;

                // Mutation added so that message saves to database
                const message = await addMessage({
                    variables: {
                        user_id: Auth.getProfile().data._id,
                        channel_id: props.activeChannel,
                        body: e.target.value.trim(),
                    }
                });
                socket.emit('message', {
                    id: message._id,
                    user_id: Auth.getProfile().data._id,
                    username: Auth.getUsername(),
                    body: e.target.value.trim()
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
                <p id="channel-name">{channel?.name ? channel.name : 'channel name'}</p>
                <span id="channel-description">{channel?.topic ? channel.topic : <></>}</span>
                <a style={{ textDecoration: "none", color: "var(--primary-color" }} target="_blank" rel="noreferrer" href="https://github.com/brandonnorsworthy/eridium">GitHub</a>
                <a style={{ textDecoration: "none", color: "var(--primary-color" }} target="_blank" rel="noreferrer" href="https://www.figma.com/file/QZpdcLvg3Xf1BPy5zwutWF/Eridium?node-id=3%3A13">Figma</a>
            </div>
            <div id="main-content">
                <div className="no-select" id="input-container" >
                    <input onKeyDown={formSubmit} placeholder="message in #random-yt-vids"></input>
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
                        (newMessages !== null) ? newMessages.slice().reverse().map((message, i) => (
                            <li key={i} className="message-container" id={message._id}>
                                <img className="message-profile-pic" src={message.user_id.profile_picture ? message.user_id.profile_picture : DefaultImage} style={{ backgroundColor: `#${intToRGB(hashCode(message.user_id._id))}` }} alt="profile"></img>
                                <div>
                                    <div className="message-top">
                                        <p className="message-username">{message.user_id.username}</p>
                                        <p className="message-times">
                                            <span className="message-timestamp">{moment.unix(message.createdAt / 1000).format('M/DD/YYYY') + ` at ` + moment.unix(message.createdAt / 1000).format('h:mm a')}</span>
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
                    {
                        (messages !== null) ? messages.slice().reverse().map((message, i) => (
                            <li key={i} className="message-container" id={message._id}>
                                <img className="message-profile-pic" src={message.user_id.profile_picture ? message.user_id.profile_picture : DefaultImage} style={{ backgroundColor: `#${intToRGB(hashCode(message.user_id._id))}` }} alt="profile"></img>
                                <div>
                                    <div className="message-top">
                                        <p className="message-username">{message.user_id.username}</p>
                                        <p className="message-times">
                                            <span className="message-timestamp">{moment.unix(message.createdAt / 1000).format('MM/DD/YYYY') + ` at ` + moment.unix(message.createdAt / 1000).format('hh:mm a')}</span>
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
