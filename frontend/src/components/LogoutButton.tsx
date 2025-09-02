'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/components/providers/auth-provider';

interface LogoutButtonProps {
  showText?: boolean;
}

export function LogoutButton({ showText = false }: LogoutButtonProps) {
  const { logout } = useAuth();

  return (
    <Button
      variant="ghost"
      size={showText ? "default" : "icon"}
      onClick={logout}
      title="Logout"
      aria-label="Logout"
      className="w-full flex items-center justify-start"
    >
      <LogOut className="h-5 w-5 mr-2" />
      {showText && <span>Logout</span>}
    </Button>
  );
}
