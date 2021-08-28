import React from 'react'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import "./Header.css"


function Header() {
    return (
        <div className="headerContainer">
            <div className="main">
                <AccessTimeIcon />
                <div className="searchContainer">
                    <div className="search">
                        <input className="styledInput" type="text" placeholder="Search..." />
                    </div>
                </div>
                <HelpOutlineIcon />
            </div>
            <div className="userContainer">
                <div className="name">
                    Erin
                </div>
                <div className="userImage">
                    <img src="https://i.imgur.com/6VBx3io.png" />
                </div>
            </div>
        </div>
    )
}

export default Header

