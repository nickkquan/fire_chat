import React, { Component } from "react";
import { db } from "../firebase";

class Lobby extends Component {
	constructor(props) {
		super(props);

		this.state = {
			roomName: ""
		};
	}
	handleCreateRoom(event) {
		const { roomName } = this.state;
		event.preventDefault();
		console.log("Room name: ", this.state.roomName);
		const newRoom = {
			name: roomName,
			chatLog: [`Room: ${roomName} - Created`]
		};
		db
			.ref("/chat-rooms")
			.push(newRoom)
			.then(resp => {
				console.log("Add Room Response", resp);
			});
	}
	render() {
		const { roomName } = this.state;
		return (
			<div>
				<h3>Chat Lobby</h3>
				<form onSubmit={this.handleCreateRoom.bind(this)}>
					<label> Chat Room Name</label>
					<input
						type="text"
						onChange={event => this.setState({ roomName: event.target.value })}
						value={roomName}
					/>
					<button> Create Room</button>
				</form>
			</div>
		);
	}
}

export default Lobby;
