import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Smile } from "lucide-react";

const emojiCategories = {
  "😀": ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇"],
  "❤️": ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❤️‍🔥", "❤️‍🩹", "💕"],
  "👋": ["👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙"],
  "🎉": ["🎉", "🎊", "🎈", "🎁", "🎀", "🎂", "🍰", "🧁", "🍭", "🍬", "🍫", "🍩", "🍪"],
  "🔥": ["🔥", "💯", "💫", "⭐", "🌟", "✨", "⚡", "💥", "💢", "💨", "💦", "💤", "🕳️"],
  "🚀": ["🚀", "🛸", "🌍", "🌎", "🌏", "🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔"]
};

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  children?: React.ReactNode;
}

export function EmojiPicker({ onEmojiSelect, children }: EmojiPickerProps) {
  const [selectedCategory, setSelectedCategory] = useState("😀");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          {children || (
            <Button
              variant="ghost"
              size="icon"
              className="hover-glow rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 ripple"
            >
              <Smile className="w-5 h-5" />
            </Button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 glass-strong border-0 slide-in-bottom">
        <div className="p-4">
          {/* Category tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {Object.keys(emojiCategories).map((category) => (
              <Button
                key={category}
                variant="ghost"
                size="sm"
                className={`min-w-[40px] h-10 hover-scale ripple ${
                  selectedCategory === category 
                    ? "bg-primary/20 text-primary" 
                    : "hover:bg-accent/50"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Emoji grid */}
          <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto">
            {emojiCategories[selectedCategory as keyof typeof emojiCategories].map((emoji, index) => (
              <Button
                key={emoji}
                variant="ghost"
                size="sm"
                className="h-10 hover-scale hover:bg-accent/50 ripple bounce-in"
                style={{ animationDelay: `${index * 0.02}s` }}
                onClick={() => onEmojiSelect(emoji)}
              >
                <span className="text-lg">{emoji}</span>
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}