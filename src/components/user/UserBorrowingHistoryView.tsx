import React, { useState } from 'react';
import { BorrowRecord } from '../../types/equiplink';
import { StatusBadge } from '../StatusBadge';

interface UserBorrowingHistoryViewProps {
  records: BorrowRecord[];
}

export const UserBorrowingHistoryView: React.FC<UserBorrowingHistoryViewProps> = ({
  records,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = records.filter((r) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.equipment.toLowerCase().includes(q) ||
        r.purpose.toLowerCase().includes(q) ||
        r.date.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search and date filter (Page 7) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          Search and date filter
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Date range:</span>
              <span className="text-slate-700 font-medium">Any</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Search:</span>
              <input
                type="text"
                placeholder="Search equipment or purpose..."
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

      {/* Completed transactions card (Page 7) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-800">
            Completed transactions
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-400">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Equipment</th>
                <th className="py-3 px-4">Purpose</th>
                <th className="py-3 px-4">Return</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4 text-slate-600">{item.date}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {item.equipment}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">{item.purpose}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono text-xs">
                    {item.returnTime}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <StatusBadge status={item.status} />
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
