import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.currentUser,
      content: ''
    }
  }

  handleUserKeyPress = (event) => {
    console.log("handleUserKeyPress")
    if(event.key === "Enter") {
      const user = {username:this.state.username}
      this.props.sendUser(user);
      // send message to parent component to send to server
      }
    }

  handleInputChange = (event) => {
    this.setState({username: event.target.value});
    //console.log(username)
  }


  handleMessageKeyPress = (event) => {
    console.log("handleKeyPress")
    if(event.key === "Enter") {
      const newMessage = {
        username: this.state.username,
        content: this.state.content
      };
      // send message to parent component to send to server
      this.props.sendMessage(newMessage);
      // reset text box to empty string
      this.setState({content: ''});
      //this.refs.chatbarMessage.value = ''
    }
  }
  // update state with current text box content
  handleOnChange = (event) => {
    this.setState({content: event.target.value});
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onChange={this.handleInputChange} onKeyPress={this.handleUserKeyPress} value={this.state.username}/>
        <input className="chatbar-message" type="text" onChange={this.handleOnChange} onKeyPress={this.handleMessageKeyPress} value={this.state.content} />
      </footer>
    );
  }
}
export default ChatBar;

//so we need the onchange to make the value equal to the value you are typing before enter and after enter the value becomes
//equal to the empty state.
//if we dont have onchange the value and the keypress conflict and the value stays empty as it is not sure of what to do.
// on change and value fire together before keypress.
//if we dont have value inside the input the text field doesnt clear because it cant reach the empty state.
