import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server)

import url from 'url'
import path from 'path'
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
app.use(express.static(path.join(__dirname, 'public')))


const onConnect = (socket) => 
{
	console.log(socket.id , "connected");

    socket.on("player moved", (data) => {
        console.log(`Player ${data.player} moved to ${data.position}`);
        socket.broadcast.emit("update player position", data);
    });

    socket.on("game over", ({winner}) => {
        console.log(`Player ${winner} wins!`);
        io.emit("game over", {winner}); 
    });

    socket.on("disconnect", () => {
        console.log(socket.id, "disconnected");
    });
}

io.on('connection' , onConnect);


server.listen(process.env.PORT ?? 3000)