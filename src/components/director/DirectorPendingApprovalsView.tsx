import React, { useState } from 'react';
import { BorrowRequest } from '../../types/equiplink';

interface DirectorPendingApprovalsViewProps {
  requests: BorrowRequest[];
  onViewRequest: (requestId: string) => void;
}

export const DirectorPendingApprovalsView: React.FC<DirectorPendingApprovalsViewProps> = ({
  requests,
  onViewRequest,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const pendingDirector = requests.filter((r) => {
    const isPending =
      r.status === 'Director Approval' ||
      r.status === 'Staff Review' ||
      (r.staffApproval === 'Complete' && r.directorApproval === 'Pending');
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
      {/* Search pending approvals bar (Page 21) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          Search pending approvals
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">
              Search request ID / borrower:
            </span>
            <input
              type="text"
              placeholder="e.g. REQ-007 or Jane Santos"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs placeholder-slate-400 focus:ring-1 focus:ring-blue-500 w-64"
            />
          </div>

          <button className="px-6 py-2 bg-[#1b62b3] hover:bg-[#165297] text-white text-xs font-semibold rounded-lg shadow-xs transition">
            Search
          </button>
        </div>
      </div>

      {/* Pending final approval table (Page 21) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-800">
            Pending final approval
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-400">
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">Purpose</th>
                <th className="py-3 px-4">Requested by</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pendingDirector.map((req) => (
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
                  <td className="py-3.5 px-4 text-slate-600">{req.dateOfUse}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onViewRequest(req.id)}
                      className="px-3 py-1 rounded bg-[#1b62b3] hover:bg-[#165297] text-white text-xs font-semibold shadow-xs transition"
                    >
                      View
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
