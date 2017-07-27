import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [] // messages coming from the server will be stored here as they arrive
      }
  }

  sendMessage = (message) => {
    this.sendText(message);
  }

  sendUser = (user) => {
    this.sendNotification(user);
  }

  // in App.jsx
  componentDidMount() {
    console.log("componentDidMount <App />");

    let socket = new WebSocket("ws://localhost:3001")

    socket.onopen = function (event) {
      ///Socket.send("Connected to server");
      console.log("Connected to server");
    };
    this.socket = socket;

    socket.onmessage = (event) => {
      let msg = JSON.parse(event.data);
      console.log(msg);
  // code to handle incoming message
      const newMessage = {id: msg.dataId, username: msg.username, content: msg.content};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages:messages})
      console.log(messages)
    }
  }

  sendText(message) {
  // Construct a msg object containing the data the server needs to process the message from the chat client.
    let msg = {
      type: "postMessage",
      username: message.username,
      content: message.content
    };
    // Send the msg object as a JSON-formatted string.
    this.socket.send(JSON.stringify(msg));
  }

  sendNotification(user) {

  // Construct a msg object containing the data the server needs to process the message from the chat client.
    if (user.username != this.state.currentUser.name) {
    let notification = {
      type: "postNotification",
      content: this.state.currentUser.name + " changed their name to " + user.username
      }
    this.socket.send(JSON.stringify(notification));
    this.setState({currentUser:{name: user.username}});
    };
  }

  render() {
    console.log("Rendering <App/>")
    return (
      <div>
        <nav className="navbar">
          <a className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} sendMessage={this.sendMessage} sendUser= {this.sendUser}/>
      </div>
    );
  }
}

export default App;
