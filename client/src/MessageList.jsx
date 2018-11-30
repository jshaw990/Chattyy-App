{/* Required Extensions */}
import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

    render(){
        {/* Display All Submitted Messages */}
            return (
                <main className="messages"> 
                    {this.props.messages.map(function(message) {
                        return <Message message={message} key={message.id}/>
                    })}
                    {/* Notification System */}
                    <div className="message system">{this.props.notification}</div>
                </main>
        );
    }
}

export default MessageList; 