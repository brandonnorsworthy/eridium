import React from 'react'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ChatInput from './ChatContent';
import "./Chat.css"

function Chat() {
    return (
        <div className="parentContainer">
            <div className="header">
                <div className="channelContainer">
                    <div className="channelName">
                        # 01-live-class-activities
                    </div>
                    <div className="channelInfo">
                        Questions regarding activities & homework
                    </div>
                </div>
                <div className="channelDetails">
                    <div>
                        Details
                    </div>
                    <InfoOutlinedIcon/>
                </div>
            </div>
            <div className="messageContainer">

            </div>
            <ChatInput/>
           
        </div>
  
    )
}

export default Chat
