import React from 'react'
import './Content.css'

function Content() {
    return (
        <main>
            <div id="content-banner">
                <span className="no-select" id="channel-type-icon">#</span>
                <p id="channel-name">random-yt-vids</p>
                <span id="channel-description">post entertaining youtube videos here that arnt actually trash</span>
                <a style={{ textDecoration: "none", color: "var(--primary-color" }} target="_blank" rel="noreferrer" href="https://github.com/brandonnorsworthy/eridium">GitHub</a>
                <a style={{ textDecoration: "none", color: "var(--primary-color" }} target="_blank" rel="noreferrer" href="https://www.figma.com/file/QZpdcLvg3Xf1BPy5zwutWF/Eridium?node-id=3%3A13">Figma</a>
            </div>
            <div id="main-content">
                <ul>
                    <li className="no-select" id="input-container">
                        <input></input>
                        <div id="selectables">
                            <div><b>B</b></div>
                            <div><i>I</i></div>
                            <div><u>U</u></div>
                            <div><s>S</s></div>
                            <div>{"</>"}</div>
                            <div><span class="material-icons">link</span></div>
                            <div><span class="material-icons">attach_file</span></div>
                        </div>
                    </li>
                    <li className="message-container">
                        <img class="message-profile-pic" src="https://via.placeholder.com/150x150" alt="profile"></img>
                        <div>
                            <div className="message-top">
                                <p className="message-username">brandon1111</p>
                                <p className="message-times">
                                    <span className="message-timestamp">1:12 AM</span>
                                    &nbsp;•&nbsp;
                                    <span className="message-timeago">48 minutes ago</span>
                                </p>
                            </div>
                            <div className="message-content">
                                <p>grjioeroijga <span className="usertag">@jeremeyblanks19</span></p>
                            </div>
                        </div>
                    </li>
                    <li className="message-container">
                        <img class="message-profile-pic" src="https://via.placeholder.com/150x150" alt="profile"></img>
                        <div>
                            <div className="message-top">
                                <p className="message-username">jeremeyblanks19</p>
                                <p className="message-times">
                                    <span>12:12 PM</span>
                                    &nbsp;•&nbsp;
                                    <span>2 hours ago</span>
                                </p>
                            </div>
                            <div className="message-content">
                                <p>yo can anyone please send me some completely random letters that mean absolutely nothing</p>
                            </div>
                        </div>
                    </li>
                    <li className="message-container">
                        <img class="message-profile-pic" src="https://via.placeholder.com/150x150" alt="profile"></img>
                        <div>
                            <div className="message-top">
                                <p className="message-username">guiro33</p>
                                <p className="message-times">
                                    <span className="message-timestamp">1:12 AM</span>
                                    &nbsp;•&nbsp;
                                    <span className="message-timeago">48 minutes ago</span>
                                </p>
                            </div>
                            <div className="message-content">
                                <p><span className="image-name">greatatdownloadingimages(3).png</span></p>
                                <img src="https://via.placeholder.com/477x207" alt="user uploaded"></img>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </main>
    )
}

export default Content
