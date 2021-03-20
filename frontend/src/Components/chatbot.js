import React from "react";

function Chatbot() {
	return (
		<div style={{ position: "absolute", right: 60, bottom: 50 }}>
			<df-messenger
				chat-icon="https:&#x2F;&#x2F;storage.googleapis.com&#x2F;cloudprod-apiai&#x2F;b6519033-1fd5-47d5-b46a-fb5f39511b0b_x.png"
				intent="WELCOME"
				chat-title="TutorBot"
				agent-id="54bb9436-98de-4163-b477-11cb281b28b9"
				language-code="en"
			></df-messenger>
		</div>
	);
}

export default Chatbot;
