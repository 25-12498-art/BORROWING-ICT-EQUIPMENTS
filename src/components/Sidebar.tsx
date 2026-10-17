import React from 'react';
import { Role } from '../types/equiplink';
import { Code2, LogOut } from 'lucide-react';

interface SidebarProps {
  currentRole: Role;
  activeNav: string;
  onNavigate: (navId: string) => void;
  onSwitchRole: (newRole: Role) => void;
  onOpenJavaModal: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  activeNav,
  onNavigate,
  onSwitchRole,
  onOpenJavaModal,
  onLogout,
}) => {
  // Navigation structure per role matching PDF pages 2, 10, 20
  const userNavItems = [
    { id: 'user_home', label: 'Home' },
    { id: 'user_request', label: 'Request Equipment' },
    { id: 'user_availability', label: 'Equipment Availability' },
    { id: 'user_my_requests', label: 'My Requests' },
    { id: 'user_history', label: 'Borrowing History' },
    { id: 'user_notifications', label: 'Notifications' },
    { id: 'user_settings', label: 'Settings' },
  ];

  const staffNavItems = [
    { id: 'staff_dashboard', label: 'Dashboard' },
    { id: 'staff_equipment', label: 'Equipment Management' },
    { id: 'staff_availability', label: 'Availability & Scheduling' },
    { id: 'staff_pending', label: 'Pending Requests' },
    { id: 'staff_approval', label: 'Approval Management' },
    { id: 'staff_assignment', label: 'Equipment Assignment' },
    { id: 'staff_return', label: 'Borrowing & Return' },
    { id: 'staff_history', label: 'Borrowing History' },
    { id: 'staff_notifications', label: 'Notifications' },
    { id: 'staff_settings', label: 'Settings' },
  ];

  const directorNavItems = [
    { id: 'director_dashboard', label: 'Dashboard' },
    { id: 'director_pending', label: 'Pending Final Approvals' },
    { id: 'director_details', label: 'Request Details' },
    { id: 'director_history', label: 'Approval History' },
    { id: 'director_notifications', label: 'Notifications' },
    { id: 'director_settings', label: 'Settings' },
  ];

  const navItems =
    currentRole === 'USER'
      ? userNavItems
      : currentRole === 'ICT_STAFF'
      ? staffNavItems
      : directorNavItems;

  const roleTitle =
    currentRole === 'USER'
      ? 'User'
      : currentRole === 'ICT_STAFF'
      ? 'ICT Staff'
      : 'Campus Director';

  return (
    <aside className="w-64 bg-[#112b55] text-white flex flex-col justify-between shrink-0 select-none min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-[#1b3d75]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-xl text-white shadow-md">
              E
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight leading-none text-white">
                EquipLink
              </h1>
              <p className="text-[10px] text-blue-200/80 leading-tight mt-1">
                Campus Equipment Borrowing
              </p>
            </div>
          </div>
        </div>

        {/* Role Section Title */}
        <div className="px-6 pt-5 pb-2">
          <span className="text-xs uppercase tracking-wider font-medium text-slate-300/80">
            {roleTitle}
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-[#1e4e94] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-[#16366b]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isActive ? 'bg-cyan-300' : 'bg-slate-400/60'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions: Java Code button & Role Switcher */}
      <div className="p-4 border-t border-[#1b3d75]/60 space-y-3 bg-[#0d2244]/60">
        {/* Java Code Trigger Button */}
        <button
          onClick={onOpenJavaModal}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-300 hover:bg-amber-500/25 text-xs font-semibold transition"
          title="Inspect & Download complete Java OOP and Swing code for EquipLink"
        >
          <Code2 className="w-4 h-4 text-amber-400" />
          <span>Inspect Java Source Code</span>
        </button>

        {/* Quick Role Switcher */}
        <div className="text-[11px] text-slate-400 font-medium px-1">
          Quick Switch Perspective:
        </div>
        <div className="grid grid-cols-3 gap-1">
          <button
            onClick={() => onSwitchRole('USER')}
            className={`py-1.5 px-1 text-[10px] rounded font-medium transition text-center truncate ${
              currentRole === 'USER'
                ? 'bg-blue-600 text-white'
                : 'bg-[#18396c] text-slate-300 hover:text-white'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => onSwitchRole('ICT_STAFF')}
            className={`py-1.5 px-1 text-[10px] rounded font-medium transition text-center truncate ${
              currentRole === 'ICT_STAFF'
                ? 'bg-blue-600 text-white'
                : 'bg-[#18396c] text-slate-300 hover:text-white'
            }`}
          >
            ICT Staff
          </button>
          <button
            onClick={() => onSwitchRole('CAMPUS_DIRECTOR')}
            className={`py-1.5 px-1 text-[10px] rounded font-medium transition text-center truncate ${
              currentRole === 'CAMPUS_DIRECTOR'
                ? 'bg-blue-600 text-white'
                : 'bg-[#18396c] text-slate-300 hover:text-white'
            }`}
          >
            Director
          </button>
        </div>

        {/* Log Out */}
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
