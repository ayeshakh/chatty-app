import React, {Component} from 'react';

class ChatBar extends Component {

        //onChange={this.handleChange}
//onKeyPress={this.handleKeyPress}
  render() {
    console.log("Rendering <App/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser}/>
        <input className="chatbar-message" type="" onKeyPress={this.props.handleKeyPress} />
      </footer>
    );
  }
}
export default ChatBar;
