import React, { Component } from "react";
import { db } from "../firebase"

class Chat extends Component {
    componentDidMount() {
        db.ref("/chat-room").on("value", snapshot => {
            console.log("DB snapshot: ", snapshot.val())
        })
    }
    render() {
        return (
            <div>
                <h3>Chat</h3>
            </div>
        )
    }
}

export default Chat;