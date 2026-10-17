import React, { useState } from 'react';
import { StatusBadge } from '../StatusBadge';

export const DirectorApprovalHistoryView: React.FC = () => {
  const [decisionFilter, setDecisionFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const records = [
    {
      id: 'REQ-001',
      purpose: 'Class Lecture',
      decision: 'Approved',
      date: 'Apr 20, 2026',
      signedBy: 'Campus Director',
    },
    {
      id: 'REQ-002',
      purpose: 'Meeting',
      decision: 'Approved',
      date: 'Apr 21, 2026',
      signedBy: 'Campus Director',
    },
    {
      id: 'REQ-003',
      purpose: 'Presentation',
      decision: 'Rejected',
      date: 'Apr 22, 2026',
      signedBy: 'Campus Director',
    },
    {
      id: 'REQ-004',
      purpose: 'Activity',
      decision: 'Rejected',
      date: 'Apr 23, 2026',
      signedBy: 'Campus Director',
    },
    {
      id: 'REQ-005',
      purpose: 'Class Lecture',
      decision: 'Approved',
      date: 'Apr 24, 2026',
      signedBy: 'Campus Director',
    },
  ];

  const filtered = records.filter((r) => {
    if (decisionFilter !== 'All' && r.decision !== decisionFilter) return false;
    if (
      searchQuery &&
      !r.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !r.purpose.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search and filters bar (Page 23) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          Search and filters
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Decision:</span>
              <select
                value={decisionFilter}
                onChange={(e) => setDecisionFilter(e.target.value)}
                className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-700 font-medium text-xs focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Date range:</span>
              <span className="text-slate-700 font-medium">Any</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Search:</span>
              <input
                type="text"
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs placeholder-slate-400 focus:ring-1 focus:ring-blue-500 w-52"
              />
            </div>
          </div>

          <button className="px-6 py-2 bg-[#1b62b3] hover:bg-[#165297] text-white text-xs font-semibold rounded-lg shadow-xs transition">
            Search
          </button>
        </div>
      </div>

      {/* Approval records table (Page 23) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-800">
            Approval records
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-400">
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">Purpose</th>
                <th className="py-3 px-4 text-center">Final Decision</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Approved / Rejected By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4 font-mono font-semibold text-blue-600">
                    {item.id}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {item.purpose}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={item.decision} />
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{item.date}</td>
                  <td className="py-3.5 px-4 text-right font-medium text-slate-700">
                    {item.signedBy}
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
