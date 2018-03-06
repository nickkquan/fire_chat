import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import { Route } from "react-router-dom";
import ChatRoom from "./chatroom";
import Lobby from "./lobby";

const App = () => (
	<div className="container">
		<h1 className="center-align">Fuego 🔥 Chat</h1>
		<Route exact path="/" component={Lobby} />
		<Route path="/room/:roomId/log/:logId" component={ChatRoom} />
	</div>
);

export default App;
