{/* Required Extensions */}
import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        currentUser: {name: "Anonymous" },
        messages: [],
        notification: "",
        numberOfOnlineUsers: 0
      };
    this.ws = new WebSocket('ws://0.0.0.0:3001');
  }

  handleSendMessage = (newMessage) => {
    {/* Send Message from ChatBar.jsx to App.jsx */}
    if (newMessage.username !== this.state.currentUser.name) {
      const newNotification = {
        type: "postNotification",
        content: `${this.state.currentUser.name} changed their name to ${newMessage.username}`
      };
      this.ws.send(JSON.stringify(newNotification));
    }
    this.setState({currentUser: {name: newMessage.username}});
    newMessage.type = "postMessage";
    this.ws.send(JSON.stringify(newMessage));
  };

  componentDidMount() {
    {/* Notifications, Online Users, and Messages upon Component load */}
    this.ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      switch (newMessage.type) {
        case "incomingMessage":
          const messages = this.state.messages.concat(newMessage);
          this.setState({messages});
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
      {/* Render Nav, Messages, Notifications, and the Chat Bar */}
    return (
      <div>
        <nav className="navbar">      
        <a href="/" className="navbar-brand">Chatty</a>
          <span className="numberOfUsers">{this.state.numberOfOnlineUsers} User(s) Connected</span>
        </nav>
        <MessageList 
          messages={this.state.messages}
          notification={this.state.notification}/>
        <ChatBar
          handleSendMessage={this.handleSendMessage}
          currentUser={this.state.currentUser.name} />
      </div>
    );
  }
}
export default App;