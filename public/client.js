const socket = io();

const input = document.getElementById("msg");
const messages = document.getElementById("messages");
const btn = document.getElementById("send");
const typingDiv = document.getElementById("typing");

const username = prompt("Enter your name:") || "Anonymous";

btn.onclick = () => {
  const text = input.value.trim();
  if (text) {
    socket.emit("chatMessage", `${username}: ${text}`);
    input.value = "";
    socket.emit("stopTyping", username);
  }
},

socket.on("chatMessage", (msg) => {
  const li = document.createElement("li");
  li.textContent = msg;
  messages.appendChild(li);
});


let typingTimeout;
input.addEventListener("input", () => {
  if (input.value) {
    socket.emit("typing", username);
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit("stopTyping", username);
    }, 1000);
  } else {
    socket.emit("stopTyping", username);
  }
});

socket.on("typing", (user) => {
  typingDiv.textContent = `${user} is typing...`;
});

socket.on("stopTyping", () => {
  typingDiv.textContent = "";
});
