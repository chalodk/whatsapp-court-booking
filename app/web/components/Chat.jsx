"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

function messageText(message) {
  if (!message.parts) return "";
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function Chat() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const [text, setText] = useState("");
  const busy = status === "submitted" || status === "streaming";

  async function onSubmit(event) {
    event.preventDefault();
    const value = text.trim();
    if (!value || busy) return;
    setText("");
    await sendMessage({ text: value });
  }

  return (
    <div className="chat">
      <p className="note">
        Este chat es el agente. Escribe cómo está el club esta semana y él arma canchas, mensajes y envíos.
      </p>
      <div className="thread">
        {messages.length === 0 && (
          <p className="hint">Por ejemplo: “Tenemos dos canchas de pádel, de 8 a 23, y quiero llenar las horas libres.”</p>
        )}
        {messages.map((message) => (
          <div key={message.id} className={`bubble ${message.role === "user" ? "mine" : "agent"}`}>
            {messageText(message)}
          </div>
        ))}
      </div>
      {error && <p className="error">{error.message}</p>}
      <form className="composer" onSubmit={onSubmit}>
        <textarea
          value={text}
          placeholder="Escribe al agente"
          rows={3}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
        />
        <button type="submit" disabled={busy || text.trim() === ""}>
          {busy ? "Pensando" : "Enviar"}
        </button>
      </form>
    </div>
  );
}
