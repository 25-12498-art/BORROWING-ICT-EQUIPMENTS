import React, { useState } from 'react';
import { BorrowRequest } from '../../types/equiplink';
import { StatusBadge } from '../StatusBadge';
import { CheckCircle2, RotateCcw } from 'lucide-react';

interface StaffBorrowingReturnViewProps {
  requests: BorrowRequest[];
  onCheckOut: (requestId: string) => void;
  onReturnEquipment: (
    requestId: string,
    condition: 'Good' | 'With reported issue',
    remarks: string
  ) => void;
}

export const StaffBorrowingReturnView: React.FC<StaffBorrowingReturnViewProps> = ({
  requests,
  onCheckOut,
  onReturnEquipment,
}) => {
  const [searchQuery, setSearchQuery] = useState('REQ-001');
  const [selectedReqId, setSelectedReqId] = useState('REQ-001');
  const [returnCondition, setReturnCondition] = useState<
    'Good' | 'With reported issue'
  >('Good');
  const [returnRemarks, setReturnRemarks] = useState(
    'Returned in good working order with power adapter and HDMI cord.'
  );
  const [successMessage, setSuccessMessage] = useState('');

  const currentReq =
    requests.find(
      (r) =>
        r.id.toLowerCase() === selectedReqId.toLowerCase() ||
        r.requestedBy.toLowerCase().includes(selectedReqId.toLowerCase())
    ) || requests[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedReqId(searchQuery);
  };

  const handleDoCheckOut = () => {
    if (currentReq) {
      onCheckOut(currentReq.id);
      setSuccessMessage(`Check-out recorded for ${currentReq.id}. Equipment is now In Use.`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleDoReturn = () => {
    if (currentReq) {
      onReturnEquipment(currentReq.id, returnCondition, returnRemarks);
      setSuccessMessage(`Return transaction saved for ${currentReq.id}. Record logged in Borrowing History.`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Find approved request bar (Page 16) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <form onSubmit={handleSearch} className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 uppercase tracking-wider">
              Find approved request:
            </span>
            <input
              type="text"
              placeholder="Request ID / Borrower (e.g. REQ-001)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3.5 py-2 border border-slate-300 rounded-lg text-xs placeholder-slate-400 focus:ring-1 focus:ring-blue-500 w-72"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-[#1b62b3] hover:bg-[#165297] text-white text-xs font-semibold rounded-lg shadow-xs transition"
          >
            Search
          </button>
        </form>
      </div>

      {successMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Middle Row: Current borrowing (left) & Transaction action (right) (Page 16) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current borrowing */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
          <div className="mb-4 pb-2 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800">
              Current borrowing
            </h3>
          </div>

          {currentReq ? (
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Borrower:</span>
                <span className="text-sm font-semibold text-slate-800">
                  {currentReq.requestedBy}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Equipment:</span>
                <span className="text-sm font-semibold text-blue-600">
                  {currentReq.assignedEquipmentName || 'Projector'} {currentReq.assignedEquipmentId || 'EQ-001'}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Schedule:</span>
                <span className="text-slate-700 font-medium">
                  {currentReq.dateOfUse} · {currentReq.timeFrom}–{currentReq.timeTo}
                </span>
              </div>

              <div className="pt-2">
                <StatusBadge status={currentReq.status === 'Assigned' ? 'In Use' : currentReq.status} />
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400">No request selected</div>
          )}
        </div>

        {/* Transaction action */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="mb-4 pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">
                Transaction action
              </h3>
            </div>

            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Record physical release of equipment upon student check-out, or record return verification.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleDoCheckOut}
                className="flex-1 py-2.5 px-4 bg-[#1b62b3] hover:bg-[#165297] text-white text-xs font-semibold rounded-lg shadow-xs transition"
              >
                Record Check-Out
              </button>

              <button
                type="button"
                onClick={handleDoReturn}
                className="flex-1 py-2.5 px-4 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition"
              >
                Record Return
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Return condition card (Page 16) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-800">
            Return condition
          </h3>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <span className="block font-semibold text-slate-700 mb-1.5">
              Condition after use: Good / With reported issue
            </span>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                <input
                  type="radio"
                  name="condition"
                  checked={returnCondition === 'Good'}
                  onChange={() => setReturnCondition('Good')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Good</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                <input
                  type="radio"
                  name="condition"
                  checked={returnCondition === 'With reported issue'}
                  onChange={() => setReturnCondition('With reported issue')}
                  className="text-rose-600 focus:ring-rose-500"
                />
                <span>With reported issue</span>
              </label>
            </div>
          </div>

          <div>
            <span className="block font-semibold text-slate-700 mb-1.5">
              Remarks:
            </span>
            <input
              type="text"
              value={returnRemarks}
              onChange={(e) => setReturnRemarks(e.target.value)}
              placeholder="e.g. Returned with all cables and intact remote"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={handleDoReturn}
              className="px-6 py-2.5 bg-[#1b62b3] hover:bg-[#165297] text-white text-xs font-semibold rounded-lg shadow-xs transition"
            >
              Save Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
