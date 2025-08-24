interface TypingIndicatorProps {
  isVisible: boolean;
  userName?: string;
}

export function TypingIndicator({ isVisible, userName = "Пользователь" }: TypingIndicatorProps) {
  if (!isVisible) return null;

  return (
    <div className="px-6 py-2 text-sm text-muted-foreground fade-in">
      <div className="flex items-center gap-2">
        <span>{userName} печатает</span>
        <div className="typing-dots">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    </div>
  );
}