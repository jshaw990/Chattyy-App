{/* Required Extensions */}
import React, {Component} from 'react';
import App from './App.jsx';

class ChatBar extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            username: this.props.currentUser,
            content: ''
        };
    }

    handleOnUsername(event) {
        {/* Change of Username */}
        const usernameOld = this.state.username
        this.setState({username: event.target.value})
    };

    handleOnContent(event) {
        {/* Message Content  */}
        this.setState({content: event.target.value})
    };

    handleOnEnter(event) {
        {/* Send Content when Enter is pressed */}
        if (event.key === "Enter") {
            this.props.handleSendMessage(this.state);
            this.setState({content:''});
        }
    };

    render() {
        {/* ChatBar Elements */}
        return (
            <footer className="chatbar">
                <input 
                    className="chatbar-username" 
                    placeholder={this.props.username} 
                    value={this.state.username} 
                    onChange={this.handleOnUsername.bind(this)}
                />
                <input 
                    className="chatbar-message" 
                    placeholder="Press Enter to send your message"
                    value={this.state.content}
                    onChange={this.handleOnContent.bind(this)}
                    onKeyDown={this.handleOnEnter.bind(this)}
                />
            </footer>
    )}
}

export default ChatBar;