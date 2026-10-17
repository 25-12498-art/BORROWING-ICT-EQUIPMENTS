import React, { useState } from 'react';
import { UserProfile } from '../../types/equiplink';
import { Check } from 'lucide-react';

interface UserSettingsViewProps {
  currentUser: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

export const UserSettingsView: React.FC<UserSettingsViewProps> = ({
  currentUser,
  onUpdateProfile,
}) => {
  const [fullName, setFullName] = useState(currentUser.fullName);
  const [username, setUsername] = useState(currentUser.username);
  const [department, setDepartment] = useState(currentUser.department);
  const [saved, setSaved] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ fullName, username, department });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl">
      {/* Profile Information (Page 9) */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
        <div className="mb-6 pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-800">
            Profile information
          </h3>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                FULL NAME
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                USERNAME
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                SECTION / DEPARTMENT
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                ROLE
              </label>
              <input
                type="text"
                disabled
                value={currentUser.roleLabel}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1b62b3] hover:bg-[#165297] text-white text-xs font-semibold rounded-lg shadow-xs transition inline-flex items-center gap-2"
            >
              {saved && <Check className="w-4 h-4 text-emerald-300" />}
              <span>{saved ? 'Saved Successfully' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Account Settings (Page 9) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between">
        <div>
          <div className="mb-6 pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800">
              Account settings
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-slate-700">Change password</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Update your account password.
              </p>
              <button
                type="button"
                onClick={() => setShowPasswordDialog(true)}
                className="mt-3 px-4 py-2 border border-slate-300 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 transition"
              >
                Change Password
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700">
                Notification settings
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                In-app notifications: <span className="font-semibold text-emerald-600">Enabled</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {showPasswordDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full border border-slate-200 shadow-xl space-y-4">
            <h3 className="font-bold text-slate-800 text-sm">
              Change Account Password
            </h3>
            <input
              type="password"
              placeholder="Current password"
              className="w-full px-3 py-2 border rounded-lg text-xs"
            />
            <input
              type="password"
              placeholder="New password"
              className="w-full px-3 py-2 border rounded-lg text-xs"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowPasswordDialog(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowPasswordDialog(false)}
                className="px-3 py-1.5 text-xs bg-blue-600 text-white font-semibold rounded"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
