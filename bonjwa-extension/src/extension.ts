import * as vscode from 'vscode';
import WebSocket from 'ws';

let ws: WebSocket;

// Initialize WebSocket connection
function initializeWebSocket() {
  ws = new WebSocket('ws://localhost:25565'); // WebSocket URL

  ws.onopen = () => {
    console.log('WebSocket connection established.');
    vscode.window.showInformationMessage('WebSocket connected.');
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
    vscode.window.showErrorMessage(`WebSocket error: ${error}`);
  };

  ws.onclose = (event) => {
    console.log(`WebSocket closed: code=${event.code}, reason=${event.reason}`);
    vscode.window.showErrorMessage('WebSocket connection closed. Attempting to reconnect...');
    reconnectWebSocket(); // Attempt to reconnect
  };
}

// Reconnect WebSocket if disconnected
function reconnectWebSocket() {
  if (ws.readyState === WebSocket.CLOSED || ws.readyState === WebSocket.CLOSING) {
    console.log('Reconnecting WebSocket...');
    initializeWebSocket();
  }
}

// Register the "Ask @bonjwa" command
export function activate(context: vscode.ExtensionContext) {
  initializeWebSocket(); // Initialize WebSocket when the extension is activated

  const disposable = vscode.commands.registerCommand('bonjwa.ask', async () => {
    console.log('Command "bonjwa.ask" executed.');
    console.log(`WebSocket readyState: ${ws.readyState}`);
    if (ws.readyState === WebSocket.OPEN) {
      const question = await vscode.window.showInputBox({ prompt: 'Ask @bonjwa' });
      if (question) {
        console.log(`User input: ${question}`);
        ws.send(question); // Send the question to the WebSocket server
        console.log('Question sent:', question);
      } else {
        vscode.window.showErrorMessage('No input provided.');
      }
    } else {
      vscode.window.showErrorMessage(
        `WebSocket is not connected (state: ${ws.readyState}). Please try again later.`
      );
      reconnectWebSocket(); // Attempt to reconnect
    }
  });

  context.subscriptions.push(disposable);
}

// Deactivate the extension
export function deactivate() {
  if (ws) {
    ws.close();
    console.log('WebSocket connection closed.');
  }
}