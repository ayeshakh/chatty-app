import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((message, i) => { //i is index as which we can set as  the unique key
      return <Message key={i} username={message.username} content={message.content}/>
    })
    return (
      <div className="messages">
        {messages}
      </div>
    );
  }
}
export default MessageList;