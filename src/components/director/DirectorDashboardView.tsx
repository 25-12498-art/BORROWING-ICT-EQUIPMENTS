import React from 'react';
import { BorrowRequest } from '../../types/equiplink';

interface DirectorDashboardViewProps {
  requests: BorrowRequest[];
  onViewRequest: (requestId: string) => void;
  onNavigate: (navId: string) => void;
}

export const DirectorDashboardView: React.FC<DirectorDashboardViewProps> = ({
  requests,
  onViewRequest,
  onNavigate,
}) => {
  const pendingFinal = requests.filter(
    (r) =>
      r.status === 'Director Approval' ||
      (r.staffApproval === 'Complete' && r.directorApproval === 'Pending')
  );

  return (
    <div className="space-y-6">
      {/* 3 Metric Cards (Page 20) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Pending Final Approvals */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex items-center gap-4">
          <div className="w-1.5 h-12 rounded-full bg-amber-500 shrink-0" />
          <div>
            <div className="text-xs font-medium text-slate-500">
              Pending Final Approvals
            </div>
            <div className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">
              {pendingFinal.length || 5}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Awaiting your decision
            </div>
          </div>
        </div>

        {/* Approved Today */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex items-center gap-4">
          <div className="w-1.5 h-12 rounded-full bg-emerald-500 shrink-0" />
          <div>
            <div className="text-xs font-medium text-slate-500">
              Approved Today
            </div>
            <div className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">
              8
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Final decisions
            </div>
          </div>
        </div>

        {/* Rejected Today */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex items-center gap-4">
          <div className="w-1.5 h-12 rounded-full bg-rose-500 shrink-0" />
          <div>
            <div className="text-xs font-medium text-slate-500">
              Rejected Today
            </div>
            <div className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">
              1
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Final decisions
            </div>
          </div>
        </div>
      </div>

      {/* Requests for final approval table & Notifications card (Page 20) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Requests for final approval (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800">
              Requests for final approval
            </h3>
            <button
              onClick={() => onNavigate('director_pending')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              View All Approvals →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-400">
                  <th className="py-3 px-4">Request ID</th>
                  <th className="py-3 px-4">Purpose</th>
                  <th className="py-3 px-4">Requested by</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4 font-mono font-semibold text-blue-600">
                    REQ-007
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">
                    Presentation
                  </td>
                  <td className="py-3 px-4 text-slate-600">Jane Santos</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onViewRequest('REQ-007')}
                      className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4 font-mono font-semibold text-blue-600">
                    REQ-006
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">Meeting</td>
                  <td className="py-3 px-4 text-slate-600">Mark Cruz</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onViewRequest('REQ-006')}
                      className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-4 font-mono font-semibold text-blue-600">
                    REQ-005
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">
                    Class Lecture
                  </td>
                  <td className="py-3 px-4 text-slate-600">Ana Reyes</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onViewRequest('REQ-005')}
                      className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications Card (Page 20) */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="mb-4 pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">
                Notifications
              </h3>
            </div>

            <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl space-y-2">
              <div className="font-bold text-sm text-amber-900">
                5 requests require final approval.
              </div>
              <p className="text-xs text-amber-800/90 leading-relaxed">
                Review the request details and staff recommendations before making
                an approval decision.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigate('director_pending')}
              className="w-full py-2.5 px-4 bg-[#1b62b3] hover:bg-[#165297] text-white text-xs font-semibold rounded-lg shadow-xs transition"
            >
              Review Pending Queue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
