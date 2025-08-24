import { useState } from "react";
import { ChatSidebar } from "./components/ChatSidebar";
import { ChatHeader } from "./components/ChatHeader";
import { ChatMessages } from "./components/ChatMessages";
import { ChatInput } from "./components/ChatInput";
import { Button } from "./components/ui/button";
import { MessageCircle, Edit } from "lucide-react";

const mockChatData = {
  "1": {
    name: "Анна Иванова",
    isOnline: true,
    avatar: undefined,
  },
  "2": {
    name: "Команда проекта",
    isOnline: false,
    lastSeen: "был в сети 2 часа назад",
    avatar: undefined,
  },
  "3": {
    name: "Михаил Петров",
    isOnline: true,
    avatar: undefined,
  },
  "4": {
    name: "Елена Смирнова",
    isOnline: false,
    lastSeen: "была в сети вчера",
    avatar: undefined,
  },
  "5": {
    name: "Отдел маркетинга",
    isOnline: false,
    lastSeen: "был в сети 3 часа назад",
    avatar: undefined,
  },
};

export default function App() {
  const [selectedChatId, setSelectedChatId] = useState<string>("1");
  const [isTyping, setIsTyping] = useState(false);

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    setIsTyping(false);
  };

  const handleSendMessage = (message: string) => {
    console.log("Отправка сообщения:", message);
    setIsTyping(false);
    // Здесь будет логика отправки сообщения
  };

  const handleTyping = (typing: boolean) => {
    setIsTyping(typing);
  };

  const handleThemeChange = (isDark: boolean) => {
    console.log("Смена темы:", isDark);
  };

  const currentChat = mockChatData[selectedChatId as keyof typeof mockChatData];

  return (
    <div className="h-screen flex animated-gradient">
      {/* Sidebar */}
      <div className="glass-strong rounded-r-3xl overflow-hidden slide-in-left shadow-2xl">
        <ChatSidebar
          selectedChatId={selectedChatId}
          onChatSelect={handleChatSelect}
          onThemeChange={handleThemeChange}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col ml-4 mr-4">
        {currentChat ? (
          <div className="flex flex-col h-full glass-strong rounded-3xl overflow-hidden slide-in-right shadow-2xl">
            <ChatHeader
              chatName={currentChat.name}
              isOnline={currentChat.isOnline}
              lastSeen={currentChat.lastSeen}
              avatar={currentChat.avatar}
            />
            <ChatMessages 
              isTyping={isTyping} 
              typingUser={currentChat.name}
            />
            <ChatInput 
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center fade-in">
            <div className="text-center glass-strong p-12 rounded-3xl bounce-in shadow-2xl">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-blue/50" />
              <h2 className="gradient-text mb-4">Выберите чат</h2>
              <p className="text-foreground/80 mb-6">Выберите чат из списка, чтобы начать общение</p>
              <Button className="bg-gradient-to-r from-red to-burgundy hover:shadow-xl hover-scale ripple text-cream">
                <Edit className="w-4 h-4 mr-2" />
                Новый чат
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}