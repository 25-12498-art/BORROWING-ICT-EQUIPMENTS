import React from 'react';
import { EquipmentStatus, RequestStatus } from '../types/equiplink';

interface StatusBadgeProps {
  status: EquipmentStatus | RequestStatus | 'Completed' | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getBadgeStyle = (val: string) => {
    switch (val) {
      case 'Available':
      case 'Approved':
      case 'Completed':
      case 'Complete':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Reserved':
      case 'Staff Review':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'In Use':
      case 'Pending':
      case 'Director Approval':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Unavailable':
      case 'Rejected':
      case 'Under Maintenance':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Assigned':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const sizeClasses =
    size === 'sm' ? 'px-2 py-0.5 text-xs font-semibold' : 'px-3 py-1 text-xs font-semibold';

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border transition-colors ${sizeClasses} ${getBadgeStyle(
        status
      )}`}
    >
      {status}
    </span>
  );
};
