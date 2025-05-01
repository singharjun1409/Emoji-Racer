import { io } from '/socket.io/socket.io.esm.min.js';
const socket = io();

const player1btn = document.getElementById('player1btn');
const player2btn = document.getElementById("player2btn");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
let pos1 = 0;
let pos2 = 0;
const finishLine = 380;

function movePlayer(player)
{
    if (player === 1)
    {
        pos1 += 30;
        player1.style.left = `${pos1}px`;
        socket.emit("player moved" , {player:1 , position: pos1});
        if (pos1 >= finishLine)
        {
            socket.emit("game over" , {winner: 1});
        }
    }
    else
    {
        pos2 += 30;
        player2.style.left = `${pos2}px`;
        socket.emit("player moved" , {player:2 , position: pos2});
        if (pos2 >= finishLine)
            {
                socket.emit("game over" , {winner: 2});
            }
    }
}
player1btn.addEventListener("click" , ()=>movePlayer(1));
player2btn.addEventListener("click" , ()=>movePlayer(2));


socket.on("update player position" , ({player , position}) =>
    {
        if (player === 1)
            {
                pos1 = position;
                player1.style.left = `${pos1}px`;
            }
        
            else
            {
                pos2 = position;
                player2.style.left = `${pos2}px`;
            }
    });
socket.on("game over" , ({winner}) =>
    {
        alert(`Player ${winner} wins!`);
        player1btn.disabled = true;
        player2btn.disabled = true;
    });
