import React, { useState } from 'react';
import {
  Role,
  UserProfile,
  BorrowRequest,
  Equipment,
  BorrowRecord,
  NotificationItem,
} from './types/equiplink';
import {
  INITIAL_USERS,
  INITIAL_EQUIPMENT,
  INITIAL_REQUESTS,
  INITIAL_BORROW_RECORDS,
  INITIAL_NOTIFICATIONS,
} from './data/initialData';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginView } from './components/LoginView';
import { JavaCodeViewerModal } from './components/JavaCodeViewerModal';

// User Views
import { UserHomeView } from './components/user/UserHomeView';
import { UserRequestEquipmentView } from './components/user/UserRequestEquipmentView';
import { UserEquipmentAvailabilityView } from './components/user/UserEquipmentAvailabilityView';
import { UserMyRequestsView } from './components/user/UserMyRequestsView';
import { UserRequestDetailsView } from './components/user/UserRequestDetailsView';
import { UserBorrowingHistoryView } from './components/user/UserBorrowingHistoryView';
import { UserNotificationsView } from './components/user/UserNotificationsView';
import { UserSettingsView } from './components/user/UserSettingsView';

// Staff Views
import { StaffDashboardView } from './components/staff/StaffDashboardView';
import { StaffEquipmentManagementView } from './components/staff/StaffEquipmentManagementView';
import { StaffPendingRequestsView } from './components/staff/StaffPendingRequestsView';
import { StaffApprovalManagementView } from './components/staff/StaffApprovalManagementView';
import { StaffEquipmentAssignmentView } from './components/staff/StaffEquipmentAssignmentView';
import { StaffBorrowingReturnView } from './components/staff/StaffBorrowingReturnView';

// Director Views
import { DirectorDashboardView } from './components/director/DirectorDashboardView';
import { DirectorPendingApprovalsView } from './components/director/DirectorPendingApprovalsView';
import { DirectorRequestDetailsView } from './components/director/DirectorRequestDetailsView';
import { DirectorApprovalHistoryView } from './components/director/DirectorApprovalHistoryView';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentRole, setCurrentRole] = useState<Role>('USER');
  const [activeNav, setActiveNav] = useState('user_home');

  // Application Data States
  const [users, setUsers] = useState<UserProfile[]>(INITIAL_USERS);
  const [requests, setRequests] = useState<BorrowRequest[]>(INITIAL_REQUESTS);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(INITIAL_EQUIPMENT);
  const [borrowRecords, setBorrowRecords] = useState<BorrowRecord[]>(INITIAL_BORROW_RECORDS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Active request for detail views
  const [selectedRequestId, setSelectedRequestId] = useState<string>('REQ-001');

  // Java Code Viewer Modal
  const [isJavaModalOpen, setIsJavaModalOpen] = useState(false);

  // Get current user profile
  const currentUser =
    users.find((u) => u.role === currentRole) || users[0];

  const unreadNotifsCount = notifications.filter(
    (n) => !n.read && (n.roleTarget === currentRole || n.roleTarget === 'ALL')
  ).length;

  // Handle Role Switching
  const handleSwitchRole = (newRole: Role) => {
    setCurrentRole(newRole);
    if (newRole === 'USER') {
      setActiveNav('user_home');
    } else if (newRole === 'ICT_STAFF') {
      setActiveNav('staff_dashboard');
    } else {
      setActiveNav('director_dashboard');
    }
  };

  const handleLogin = (role: Role, username: string) => {
    setCurrentRole(role);
    setIsLoggedIn(true);
    if (role === 'USER') {
      setActiveNav('user_home');
    } else if (role === 'ICT_STAFF') {
      setActiveNav('staff_dashboard');
    } else {
      setActiveNav('director_dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Submit Request Workflow (User)
  const handleSubmitNewRequest = (formData: {
    purpose: string;
    dateOfUse: string;
    timeFrom: string;
    timeTo: string;
    sectionDepartment: string;
    requestedBy: string;
    additionalRemarks?: string;
  }) => {
    const newId = `REQ-${String(requests.length + 1).padStart(3, '0')}`;
    const newReq: BorrowRequest = {
      id: newId,
      purpose: formData.purpose,
      dateOfUse: formData.dateOfUse,
      timeFrom: formData.timeFrom,
      timeTo: formData.timeTo,
      sectionDepartment: formData.sectionDepartment,
      requestedBy: formData.requestedBy,
      requesterUsername: currentUser.username,
      additionalRemarks: formData.additionalRemarks,
      status: 'Pending',
      staffApproval: 'Pending',
      directorApproval: 'Pending',
      createdAt: 'Just now',
    };

    setRequests([newReq, ...requests]);

    // Add Staff Notification
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'New borrowing request',
      message: `${newId} is waiting for staff review.`,
      timestamp: 'Just now',
      badge: 'Action',
      roleTarget: 'ICT_STAFF',
      read: false,
      requestId: newId,
    };
    setNotifications([newNotif, ...notifications]);
  };

  // Staff Approval Action
  const handleStaffApprove = (reqId: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? {
              ...r,
              staffApproval: 'Complete',
              staffReviewedBy: 'Maria Santos',
              staffReviewDate: 'Apr 25, 2026',
              status: 'Director Approval',
            }
          : r
      )
    );

    // Notify Director
    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        title: 'Final approval required',
        message: `${reqId} is ready for your review.`,
        timestamp: 'Just now',
        badge: 'Update',
        roleTarget: 'CAMPUS_DIRECTOR',
        read: false,
        requestId: reqId,
      },
      ...prev,
    ]);
  };

  // Staff Rejection Action
  const handleStaffReject = (reqId: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? {
              ...r,
              staffApproval: 'Rejected',
              staffReviewedBy: 'Maria Santos',
              status: 'Rejected',
            }
          : r
      )
    );
  };

  // Director Approval Action
  const handleDirectorApprove = (reqId: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? {
              ...r,
              directorApproval: 'Complete',
              directorReviewedBy: 'Campus Director',
              directorReviewDate: 'Apr 25, 2026',
              status: 'Approved',
            }
          : r
      )
    );

    // Notify User
    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        title: 'Request approved',
        message: `Your request ${reqId} has been approved.`,
        timestamp: 'Just now',
        badge: 'Update',
        roleTarget: 'USER',
        read: false,
        requestId: reqId,
      },
      ...prev,
    ]);
  };

  // Director Rejection Action
  const handleDirectorReject = (reqId: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? {
              ...r,
              directorApproval: 'Rejected',
              directorReviewedBy: 'Campus Director',
              status: 'Rejected',
            }
          : r
      )
    );
  };

  // Equipment Assignment Action (Staff)
  const handleConfirmAssignment = (reqId: string, equipmentId: string) => {
    const assignedEq = equipmentList.find((e) => e.id === equipmentId);
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? {
              ...r,
              assignedEquipmentId: equipmentId,
              assignedEquipmentName: assignedEq ? assignedEq.name : 'Equipment',
              assignedBy: 'ICT Staff',
              status: 'Assigned',
            }
          : r
      )
    );

    setEquipmentList((prev) =>
      prev.map((e) =>
        e.id === equipmentId ? { ...e, status: 'Reserved' } : e
      )
    );
  };

  // Check-Out Action
  const handleCheckOut = (reqId: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? {
              ...r,
              status: 'In Use',
              checkOutDate: 'Apr 25, 2026 · 8:00 AM',
            }
          : r
      )
    );
    const targetReq = requests.find((r) => r.id === reqId);
    if (targetReq?.assignedEquipmentId) {
      setEquipmentList((prev) =>
        prev.map((e) =>
          e.id === targetReq.assignedEquipmentId ? { ...e, status: 'In Use' } : e
        )
      );
    }
  };

  // Return Action
  const handleReturnEquipment = (
    reqId: string,
    condition: 'Good' | 'With reported issue',
    remarks: string
  ) => {
    const targetReq = requests.find((r) => r.id === reqId);
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? {
              ...r,
              status: 'Completed',
              actualReturnTime: '10:00 AM',
              returnCondition: condition,
              returnRemarks: remarks,
            }
          : r
      )
    );

    if (targetReq?.assignedEquipmentId) {
      setEquipmentList((prev) =>
        prev.map((e) =>
          e.id === targetReq.assignedEquipmentId
            ? {
                ...e,
                status: condition === 'With reported issue' ? 'Under Maintenance' : 'Available',
                condition: condition === 'With reported issue' ? `Issue: ${remarks}` : 'Good',
              }
            : e
        )
      );
    }

    // Add Completed Record to Borrowing History
    if (targetReq) {
      const newRec: BorrowRecord = {
        id: `BR-${Date.now()}`,
        date: targetReq.dateOfUse,
        borrower: targetReq.requestedBy,
        equipment: targetReq.assignedEquipmentName || 'Projector',
        equipmentId: targetReq.assignedEquipmentId,
        purpose: targetReq.purpose,
        returnTime: '10:00 AM',
        status: 'Completed',
        remarks: remarks,
      };
      setBorrowRecords([newRec, ...borrowRecords]);
    }
  };

  // Inventory Management Actions
  const handleAddEquipment = (newEq: Omit<Equipment, 'id'> & { id?: string }) => {
    const eqItem: Equipment = {
      id: newEq.id || `EQ-${String(equipmentList.length + 1).padStart(3, '0')}`,
      name: newEq.name,
      category: newEq.category,
      status: newEq.status,
      location: newEq.location,
      condition: 'Good',
    };
    setEquipmentList([...equipmentList, eqItem]);
  };

  const handleUpdateEquipment = (updatedEq: Equipment) => {
    setEquipmentList((prev) =>
      prev.map((e) => (e.id === updatedEq.id ? updatedEq : e))
    );
  };

  // Profile Update
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.role === currentRole ? { ...u, ...updated } : u
      )
    );
  };

  // Page Header Labels matching PDF wireframes exactly
  const getHeaderInfo = () => {
    switch (activeNav) {
      // User Screens (Pages 2-9)
      case 'user_home':
        return {
          title: 'Home',
          subtitle: 'Overview of your equipment requests',
        };
      case 'user_request':
        return {
          title: 'Request Equipment',
          subtitle: 'Submit a paperless borrowing request',
        };
      case 'user_availability':
        return {
          title: 'Equipment Availability',
          subtitle: 'Check available schedules before submitting a request',
        };
      case 'user_my_requests':
        return {
          title: 'My Requests',
          subtitle: 'Track the progress of your submitted requests',
        };
      case 'user_details':
        return {
          title: 'Request Details',
          subtitle: 'View the details and approval status of a request',
        };
      case 'user_history':
        return {
          title: 'Borrowing History',
          subtitle: 'Review your completed borrowing transactions',
        };
      case 'user_notifications':
        return {
          title: 'Notifications',
          subtitle: 'Important updates about your requests and schedules',
        };
      case 'user_settings':
        return {
          title: 'Settings',
          subtitle: 'Manage your account preferences',
        };

      // ICT Staff Screens (Pages 10-19)
      case 'staff_dashboard':
        return {
          title: 'Dashboard',
          subtitle: 'Overview of equipment and borrowing activity',
        };
      case 'staff_equipment':
        return {
          title: 'Equipment Management',
          subtitle: 'Manage equipment records and status',
        };
      case 'staff_availability':
        return {
          title: 'Availability & Scheduling',
          subtitle: 'View and manage equipment schedules',
        };
      case 'staff_pending':
        return {
          title: 'Pending Requests',
          subtitle: 'Review incoming equipment requests',
        };
      case 'staff_approval':
        return {
          title: 'Approval Management',
          subtitle: 'Approve or reject requests within your authority',
        };
      case 'staff_assignment':
        return {
          title: 'Equipment Assignment',
          subtitle: 'Assign available equipment to approved requests',
        };
      case 'staff_return':
        return {
          title: 'Borrowing & Return',
          subtitle: 'Record equipment release and return',
        };
      case 'staff_history':
        return {
          title: 'Borrowing History',
          subtitle: 'Review previous borrowing transactions',
        };
      case 'staff_notifications':
        return {
          title: 'Notifications',
          subtitle: 'Requests and transactions requiring attention',
        };
      case 'staff_settings':
        return {
          title: 'Settings',
          subtitle: 'Manage staff account information',
        };

      // Campus Director Screens (Pages 20-25)
      case 'director_dashboard':
        return {
          title: 'Dashboard',
          subtitle: 'Overview of requests requiring final approval',
        };
      case 'director_pending':
        return {
          title: 'Pending Final Approvals',
          subtitle: 'Review staff-approved requests',
        };
      case 'director_details':
        return {
          title: 'Request Details',
          subtitle: 'Review request information and staff decision',
        };
      case 'director_history':
        return {
          title: 'Approval History',
          subtitle: 'View previous final approval decisions',
        };
      case 'director_notifications':
        return {
          title: 'Notifications',
          subtitle: 'Updates about requests requiring final approval',
        };
      case 'director_settings':
        return {
          title: 'Settings',
          subtitle: 'Manage account information',
        };

      default:
        return {
          title: 'EquipLink',
          subtitle: 'Campus Equipment Borrowing and Approval Management System',
        };
    }
  };

  const headerInfo = getHeaderInfo();

  if (!isLoggedIn) {
    return (
      <>
        <LoginView
          onLogin={handleLogin}
          onOpenJavaModal={() => setIsJavaModalOpen(true)}
        />
        <JavaCodeViewerModal
          isOpen={isJavaModalOpen}
          onClose={() => setIsJavaModalOpen(false)}
        />
      </>
    );
  }

  const selectedRequest =
    requests.find((r) => r.id === selectedRequestId) || requests[0];

  return (
    <div className="min-h-screen flex bg-[#f4f7fb] text-slate-800 font-sans antialiased">
      {/* Dark Navy Blue Sidebar (Pages 2, 10, 20) */}
      <Sidebar
        currentRole={currentRole}
        activeNav={activeNav}
        onNavigate={(navId) => setActiveNav(navId)}
        onSwitchRole={handleSwitchRole}
        onOpenJavaModal={() => setIsJavaModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-y-auto">
        {/* Top Header */}
        <Header
          title={headerInfo.title}
          subtitle={headerInfo.subtitle}
          currentUser={currentUser}
          unreadNotifsCount={unreadNotifsCount}
          onOpenJavaModal={() => setIsJavaModalOpen(true)}
          onGoToNotifications={() => {
            if (currentRole === 'USER') setActiveNav('user_notifications');
            else if (currentRole === 'ICT_STAFF') setActiveNav('staff_notifications');
            else setActiveNav('director_notifications');
          }}
          onGoToSettings={() => {
            if (currentRole === 'USER') setActiveNav('user_settings');
            else if (currentRole === 'ICT_STAFF') setActiveNav('staff_settings');
            else setActiveNav('director_settings');
          }}
        />

        {/* Content Body Container */}
        <main className="p-8 flex-1">
          {/* USER VIEWS */}
          {activeNav === 'user_home' && (
            <UserHomeView
              requests={requests}
              equipmentList={equipmentList}
              onNavigate={(navId) => setActiveNav(navId)}
              onViewRequestDetails={(reqId) => {
                setSelectedRequestId(reqId);
                setActiveNav('user_details');
              }}
            />
          )}

          {activeNav === 'user_request' && (
            <UserRequestEquipmentView
              currentUser={currentUser}
              onSubmitRequest={handleSubmitNewRequest}
              onCancel={() => setActiveNav('user_my_requests')}
            />
          )}

          {activeNav === 'user_availability' && (
            <UserEquipmentAvailabilityView />
          )}

          {activeNav === 'user_my_requests' && (
            <UserMyRequestsView
              requests={requests}
              onViewDetails={(reqId) => {
                setSelectedRequestId(reqId);
                setActiveNav('user_details');
              }}
            />
          )}

          {activeNav === 'user_details' && (
            <UserRequestDetailsView
              request={selectedRequest}
              onBack={() => setActiveNav('user_my_requests')}
            />
          )}

          {activeNav === 'user_history' && (
            <UserBorrowingHistoryView records={borrowRecords} />
          )}

          {activeNav === 'user_notifications' && (
            <UserNotificationsView notifications={notifications} />
          )}

          {activeNav === 'user_settings' && (
            <UserSettingsView
              currentUser={currentUser}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {/* ICT STAFF VIEWS */}
          {activeNav === 'staff_dashboard' && (
            <StaffDashboardView
              requests={requests}
              equipmentList={equipmentList}
              onNavigate={(navId) => setActiveNav(navId)}
            />
          )}

          {activeNav === 'staff_equipment' && (
            <StaffEquipmentManagementView
              equipmentList={equipmentList}
              onAddEquipment={handleAddEquipment}
              onUpdateEquipment={handleUpdateEquipment}
            />
          )}

          {activeNav === 'staff_availability' && (
            <UserEquipmentAvailabilityView />
          )}

          {activeNav === 'staff_pending' && (
            <StaffPendingRequestsView
              requests={requests}
              onReviewRequest={(reqId) => {
                setSelectedRequestId(reqId);
                setActiveNav('staff_approval');
              }}
            />
          )}

          {activeNav === 'staff_approval' && (
            <StaffApprovalManagementView
              requests={requests}
              selectedRequestId={selectedRequestId}
              onStaffApprove={handleStaffApprove}
              onStaffReject={handleStaffReject}
            />
          )}

          {activeNav === 'staff_assignment' && (
            <StaffEquipmentAssignmentView
              requests={requests}
              equipmentList={equipmentList}
              onConfirmAssignment={handleConfirmAssignment}
            />
          )}

          {activeNav === 'staff_return' && (
            <StaffBorrowingReturnView
              requests={requests}
              onCheckOut={handleCheckOut}
              onReturnEquipment={handleReturnEquipment}
            />
          )}

          {activeNav === 'staff_history' && (
            <UserBorrowingHistoryView records={borrowRecords} />
          )}

          {activeNav === 'staff_notifications' && (
            <UserNotificationsView notifications={notifications} />
          )}

          {activeNav === 'staff_settings' && (
            <UserSettingsView
              currentUser={currentUser}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {/* CAMPUS DIRECTOR VIEWS */}
          {activeNav === 'director_dashboard' && (
            <DirectorDashboardView
              requests={requests}
              onViewRequest={(reqId) => {
                setSelectedRequestId(reqId);
                setActiveNav('director_details');
              }}
              onNavigate={(navId) => setActiveNav(navId)}
            />
          )}

          {activeNav === 'director_pending' && (
            <DirectorPendingApprovalsView
              requests={requests}
              onViewRequest={(reqId) => {
                setSelectedRequestId(reqId);
                setActiveNav('director_details');
              }}
            />
          )}

          {activeNav === 'director_details' && (
            <DirectorRequestDetailsView
              request={selectedRequest}
              onApprove={handleDirectorApprove}
              onReject={handleDirectorReject}
              onBack={() => setActiveNav('director_pending')}
            />
          )}

          {activeNav === 'director_history' && (
            <DirectorApprovalHistoryView />
          )}

          {activeNav === 'director_notifications' && (
            <UserNotificationsView notifications={notifications} />
          )}

          {activeNav === 'director_settings' && (
            <UserSettingsView
              currentUser={currentUser}
              onUpdateProfile={handleUpdateProfile}
            />
          )}
        </main>
      </div>

      {/* Java Codebase Explorer Modal */}
      <JavaCodeViewerModal
        isOpen={isJavaModalOpen}
        onClose={() => setIsJavaModalOpen(false)}
      />
    </div>
  );
}
