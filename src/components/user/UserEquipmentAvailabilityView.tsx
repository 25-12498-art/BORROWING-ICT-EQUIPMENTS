import React, { useState } from 'react';
import { StatusBadge } from '../StatusBadge';
import { SCHEDULE_MATRIX } from '../../data/initialData';
import { TimeSlotAvailability } from '../../types/equiplink';

export const UserEquipmentAvailabilityView: React.FC = () => {
  const [filterDate, setFilterDate] = useState('Apr 2026');
  const [filterView, setFilterView] = useState('Week');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const scheduleData: TimeSlotAvailability[] = SCHEDULE_MATRIX.filter((item) => {
    if (searchQuery && !item.equipmentName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Schedule filters bar (Page 4) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          Schedule filters
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Date:</span>
              <input
                type="text"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-700 font-medium text-xs focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">View:</span>
              <select
                value={filterView}
                onChange={(e) => setFilterView(e.target.value)}
                className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-700 font-medium text-xs focus:ring-1 focus:ring-blue-500"
              >
                <option value="Week">Week</option>
                <option value="Day">Day</option>
                <option value="Month">Month</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-slate-700 font-medium text-xs focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All</option>
                <option value="Available">Available</option>
                <option value="Reserved">Reserved</option>
                <option value="In Use">In Use</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs placeholder-slate-400 focus:ring-1 focus:ring-blue-500"
            />
            <button className="px-5 py-2 bg-[#1b62b3] hover:bg-[#165297] text-white text-xs font-semibold rounded-lg shadow-xs transition">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Availability calendar matrix card (Page 4) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-800">
            Availability calendar
          </h3>
          <p className="text-xs text-slate-400">Sample schedule view</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                <th className="py-3 px-4 font-semibold">Equipment</th>
                <th className="py-3 px-4 font-semibold text-center">8–10 AM</th>
                <th className="py-3 px-4 font-semibold text-center">10–12 PM</th>
                <th className="py-3 px-4 font-semibold text-center">1–3 PM</th>
                <th className="py-3 px-4 font-semibold text-center">3–5 PM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {scheduleData.map((row) => (
                <tr key={row.equipmentName} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4 font-semibold text-slate-800 whitespace-nowrap">
                    {row.equipmentName}
                  </td>
                  {row.slots.map((slot, idx) => (
                    <td key={idx} className="py-3.5 px-4 text-center">
                      <StatusBadge status={slot.status} size="sm" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend matching wireframe footer: ● Available ● Reserved ● In Use ● Unavailable */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span>Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>In Use</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
};
