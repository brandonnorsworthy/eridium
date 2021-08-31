import React from 'react'
import './Content.css'

function Content() {
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
                <ul>
                    {/* TODO loop over li tags to generate messages !!!!!ADD MOST RECENT TO BOTTOM */}
                    <li className="message-container">
                        <img className="message-profile-pic" src={/* TODO message authors profile */"https://via.placeholder.com/50"} alt="profile"></img>
                        <div>
                            <div className="message-top">
                                <p className="message-username">{/* TODO message author username */}username</p>
                                <p className="message-times">
                                    <span className="message-timestamp">{/* TODO message timestamp */}11:12 AM</span>
                                    &nbsp;•&nbsp;
                                    <span className="message-timeago">{/* TODO how long ago message occured */}3 hours ago</span>
                                </p>
                            </div>
                            <div className="message-content">
                                {/* example of @message */}
                                {/* <p>grjioeroijga <span className="usertag">@jeremeyblanks19</span></p> */}
                                <p>{/* TODO users message */}Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet repellat pariatur quae obcaecati tempora doloribus vel perferendis voluptatem illum, neque saepe tenetur? Fuga ipsum, tenetur illo temporibus vero quod labore?
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet repellat pariatur quae obcaecati tempora doloribus vel perferendis voluptatem illum, neque saepe tenetur? Fuga ipsum, tenetur illo temporibus vero quod labore?
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet repellat pariatur quae obcaecati tempora doloribus vel perferendis voluptatem illum, neque saepe tenetur? Fuga ipsum, tenetur illo temporibus vero quod labore?
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="message-container">
                        <img className="message-profile-pic" src="https://via.placeholder.com/150x150" alt="profile"></img>
                        <div>
                            <div className="message-top">
                                <p className="message-username">{/* TODO message author username */}username</p>
                                <p className="message-times">
                                    <span className="message-timestamp">{/* TODO message timestamp */}08/15/2021</span>
                                    &nbsp;•&nbsp;
                                    <span className="message-timeago">{/* TODO how long ago message occured */}3 days ago</span>
                                </p>
                            </div>
                            <div className="message-content">
                                <p><span className="image-name">{/* TODO image file name shows here */"downloadedimage(3).png"}</span></p>
                                <img src={/* TODO uploaded attachment url */"https://via.placeholder.com/500x200"} alt="user uploaded"></img>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="no-select" id="input-container" >
                    <textarea placeholder="message in #random-yt-vids"></textarea>
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
