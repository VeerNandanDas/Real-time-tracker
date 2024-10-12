const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Handle socket connections
io.on("connection", function(socket) {
    console.log("User connected:", socket.id); // Log user connection

    socket.on("send-location", function(data) {
        // Emit the received location to all clients
        io.emit("receive-location", { id: socket.id, ...data }); // Correct usage
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Serve the main page
app.get('/', function(req, res) {
    res.render("index.ejs");
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
