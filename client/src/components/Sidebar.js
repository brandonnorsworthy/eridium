import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import "./Sidebar.css"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { sidebarItemsData } from '../data/SidebarData'
function Sidebar() {
    return (
        <div className="sidebarContainer"> 
            <div className="workspaceContainer">
                <div className="name">
                UTA-VIRT-FSF-FT-06-2021-U-LOL 
                </div>
                <div className="newMessage">
                    <AddCircleIcon/>
                </div>
            </div>
            <div className="mainChannels">
                {
                    sidebarItemsData.map(item => (
                        <div className="mainChannelItem">
                            {item.icon}
                            {item.text}
                        </div>
                    ))
                }
            </div>
            <div className="channelsContainer">
                <div className="newChannelContainer">
                    <div>
                        Channels
                    </div>
                    <AddIcon/>
                </div>
                <div className="channelsList">
                    <div className="channel">
                        #Channel 1
                    </div>
                    <div className="channel">
                        #Channel 2
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Sidebar

