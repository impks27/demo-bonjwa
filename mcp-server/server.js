const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 25565 });

console.log('WebSocket server is running on ws://localhost:25565');

// Handle connection events
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Handle messages from the client
  ws.on('message', (message) => {
    const msg = String(message); // Ensure the message is treated as a string
    console.log(`Received message: ${msg}`);

    // Check if the message starts with "@bonjwa"
    if (msg.includes('@bonjwa')) {
      const question = msg.slice(8).trim(); // Extract the question after "@bonjwa"
      if (question) {
        const response = `You asked "${question}". Here's your answer!`;
        ws.send(response);
      } else {
        ws.send('Please provide a valid question after "@bonjwa".');
      }
    } else {
      ws.send('Unrecognized command. Use "@bonjwa <question>".');
    }
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error(`WebSocket error: ${error.message}`);
  });

  // Handle client disconnection
  ws.on('close', (code, reason) => {
    console.log(`Client disconnected (code: ${code}, reason: "${reason}")`);
  });
});