import React, { Component } from "react";
import { connect } from "react-redux";
import { getRoomData, getChatLog, sendNewMessage } from "../actions";
import { db } from "../firebase";

class ChatRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ""
		};
	}

	componentDidMount() {
		const { roomId, logId } = this.props.match.params;
		this.props.getRoomData(roomId, logId);

		db.ref(`/chat-logs/${logId}`).on("value", snapshot => {
			this.props.getChatLog(snapshot.val())
		})
	}

	sendMessage(event) {
		event.preventDefault();
		this.props.sendNewMessage(this.props.roomInfo.chatLogID, this.state.message);

		this.setState({
			message: ""
		});
	}
	render() {
		// console.log("Chat Info: ", this.props);
		const { name } = this.props.roomInfo;
		const { chatLog } = this.props;

		const messages = Object.keys(chatLog).reverse().map(key => {
			return (
				<li key={key} className="collection-item">
					{chatLog[key]}
				</li>
			);
		});

		return (
			<div>
				<h3>{name ? name : "Loading..."}</h3>
				<form onSubmit={this.sendMessage.bind(this)}>
					<label>Enter Message:</label>
					<input
						type="text"
						value={this.state.message}
						onChange={event =>
							this.setState({
								message: event.target.value
							})
						}
					/>
					<button className="btn">Send Message</button>
				</form>
				<ul className="collection">{messages}</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		roomInfo: state.chatReducer.currentRoom,
		chatLog: state.chatReducer.chatLog
	};
}

export default connect(mapStateToProps, { getRoomData, getChatLog, sendNewMessage })(ChatRoom);
