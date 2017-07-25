import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
         username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
        ]
      }
  }

  componentDidMount() {
    setTimeout(() => {
      //this.setState()  // change the state. this calls render() and the component updates. so only use when state changes
    }, 3000)
  }

  render() {
    console.log("Rendering <App/>")
    return (
      <div>
        <nav className="navbar">
          <a className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} />
      </div>
    );
  }
}

export default App;
