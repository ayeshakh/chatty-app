import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log("Rendering <App/>");
    return (
  <footer className="chatbar"> //use className instead of name
  <input className="chatbar-username" placeholder="Your Name (Optional)" />
  <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
</footer>
    );
  }
}
export default ChatBar;
