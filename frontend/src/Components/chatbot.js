import React from "react";

function Chatbot() {
	return (
		<div style={{ position: "absolute", right: 60, bottom: 50 }}>
			<iframe
				allow="microphone;"
				width="350"
				height="550"
				src="https://console.dialogflow.com/api-client/demo/embedded/54bb9436-98de-4163-b477-11cb281b28b9"
			></iframe>
		</div>
	);
}

export default Chatbot;
