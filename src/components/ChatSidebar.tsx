import { Search, MoreVertical, Plus, MessageCircle, Settings, User } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { SettingsModal } from "./SettingsModal";
import { Separator } from "./ui/separator";
import { useState } from "react";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  avatar?: string;
  isOnline?: boolean;
  isTyping?: boolean;
}

const mockChats: Chat[] = [
  {
    id: "1",
    name: "Анна Иванова",
    lastMessage: "Привет! Как дела?",
    time: "14:32",
    unreadCount: 2,
    isOnline: true,
    isTyping: true,
  },
  {
    id: "2",
    name: "Команда проекта",
    lastMessage: "Встреча перенесена на 15:00",
    time: "13:45",
    unreadCount: 5,
  },
  {
    id: "3",
    name: "Михаил Петров",
    lastMessage: "Отправил файл",
    time: "12:20",
    isOnline: true,
  },
  {
    id: "4",
    name: "Елена Смирнова",
    lastMessage: "Спасибо за помощь!",
    time: "11:15",
  },
  {
    id: "5",
    name: "Отдел маркетинга",
    lastMessage: "Новая кампания готова",
    time: "10:30",
    unreadCount: 1,
  },
];

interface ChatSidebarProps {
  selectedChatId?: string;
  onChatSelect: (chatId: string) => void;
  onThemeChange?: (isDark: boolean) => void;
}

export function ChatSidebar({ selectedChatId, onChatSelect, onThemeChange }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-primary hover-scale" />
            <h1 className="gradient-text text-xl">Чаты</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover-glow rounded-xl ripple hover-scale text-blue">
              <Plus className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover-glow rounded-xl ripple text-blue">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Поиск чатов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 glass rounded-xl border-0 backdrop-blur-md transition-all duration-300 focus:shadow-lg"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {filteredChats.map((chat, index) => (
          <div
            key={chat.id}
            className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 mb-2 hover-glow hover-scale ripple chat-item-${index} ${
              selectedChatId === chat.id 
                ? "glass-strong shadow-lg" 
                : "hover:bg-cream/10"
            }`}
            onClick={() => onChatSelect(chat.id)}
          >
            <div className="relative">
              <Avatar className="w-14 h-14 ring-2 ring-cream/20">
                <AvatarImage src={chat.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-red to-burgundy text-cream">
                  {chat.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {chat.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue border-3 border-white rounded-full shadow-lg online-pulse"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-card-foreground truncate">{chat.name}</h3>
                <span className="text-xs text-muted-foreground bg-cream/10 px-2 py-1 rounded-full">
                  {chat.time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                {chat.isTyping ? (
                  <div className="flex items-center gap-2 text-sm text-red">
                    <span>печатает</span>
                    <div className="typing-dots">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground truncate max-w-[160px]">
                    {chat.lastMessage}
                  </p>
                )}
                {chat.unreadCount && (
                  <Badge 
                    variant="destructive" 
                    className="text-xs px-3 py-1 min-w-[24px] h-6 bg-gradient-to-r from-red to-burgundy shadow-lg notification-bounce"
                  >
                    {chat.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {filteredChats.length === 0 && searchQuery && (
          <div className="text-center py-8 text-muted-foreground fade-in">
            <p>Чатов не найдено</p>
          </div>
        )}
      </div>

      {/* User Profile & Settings Section */}
      <div className="p-4 border-t border-border/20">
        <Separator className="mb-4 bg-border/50" />
        
        {/* User Profile */}
        <div className="flex items-center gap-3 p-3 rounded-2xl glass hover-glow transition-all duration-300 mb-3">
          <Avatar className="w-12 h-12 ring-2 ring-red/30">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-to-br from-red to-burgundy text-cream">
              ИП
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-semibold text-card-foreground">Иван Петров</h4>
            <p className="text-sm text-muted-foreground">В сети</p>
          </div>
          <div className="w-3 h-3 bg-blue rounded-full animate-pulse"></div>
        </div>

        {/* Settings Button */}
        <SettingsModal onThemeChange={onThemeChange}>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 h-12 hover-glow rounded-xl bg-accent/50 hover:bg-accent/70 text-accent-foreground transition-all duration-300 ripple"
          >
            <Settings className="w-5 h-5" />
            <span>Настройки</span>
          </Button>
        </SettingsModal>
      </div>
    </div>
  );
}