import React from 'react';
import { BorrowRequest } from '../../types/equiplink';
import { StatusBadge } from '../StatusBadge';
import { ArrowLeft } from 'lucide-react';

interface UserRequestDetailsViewProps {
  request: BorrowRequest;
  onBack: () => void;
}

export const UserRequestDetailsView: React.FC<UserRequestDetailsViewProps> = ({
  request,
  onBack,
}) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top 2 Cards: Request details & Request status (Page 6) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Request details */}
        <div className="md:col-span-2 bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
          <div className="mb-5 pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800">
              Request details
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <div>
              <span className="text-xs text-slate-400 font-medium block">
                Request ID
              </span>
              <span className="font-bold text-slate-800 mt-0.5 block">
                {request.id}
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-medium block">
                Purpose
              </span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                {request.purpose}
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-medium block">
                Date and Time
              </span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                {request.dateOfUse} · {request.timeFrom}–{request.timeTo}
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-medium block">
                Section / Department
              </span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                {request.sectionDepartment}
              </span>
            </div>

            <div className="col-span-2">
              <span className="text-xs text-slate-400 font-medium block">
                Requested by
              </span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                {request.requestedBy}
              </span>
            </div>

            {request.additionalRemarks && (
              <div className="col-span-2 pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-400 font-medium block">
                  Additional Remarks
                </span>
                <span className="text-xs text-slate-600 mt-0.5 block italic">
                  {request.additionalRemarks}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Request status */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">
                Request status
              </h3>
            </div>

            <div className="mb-5">
              <StatusBadge status={request.status} />
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div>
                <span className="text-slate-400">Staff approval: </span>
                <span className="font-semibold text-slate-700">
                  {request.staffApproval}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Director approval: </span>
                <span className="font-semibold text-slate-700">
                  {request.directorApproval}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Card: Assigned equipment (Page 6) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-800">
            Assigned equipment
          </h3>
        </div>

        {request.assignedEquipmentName ? (
          <div>
            <div className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span>{request.assignedEquipmentName}</span>
              <span className="text-slate-300">•</span>
              <span className="text-blue-600 font-mono text-base">
                {request.assignedEquipmentId}
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Assigned by {request.assignedBy || 'ICT Staff'}
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-500 italic py-2">
            No equipment assigned yet. ICT Staff assigns equipment after
            approvals are completed.
          </div>
        )}
      </div>

      {/* Back button (Page 6) */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to My Requests</span>
        </button>
      </div>
    </div>
  );
};
