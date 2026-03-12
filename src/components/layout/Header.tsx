"use client";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Menu, User } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 text-muted-foreground rounded-md md:hidden hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-foreground hidden sm:block">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-muted/50 border border-border">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User size={16} />
          </div>
          <span className="text-sm font-medium pr-2 hidden sm:block">Usuario</span>
        </div>
      </div>
    </header>
  );
}
