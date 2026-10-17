import React from 'react';
import { BorrowRequest, Equipment } from '../../types/equiplink';
import { StatusBadge } from '../StatusBadge';

interface StaffDashboardViewProps {
  requests: BorrowRequest[];
  equipmentList: Equipment[];
  onNavigate: (navId: string) => void;
}

export const StaffDashboardView: React.FC<StaffDashboardViewProps> = ({
  requests,
  equipmentList,
  onNavigate,
}) => {
  return (
    <div className="space-y-6">
      {/* Row 1 Metric Cards: Equipment Overview (Page 10) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Equipment */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex items-center gap-4">
          <div className="w-1.5 h-12 rounded-full bg-blue-500 shrink-0" />
          <div>
            <div className="text-xs font-medium text-slate-500">
              Total Equipment
            </div>
            <div className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">
              50
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Registered items
            </div>
          </div>
        </div>

        {/* Available */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex items-center gap-4">
          <div className="w-1.5 h-12 rounded-full bg-emerald-500 shrink-0" />
          <div>
            <div className="text-xs font-medium text-slate-500">Available</div>
            <div className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">
              30
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Ready for use
            </div>
          </div>
        </div>

        {/* In Use */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex items-center gap-4">
          <div className="w-1.5 h-12 rounded-full bg-amber-500 shrink-0" />
          <div>
            <div className="text-xs font-medium text-slate-500">In Use</div>
            <div className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">
              7
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Currently borrowed
            </div>
          </div>
        </div>

        {/* Under Maintenance */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex items-center gap-4">
          <div className="w-1.5 h-12 rounded-full bg-rose-500 shrink-0" />
          <div>
            <div className="text-xs font-medium text-slate-500">
              Under Maintenance
            </div>
            <div className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">
              3
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Unavailable</div>
          </div>
        </div>
      </div>

      {/* Row 2 Metric Cards: Workflows (Page 10) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Pending Requests */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex items-center gap-4">
          <div className="w-1.5 h-12 rounded-full bg-amber-500 shrink-0" />
          <div>
            <div className="text-xs font-medium text-slate-500">
              Pending Requests
            </div>
            <div className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">
              8
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Awaiting staff review
            </div>
          </div>
        </div>

        {/* Final Approval */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex items-center gap-4">
          <div className="w-1.5 h-12 rounded-full bg-blue-500 shrink-0" />
          <div>
            <div className="text-xs font-medium text-slate-500">
              Final Approval
            </div>
            <div className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">
              3
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              With Campus Director
            </div>
          </div>
        </div>

        {/* Today's Schedules */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex items-center gap-4">
          <div className="w-1.5 h-12 rounded-full bg-purple-500 shrink-0" />
          <div>
            <div className="text-xs font-medium text-slate-500">
              Today's Schedules
            </div>
            <div className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">
              5
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Equipment reservations
            </div>
          </div>
        </div>
      </div>

      {/* Recent requests table (Page 10) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800">
            Recent requests
          </h3>
          <button
            onClick={() => onNavigate('staff_pending')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            View All Pending Requests →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-400">
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">Purpose</th>
                <th className="py-3 px-4">Requested by</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/60 transition">
                <td className="py-3 px-4 font-semibold text-blue-600">
                  REQ-008
                </td>
                <td className="py-3 px-4 font-medium text-slate-800">
                  Class Lecture
                </td>
                <td className="py-3 px-4 text-slate-600">John Doe</td>
                <td className="py-3 px-4 text-center">
                  <StatusBadge status="Pending" />
                </td>
                <td className="py-3 px-4 text-right text-slate-500">Apr 25</td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition">
                <td className="py-3 px-4 font-semibold text-blue-600">
                  REQ-007
                </td>
                <td className="py-3 px-4 font-medium text-slate-800">Meeting</td>
                <td className="py-3 px-4 text-slate-600">Jane Santos</td>
                <td className="py-3 px-4 text-center">
                  <StatusBadge status="Staff Review" />
                </td>
                <td className="py-3 px-4 text-right text-slate-500">Apr 25</td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition">
                <td className="py-3 px-4 font-semibold text-blue-600">
                  REQ-006
                </td>
                <td className="py-3 px-4 font-medium text-slate-800">
                  Presentation
                </td>
                <td className="py-3 px-4 text-slate-600">Mark Cruz</td>
                <td className="py-3 px-4 text-center">
                  <StatusBadge status="Director Approval" />
                </td>
                <td className="py-3 px-4 text-right text-slate-500">Apr 26</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
