"use client";

import { useState } from "react";
import Sidebar from "@/components/milgpt/Sidebar";
import ChatHeader from "@/components/milgpt/ChatHeader";
import ChatMessages from "@/components/milgpt/ChatMessages";
import ChatInput from "@/components/milgpt/ChatInput";
import { Message } from "@/types/index";

// POST helper
async function sendMessage(content: string, chatId?: string) {
  const res = await fetch("http://localhost:5000/api/generates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: content, chatId }),
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData?.error || "Failed to fetch response");
  }

  const data = await res.json();

  return {
    chatId: data.id || chatId,
    messages: [
      { role: "user" as const, content },
      { role: "assistant" as const, content: data.output || "No response" },
    ],
  };
}

export default function MILGPTPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to MILGPT. I'm here to assist with military intelligence. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || loading) return;
    setLoading(true);

    try {
      const data = await sendMessage(content, chatId || undefined);
      if (!chatId && data.chatId) setChatId(data.chatId);

      setMessages((prev) => [...prev, data.messages[0], data.messages[1]]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setChatId(null);
    setMessages([
      {
        role: "assistant",
        content:
          "Welcome to MILGPT. I'm here to assist with military intelligence. How can I help you today?",
      },
    ]);
  };

  const handleSelectChat = (
    selectedChatId: string,
    selectedMessages: Message[]
  ) => {
    setChatId(selectedChatId);
    setMessages(selectedMessages);
  };

  return (
    <div className="flex h-screen bg-[#0d0e10] text-white overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
      />

      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
        <ChatHeader
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <ChatMessages messages={messages} loading={loading} />
        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
