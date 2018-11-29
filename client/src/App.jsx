import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        currentUser: 'Anonymous',
        messages: [],
        notification: "",
        numberOfOnlineUsers: 0
      };
    this.ws = new WebSocket('ws://0.0.0.0:3001');
  }

  handleSendMessage = (newMessage) => {
    if (newMessage.username !== this.state.currentUser) {
      const newNotification = {
        type: "postNotification",
        content: `${this.state.currentUser.name} changed their name to ${newMessage.username}`
      };
      this.ws.send(JSON.stringify(newNotification));
      this.setState({currentUser: {name: newMessage.username}});
    }
    newMessage.type = "postMessage";
    this.ws.send(JSON.stringify(newMessage));
  };

  componentDidMount() {
    this.ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      switch (newMessage.type) {
        case "incomingMessage":
          this.state.messages.push(newMessage);
          this.setState({messages: this.state.messages});
          break;
        case "incomingNotification": 
          this.setState({notification: newMessage.content});
          break;
        case "numberOfOnlineUsers":
          this.setState({numberOfOnlineUsers: newMessage.content});
          break; 
        default: 
          throw new Error("Unknown type: " + newMessage.type);
      }
    }
  }

  render() {
    return (
      <div>
        <span className="numberOfUsers">{this.state.numberOfOnlineUsers} User(s) Connected</span>
        <MessageList 
          messages={this.state.messages}
          notification={this.state.notifiation}/>
        <ChatBar
          handleSendMessage={this.handleSendMessage}
          currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;