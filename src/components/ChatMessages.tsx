import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatTime } from "./utils/formatTime";
import { CheckCheck, Check, Image, FileText, Mic, Download } from "lucide-react";
import { TypingIndicator } from "./TypingIndicator";
import { Button } from "./ui/button";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  isOwn: boolean;
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'file' | 'voice';
  fileUrl?: string;
  fileName?: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    text: "Привет! Как дела?",
    timestamp: new Date(Date.now() - 60000 * 30),
    senderId: "2",
    senderName: "Анна Иванова",
    isOwn: false,
    status: 'read',
  },
  {
    id: "2",
    text: "Привет! Всё отлично, работаю над новым проектом",
    timestamp: new Date(Date.now() - 60000 * 25),
    senderId: "1",
    senderName: "Я",
    isOwn: true,
    status: 'read',
  },
  {
    id: "3",
    text: "📷 screenshot.png",
    timestamp: new Date(Date.now() - 60000 * 22),
    senderId: "2",
    senderName: "Анна Иванова",
    isOwn: false,
    type: 'image',
    fileName: "screenshot.png",
    status: 'delivered',
  },
  {
    id: "4",
    text: "Звучит интересно! Можешь рассказать подробнее?",
    timestamp: new Date(Date.now() - 60000 * 20),
    senderId: "2",
    senderName: "Анна Иванова",
    isOwn: false,
    status: 'read',
  },
  {
    id: "5",
    text: "Конечно! Это веб-приложение для команной работы. Включает чат, задачи и файлообменник",
    timestamp: new Date(Date.now() - 60000 * 15),
    senderId: "1",
    senderName: "Я",
    isOwn: true,
    status: 'read',
  },
  {
    id: "6",
    text: "📎 presentation.pdf",
    timestamp: new Date(Date.now() - 60000 * 12),
    senderId: "1",
    senderName: "Я",
    isOwn: true,
    type: 'file',
    fileName: "presentation.pdf",
    status: 'delivered',
  },
  {
    id: "7",
    text: "🎤 Голосовое сообщение",
    timestamp: new Date(Date.now() - 60000 * 8),
    senderId: "2",
    senderName: "Анна Иванова",
    isOwn: false,
    type: 'voice',
    status: 'read',
  },
  {
    id: "8",
    text: "Wow! Звучит как что-то действительно полезное",
    timestamp: new Date(Date.now() - 60000 * 5),
    senderId: "2",
    senderName: "Анна Иванова",
    isOwn: false,
    status: 'read',
  },
  {
    id: "9",
    text: "Да, надеюсь так и будет! Покажу когда будет готово 🚀",
    timestamp: new Date(Date.now() - 60000 * 2),
    senderId: "1",
    senderName: "Я",
    isOwn: true,
    status: 'sent',
  },
];

interface ChatMessagesProps {
  isTyping?: boolean;
  typingUser?: string;
}

export function ChatMessages({ isTyping = true, typingUser = "Анна Иванова" }: ChatMessagesProps) {
  const renderMessageContent = (message: Message) => {
    if (message.type === 'image') {
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-3 bg-black/10 rounded-lg">
            <Image className="w-5 h-5 text-blue" />
            <span className="text-sm">{message.fileName}</span>
            <Button size="icon" variant="ghost" className="w-6 h-6 ml-auto hover-scale">
              <Download className="w-3 h-3" />
            </Button>
          </div>
        </div>
      );
    }

    if (message.type === 'file') {
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-3 bg-black/10 rounded-lg">
            <FileText className="w-5 h-5 text-red" />
            <span className="text-sm">{message.fileName}</span>
            <Button size="icon" variant="ghost" className="w-6 h-6 ml-auto hover-scale">
              <Download className="w-3 h-3" />
            </Button>
          </div>
        </div>
      );
    }

    if (message.type === 'voice') {
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-black/10 rounded-lg">
            <Button size="icon" variant="ghost" className="w-8 h-8 hover-scale">
              <Mic className="w-4 h-4 text-blue" />
            </Button>
            <div className="flex-1 h-1 bg-white/20 rounded-full">
              <div className="w-1/3 h-full bg-blue rounded-full"></div>
            </div>
            <span className="text-xs text-white/60">0:15</span>
          </div>
        </div>
      );
    }

    return <p className="text-sm leading-relaxed">{message.text}</p>;
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {mockMessages.map((message, index) => (
        <div
          key={message.id}
          className={`flex items-end gap-3 chat-bubble ${
            message.isOwn ? "flex-row-reverse" : "flex-row"
          }`}
          style={{
            animationDelay: `${index * 0.05}s`
          }}
        >
          {!message.isOwn && (
            <Avatar className="w-10 h-10 ring-2 ring-cream/20 hover-scale">
              <AvatarImage src={message.senderAvatar} />
              <AvatarFallback className="bg-gradient-to-br from-red to-burgundy text-cream text-xs">
                {message.senderName.split(" ").map(n => n[0]).join("").toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
          
          <div
            className={`max-w-xs lg:max-w-md px-6 py-4 rounded-3xl shadow-lg backdrop-blur-md transition-all duration-300 hover-scale ${
              message.isOwn
                ? "bg-gradient-to-r from-red to-burgundy text-cream rounded-br-lg"
                : "glass-strong text-card-foreground rounded-bl-lg"
            }`}
          >
            {renderMessageContent(message)}
            <div
              className={`flex items-center justify-end gap-2 mt-2 ${
                message.isOwn
                  ? "text-cream/70"
                  : "text-muted-foreground/70"
              }`}
            >
              <span className="text-xs">
                {formatTime(message.timestamp)}
              </span>
              {message.isOwn && getStatusIcon(message.status)}
            </div>
          </div>
        </div>
      ))}
      
      <TypingIndicator isVisible={isTyping} userName={typingUser} />
    </div>
  );
}