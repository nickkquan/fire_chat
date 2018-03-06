import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { db } from "../firebase";
import { getRoomList, createRoom } from "../actions";

class Lobby extends Component {
	constructor(props) {
		super(props);

		this.state = {
			roomName: ""
		};

		this.dbChatRef = db.ref("/chat-rooms");
	}
	handleCreateRoom(event) {
		event.preventDefault();

		this.props.createRoom(this.state.roomName);

		this.setState({
			roomName: ""
		});
	}
	componentDidMount() {
		this.dbChatRef.on("value", snapshot => {
			this.props.getRoomList(snapshot.val());
		});
	}

	componentWillUnmount() {
		this.dbChatRef.off();
	}

	render() {
		const { roomName } = this.state;
		const { roomList } = this.props;
		let rooms = [];

		if (roomList) {
			rooms = Object.keys(roomList).map((key, index) => {
				return (
					<li key={index} className="collection-item">
						<Link to={`/room/${key}/log/${roomList[key].chatLogID}`}>{roomList[key].name}</Link>
					</li>
				);
			});
		} else {
			rooms.push(
				<li key="0" className="collection-item">
					No rooms available. Create one above.
				</li>
			);
		}

		return (
			<div className="row">
				<h3>Chat Lobby</h3>
				<form onSubmit={this.handleCreateRoom.bind(this)}>
					<label> Chat Room Name</label>
					<input
						type="text"
						onChange={event => this.setState({ roomName: event.target.value })}
						value={roomName}
					/>
					<button className="btn-large">Create Room</button>
				</form>
				<ul className="collection">{rooms}</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		roomList: state.chatReducer.roomList
	};
}

export default connect(mapStateToProps, { getRoomList, createRoom })(Lobby);
