import React, { useState } from 'react';
import { Role } from '../types/equiplink';
import { ShieldCheck, UserCheck, KeyRound, Sparkles } from 'lucide-react';

interface LoginViewProps {
  onLogin: (role: Role, username: string) => void;
  onOpenJavaModal: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLogin,
  onOpenJavaModal,
}) => {
  const [username, setUsername] = useState('johndoe');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<Role>('USER');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role, username);
  };

  const handleQuickLogin = (selectedRole: Role, defaultUser: string) => {
    setRole(selectedRole);
    setUsername(defaultUser);
    onLogin(selectedRole, defaultUser);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#0f284e]">
      {/* Left Hero Section (Page 1) */}
      <div className="relative md:w-1/2 p-8 md:p-16 flex flex-col justify-between overflow-hidden bg-[#122e57] text-white">
        {/* Background Decorative Rings matching wireframe bottom-left blue circles */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-600/30 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-cyan-500/20 pointer-events-none" />

        <div className="relative z-10 my-auto">
          {/* Logo icon */}
          <div className="w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center font-bold text-3xl text-white shadow-lg mb-6">
            E
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            EquipLink
          </h1>

          <p className="text-lg md:text-xl text-blue-100/90 font-normal max-w-md leading-relaxed">
            Campus Equipment Borrowing and Approval Management System
          </p>

          <div className="mt-8 pt-8 border-t border-blue-400/20 space-y-2">
            <div className="flex items-center gap-2 text-xs text-blue-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Multi-tier Staff Review & Director Sanction</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-200">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span>Real-time Equipment Availability Matrix</span>
            </div>
          </div>
        </div>

        {/* Java Source Code shortcut badge */}
        <div className="relative z-10 pt-6">
          <button
            onClick={onOpenJavaModal}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs text-white backdrop-blur-xs transition"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Looking for the Java Source Code? Click here to view & download.</span>
          </button>
        </div>
      </div>

      {/* Right Login Form (Page 1) */}
      <div className="md:w-1/2 bg-[#f4f7fb] flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/80 shadow-xl p-8 md:p-10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              Welcome back
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Sign in to your EquipLink account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                USERNAME
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                PASSWORD
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                ACCOUNT ROLE
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="USER">Student / Instructor ■</option>
                <option value="ICT_STAFF">ICT Staff</option>
                <option value="CAMPUS_DIRECTOR">Campus Director</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 bg-[#1b62b3] hover:bg-[#165297] text-white font-medium text-sm rounded-lg shadow-sm transition active:scale-[0.99] cursor-pointer"
            >
              Log in
            </button>
          </form>

          <p className="text-center text-[11px] text-slate-400 mt-4">
            Use your assigned account credentials.
          </p>

          {/* Quick Demo Logins for Fast Evaluation */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-[11px] font-semibold text-slate-500 mb-2.5 text-center">
              Quick 1-Click Role Switch:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('USER', 'johndoe')}
                className="px-2 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-medium transition text-center"
              >
                Student / User
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('ICT_STAFF', 'm.santos')}
                className="px-2 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-medium transition text-center"
              >
                ICT Staff
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('CAMPUS_DIRECTOR', 'director')}
                className="px-2 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-medium transition text-center"
              >
                Director
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
