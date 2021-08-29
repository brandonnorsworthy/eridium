import React from 'react'
import SendIcon from '@material-ui/icons/Send';
import "./ChatContent.css"

function ChatContent() {
    return (
        <div className="container">
            <div className="inputContainer">
                <form className="styledForm">
                    <input className="styledInput" classtype="text" placeholder="Message here..."/>
                    <div className="sendButton">
                        <SendIcon/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChatContent

