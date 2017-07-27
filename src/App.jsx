import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [], // messages coming from the server will be stored here as they arrive
      numbers: 0
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
    console.log(event);
    let messages
    // The socket event data is encoded as a JSON string.
    // This line turns it into an object
      const data = JSON.parse(event.data);
      switch(data.type) {
        case "IncomingMessage":
          const newMessage = {type: "IncomingMessage", id: data.dataId, username: data.username, content: data.content};
          messages = this.state.messages.concat(newMessage)
          this.setState({messages:messages})
          console.log(messages);
          break;
        case "IncomingNotification":
          const newNotification = {type: "IncomingMessage", content: data.content};
          messages = this.state.messages.concat(newNotification)
          this.setState({messages:messages})
          console.log(messages);
          break;
        case "IncomingClientsConnected":
          const number = {type:"IncomingClientsConnected", clients:data.clients }
          this.setState({numbers: number.clients})
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
        }
      }
}

  sendText(message) {
  // Construct a msg object containing the data the server needs to process the message from the chat client.
    let msg = {
      type: "PostMessage",
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
      type: "PostNotification",
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
          <h4>{this.state.numbers} users online</h4>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} sendMessage={this.sendMessage} sendUser= {this.sendUser}/>
      </div>
    );
  }
}

export default App;
