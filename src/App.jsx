import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  render() {
    console.log("Rendering <App/>");
    return (
    <div> //there should always be a parent element if you are adding more than 1 element i.e div
      <nav className="navbar"> //use className instead of name
       <a className="navbar-brand">Chatty</a>
      </nav>
      <MessageList />
      <ChatBar />
    </div>
    );
  }
}
export default App;
