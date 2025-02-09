const WebSocket = require("ws");
require("dotenv").config();

const wss = new WebSocket.Server({ port: process.env.WS_PORT || 8080 });

// Track users by userId
const clientsMap = new Map();

wss.on("connection", (socket, req) => {
  const userId = new URL(req.url, `ws://localhost:${process.env.WS_PORT || 8080}`).searchParams.get("userId");

  if (!userId) {
    socket.close();
    return;
  }

  clientsMap.set(userId, socket);
  console.log(`User ${userId} connected via WebSocket`);

  socket.on("message", (data) => {
    try {
      const { chatId, senderId, recipientId, message } = JSON.parse(data);
      
      // Send message only to the recipient
      if (clientsMap.has(recipientId)) {
        clientsMap.get(recipientId).send(JSON.stringify({ chatId, senderId, message }));
      }

    } catch (error) {
      console.error("Error handling message:", error);
    }
  });

  socket.on("close", () => {
    clientsMap.delete(userId);
    console.log(`User ${userId} disconnected`);
  });
});

console.log(`WebSocket server running on port ${process.env.WS_PORT || 8080}`);
