"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  MessageSquare,
  Shield,
  Star,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface SidebarProps {
  isOpen: boolean;
  onNewChat: () => void;
  onSelectChat: (chatId: string, messages: Message[]) => void;
}

interface ChatItem {
  _id: string;
  inputText: string;
  aiText: string;
}

export default function Sidebar({
  isOpen,
  onNewChat,
  onSelectChat,
}: SidebarProps) {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    picture?: string;
  } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const fetchChats = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generates`
      );
      if (!res.ok) throw new Error("Failed to fetch chats");
      const data = await res.json();
      setChats(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    else router.push("/auth/login");
  }, [router]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDeleteChat = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This chat will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4A6B48",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generates/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!res.ok) throw new Error("Failed to delete chat");

        setChats((prev) => prev.filter((chat) => chat._id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "Your chat has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete chat.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed md:relative z-30 w-64 bg-[#171719] h-full transition-transform duration-300 flex flex-col`}
    >
      {/* Header: New Chat */}
      <div className="p-4 border-b border-gray-800">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#0d0e10] hover:bg-[#1a1a1c] transition-colors"
        >
          <Plus size={18} />
          <span className="text-sm font-medium text-gray-200">New Chat</span>
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {chats.length === 0 ? (
          <div className="text-gray-500 text-sm text-center mt-4">
            No chats yet
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat._id}
              className="flex items-center justify-between gap-2 transform transition-transform hover:scale-[1.02]"
            >
              <button
                className="flex items-center gap-3 flex-1 text-left px-3 py-2 rounded-lg hover:bg-[#1a1a1c] transition-colors"
                onClick={() =>
                  onSelectChat(chat._id, [
                    { role: "user", content: chat.inputText },
                    { role: "assistant", content: chat.aiText },
                  ])
                }
              >
                <MessageSquare size={16} className="text-gray-400" />
                <span className="truncate text-gray-200 text-sm">
                  {chat.inputText.length > 28
                    ? chat.inputText.slice(0, 28) + "..."
                    : chat.inputText}
                </span>
              </button>
              <button
                onClick={() => handleDeleteChat(chat._id)}
                className="p-2 hover:bg-black rounded-md transition"
              >
                <Trash2 size={16} className="text-white hover:text-black" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer: User Menu */}
      <div className="relative border-t border-gray-800 p-4 mt-auto">
        <div
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-[#1a1a1c] rounded-lg transition"
        >
          {user?.picture ? (
            <Image
              src={user.picture}
              alt={user.name}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center">
              <Shield size={18} />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate text-gray-200">
              {user?.name || "Loading..."}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {user?.email || ""}
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="absolute bottom-16 left-4 w-56 bg-[#1e1e21] border border-gray-700 rounded-lg shadow-lg py-2 animate-fadeIn">
            <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700 truncate">
              {user?.email}
            </div>
            <button className="flex w-full items-center gap-3 px-4 py-2 hover:bg-[#2a2a2d] text-sm text-gray-300">
              <Star size={16} /> Upgrade plan
            </button>
            <button className="flex w-full items-center gap-3 px-4 py-2 hover:bg-[#2a2a2d] text-sm text-gray-300">
              <User size={16} /> Personalization
            </button>
            <button className="flex w-full items-center gap-3 px-4 py-2 hover:bg-[#2a2a2d] text-sm text-gray-300">
              <Settings size={16} /> Settings
            </button>
            <button className="flex w-full items-center gap-3 px-4 py-2 hover:bg-[#2a2a2d] text-sm text-gray-300">
              <HelpCircle size={16} /> Help
            </button>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-2 hover:bg-[#2a2a2d] text-sm text-red-400"
            >
              <LogOut size={16} /> Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
