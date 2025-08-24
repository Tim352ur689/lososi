import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { 
  Settings, 
  User, 
  Moon, 
  Sun, 
  Bell, 
  Lock, 
  Palette, 
  Volume2,
  Camera,
  Edit3,
  Shield,
  Smartphone
} from "lucide-react";

interface SettingsModalProps {
  children?: React.ReactNode;
  onThemeChange?: (isDark: boolean) => void;
}

export function SettingsModal({ children, onThemeChange }: SettingsModalProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [userName, setUserName] = useState("Иван Петров");
  const [userStatus, setUserStatus] = useState("В сети");

  const handleThemeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    onThemeChange?.(checked);
    document.documentElement.classList.toggle('dark', checked);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          {children || (
            <Button
              variant="ghost"
              size="icon"
              className="hover-glow rounded-xl bg-accent/20 hover:bg-accent/30 transition-all duration-300 ripple hover-rotate text-red"
            >
              <Settings className="w-5 h-5" />
            </Button>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-lg glass-strong border-0 fade-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 gradient-text text-xl">
            <Settings className="w-6 h-6" />
            Настройки
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Profile Section */}
          <div className="settings-section">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-card-foreground mb-4">
              <User className="w-4 h-4 text-red" />
              Профиль
            </h3>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-20 h-20 ring-2 ring-red/30">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-red to-burgundy text-cream text-lg">
                    ИП
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-red hover:bg-burgundy ripple shadow-lg"
                >
                  <Camera className="w-4 h-4 text-cream" />
                </Button>
              </div>
              
              <div className="flex-1 space-y-3">
                <div>
                  <Label htmlFor="username" className="text-xs text-muted-foreground">
                    Имя пользователя
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="glass border-0 h-9"
                    />
                    <Button size="icon" variant="ghost" className="w-9 h-9 hover-scale text-blue">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="status" className="text-xs text-muted-foreground">
                    Статус
                  </Label>
                  <Input
                    id="status"
                    value={userStatus}
                    onChange={(e) => setUserStatus(e.target.value)}
                    className="glass border-0 h-9 mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="settings-section">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-card-foreground mb-4">
              <Palette className="w-4 h-4 text-blue" />
              Внешний вид
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl glass hover:bg-accent/20 transition-all duration-300">
                <div className="flex items-center gap-3">
                  {isDarkMode ? <Moon className="w-4 h-4 text-navy" /> : <Sun className="w-4 h-4 text-yellow-500" />}
                  <Label htmlFor="dark-mode" className="cursor-pointer">Темная тема</Label>
                </div>
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={handleThemeToggle}
                />
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="settings-section">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-card-foreground mb-4">
              <Bell className="w-4 h-4 text-burgundy" />
              Уведомления
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl glass hover:bg-accent/20 transition-all duration-300">
                <Label htmlFor="notifications" className="cursor-pointer">Уведомления</Label>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl glass hover:bg-accent/20 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-blue" />
                  <Label htmlFor="sounds" className="cursor-pointer">Звуки</Label>
                </div>
                <Switch
                  id="sounds"
                  checked={sounds}
                  onCheckedChange={setSounds}
                />
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="settings-section">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-card-foreground mb-4">
              <Lock className="w-4 h-4 text-red" />
              Приватность и безопасность
            </h3>
            
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 h-12 hover-scale hover:bg-accent/20 text-left"
              >
                <Shield className="w-4 h-4 text-burgundy" />
                <div>
                  <div className="font-medium">Заблокированные пользователи</div>
                  <div className="text-xs text-muted-foreground">Управление черным списком</div>
                </div>
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 h-12 hover-scale hover:bg-accent/20 text-left"
              >
                <Smartphone className="w-4 h-4 text-blue" />
                <div>
                  <div className="font-medium">Активные сессии</div>
                  <div className="text-xs text-muted-foreground">Завершить сессии на других устройствах</div>
                </div>
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 h-12 hover-scale hover:bg-accent/20 text-left"
              >
                <Lock className="w-4 h-4 text-red" />
                <div>
                  <div className="font-medium">Двухфакторная аутентификация</div>
                  <div className="text-xs text-muted-foreground">Дополнительная защита аккаунта</div>
                </div>
              </Button>
            </div>
          </div>

          {/* About Section */}
          <div className="pt-4 text-center text-xs text-muted-foreground">
            <p>Версия 2.1.0</p>
            <p className="mt-1">© 2024 Modern Messenger</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}