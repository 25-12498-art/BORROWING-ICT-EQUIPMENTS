import React from 'react';
import { NotificationItem } from '../../types/equiplink';

interface UserNotificationsViewProps {
  notifications: NotificationItem[];
}

export const UserNotificationsView: React.FC<UserNotificationsViewProps> = ({
  notifications,
}) => {
  const userNotifs = notifications.filter(
    (n) => n.roleTarget === 'USER' || n.roleTarget === 'ALL'
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
        <div className="mb-6 pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-800">
            Notification center
          </h3>
        </div>

        <div className="space-y-4">
          {userNotifs.map((notif) => (
            <div
              key={notif.id}
              className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition flex items-start gap-4"
            >
              <div className="px-2.5 py-1 rounded text-[11px] font-semibold bg-emerald-100/70 text-emerald-800 shrink-0">
                {notif.badge}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-800">
                    {notif.title}
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    {notif.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{notif.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
