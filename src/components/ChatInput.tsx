import { useState, useRef } from "react";
import { Send, Mic, MicOff } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { EmojiPicker } from "./EmojiPicker";
import { FileUpload } from "./FileUpload";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onTyping: (isTyping: boolean) => void;
}

export function ChatInput({ onSendMessage, onTyping }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
      onTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Typing indicator logic
    onTyping(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      onTyping(false);
    }, 1000);
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  const handleFileSelect = (file: File, type: string) => {
    // Mock file upload
    const fileName = file.name;
    const fileMessage = type === 'image' ? `📷 ${fileName}` : `📎 ${fileName}`;
    onSendMessage(fileMessage);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Mock voice recording logic
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        onSendMessage("🎤 Голосовое сообщение");
      }, 2000);
    }
  };

  return (
    <div className="p-6 border-t border-border/20">
      <div className="flex items-end gap-4">
        <FileUpload onFileSelect={handleFileSelect} />
        
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
            placeholder="Напишите сообщение..."
            className="min-h-[52px] max-h-32 resize-none pr-20 pl-6 glass-strong rounded-3xl border-0 backdrop-blur-md shadow-lg focus:shadow-xl transition-all duration-300 text-card-foreground"
            rows={1}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <EmojiPicker onEmojiSelect={handleEmojiSelect} />
            <Button
              variant="ghost"
              size="icon"
              className={`hover-glow rounded-xl transition-all duration-300 ripple ${
                isRecording 
                  ? "bg-red/30 text-red animate-pulse" 
                  : "bg-blue/20 hover:bg-blue/30 text-blue"
              }`}
              onClick={toggleRecording}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        <Button 
          onClick={handleSend}
          size="icon"
          className={`rounded-xl shadow-lg transition-all duration-300 ripple ${
            message.trim() 
              ? "bg-gradient-to-r from-red to-burgundy hover:shadow-xl hover-scale message-sent text-cream" 
              : "bg-gray-400"
          }`}
          disabled={!message.trim()}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
      
      {isRecording && (
        <div className="mt-3 flex items-center justify-center gap-2 text-red fade-in">
          <div className="w-2 h-2 bg-red rounded-full animate-pulse"></div>
          <span className="text-sm">Запись голосового сообщения...</span>
        </div>
      )}
    </div>
  );
}