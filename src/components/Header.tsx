import React from 'react';
import { UserProfile } from '../types/equiplink';
import { Code2, Bell, ShieldCheck, User } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
  currentUser: UserProfile;
  unreadNotifsCount: number;
  onOpenJavaModal: () => void;
  onGoToNotifications: () => void;
  onGoToSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  currentUser,
  unreadNotifsCount,
  onOpenJavaModal,
  onGoToNotifications,
  onGoToSettings,
}) => {
  return (
    <header className="px-8 py-5 border-b border-slate-200 bg-white/70 backdrop-blur-sm sticky top-0 z-20 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight leading-tight">
          {title}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Java Code quick access banner button */}
        <button
          onClick={onOpenJavaModal}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100 text-xs font-semibold shadow-xs transition"
          title="View comprehensive Java OOP and Swing code for this project"
        >
          <Code2 className="w-4 h-4 text-amber-600" />
          <span className="hidden sm:inline">Java Code & Project Files</span>
        </button>

        {/* Notifications Icon */}
        <button
          onClick={onGoToNotifications}
          className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotifsCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          )}
        </button>

        {/* Account indicator matching '■ Account ■' from wireframe */}
        <button
          onClick={onGoToSettings}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 transition"
        >
          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
            {currentUser.fullName.charAt(0)}
          </div>
          <span className="font-semibold text-slate-800 hidden md:inline">
            {currentUser.fullName}
          </span>
          <span className="text-[10px] text-slate-500 border-l border-slate-300 pl-2 hidden lg:inline">
            {currentUser.roleLabel}
          </span>
          <span className="text-slate-400 text-xs">■ Account ■</span>
        </button>
      </div>
    </header>
  );
};
