# demo-bonjwa

## Launch MCP Server

```bash
paramita.santra@Paramitas-MacBook-Pro mcp-server % node server.js
'WebSocket server is running on ws://localhost:25565
Client connected
Received message: hello
```

## Test MCP Server
```bash
paramita.santra@Paramitas-MacBook-Pro demo-kaniko % npx wscat -c ws://localhost:25565
Connected (press CTRL+C to quit)
> Ask @bonjwa abcd
< You asked "abcd". Here's your answer!
```
