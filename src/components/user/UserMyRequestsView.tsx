import React, { useState } from 'react';
import { BorrowRequest } from '../../types/equiplink';
import { StatusBadge } from '../StatusBadge';

interface UserMyRequestsViewProps {
  requests: BorrowRequest[];
  onViewDetails: (requestId: string) => void;
}

export const UserMyRequestsView: React.FC<UserMyRequestsViewProps> = ({
  requests,
  onViewDetails,
}) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchId, setSearchId] = useState('');

  const filteredRequests = requests.filter((r) => {
    if (statusFilter !== 'All' && r.status !== statusFilter) {
      return false;
    }
    if (
      searchId &&
      !r.id.toLowerCase().includes(searchId.toLowerCase()) &&
      !r.purpose.toLowerCase().includes(searchId.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search and filter bar (Page 5) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          Search and filter
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-700 font-medium text-xs focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Staff Review">Staff Review</option>
                <option value="Approved">Approved</option>
                <option value="Assigned">Assigned</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Date:</span>
              <span className="text-slate-700 font-medium">Any</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Search request ID:</span>
              <input
                type="text"
                placeholder="e.g. REQ-001"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs placeholder-slate-400 focus:ring-1 focus:ring-blue-500 w-44"
              />
            </div>
          </div>

          <button className="px-6 py-2 bg-[#1b62b3] hover:bg-[#165297] text-white text-xs font-semibold rounded-lg shadow-xs transition">
            Search
          </button>
        </div>
      </div>

      {/* Request list table card (Page 5) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-800">Request list</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-400">
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Purpose</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4 font-semibold text-blue-600">
                    {req.id}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{req.dateOfUse}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {req.purpose}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={req.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onViewDetails(req.id)}
                      className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
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
