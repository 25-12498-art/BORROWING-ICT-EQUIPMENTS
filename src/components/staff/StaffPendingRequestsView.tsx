import React, { useState } from 'react';
import { BorrowRequest } from '../../types/equiplink';
import { StatusBadge } from '../StatusBadge';

interface StaffPendingRequestsViewProps {
  requests: BorrowRequest[];
  onReviewRequest: (requestId: string) => void;
}

export const StaffPendingRequestsView: React.FC<StaffPendingRequestsViewProps> = ({
  requests,
  onReviewRequest,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const pendingList = requests.filter((r) => {
    const isPending =
      r.status === 'Pending' ||
      r.status === 'Staff Review' ||
      r.staffApproval === 'Pending';
    if (!isPending) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.id.toLowerCase().includes(q) ||
        r.requestedBy.toLowerCase().includes(q) ||
        r.purpose.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Request filters bar (Page 13) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          Request filters
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Status:</span>
              <span className="px-2.5 py-1 bg-amber-50 text-amber-700 font-semibold rounded-lg border border-amber-200">
                Pending
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">
                Search request ID / borrower:
              </span>
              <input
                type="text"
                placeholder="e.g. REQ-008 or John Doe"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs placeholder-slate-400 focus:ring-1 focus:ring-blue-500 w-60"
              />
            </div>
          </div>

          <button className="px-6 py-2 bg-[#1b62b3] hover:bg-[#165297] text-white text-xs font-semibold rounded-lg shadow-xs transition">
            Search
          </button>
        </div>
      </div>

      {/* Requests for review table (Page 13) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-800">
            Requests for review
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-400">
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">Purpose</th>
                <th className="py-3 px-4">Requested by</th>
                <th className="py-3 px-4">Schedule</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pendingList.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4 font-mono font-semibold text-blue-600">
                    {req.id}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {req.purpose}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {req.requestedBy}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {req.dateOfUse} · {req.timeFrom}–{req.timeTo}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status="Pending" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onReviewRequest(req.id)}
                      className="px-3.5 py-1 rounded bg-[#1b62b3] hover:bg-[#165297] text-white text-xs font-semibold shadow-xs transition"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
