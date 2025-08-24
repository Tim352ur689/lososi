import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Paperclip, Image, File, Camera, Music } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File, type: string) => void;
  children?: React.ReactNode;
}

export function FileUpload({ onFileSelect, children }: FileUploadProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFileUpload = (type: string, accept: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onFileSelect(file, type);
        setIsOpen(false);
      }
    };
    input.click();
  };

  const uploadOptions = [
    {
      icon: Image,
      label: "Фото",
      type: "image",
      accept: "image/*",
      color: "text-blue-400",
      bg: "bg-blue-500/20 hover:bg-blue-500/30"
    },
    {
      icon: File,
      label: "Документ",
      type: "document",
      accept: ".pdf,.doc,.docx,.txt,.zip",
      color: "text-purple-400",
      bg: "bg-purple-500/20 hover:bg-purple-500/30"
    },
    {
      icon: Camera,
      label: "Камера",
      type: "camera",
      accept: "image/*",
      color: "text-green-400",
      bg: "bg-green-500/20 hover:bg-green-500/30"
    },
    {
      icon: Music,
      label: "Аудио",
      type: "audio",
      accept: "audio/*",
      color: "text-red-400",
      bg: "bg-red-500/20 hover:bg-red-500/30"
    }
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div>
          {children || (
            <Button
              variant="ghost"
              size="icon"
              className="hover-glow rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 ripple"
            >
              <Paperclip className="w-5 h-5" />
            </Button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0 glass-strong border-0 slide-in-bottom">
        <div className="p-4 space-y-2">
          {uploadOptions.map((option, index) => (
            <Button
              key={option.type}
              variant="ghost"
              className={`w-full justify-start gap-3 h-12 hover-scale ripple ${option.bg} ${option.color} bounce-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleFileUpload(option.type, option.accept)}
            >
              <option.icon className="w-5 h-5" />
              <span>{option.label}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}