import React, { useEffect } from "react";
import RootRouter from "./Components/router";
import Pusher from "pusher-js";
import "./App.css";

function Attentive() {
	useEffect(() => {
		const pusher = Pusher(process.env.REACT_APP_PUSHER_ENV, {
			cluster: "ap2",
		});
		const channel1 = pusher.subscribe("channel_name1");
		channel1.bind("attentive", function (data) {
			console.log(data);
		});

		return () => {
			pusher.unsubscribe("chatroom");
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <div>Attentive</div>;
}

export default Attentive;
