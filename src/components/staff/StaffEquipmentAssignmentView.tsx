import React, { useState } from 'react';
import { BorrowRequest, Equipment } from '../../types/equiplink';
import { StatusBadge } from '../StatusBadge';
import { Check, CheckCircle2 } from 'lucide-react';

interface StaffEquipmentAssignmentViewProps {
  requests: BorrowRequest[];
  equipmentList: Equipment[];
  onConfirmAssignment: (requestId: string, equipmentId: string) => void;
}

export const StaffEquipmentAssignmentView: React.FC<StaffEquipmentAssignmentViewProps> = ({
  requests,
  equipmentList,
  onConfirmAssignment,
}) => {
  // Requests that have reached Approved status or Assigned
  const approvedRequests = requests.filter(
    (r) => r.status === 'Approved' || r.status === 'Assigned'
  );

  const [selectedReqId, setSelectedReqId] = useState<string>(
    approvedRequests[0]?.id || 'REQ-001'
  );
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string>('EQ-001');
  const [assignmentSuccess, setAssignmentSuccess] = useState(false);

  const activeRequest =
    approvedRequests.find((r) => r.id === selectedReqId) || approvedRequests[0];

  const availableEquipment = equipmentList.filter(
    (e) => e.status === 'Available' || e.id === activeRequest?.assignedEquipmentId
  );

  const handleConfirm = () => {
    if (activeRequest && selectedEquipmentId) {
      onConfirmAssignment(activeRequest.id, selectedEquipmentId);
      setAssignmentSuccess(true);
      setTimeout(() => setAssignmentSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Select approved request bar (Page 15) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          Select approved request
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Request:</span>
            <select
              value={selectedReqId}
              onChange={(e) => setSelectedReqId(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-800 font-semibold focus:ring-1 focus:ring-blue-500"
            >
              {approvedRequests.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.id} — {r.requestedBy} ({r.purpose})
                </option>
              ))}
            </select>
          </div>

          {activeRequest && (
            <div className="text-slate-500 flex items-center gap-4">
              <span>
                Borrower: <b className="text-slate-800">{activeRequest.requestedBy}</b>
              </span>
              <span>
                Purpose: <b className="text-slate-800">{activeRequest.purpose}</b>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Two Column Layout: Request Schedule & Available Equipment (Page 15) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Request schedule */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">
                Request schedule
              </h3>
            </div>

            {activeRequest ? (
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Date:</span>
                  <span className="text-sm font-semibold text-slate-800">
                    {activeRequest.dateOfUse}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Time:</span>
                  <span className="text-sm font-semibold text-slate-800">
                    {activeRequest.timeFrom}–{activeRequest.timeTo}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">Status:</span>
                  <div className="mt-1">
                    <StatusBadge status={activeRequest.status} />
                  </div>
                </div>

                {activeRequest.assignedEquipmentId && (
                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-slate-400 block font-medium">
                      Currently Assigned:
                    </span>
                    <span className="font-semibold text-blue-600 text-sm">
                      {activeRequest.assignedEquipmentName} ({activeRequest.assignedEquipmentId})
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs text-slate-400">No request selected</div>
            )}
          </div>
        </div>

        {/* Right: Available equipment */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">
                Available equipment
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-semibold text-slate-400">
                    <th className="py-2.5 px-3">Equipment</th>
                    <th className="py-2.5 px-3">ID</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {availableEquipment.map((eq) => {
                    const isSelected = selectedEquipmentId === eq.id;
                    return (
                      <tr
                        key={eq.id}
                        onClick={() => setSelectedEquipmentId(eq.id)}
                        className={`cursor-pointer transition ${
                          isSelected
                            ? 'bg-blue-50/70'
                            : 'hover:bg-slate-50/60'
                        }`}
                      >
                        <td className="py-3 px-3 font-medium text-slate-800">
                          {eq.name}
                        </td>
                        <td className="py-3 px-3 font-mono text-xs font-semibold text-blue-600">
                          {eq.id}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEquipmentId(eq.id);
                            }}
                            className={`px-3 py-1 rounded text-xs font-semibold transition ${
                              isSelected
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            {isSelected ? 'Selected' : 'Select'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Confirm Assignment Button (Page 15) */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            {assignmentSuccess ? (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Equipment Assigned Successfully!
              </span>
            ) : (
              <span className="text-xs text-slate-500">
                Selected: <b className="text-slate-800">{selectedEquipmentId}</b>
              </span>
            )}

            <button
              onClick={handleConfirm}
              className="px-6 py-2.5 bg-[#1b62b3] hover:bg-[#165297] text-white text-xs font-semibold rounded-lg shadow-xs transition"
            >
              Confirm Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
