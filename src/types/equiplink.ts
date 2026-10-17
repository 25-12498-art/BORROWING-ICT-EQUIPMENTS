export type Role = 'USER' | 'ICT_STAFF' | 'CAMPUS_DIRECTOR';

export type RequestStatus =
  | 'Pending'
  | 'Staff Review'
  | 'Director Approval'
  | 'Approved'
  | 'Assigned'
  | 'In Use'
  | 'Completed'
  | 'Rejected';

export type EquipmentStatus =
  | 'Available'
  | 'Reserved'
  | 'In Use'
  | 'Unavailable'
  | 'Under Maintenance';

export interface UserProfile {
  id: string;
  fullName: string;
  username: string;
  role: Role;
  roleLabel: string;
  department: string;
  email: string;
}

export interface Equipment {
  id: string; // e.g. "EQ-001"
  name: string; // "Projector"
  category: string; // "Projector", "TV", "View Board", "Speaker", "Laptop"
  status: EquipmentStatus;
  location: string; // "ICT Room", "AV Room", "Room 101"
  condition?: string; // "Good", "Needs maintenance"
  serialNumber?: string;
  description?: string;
}

export interface BorrowRequest {
  id: string; // e.g. "REQ-001"
  purpose: string; // "Class Lecture", "Meeting", "Presentation", "Activity"
  dateOfUse: string; // "Apr 25, 2026"
  timeFrom: string; // "8:00 AM"
  timeTo: string; // "10:00 AM"
  sectionDepartment: string; // "BSIT - 2A"
  requestedBy: string; // "John Doe"
  requesterUsername: string; // "johndoe"
  additionalRemarks?: string;
  status: RequestStatus;
  staffApproval: 'Pending' | 'Complete' | 'Rejected';
  staffReviewedBy?: string;
  staffReviewDate?: string;
  directorApproval: 'Pending' | 'Complete' | 'Rejected';
  directorReviewedBy?: string;
  directorReviewDate?: string;
  assignedEquipmentId?: string;
  assignedEquipmentName?: string;
  assignedBy?: string;
  checkOutDate?: string;
  actualReturnTime?: string;
  returnCondition?: 'Good' | 'With reported issue';
  returnRemarks?: string;
  createdAt: string;
}

export interface BorrowRecord {
  id: string;
  date: string;
  borrower: string;
  equipment: string;
  equipmentId?: string;
  purpose: string;
  returnTime: string;
  status: 'Completed';
  remarks?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  badge: 'Update' | 'Action';
  roleTarget: Role | 'ALL';
  read: boolean;
  requestId?: string;
}

export interface TimeSlotAvailability {
  equipmentName: string;
  slots: {
    timeSlot: '8–10 AM' | '10–12 PM' | '1–3 PM' | '3–5 PM';
    status: EquipmentStatus;
  }[];
}
