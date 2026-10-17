import React from 'react';
import { BorrowRequest, Equipment } from '../../types/equiplink';
import { StatusBadge } from '../StatusBadge';

interface UserHomeViewProps {
  requests: BorrowRequest[];
  equipmentList: Equipment[];
  onNavigate: (navId: string) => void;
  onViewRequestDetails: (requestId: string) => void;
}

export const UserHomeView: React.FC<UserHomeViewProps> = ({
  requests,
  equipmentList,
  onNavigate,
  onViewRequestDetails,
}) => {
  const pendingCount = requests.filter(
    (r) => r.status === 'Pending' || r.status === 'Staff Review'
  ).length;
  const approvedCount = requests.filter(
    (r) => r.status === 'Approved' || r.status === 'Assigned'
  ).length;

  return (
    <div className="space-y-6">
      {/* 4 Stat Cards with vertical colored left border (Page 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pending Requests */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex items-center gap-4">
          <div className="w-1.5 h-12 rounded-full bg-blue-500 shrink-0" />
          <div>
            <div className="text-xs font-medium text-slate-500">
              Pending Requests
            </div>
            <div className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">
              {pendingCount || 2}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Awaiting review
            </div>
          </div>
        </div>

        {/* Approved Requests */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex items-center gap-4">
          <div className="w-1.5 h-12 rounded-full bg-emerald-500 shrink-0" />
          <div>
            <div className="text-xs font-medium text-slate-500">
              Approved Requests
            </div>
            <div className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">
              {approvedCount || 1}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Ready for assignment
            </div>
          </div>
        </div>

        {/* Upcoming Reservations */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex items-center gap-4">
          <div className="w-1.5 h-12 rounded-full bg-purple-500 shrink-0" />
          <div>
            <div className="text-xs font-medium text-slate-500">
              Upcoming Reservations
            </div>
            <div className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">
              1
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Scheduled</div>
          </div>
        </div>

        {/* Borrowing History */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex items-center gap-4">
          <div className="w-1.5 h-12 rounded-full bg-slate-500 shrink-0" />
          <div>
            <div className="text-xs font-medium text-slate-500">
              Borrowing History
            </div>
            <div className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">
              5
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Completed records
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Equipment availability & Recent notifications (Page 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Equipment availability */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-800">
              Equipment availability
            </h3>
            <p className="text-xs text-slate-400">Current status</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400">
                  <th className="pb-3 font-semibold">Equipment</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 font-medium text-slate-800">Projector</td>
                  <td className="py-3 text-right">
                    <StatusBadge status="Available" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-slate-800">View Board</td>
                  <td className="py-3 text-right">
                    <StatusBadge status="Reserved" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-slate-800">Speaker</td>
                  <td className="py-3 text-right">
                    <StatusBadge status="Available" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-slate-800">TV</td>
                  <td className="py-3 text-right">
                    <StatusBadge status="In Use" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => onNavigate('user_availability')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              View Full Availability Calendar →
            </button>
          </div>
        </div>

        {/* Recent notifications */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-800">
              Recent notifications
            </h3>
          </div>

          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <div className="font-semibold text-sm text-slate-800">
                Request approved
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Your request is approved.
              </div>
            </div>

            <div className="border-b border-slate-100 pb-3">
              <div className="font-semibold text-sm text-slate-800">
                Request received
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Request REQ-004 submitted.
              </div>
            </div>

            <div className="pb-1">
              <div className="font-semibold text-sm text-slate-800">
                Schedule reminder
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Upcoming equipment schedule.
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => onNavigate('user_notifications')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              View All Notifications →
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming reservation table (Page 2) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-800">
            Upcoming reservation
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-400">
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Time</th>
                <th className="pb-3 font-semibold">Purpose</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-50/50 transition">
                <td className="py-3 text-slate-700">Apr 25, 2026</td>
                <td className="py-3 text-slate-700">8:00–10:00 AM</td>
                <td className="py-3 font-medium text-slate-800">Class Lecture</td>
                <td className="py-3 text-right">
                  <StatusBadge status="Approved" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
