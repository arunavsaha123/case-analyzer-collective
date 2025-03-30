
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  Search, 
  Upload, 
  Users, 
  Folder, 
  MessageSquare, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Bell,
  LogOut
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  isActive?: boolean;
};

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/', icon: Home },
  { title: 'Search Cases', href: '/search', icon: Search },
  { title: 'My Cases', href: '/cases', icon: Folder },
  { title: 'Upload Case', href: '/upload', icon: Upload },
  { title: 'My Groups', href: '/groups', icon: Users },
  { title: 'Conversations', href: '/chat', icon: MessageSquare },
];

const accountNavItems: NavItem[] = [
  { title: 'Account', href: '/account', icon: Settings },
  { title: 'Notifications', href: '/notifications', icon: Bell },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be dynamic in a real app
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const handleLogin = () => {
    toast({
      title: "Log in required",
      description: "Please log in to access all features",
    });
  };

  return (
    <div 
      className={cn(
        "flex flex-col bg-card border-r border-border h-screen transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className={cn(
        "flex items-center p-4 h-14 border-b border-border",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <div className="flex items-center">
            <BookOpen className="h-6 w-6 text-primary mr-2" />
            <h2 className="font-bold text-lg">CaseAnalyzer</h2>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn("", collapsed ? "ml-0" : "ml-auto")} 
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <Link 
              key={item.title} 
              to={item.href}
              className={cn(
                "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                "hover:bg-muted hover:text-foreground",
                item.isActive ? "bg-muted text-foreground" : "text-muted-foreground",
                collapsed ? "justify-center" : ""
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </div>
        
        {!collapsed && <Separator className="my-4" />}
        
        <div className="space-y-1 pt-3">
          {accountNavItems.map((item) => (
            <Link 
              key={item.title} 
              to={item.href}
              className={cn(
                "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                "hover:bg-muted hover:text-foreground",
                item.isActive ? "bg-muted text-foreground" : "text-muted-foreground",
                collapsed ? "justify-center" : ""
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </div>
      </ScrollArea>
      
      <div className={cn(
        "flex items-center p-4 border-t border-border",
        collapsed ? "justify-center" : ""
      )}>
        {isLoggedIn ? (
          <Button variant="ghost" className={cn("w-full", collapsed ? "p-2" : "")} onClick={() => setIsLoggedIn(false)}>
            <LogOut className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
            {!collapsed && <span>Logout</span>}
          </Button>
        ) : (
          <Link to="/auth" className="w-full">
            <Button className="w-full" onClick={handleLogin}>
              {collapsed ? <LogOut className="h-5 w-5" /> : "Log In"}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
