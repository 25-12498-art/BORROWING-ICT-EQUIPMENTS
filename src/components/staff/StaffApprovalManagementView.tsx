import React, { useState } from 'react';
import { BorrowRequest } from '../../types/equiplink';
import { StatusBadge } from '../StatusBadge';
import { CheckCircle2, XCircle } from 'lucide-react';

interface StaffApprovalManagementViewProps {
  requests: BorrowRequest[];
  selectedRequestId?: string;
  onStaffApprove: (requestId: string) => void;
  onStaffReject: (requestId: string) => void;
}

export const StaffApprovalManagementView: React.FC<StaffApprovalManagementViewProps> = ({
  requests,
  selectedRequestId,
  onStaffApprove,
  onStaffReject,
}) => {
  const [activeReqId, setActiveReqId] = useState<string>(
    selectedRequestId || 'REQ-008'
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Candidates for Staff decision
  const pendingStaffList = requests.filter(
    (r) =>
      r.status === 'Pending' ||
      r.status === 'Staff Review' ||
      r.staffApproval === 'Pending'
  );

  const selectedRequest =
    requests.find((r) => r.id === activeReqId) || pendingStaffList[0];

  return (
    <div className="space-y-6">
      {/* Approval queue search bar (Page 14) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-800 uppercase tracking-wider">
              Approval queue
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-500 font-medium">Queue:</span>
            <span className="font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
              Staff Review
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Search:</span>
            <input
              type="text"
              placeholder="Search request..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs placeholder-slate-400 focus:ring-1 focus:ring-blue-500 w-52"
            />
          </div>
        </div>
      </div>

      {/* Two Column Layout (Page 14) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Requests awaiting staff decision */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 shadow-xs p-6">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-800">
              Requests awaiting staff decision
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-400">
                  <th className="py-3 px-3">Request ID</th>
                  <th className="py-3 px-3">Purpose</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pendingStaffList.map((req) => {
                  const isSelected = selectedRequest?.id === req.id;
                  return (
                    <tr
                      key={req.id}
                      onClick={() => setActiveReqId(req.id)}
                      className={`cursor-pointer transition ${
                        isSelected
                          ? 'bg-blue-50/70 border-l-4 border-l-blue-600'
                          : 'hover:bg-slate-50/60'
                      }`}
                    >
                      <td className="py-3.5 px-3 font-mono font-semibold text-blue-600">
                        {req.id}
                      </td>
                      <td className="py-3.5 px-3 font-medium text-slate-800">
                        {req.purpose}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <StatusBadge status="Pending" size="sm" />
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveReqId(req.id);
                          }}
                          className={`px-3 py-1 rounded text-xs font-semibold transition ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (5 cols): Selected request decision card (Page 14) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between">
          {selectedRequest ? (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Selected request
                </span>
                <h3 className="text-lg font-bold text-slate-800">
                  {selectedRequest.id} · {selectedRequest.purpose}
                </h3>
              </div>

              <div className="space-y-3 bg-slate-50/70 p-4 rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Borrower:</span>
                  <span className="font-semibold text-slate-800 text-sm">
                    {selectedRequest.requestedBy}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Schedule:</span>
                  <span className="font-medium text-slate-700">
                    {selectedRequest.dateOfUse} · {selectedRequest.timeFrom}–{selectedRequest.timeTo}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Department:</span>
                  <span className="font-medium text-slate-700">
                    {selectedRequest.sectionDepartment}
                  </span>
                </div>

                {selectedRequest.additionalRemarks && (
                  <div>
                    <span className="text-slate-400 block font-medium">Remarks:</span>
                    <span className="text-slate-600 italic">
                      "{selectedRequest.additionalRemarks}"
                    </span>
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-500 italic">
                Check equipment availability schedule before granting staff approval.
              </p>

              {/* Action Buttons: Approve / Reject (Page 14) */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => onStaffApprove(selectedRequest.id)}
                  className="flex-1 py-2.5 px-4 bg-[#1b62b3] hover:bg-[#165297] text-white text-xs font-semibold rounded-lg shadow-xs transition flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve</span>
                </button>

                <button
                  onClick={() => onStaffReject(selectedRequest.id)}
                  className="flex-1 py-2.5 px-4 border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-xs text-slate-400 py-12">
              No pending requests awaiting staff review.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
