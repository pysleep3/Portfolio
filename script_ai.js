
const chatDiv = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");
const clearBtn = document.getElementById("clear");

const API_URL = "api/chat"; // Calls backend function on Vercel

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });
clearBtn.addEventListener("click", () => { chatDiv.innerHTML = ""; });

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";

  showTyping(); // 👈 show waiting animation

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        system: "Reply short, simple, and clean"
      }),
    });

    const data = await res.json();
    removeTyping();
    appendMessage("bot", data.reply);

  } catch (err) {
    removeTyping();
    appendMessage("bot", "⚠️ Error connecting to AI.");
    console.error(err);
  }
}


function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.innerHTML  = text;
  chatDiv.appendChild(div);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

function showTyping() {
  const div = document.createElement("div");
  div.className = "message bot";
  div.id = "typing";
  div.innerHTML = `
    <div class="typing">
      <span></span><span></span><span></span>
    </div>
  `;
  chatDiv.appendChild(div);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}
