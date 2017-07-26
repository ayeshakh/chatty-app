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

  // handleKeyPress = (event) => {
  //     console.log("handleKeyPress")
  //     console.log(event.key)
  //     if(event.key === "Enter") {
  //       const newMessage = {
  //         username: this.state.currentUser.name,
  //         content: event.target.value
  //       };
  //       sendText(newMessage);
  //     }
  //     const messages = this.state.messages.concat(newMessage)
  //     this.setState({messages: messages})
  //   }
  // }

  sendMessage = (message) => {
    // update local state with new message
    this.setState((prevState) => {
      return { messages: prevState.messages.concat(message) }
    })
    // send the message to our server
    this.sendText(message);
  }

  // in App.jsx
  componentDidMount() {
    console.log("componentDidMount <App />");

    let socket = new WebSocket("ws://localhost:3001")

    socket.onopen = function (event) {
      ///Socket.send("Connected to server");
      console.log("Connected to server");
    };

    setTimeout(() => {
      console.log("Simulating incoming message");

      const newMessage = {id: 3, username: "Michelle", content: "Hello There"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
        //this.setState()  // change the state. this calls render() and the component updates. so only use when state changes
      }, 3000)

    this.socket = socket;
  }

  sendText(message) {
  // Construct a msg object containing the data the server needs to process the message from the chat client.
    var msg = {
      type: "sendMessage",
      username: message.username,
      content: message.content
    };

    // Send the msg object as a JSON-formatted string.
    this.socket.send(JSON.stringify(msg));
  }

  render() {
    console.log("Rendering <App/>")
    return (
      <div>
        <nav className="navbar">
          <a className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default App;
