import React, { useState } from 'react';
import { BorrowRequest } from '../../types/equiplink';
import { StatusBadge } from '../StatusBadge';
import { CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

interface DirectorRequestDetailsViewProps {
  request: BorrowRequest;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
  onBack: () => void;
}

export const DirectorRequestDetailsView: React.FC<DirectorRequestDetailsViewProps> = ({
  request,
  onApprove,
  onReject,
  onBack,
}) => {
  const [actionComplete, setActionComplete] = useState<string | null>(null);

  const handleApprove = () => {
    onApprove(request.id);
    setActionComplete('approved');
  };

  const handleReject = () => {
    onReject(request.id);
    setActionComplete('rejected');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Pending Approvals</span>
        </button>

        {actionComplete && (
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              actionComplete === 'approved'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            {actionComplete === 'approved'
              ? 'Request Granted Director Approval!'
              : 'Request Rejected by Director.'}
          </span>
        )}
      </div>

      {/* Two Column Layout (Page 22) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Request details */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
          <div className="mb-4 pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800">
              Request details
            </h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium">Request ID</span>
              <span className="font-bold text-slate-800">{request.id}</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium">Purpose</span>
              <span className="font-semibold text-slate-800">
                {request.purpose}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium">Date and Time</span>
              <span className="font-medium text-slate-700">
                {request.dateOfUse} · {request.timeFrom}–{request.timeTo}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium">
                Section / Department
              </span>
              <span className="font-medium text-slate-700">
                {request.sectionDepartment}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium">Requested by</span>
              <span className="font-medium text-slate-700">
                {request.requestedBy}
              </span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-slate-400 font-medium">Staff decision</span>
              <span className="font-semibold text-emerald-600">Approved</span>
            </div>
          </div>
        </div>

        {/* Right: Approval history */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">
                Approval history
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                  Staff Approved
                </span>
                <p className="text-slate-500">
                  Reviewed by: <b className="text-slate-700">{request.staffReviewedBy || 'ICT Staff'}</b>
                </p>
                <p className="text-slate-400 mt-0.5">
                  Date: {request.staffReviewDate || 'Apr 24, 2026'}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-slate-400">Final decision: </span>
                <span className="font-semibold text-amber-600">
                  {request.directorApproval === 'Complete'
                    ? 'Approved'
                    : request.directorApproval === 'Rejected'
                    ? 'Rejected'
                    : 'Pending'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Approve / Reject (Page 22) */}
          <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
            <button
              onClick={handleApprove}
              className="flex-1 py-2.5 px-4 bg-[#1b62b3] hover:bg-[#165297] text-white text-xs font-semibold rounded-lg shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve</span>
            </button>

            <button
              onClick={handleReject}
              className="flex-1 py-2.5 px-4 border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5"
            >
              <XCircle className="w-4 h-4" />
              <span>Reject</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
