import React from 'react'
import './modal.css'

function CreateChannel() {
    function hideModal(e) {
        console.log(e)
        if (e.target.id === 'create-channel-modal') {
            e.target.style.display = 'none';
        }
    }

    return (
        <div className="modal" id="create-channel-modal" onClick={hideModal}>
            <div className="modal-content create-channel">
                <h3>Create a Text Channel</h3>
                <p><b>CHANNEL NAME</b></p>
                <div className="modal-input">
                    <span className="text-channel-prefix channel-type-icon">#</span>
                    <input className="sub-input" placeholder="channel-name"></input>
                </div>
                <p><b>CHANNEL TOPIC</b></p>
                <div className="modal-input">
                    <input className="input" placeholder="channel description"></input>
                </div>
                <button className="modal-submit">Create</button>
            </div>
        </div>
    )
}

export default CreateChannel