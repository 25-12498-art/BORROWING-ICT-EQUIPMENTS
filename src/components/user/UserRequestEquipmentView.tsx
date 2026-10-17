import React, { useState } from 'react';
import { UserProfile } from '../../types/equiplink';
import { CheckCircle2 } from 'lucide-react';

interface UserRequestEquipmentViewProps {
  currentUser: UserProfile;
  onSubmitRequest: (req: {
    purpose: string;
    dateOfUse: string;
    timeFrom: string;
    timeTo: string;
    sectionDepartment: string;
    requestedBy: string;
    additionalRemarks?: string;
  }) => void;
  onCancel: () => void;
}

export const UserRequestEquipmentView: React.FC<UserRequestEquipmentViewProps> = ({
  currentUser,
  onSubmitRequest,
  onCancel,
}) => {
  const [purpose, setPurpose] = useState('Class Lecture');
  const [dateOfUse, setDateOfUse] = useState('Apr 25, 2026');
  const [timeFrom, setTimeFrom] = useState('8:00 AM');
  const [timeTo, setTimeTo] = useState('10:00 AM');
  const [sectionDepartment, setSectionDepartment] = useState(
    currentUser.department || 'BSIT - 2A'
  );
  const [requestedBy, setRequestedBy] = useState(currentUser.fullName);
  const [remarks, setRemarks] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitRequest({
      purpose,
      dateOfUse,
      timeFrom,
      timeTo,
      sectionDepartment,
      requestedBy,
      additionalRemarks: remarks,
    });
    setSubmittedSuccess(true);
  };

  if (submittedSuccess) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/90 p-12 text-center max-w-lg mx-auto shadow-xs">
        <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">
          Request Submitted Successfully!
        </h3>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Your equipment borrowing request has been queued for ICT Staff review.
          You can track its approval progress in <b>My Requests</b>.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => setSubmittedSuccess(false)}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            Submit Another Request
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition"
          >
            Go to My Requests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-8">
        <div className="mb-6 pb-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-800">
            Equipment request
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Complete the required details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PURPOSE */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                PURPOSE
              </label>
              <input
                type="text"
                required
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g. Class Lecture, Meeting, Presentation"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* DATE OF USE */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                DATE OF USE
              </label>
              <input
                type="text"
                required
                value={dateOfUse}
                onChange={(e) => setDateOfUse(e.target.value)}
                placeholder="Select date (e.g. Apr 25, 2026)"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* TIME FROM */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                TIME FROM
              </label>
              <input
                type="text"
                required
                value={timeFrom}
                onChange={(e) => setTimeFrom(e.target.value)}
                placeholder="8:00 AM"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* TIME TO */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                TIME TO
              </label>
              <input
                type="text"
                required
                value={timeTo}
                onChange={(e) => setTimeTo(e.target.value)}
                placeholder="10:00 AM"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* SECTION / DEPARTMENT */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                SECTION / DEPARTMENT
              </label>
              <input
                type="text"
                required
                value={sectionDepartment}
                onChange={(e) => setSectionDepartment(e.target.value)}
                placeholder="BSIT - 2A"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* REQUESTER */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                REQUESTER
              </label>
              <input
                type="text"
                required
                value={requestedBy}
                onChange={(e) => setRequestedBy(e.target.value)}
                placeholder="John Doe"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* ADDITIONAL REMARKS (OPTIONAL) */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              ADDITIONAL REMARKS (OPTIONAL)
            </label>
            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter additional information..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
            />
          </div>

          {/* Wireframe helper note */}
          <p className="text-xs text-slate-400 italic">
            Note: ICT Staff assigns the specific equipment based on availability.
          </p>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-[#1b62b3] hover:bg-[#165297] text-white text-sm font-medium shadow-sm transition active:scale-[0.99]"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
