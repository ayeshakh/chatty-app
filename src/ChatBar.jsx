import React, {Component} from 'react';

class ChatBar extends Component {


  constructor(props) {
    super(props);

    this.state = {
      username: props.currentUser.name,
      message: ''
    }
  }

  handleMessageKeyPress = (event) => {
    if(event.key === "Enter") {
      const newMessage = {
        username: this.state.username,
        content: event.target.value
      };
      // send message to parent component to send to server
      this.props.sendMessage(newMessage);
      // reset text box to empty string
      this.setState({message: ''});
    } else {
      // update state with current text box content
      this.setState({message: event.target.value});
    }
  }

        //onChange={this.handleChange}
//onKeyPress={this.handleKeyPress}
  render() {
    console.log("Rendering <App/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" value={this.state.username} }/>
        <input className="chatbar-message" type="text" value={this.state.message} onKeyPress={this.handleMessageKeyPress} />
      </footer>
    );
  }
}
export default ChatBar;
