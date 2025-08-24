import { Phone, Video, MoreVertical, Search, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ChatHeaderProps {
  chatName: string;
  isOnline?: boolean;
  lastSeen?: string;
  avatar?: string;
}

export function ChatHeader({ chatName, isOnline, lastSeen, avatar }: ChatHeaderProps) {
  return (
    <div className="h-20 px-8 flex items-center justify-between border-b border-border/20">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="w-12 h-12 ring-2 ring-cream/30">
            <AvatarImage src={avatar} />
            <AvatarFallback className="bg-gradient-to-br from-red to-burgundy text-cream">
              {chatName.split(" ").map(n => n[0]).join("").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue border-2 border-white rounded-full animate-pulse shadow-lg"></div>
          )}
        </div>
        
        <div>
          <h2 className="font-semibold text-card-foreground flex items-center gap-2">
            {chatName}
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          </h2>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            {isOnline ? (
              <>
                <span className="w-2 h-2 bg-blue rounded-full animate-pulse"></span>
                в сети
              </>
            ) : (
              lastSeen
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover-glow rounded-xl bg-cream/10 hover:bg-cream/20 transition-all duration-300 text-navy"
        >
          <Search className="w-5 h-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover-glow rounded-xl bg-blue/20 hover:bg-blue/30 text-blue transition-all duration-300"
        >
          <Phone className="w-5 h-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover-glow rounded-xl bg-red/20 hover:bg-red/30 text-red transition-all duration-300"
        >
          <Video className="w-5 h-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover-glow rounded-xl bg-cream/10 hover:bg-cream/20 transition-all duration-300 text-navy"
        >
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}