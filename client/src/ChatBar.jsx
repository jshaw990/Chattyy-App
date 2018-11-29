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
        const usernameOld = this.state.username
        this.setState({username: event.target.value})
    };

    handleOnContent(event) {
        this.setState({content: event.target.value})
    };

    handleOnEnter(event) {
        if (event.key === "Enter") {
            this.props.handleSendMessage(this.state);
            this.setState({content:''});
        }
    };

    render() {
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