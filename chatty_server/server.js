const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');
var randomColor = require('random-color');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Currently connected clients
let clients = {}
user = 0;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  const clientId = uuid()
  user += 1;
  // Assign a color per user, it won't change when user changes name

  console.log('Client connected', ws);

  clients[clientId] = {
    id: clientId,
    users: user,
    color: randomColor().hexString(),
  }


  function updateClientCount() {
    let clientCount = {
      id: uuid(),
      clients: user,
      color: randomColor().hexString(),
      type: "IncomingClientsConnected"
    };
    return JSON.stringify(clientCount);
  }
    wss.broadcast(updateClientCount())


  //console.log(clientsCount)

ws.on('message', function incoming(data) {
  data = JSON.parse(data);
    // The socket event data is encoded as a JSON string.
    // This line turns it into an object

    switch(data.type) {
      case "PostMessage":
        console.log("user " + data.username + " said " + data.content);
        data.type = "IncomingMessage"
        data.dataId = uuid()
        wss.broadcast(JSON.stringify(data));
        break;
      case "PostNotification":
        console.log(data.content);
        data.type = "IncomingNotification"
        wss.broadcast(JSON.stringify(data));
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
   ws.id -= 1;
    wss.broadcast(updateClientCount())
  });
});

wss.broadcast = function(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === client.OPEN) {
      client.send(data)
    }
  })
}

