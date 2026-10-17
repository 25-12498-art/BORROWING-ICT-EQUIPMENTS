export interface JavaFile {
  name: string;
  path: string;
  package: string;
  description: string;
  content: string;
}

export const JAVA_PROJECT_FILES: JavaFile[] = [
  {
    name: 'Main.java',
    path: 'src/main/java/com/equiplink/Main.java',
    package: 'com.equiplink',
    description: 'Application entry point that boots the EquipLink GUI or Console interface',
    content: `package com.equiplink;

import com.equiplink.ui.EquipLinkSwingApp;
import javax.swing.SwingUtilities;
import javax.swing.UIManager;

/**
 * EquipLink - Campus Equipment Borrowing and Approval Management System
 * Main entry point.
 */
public class Main {
    public static void main(String[] args) {
        // Set modern system look and feel
        try {
            for (UIManager.LookAndFeelInfo info : UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (Exception ignored) {
            // Default look and feel fallback
        }

        SwingUtilities.invokeLater(() -> {
            EquipLinkSwingApp app = new EquipLinkSwingApp();
            app.setVisible(true);
        });
    }
}
`,
  },
  {
    name: 'Role.java',
    path: 'src/main/java/com/equiplink/model/Role.java',
    package: 'com.equiplink.model',
    description: 'Enumeration of campus user roles for RBAC',
    content: `package com.equiplink.model;

public enum Role {
    STUDENT_INSTRUCTOR("Student / Instructor"),
    ICT_STAFF("ICT Staff"),
    CAMPUS_DIRECTOR("Campus Director");

    private final String displayName;

    Role(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }
}
`,
  },
  {
    name: 'RequestStatus.java',
    path: 'src/main/java/com/equiplink/model/RequestStatus.java',
    package: 'com.equiplink.model',
    description: 'Lifecycle statuses of a borrowing request',
    content: `package com.equiplink.model;

public enum RequestStatus {
    PENDING("Pending"),
    STAFF_REVIEW("Staff Review"),
    DIRECTOR_APPROVAL("Director Approval"),
    APPROVED("Approved"),
    ASSIGNED("Assigned"),
    IN_USE("In Use"),
    COMPLETED("Completed"),
    REJECTED("Rejected");

    private final String label;

    RequestStatus(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    @Override
    public String toString() {
        return label;
    }
}
`,
  },
  {
    name: 'EquipmentStatus.java',
    path: 'src/main/java/com/equiplink/model/EquipmentStatus.java',
    package: 'com.equiplink.model',
    description: 'Current physical status of campus equipment',
    content: `package com.equiplink.model;

public enum EquipmentStatus {
    AVAILABLE("Available"),
    RESERVED("Reserved"),
    IN_USE("In Use"),
    UNAVAILABLE("Unavailable"),
    UNDER_MAINTENANCE("Under Maintenance");

    private final String displayName;

    EquipmentStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }
}
`,
  },
  {
    name: 'User.java',
    path: 'src/main/java/com/equiplink/model/User.java',
    package: 'com.equiplink.model',
    description: 'User entity representing student, instructor, staff, or director',
    content: `package com.equiplink.model;

import java.io.Serializable;

public class User implements Serializable {
    private String id;
    private String fullName;
    private String username;
    private String password;
    private Role role;
    private String department;
    private String email;

    public User() {}

    public User(String id, String fullName, String username, String password, Role role, String department, String email) {
        this.id = id;
        this.fullName = fullName;
        this.username = username;
        this.password = password;
        this.role = role;
        this.department = department;
        this.email = email;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    @Override
    public String toString() {
        return fullName + " (" + role.getDisplayName() + " - " + department + ")";
    }
}
`,
  },
  {
    name: 'Equipment.java',
    path: 'src/main/java/com/equiplink/model/Equipment.java',
    package: 'com.equiplink.model',
    description: 'Inventory item representing campus equipment (Projector, TV, View Board, etc.)',
    content: `package com.equiplink.model;

import java.io.Serializable;

public class Equipment implements Serializable {
    private String id;              // e.g., EQ-001
    private String name;            // e.g., Projector
    private String category;        // e.g., Projector, TV, Audio
    private EquipmentStatus status; // Available, Reserved, In Use, etc.
    private String location;        // e.g., ICT Room, AV Room
    private String condition;       // Good, Needs repair
    private String serialNumber;
    private String description;

    public Equipment() {}

    public Equipment(String id, String name, String category, EquipmentStatus status, String location, String condition, String serialNumber, String description) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.status = status;
        this.location = location;
        this.condition = condition;
        this.serialNumber = serialNumber;
        this.description = description;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public EquipmentStatus getStatus() { return status; }
    public void setStatus(EquipmentStatus status) { this.status = status; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }

    public String getSerialNumber() { return serialNumber; }
    public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    @Override
    public String toString() {
        return id + " - " + name + " [" + status + "] @ " + location;
    }
}
`,
  },
  {
    name: 'BorrowRequest.java',
    path: 'src/main/java/com/equiplink/model/BorrowRequest.java',
    package: 'com.equiplink.model',
    description: 'Model representing paperless equipment borrow request with 2-tier approval workflow',
    content: `package com.equiplink.model;

import java.io.Serializable;
import java.time.LocalDateTime;

public class BorrowRequest implements Serializable {
    private String id;                  // e.g. REQ-001
    private String purpose;             // Class Lecture, Meeting, Presentation, Activity
    private String dateOfUse;           // Apr 25, 2026
    private String timeFrom;            // 8:00 AM
    private String timeTo;              // 10:00 AM
    private String sectionDepartment;   // BSIT - 2A
    private String requestedBy;         // John Doe
    private String requesterUsername;   // johndoe
    private String additionalRemarks;
    private RequestStatus status;

    // Staff approval stage
    private String staffApproval;       // Pending, Complete, Rejected
    private String staffReviewedBy;     // Maria Santos
    private String staffReviewDate;

    // Director approval stage
    private String directorApproval;    // Pending, Complete, Rejected
    private String directorReviewedBy;  // Campus Director
    private String directorReviewDate;

    // Assigned physical equipment
    private String assignedEquipmentId; // EQ-001
    private String assignedEquipmentName;
    private String assignedBy;

    // Borrowing transaction fields
    private String checkOutDate;
    private String actualReturnTime;
    private String returnCondition;     // Good, With reported issue
    private String returnRemarks;
    private String createdAt;

    public BorrowRequest() {
        this.status = RequestStatus.PENDING;
        this.staffApproval = "Pending";
        this.directorApproval = "Pending";
    }

    public BorrowRequest(String id, String purpose, String dateOfUse, String timeFrom, String timeTo,
                         String sectionDepartment, String requestedBy, String requesterUsername,
                         String additionalRemarks) {
        this.id = id;
        this.purpose = purpose;
        this.dateOfUse = dateOfUse;
        this.timeFrom = timeFrom;
        this.timeTo = timeTo;
        this.sectionDepartment = sectionDepartment;
        this.requestedBy = requestedBy;
        this.requesterUsername = requesterUsername;
        this.additionalRemarks = additionalRemarks;
        this.status = RequestStatus.PENDING;
        this.staffApproval = "Pending";
        this.directorApproval = "Pending";
        this.createdAt = "Apr 25, 2026";
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }

    public String getDateOfUse() { return dateOfUse; }
    public void setDateOfUse(String dateOfUse) { this.dateOfUse = dateOfUse; }

    public String getTimeFrom() { return timeFrom; }
    public void setTimeFrom(String timeFrom) { this.timeFrom = timeFrom; }

    public String getTimeTo() { return timeTo; }
    public void setTimeTo(String timeTo) { this.timeTo = timeTo; }

    public String getSectionDepartment() { return sectionDepartment; }
    public void setSectionDepartment(String sectionDepartment) { this.sectionDepartment = sectionDepartment; }

    public String getRequestedBy() { return requestedBy; }
    public void setRequestedBy(String requestedBy) { this.requestedBy = requestedBy; }

    public String getRequesterUsername() { return requesterUsername; }
    public void setRequesterUsername(String requesterUsername) { this.requesterUsername = requesterUsername; }

    public String getAdditionalRemarks() { return additionalRemarks; }
    public void setAdditionalRemarks(String additionalRemarks) { this.additionalRemarks = additionalRemarks; }

    public RequestStatus getStatus() { return status; }
    public void setStatus(RequestStatus status) { this.status = status; }

    public String getStaffApproval() { return staffApproval; }
    public void setStaffApproval(String staffApproval) { this.staffApproval = staffApproval; }

    public String getStaffReviewedBy() { return staffReviewedBy; }
    public void setStaffReviewedBy(String staffReviewedBy) { this.staffReviewedBy = staffReviewedBy; }

    public String getStaffReviewDate() { return staffReviewDate; }
    public void setStaffReviewDate(String staffReviewDate) { this.staffReviewDate = staffReviewDate; }

    public String getDirectorApproval() { return directorApproval; }
    public void setDirectorApproval(String directorApproval) { this.directorApproval = directorApproval; }

    public String getDirectorReviewedBy() { return directorReviewedBy; }
    public void setDirectorReviewedBy(String directorReviewedBy) { this.directorReviewedBy = directorReviewedBy; }

    public String getDirectorReviewDate() { return directorReviewDate; }
    public void setDirectorReviewDate(String directorReviewDate) { this.directorReviewDate = directorReviewDate; }

    public String getAssignedEquipmentId() { return assignedEquipmentId; }
    public void setAssignedEquipmentId(String assignedEquipmentId) { this.assignedEquipmentId = assignedEquipmentId; }

    public String getAssignedEquipmentName() { return assignedEquipmentName; }
    public void setAssignedEquipmentName(String assignedEquipmentName) { this.assignedEquipmentName = assignedEquipmentName; }

    public String getAssignedBy() { return assignedBy; }
    public void setAssignedBy(String assignedBy) { this.assignedBy = assignedBy; }

    public String getCheckOutDate() { return checkOutDate; }
    public void setCheckOutDate(String checkOutDate) { this.checkOutDate = checkOutDate; }

    public String getActualReturnTime() { return actualReturnTime; }
    public void setActualReturnTime(String actualReturnTime) { this.actualReturnTime = actualReturnTime; }

    public String getReturnCondition() { return returnCondition; }
    public void setReturnCondition(String returnCondition) { this.returnCondition = returnCondition; }

    public String getReturnRemarks() { return returnRemarks; }
    public void setReturnRemarks(String returnRemarks) { this.returnRemarks = returnRemarks; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
`,
  },
  {
    name: 'BorrowRecord.java',
    path: 'src/main/java/com/equiplink/model/BorrowRecord.java',
    package: 'com.equiplink.model',
    description: 'Completed borrowing transaction record for audit and history',
    content: `package com.equiplink.model;

import java.io.Serializable;

public class BorrowRecord implements Serializable {
    private String id;
    private String date;
    private String borrower;
    private String equipment;
    private String equipmentId;
    private String purpose;
    private String returnTime;
    private String status;
    private String remarks;

    public BorrowRecord() {
        this.status = "Completed";
    }

    public BorrowRecord(String id, String date, String borrower, String equipment, String equipmentId, String purpose, String returnTime, String remarks) {
        this.id = id;
        this.date = date;
        this.borrower = borrower;
        this.equipment = equipment;
        this.equipmentId = equipmentId;
        this.purpose = purpose;
        this.returnTime = returnTime;
        this.status = "Completed";
        this.remarks = remarks;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getBorrower() { return borrower; }
    public void setBorrower(String borrower) { this.borrower = borrower; }

    public String getEquipment() { return equipment; }
    public void setEquipment(String equipment) { this.equipment = equipment; }

    public String getEquipmentId() { return equipmentId; }
    public void setEquipmentId(String equipmentId) { this.equipmentId = equipmentId; }

    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }

    public String getReturnTime() { return returnTime; }
    public void setReturnTime(String returnTime) { this.returnTime = returnTime; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}
`,
  },
  {
    name: 'NotificationItem.java',
    path: 'src/main/java/com/equiplink/model/NotificationItem.java',
    package: 'com.equiplink.model',
    description: 'Notification item for students, staff, and campus director',
    content: `package com.equiplink.model;

import java.io.Serializable;

public class NotificationItem implements Serializable {
    private String id;
    private String title;
    private String message;
    private String timestamp;
    private String badge; // Update, Action
    private String targetRole; // ALL, USER, ICT_STAFF, CAMPUS_DIRECTOR
    private boolean read;
    private String requestId;

    public NotificationItem() {}

    public NotificationItem(String id, String title, String message, String timestamp, String badge, String targetRole, boolean read, String requestId) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.timestamp = timestamp;
        this.badge = badge;
        this.targetRole = targetRole;
        this.read = read;
        this.requestId = requestId;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public String getTargetRole() { return targetRole; }
    public void setTargetRole(String targetRole) { this.targetRole = targetRole; }

    public boolean isRead() { return read; }
    public void setRead(boolean read) { this.read = read; }

    public String getRequestId() { return requestId; }
    public void setRequestId(String requestId) { this.requestId = requestId; }
}
`,
  },
  {
    name: 'EquipLinkService.java',
    path: 'src/main/java/com/equiplink/service/EquipLinkService.java',
    package: 'com.equiplink.service',
    description: 'Core business service managing request workflows, assignment, check-out and return operations',
    content: `package com.equiplink.service;

import com.equiplink.model.*;
import java.util.*;
import java.util.stream.Collectors;

public class EquipLinkService {
    private static EquipLinkService instance;

    private final List<User> users = new ArrayList<>();
    private final List<Equipment> inventory = new ArrayList<>();
    private final List<BorrowRequest> requests = new ArrayList<>();
    private final List<BorrowRecord> historyRecords = new ArrayList<>();
    private final List<NotificationItem> notifications = new ArrayList<>();

    private int requestCounter = 9;
    private int historyCounter = 105;

    private EquipLinkService() {
        seedInitialData();
    }

    public static synchronized EquipLinkService getInstance() {
        if (instance == null) {
            instance = new EquipLinkService();
        }
        return instance;
    }

    private void seedInitialData() {
        // Users
        users.add(new User("USR-001", "John Doe", "johndoe", "pass123", Role.STUDENT_INSTRUCTOR, "BSIT - 2A", "johndoe@university.edu.ph"));
        users.add(new User("USR-002", "Maria Santos", "m.santos", "staff123", Role.ICT_STAFF, "ICT Office", "msantos@university.edu.ph"));
        users.add(new User("USR-003", "Campus Director", "director", "admin123", Role.CAMPUS_DIRECTOR, "Campus Office", "director@university.edu.ph"));

        // Equipment Inventory (Page 11)
        inventory.add(new Equipment("EQ-001", "Projector", "Projector", EquipmentStatus.AVAILABLE, "ICT Room", "Good", "EPSON-EB-X06-4401", "3600 ANSI Lumens HDMI Projector"));
        inventory.add(new Equipment("EQ-002", "TV", "TV", EquipmentStatus.IN_USE, "AV Room", "Good", "SAMSUNG-55-4K-9921", "55 Inch Smart Screen"));
        inventory.add(new Equipment("EQ-003", "View Board", "View Board", EquipmentStatus.RESERVED, "Room 101", "Good", "VIEWSONIC-IFP6550", "65 Inch Interactive Display"));
        inventory.add(new Equipment("EQ-004", "Speaker", "Speaker", EquipmentStatus.AVAILABLE, "ICT Room", "Good", "JBL-PRX-ONE-3301", "Portable PA Bluetooth Column"));
        inventory.add(new Equipment("EQ-005", "Laptop", "Laptop", EquipmentStatus.UNAVAILABLE, "Room 102", "Battery Servicing", "DELL-LATITUDE-5430", "Core i7 Faculty Laptop"));

        // Requests (Page 5, 10, 13, 20)
        BorrowRequest r1 = new BorrowRequest("REQ-001", "Class Lecture", "Apr 25, 2026", "8:00 AM", "10:00 AM", "BSIT - 2A", "John Doe", "johndoe", "Need HDMI adapter");
        r1.setStatus(RequestStatus.APPROVED);
        r1.setStaffApproval("Complete");
        r1.setDirectorApproval("Complete");
        r1.setAssignedEquipmentId("EQ-001");
        r1.setAssignedEquipmentName("Projector");
        r1.setAssignedBy("ICT Staff");
        requests.add(r1);

        BorrowRequest r2 = new BorrowRequest("REQ-002", "Meeting", "Apr 21, 2026", "10:00 AM", "12:00 PM", "BSIT Faculty", "Jane Santos", "jsantos", "");
        r2.setStatus(RequestStatus.PENDING);
        requests.add(r2);

        BorrowRequest r3 = new BorrowRequest("REQ-003", "Presentation", "Apr 22, 2026", "1:00 PM", "3:00 PM", "BSCS - 3B", "Mark Cruz", "mcruz", "");
        r3.setStatus(RequestStatus.STAFF_REVIEW);
        requests.add(r3);

        BorrowRequest r4 = new BorrowRequest("REQ-004", "Activity", "Apr 23, 2026", "8:00 AM", "5:00 PM", "Student Council", "Paolo Cruz", "pcruz", "");
        r4.setStatus(RequestStatus.REJECTED);
        r4.setStaffApproval("Complete");
        r4.setDirectorApproval("Rejected");
        requests.add(r4);

        BorrowRequest r5 = new BorrowRequest("REQ-005", "Class Lecture", "Apr 24, 2026", "1:00 PM", "3:00 PM", "BSIT - 2A", "Ana Reyes", "areyes", "");
        r5.setStatus(RequestStatus.ASSIGNED);
        r5.setStaffApproval("Complete");
        r5.setDirectorApproval("Complete");
        r5.setAssignedEquipmentId("EQ-004");
        r5.setAssignedEquipmentName("Speaker");
        requests.add(r5);

        BorrowRequest r6 = new BorrowRequest("REQ-006", "Presentation", "Apr 26, 2026", "9:00 AM", "11:00 AM", "College of Informatics", "Mark Cruz", "mcruz", "");
        r6.setStatus(RequestStatus.DIRECTOR_APPROVAL);
        r6.setStaffApproval("Complete");
        requests.add(r6);

        BorrowRequest r7 = new BorrowRequest("REQ-007", "Meeting", "Apr 25, 2026", "1:00 PM", "3:00 PM", "BSIT - 2A", "Jane Santos", "jsantos", "");
        r7.setStatus(RequestStatus.STAFF_REVIEW);
        r7.setStaffApproval("Complete");
        requests.add(r7);

        BorrowRequest r8 = new BorrowRequest("REQ-008", "Class Lecture", "Apr 25, 2026", "8:00 AM", "10:00 AM", "BSIT - 2A", "John Doe", "johndoe", "OOP Lecture");
        r8.setStatus(RequestStatus.PENDING);
        requests.add(r8);

        // Borrow Records (Page 7)
        historyRecords.add(new BorrowRecord("BR-101", "Apr 18, 2026", "John Doe", "Projector", "EQ-001", "Class Lecture", "10:00 AM", "Returned in good condition"));
        historyRecords.add(new BorrowRecord("BR-102", "Apr 15, 2026", "Jane Santos", "TV", "EQ-002", "Presentation", "12:00 PM", "All cables intact"));
        historyRecords.add(new BorrowRecord("BR-103", "Apr 10, 2026", "Mark Cruz", "View Board", "EQ-003", "Meeting", "3:00 PM", "Clean display"));
        historyRecords.add(new BorrowRecord("BR-104", "Apr 05, 2026", "John Doe", "Laptop", "EQ-005", "Research Activity", "4:00 PM", "Returned on schedule"));

        // Notifications (Page 8, 18, 24)
        notifications.add(new NotificationItem("N-01", "Request approved", "Your request REQ-001 has been approved.", "Apr 24, 2026 · 10:30 AM", "Update", "USER", false, "REQ-001"));
        notifications.add(new NotificationItem("N-02", "Equipment assigned", "Projector EQ-001 has been assigned to your request.", "Apr 24, 2026 · 10:35 AM", "Update", "USER", false, "REQ-001"));
        notifications.add(new NotificationItem("N-03", "New borrowing request", "REQ-008 is waiting for staff review.", "Apr 25, 2026 · 8:15 AM", "Action", "ICT_STAFF", false, "REQ-008"));
        notifications.add(new NotificationItem("N-04", "Final approval required", "REQ-007 is waiting for Campus Director approval.", "Apr 24, 2026 · 2:10 PM", "Action", "ICT_STAFF", false, "REQ-007"));
        notifications.add(new NotificationItem("N-05", "Final approval required", "REQ-007 is ready for your review.", "Apr 25, 2026 · 9:30 AM", "Update", "CAMPUS_DIRECTOR", false, "REQ-007"));
    }

    public User authenticate(String username, String password, Role expectedRole) {
        return users.stream()
                .filter(u -> u.getUsername().equalsIgnoreCase(username) && u.getPassword().equals(password))
                .findFirst()
                .orElse(null);
    }

    public synchronized BorrowRequest submitRequest(String purpose, String dateOfUse, String timeFrom, String timeTo,
                                                    String sectionDepartment, String requestedBy, String requesterUsername,
                                                    String remarks) {
        String newId = String.format("REQ-%03d", requestCounter++);
        BorrowRequest req = new BorrowRequest(newId, purpose, dateOfUse, timeFrom, timeTo, sectionDepartment, requestedBy, requesterUsername, remarks);
        requests.add(0, req);

        // Notify Staff
        notifications.add(0, new NotificationItem("NOTIF-" + System.currentTimeMillis(), "New borrowing request",
                newId + " is waiting for staff review.", "Just now", "Action", "ICT_STAFF", false, newId));

        return req;
    }

    public synchronized boolean staffApprove(String requestId, String staffName) {
        for (BorrowRequest r : requests) {
            if (r.getId().equalsIgnoreCase(requestId)) {
                r.setStaffApproval("Complete");
                r.setStaffReviewedBy(staffName);
                r.setStaffReviewDate("Apr 25, 2026");
                r.setStatus(RequestStatus.DIRECTOR_APPROVAL);

                // Notify Campus Director
                notifications.add(0, new NotificationItem("NOTIF-" + System.currentTimeMillis(), "Final approval required",
                        requestId + " is ready for your review.", "Just now", "Update", "CAMPUS_DIRECTOR", false, requestId));
                return true;
            }
        }
        return false;
    }

    public synchronized boolean staffReject(String requestId, String staffName) {
        for (BorrowRequest r : requests) {
            if (r.getId().equalsIgnoreCase(requestId)) {
                r.setStaffApproval("Rejected");
                r.setStatus(RequestStatus.REJECTED);
                return true;
            }
        }
        return false;
    }

    public synchronized boolean directorApprove(String requestId, String directorName) {
        for (BorrowRequest r : requests) {
            if (r.getId().equalsIgnoreCase(requestId)) {
                r.setDirectorApproval("Complete");
                r.setDirectorReviewedBy(directorName);
                r.setDirectorReviewDate("Apr 25, 2026");
                r.setStatus(RequestStatus.APPROVED);

                // Notify User
                notifications.add(0, new NotificationItem("NOTIF-" + System.currentTimeMillis(), "Request approved",
                        "Your request " + requestId + " has been approved.", "Just now", "Update", "USER", false, requestId));
                return true;
            }
        }
        return false;
    }

    public synchronized boolean directorReject(String requestId, String directorName) {
        for (BorrowRequest r : requests) {
            if (r.getId().equalsIgnoreCase(requestId)) {
                r.setDirectorApproval("Rejected");
                r.setStatus(RequestStatus.REJECTED);
                return true;
            }
        }
        return false;
    }

    public synchronized boolean assignEquipment(String requestId, String equipmentId, String staffName) {
        BorrowRequest targetReq = requests.stream().filter(r -> r.getId().equalsIgnoreCase(requestId)).findFirst().orElse(null);
        Equipment targetEq = inventory.stream().filter(e -> e.getId().equalsIgnoreCase(equipmentId)).findFirst().orElse(null);

        if (targetReq != null && targetEq != null) {
            targetReq.setAssignedEquipmentId(targetEq.getId());
            targetReq.setAssignedEquipmentName(targetEq.getName());
            targetReq.setAssignedBy(staffName);
            targetReq.setStatus(RequestStatus.ASSIGNED);
            targetEq.setStatus(EquipmentStatus.RESERVED);

            // Notify User
            notifications.add(0, new NotificationItem("NOTIF-" + System.currentTimeMillis(), "Equipment assigned",
                    targetEq.getName() + " " + targetEq.getId() + " has been assigned to your request.", "Just now", "Update", "USER", false, requestId));
            return true;
        }
        return false;
    }

    public synchronized boolean recordCheckOut(String requestId) {
        BorrowRequest req = requests.stream().filter(r -> r.getId().equalsIgnoreCase(requestId)).findFirst().orElse(null);
        if (req != null) {
            req.setStatus(RequestStatus.IN_USE);
            req.setCheckOutDate("Apr 25, 2026 · 8:00 AM");
            if (req.getAssignedEquipmentId() != null) {
                inventory.stream().filter(e -> e.getId().equalsIgnoreCase(req.getAssignedEquipmentId()))
                        .findFirst().ifPresent(e -> e.setStatus(EquipmentStatus.IN_USE));
            }
            return true;
        }
        return false;
    }

    public synchronized boolean recordReturn(String requestId, String condition, String remarks) {
        BorrowRequest req = requests.stream().filter(r -> r.getId().equalsIgnoreCase(requestId)).findFirst().orElse(null);
        if (req != null) {
            req.setStatus(RequestStatus.COMPLETED);
            req.setActualReturnTime("10:00 AM");
            req.setReturnCondition(condition);
            req.setReturnRemarks(remarks);

            if (req.getAssignedEquipmentId() != null) {
                inventory.stream().filter(e -> e.getId().equalsIgnoreCase(req.getAssignedEquipmentId()))
                        .findFirst().ifPresent(e -> {
                            if ("With reported issue".equalsIgnoreCase(condition)) {
                                e.setStatus(EquipmentStatus.UNDER_MAINTENANCE);
                                e.setCondition("Reported issue: " + remarks);
                            } else {
                                e.setStatus(EquipmentStatus.AVAILABLE);
                            }
                        });
            }

            // Create completed record
            historyRecords.add(0, new BorrowRecord(
                    "BR-" + (historyCounter++),
                    req.getDateOfUse(),
                    req.getRequestedBy(),
                    req.getAssignedEquipmentName() != null ? req.getAssignedEquipmentName() : "Equipment",
                    req.getAssignedEquipmentId(),
                    req.getPurpose(),
                    "10:00 AM",
                    remarks
            ));
            return true;
        }
        return false;
    }

    public List<Equipment> getInventory() { return new ArrayList<>(inventory); }
    public List<BorrowRequest> getRequests() { return new ArrayList<>(requests); }
    public List<BorrowRecord> getHistoryRecords() { return new ArrayList<>(historyRecords); }
    public List<NotificationItem> getNotifications() { return new ArrayList<>(notifications); }
}
`,
  },
  {
    name: 'EquipLinkSwingApp.java',
    path: 'src/main/java/com/equiplink/ui/EquipLinkSwingApp.java',
    package: 'com.equiplink.ui',
    description: 'Complete Java Swing desktop GUI implementing all screens, sidebar, tables, and workflows from the PDF wireframes',
    content: `package com.equiplink.ui;

import com.equiplink.model.*;
import com.equiplink.service.EquipLinkService;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.List;

/**
 * EquipLink Swing Application
 * Faithfully reproduces the 25-page UI specification:
 * - Page 1: Login
 * - Pages 2-9: User (Home, Request, Availability, My Requests, Details, History, Notifications, Settings)
 * - Pages 10-19: ICT Staff (Dashboard, Equipment Management, Scheduling, Pending, Approval, Assignment, Return)
 * - Pages 20-25: Campus Director (Dashboard, Pending Final, Request Details, Approval History)
 */
public class EquipLinkSwingApp extends JFrame {
    private static final Color NAVY_SIDEBAR = new Color(23, 57, 102);
    private static final Color NAVY_SIDEBAR_ACTIVE = new Color(37, 99, 175);
    private static final Color BG_MAIN = new Color(245, 248, 252);
    private static final Color BRAND_BLUE = new Color(28, 100, 242);
    private static final Color TEXT_DARK = new Color(30, 41, 59);
    private static final Color TEXT_MUTED = new Color(100, 116, 139);

    private final EquipLinkService service = EquipLinkService.getInstance();
    private User currentUser;
    private Role activeRole = Role.STUDENT_INSTRUCTOR;

    private JPanel mainContentCardPanel;
    private CardLayout cardLayout;
    private JPanel sidebarPanel;
    private JLabel roleLabelHeader;
    private JLabel currentAccountLabel;

    public EquipLinkSwingApp() {
        setTitle("EquipLink - Campus Equipment Borrowing and Approval Management System");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(1280, 800);
        setMinimumSize(new Dimension(1024, 680));
        setLocationRelativeTo(null);

        initLoginState();
    }

    private void initLoginState() {
        getContentPane().removeAll();
        setLayout(new BorderLayout());

        JPanel loginContainer = createLoginPage();
        add(loginContainer, BorderLayout.CENTER);
        revalidate();
        repaint();
    }

    /**
     * Page 1: Welcome and Login Screen
     */
    private JPanel createLoginPage() {
        JPanel splitPanel = new JPanel(new GridLayout(1, 2));

        // Left Hero Panel
        JPanel leftHero = new JPanel();
        leftHero.setBackground(new Color(23, 57, 102));
        leftHero.setLayout(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.gridx = 0; gbc.gridy = 0;
        gbc.insets = new Insets(10, 10, 10, 10);

        JLabel logoIcon = new JLabel("E");
        logoIcon.setOpaque(true);
        logoIcon.setBackground(new Color(59, 130, 246));
        logoIcon.setForeground(Color.WHITE);
        logoIcon.setFont(new Font("SansSerif", Font.BOLD, 36));
        logoIcon.setHorizontalAlignment(SwingConstants.CENTER);
        logoIcon.setPreferredSize(new Dimension(70, 70));
        leftHero.add(logoIcon, gbc);

        gbc.gridy++;
        JLabel appTitle = new JLabel("EquipLink");
        appTitle.setFont(new Font("SansSerif", Font.BOLD, 32));
        appTitle.setForeground(Color.WHITE);
        leftHero.add(appTitle, gbc);

        gbc.gridy++;
        JLabel appSubtitle = new JLabel("<html><center>Campus Equipment Borrowing<br>and Approval Management System</center></html>");
        appSubtitle.setFont(new Font("SansSerif", Font.PLAIN, 16));
        appSubtitle.setForeground(new Color(203, 213, 225));
        leftHero.add(appSubtitle, gbc);

        // Right Login Form Card
        JPanel rightWrapper = new JPanel(new GridBagLayout());
        rightWrapper.setBackground(new Color(248, 250, 252));

        JPanel formCard = new JPanel();
        formCard.setLayout(new BoxLayout(formCard, BoxLayout.Y_AXIS));
        formCard.setBackground(Color.WHITE);
        formCard.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(226, 232, 240), 1),
                new EmptyBorder(36, 40, 36, 40)
        ));
        formCard.setPreferredSize(new Dimension(380, 480));

        JLabel welcomeTitle = new JLabel("Welcome back");
        welcomeTitle.setFont(new Font("SansSerif", Font.BOLD, 24));
        welcomeTitle.setForeground(TEXT_DARK);
        formCard.add(welcomeTitle);

        JLabel welcomeSub = new JLabel("Sign in to your EquipLink account");
        welcomeSub.setFont(new Font("SansSerif", Font.PLAIN, 13));
        welcomeSub.setForeground(TEXT_MUTED);
        formCard.add(welcomeSub);
        formCard.add(Box.createVerticalStrut(24));

        JLabel userLabel = new JLabel("USERNAME");
        userLabel.setFont(new Font("SansSerif", Font.BOLD, 11));
        userLabel.setForeground(TEXT_MUTED);
        formCard.add(userLabel);
        formCard.add(Box.createVerticalStrut(4));

        JTextField usernameField = new JTextField("johndoe");
        usernameField.setMaximumSize(new Dimension(Integer.MAX_VALUE, 36));
        formCard.add(usernameField);
        formCard.add(Box.createVerticalStrut(14));

        JLabel passLabel = new JLabel("PASSWORD");
        passLabel.setFont(new Font("SansSerif", Font.BOLD, 11));
        passLabel.setForeground(TEXT_MUTED);
        formCard.add(passLabel);
        formCard.add(Box.createVerticalStrut(4));

        JPasswordField passwordField = new JPasswordField("pass123");
        passwordField.setMaximumSize(new Dimension(Integer.MAX_VALUE, 36));
        formCard.add(passwordField);
        formCard.add(Box.createVerticalStrut(14));

        JLabel roleHeader = new JLabel("ACCOUNT ROLE");
        roleHeader.setFont(new Font("SansSerif", Font.BOLD, 11));
        roleHeader.setForeground(TEXT_MUTED);
        formCard.add(roleHeader);
        formCard.add(Box.createVerticalStrut(4));

        JComboBox<Role> roleCombo = new JComboBox<>(Role.values());
        roleCombo.setMaximumSize(new Dimension(Integer.MAX_VALUE, 36));
        formCard.add(roleCombo);
        formCard.add(Box.createVerticalStrut(24));

        JButton loginButton = new JButton("Log in");
        loginButton.setFont(new Font("SansSerif", Font.BOLD, 14));
        loginButton.setBackground(BRAND_BLUE);
        loginButton.setForeground(Color.WHITE);
        loginButton.setFocusPainted(false);
        loginButton.setMaximumSize(new Dimension(Integer.MAX_VALUE, 40));
        loginButton.setCursor(new Cursor(Cursor.HAND_CURSOR));

        loginButton.addActionListener(e -> {
            Role chosenRole = (Role) roleCombo.getSelectedItem();
            this.activeRole = chosenRole;
            this.currentUser = new User("USR-LOGGED", chosenRole == Role.STUDENT_INSTRUCTOR ? "John Doe" :
                    (chosenRole == Role.ICT_STAFF ? "Maria Santos" : "Campus Director"),
                    usernameField.getText(), "pass", chosenRole, "BSIT - 2A", "user@univ.edu");
            launchMainAppView();
        });

        formCard.add(loginButton);
        formCard.add(Box.createVerticalStrut(16));

        JLabel hint = new JLabel("Use your assigned account credentials.");
        hint.setFont(new Font("SansSerif", Font.PLAIN, 11));
        hint.setForeground(TEXT_MUTED);
        hint.setAlignmentX(Component.CENTER_ALIGNMENT);
        formCard.add(hint);

        rightWrapper.add(formCard);
        splitPanel.add(leftHero);
        splitPanel.add(rightWrapper);
        return splitPanel;
    }

    private void launchMainAppView() {
        getContentPane().removeAll();
        setLayout(new BorderLayout());

        // Build Left Navy Sidebar
        sidebarPanel = createSidebarPanel();
        add(sidebarPanel, BorderLayout.WEST);

        // Center Content with CardLayout
        cardLayout = new CardLayout();
        mainContentCardPanel = new JPanel(cardLayout);
        mainContentCardPanel.setBackground(BG_MAIN);

        // Build screens
        mainContentCardPanel.add(createUserHomeView(), "USER_HOME");
        mainContentCardPanel.add(createUserRequestForm(), "USER_REQUEST");
        mainContentCardPanel.add(createAvailabilityView(), "USER_AVAILABILITY");
        mainContentCardPanel.add(createUserMyRequestsView(), "USER_MY_REQUESTS");
        mainContentCardPanel.add(createHistoryView(), "USER_HISTORY");
        mainContentCardPanel.add(createNotificationsView(), "NOTIFICATIONS");
        mainContentCardPanel.add(createSettingsView(), "SETTINGS");

        // ICT Staff Screens
        mainContentCardPanel.add(createStaffDashboardView(), "STAFF_DASHBOARD");
        mainContentCardPanel.add(createStaffEquipmentManagementView(), "STAFF_EQUIPMENT");
        mainContentCardPanel.add(createStaffApprovalManagementView(), "STAFF_APPROVAL");
        mainContentCardPanel.add(createStaffAssignmentView(), "STAFF_ASSIGN");
        mainContentCardPanel.add(createStaffReturnView(), "STAFF_RETURN");

        // Campus Director Screens
        mainContentCardPanel.add(createDirectorDashboardView(), "DIRECTOR_DASHBOARD");
        mainContentCardPanel.add(createDirectorPendingView(), "DIRECTOR_PENDING");

        add(mainContentCardPanel, BorderLayout.CENTER);

        // Show appropriate initial card based on role
        if (activeRole == Role.STUDENT_INSTRUCTOR) {
            cardLayout.show(mainContentCardPanel, "USER_HOME");
        } else if (activeRole == Role.ICT_STAFF) {
            cardLayout.show(mainContentCardPanel, "STAFF_DASHBOARD");
        } else {
            cardLayout.show(mainContentCardPanel, "DIRECTOR_DASHBOARD");
        }

        revalidate();
        repaint();
    }

    private JPanel createSidebarPanel() {
        JPanel sidebar = new JPanel();
        sidebar.setPreferredSize(new Dimension(240, getHeight()));
        sidebar.setBackground(NAVY_SIDEBAR);
        sidebar.setLayout(new BorderLayout());

        JPanel topBrand = new JPanel(new FlowLayout(FlowLayout.LEFT, 16, 20));
        topBrand.setOpaque(false);

        JLabel logoIcon = new JLabel("E");
        logoIcon.setOpaque(true);
        logoIcon.setBackground(new Color(59, 130, 246));
        logoIcon.setForeground(Color.WHITE);
        logoIcon.setFont(new Font("SansSerif", Font.BOLD, 18));
        logoIcon.setHorizontalAlignment(SwingConstants.CENTER);
        logoIcon.setPreferredSize(new Dimension(34, 34));

        JLabel brandText = new JLabel("EquipLink");
        brandText.setFont(new Font("SansSerif", Font.BOLD, 20));
        brandText.setForeground(Color.WHITE);

        topBrand.add(logoIcon);
        topBrand.add(brandText);

        JPanel menuContainer = new JPanel();
        menuContainer.setLayout(new BoxLayout(menuContainer, BoxLayout.Y_AXIS));
        menuContainer.setOpaque(false);
        menuContainer.setBorder(new EmptyBorder(10, 12, 10, 12));

        JLabel roleTitle = new JLabel("  " + activeRole.getDisplayName().toUpperCase());
        roleTitle.setFont(new Font("SansSerif", Font.BOLD, 11));
        roleTitle.setForeground(new Color(148, 163, 184));
        menuContainer.add(roleTitle);
        menuContainer.add(Box.createVerticalStrut(12));

        if (activeRole == Role.STUDENT_INSTRUCTOR) {
            addSidebarNavButton(menuContainer, "Home", "USER_HOME", true);
            addSidebarNavButton(menuContainer, "Request Equipment", "USER_REQUEST", false);
            addSidebarNavButton(menuContainer, "Equipment Availability", "USER_AVAILABILITY", false);
            addSidebarNavButton(menuContainer, "My Requests", "USER_MY_REQUESTS", false);
            addSidebarNavButton(menuContainer, "Borrowing History", "USER_HISTORY", false);
            addSidebarNavButton(menuContainer, "Notifications", "NOTIFICATIONS", false);
            addSidebarNavButton(menuContainer, "Settings", "SETTINGS", false);
        } else if (activeRole == Role.ICT_STAFF) {
            addSidebarNavButton(menuContainer, "Dashboard", "STAFF_DASHBOARD", true);
            addSidebarNavButton(menuContainer, "Equipment Management", "STAFF_EQUIPMENT", false);
            addSidebarNavButton(menuContainer, "Availability & Scheduling", "USER_AVAILABILITY", false);
            addSidebarNavButton(menuContainer, "Approval Management", "STAFF_APPROVAL", false);
            addSidebarNavButton(menuContainer, "Equipment Assignment", "STAFF_ASSIGN", false);
            addSidebarNavButton(menuContainer, "Borrowing & Return", "STAFF_RETURN", false);
            addSidebarNavButton(menuContainer, "Borrowing History", "USER_HISTORY", false);
            addSidebarNavButton(menuContainer, "Notifications", "NOTIFICATIONS", false);
            addSidebarNavButton(menuContainer, "Settings", "SETTINGS", false);
        } else {
            addSidebarNavButton(menuContainer, "Dashboard", "DIRECTOR_DASHBOARD", true);
            addSidebarNavButton(menuContainer, "Pending Final Approvals", "DIRECTOR_PENDING", false);
            addSidebarNavButton(menuContainer, "Approval History", "USER_HISTORY", false);
            addSidebarNavButton(menuContainer, "Notifications", "NOTIFICATIONS", false);
            addSidebarNavButton(menuContainer, "Settings", "SETTINGS", false);
        }

        sidebar.add(topBrand, BorderLayout.NORTH);
        sidebar.add(menuContainer, BorderLayout.CENTER);

        // Bottom role switch / logout
        JPanel bottomBar = new JPanel(new FlowLayout(FlowLayout.CENTER));
        bottomBar.setOpaque(false);
        JButton logoutBtn = new JButton("Switch Role / Logout");
        logoutBtn.setBackground(new Color(30, 68, 120));
        logoutBtn.setForeground(Color.WHITE);
        logoutBtn.setFocusPainted(false);
        logoutBtn.addActionListener(e -> initLoginState());
        bottomBar.add(logoutBtn);
        sidebar.add(bottomBar, BorderLayout.SOUTH);

        return sidebar;
    }

    private void addSidebarNavButton(JPanel container, String text, String cardName, boolean active) {
        JButton btn = new JButton("  ●  " + text);
        btn.setFont(new Font("SansSerif", Font.PLAIN, 13));
        btn.setForeground(Color.WHITE);
        btn.setBackground(active ? NAVY_SIDEBAR_ACTIVE : NAVY_SIDEBAR);
        btn.setBorder(new EmptyBorder(8, 12, 8, 12));
        btn.setHorizontalAlignment(SwingConstants.LEFT);
        btn.setMaximumSize(new Dimension(Integer.MAX_VALUE, 38));
        btn.setFocusPainted(false);
        btn.setCursor(new Cursor(Cursor.HAND_CURSOR));

        btn.addActionListener(e -> {
            cardLayout.show(mainContentCardPanel, cardName);
            for (Component c : container.getComponents()) {
                if (c instanceof JButton) {
                    c.setBackground(NAVY_SIDEBAR);
                }
            }
            btn.setBackground(NAVY_SIDEBAR_ACTIVE);
        });

        container.add(btn);
        container.add(Box.createVerticalStrut(4));
    }

    /**
     * Page 2: Student/Instructor Home View
     */
    private JPanel createUserHomeView() {
        JPanel panel = new JPanel(new BorderLayout(20, 20));
        panel.setBackground(BG_MAIN);
        panel.setBorder(new EmptyBorder(24, 28, 24, 28));

        // Header
        panel.add(createHeaderBar("Home", "Overview of your equipment requests"), BorderLayout.NORTH);

        // Body
        JPanel body = new JPanel();
        body.setLayout(new BoxLayout(body, BoxLayout.Y_AXIS));
        body.setBackground(BG_MAIN);

        // 4 Stat Cards
        JPanel statsRow = new JPanel(new GridLayout(1, 4, 16, 0));
        statsRow.setBackground(BG_MAIN);
        statsRow.setMaximumSize(new Dimension(Integer.MAX_VALUE, 100));
        statsRow.add(createStatMetricCard("Pending Requests", "2", "Awaiting review", new Color(59, 130, 246)));
        statsRow.add(createStatMetricCard("Approved Requests", "1", "Ready for assignment", new Color(16, 185, 129)));
        statsRow.add(createStatMetricCard("Upcoming Reservations", "1", "Scheduled", new Color(139, 92, 246)));
        statsRow.add(createStatMetricCard("Borrowing History", "5", "Completed records", new Color(100, 116, 139)));
        body.add(statsRow);
        body.add(Box.createVerticalStrut(20));

        // Middle Row: Equipment Availability Table & Recent Notifications
        JPanel midRow = new JPanel(new GridLayout(1, 2, 16, 0));
        midRow.setBackground(BG_MAIN);

        // Availability card
        JPanel availCard = createContentCard("Equipment availability", "Current status");
        String[] cols = {"Equipment", "Status"};
        Object[][] data = {
                {"Projector", "Available"},
                {"View Board", "Reserved"},
                {"Speaker", "Available"},
                {"TV", "In Use"}
        };
        JTable table = new JTable(new DefaultTableModel(data, cols));
        table.setRowHeight(32);
        table.getColumnModel().getColumn(1).setCellRenderer(new StatusBadgeTableCellRenderer());
        availCard.add(new JScrollPane(table), BorderLayout.CENTER);
        midRow.add(availCard);

        // Notifications card
        JPanel notifCard = createContentCard("Recent notifications", "");
        JPanel notifList = new JPanel();
        notifList.setLayout(new BoxLayout(notifList, BoxLayout.Y_AXIS));
        notifList.setBackground(Color.WHITE);
        notifList.add(createNotifRow("Request approved", "Your request is approved."));
        notifList.add(createNotifRow("Request received", "Request REQ-004 submitted."));
        notifList.add(createNotifRow("Schedule reminder", "Upcoming equipment schedule."));
        notifCard.add(notifList, BorderLayout.CENTER);
        midRow.add(notifCard);

        body.add(midRow);
        body.add(Box.createVerticalStrut(20));

        // Upcoming reservation table
        JPanel resCard = createContentCard("Upcoming reservation", "");
        String[] rCols = {"Date", "Time", "Purpose", "Status"};
        Object[][] rData = {
                {"Apr 25, 2026", "8:00–10:00 AM", "Class Lecture", "Approved"}
        };
        JTable rTable = new JTable(new DefaultTableModel(rData, rCols));
        rTable.setRowHeight(34);
        rTable.getColumnModel().getColumn(3).setCellRenderer(new StatusBadgeTableCellRenderer());
        resCard.add(new JScrollPane(rTable), BorderLayout.CENTER);
        body.add(resCard);

        panel.add(new JScrollPane(body), BorderLayout.CENTER);
        return panel;
    }

    /**
     * Page 3: Request Equipment Form View
     */
    private JPanel createUserRequestForm() {
        JPanel panel = new JPanel(new BorderLayout(20, 20));
        panel.setBackground(BG_MAIN);
        panel.setBorder(new EmptyBorder(24, 28, 24, 28));

        panel.add(createHeaderBar("Request Equipment", "Submit a paperless borrowing request"), BorderLayout.NORTH);

        JPanel card = new JPanel(new GridBagLayout());
        card.setBackground(Color.WHITE);
        card.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(226, 232, 240), 1),
                new EmptyBorder(28, 32, 28, 32)
        ));

        GridBagConstraints g = new GridBagConstraints();
        g.insets = new Insets(8, 12, 8, 12);
        g.fill = GridBagConstraints.HORIZONTAL;
        g.weightx = 0.5;

        // Row 0: Purpose & Date
        g.gridx = 0; g.gridy = 0;
        card.add(new JLabel("PURPOSE"), g);
        g.gridx = 1;
        card.add(new JLabel("DATE OF USE"), g);

        g.gridx = 0; g.gridy = 1;
        JTextField purposeField = new JTextField("Class Lecture");
        card.add(purposeField, g);
        g.gridx = 1;
        JTextField dateField = new JTextField("Apr 25, 2026");
        card.add(dateField, g);

        // Row 2: Time From & Time To
        g.gridx = 0; g.gridy = 2;
        card.add(new JLabel("TIME FROM"), g);
        g.gridx = 1;
        card.add(new JLabel("TIME TO"), g);

        g.gridx = 0; g.gridy = 3;
        JTextField timeFrom = new JTextField("8:00 AM");
        card.add(timeFrom, g);
        g.gridx = 1;
        JTextField timeTo = new JTextField("10:00 AM");
        card.add(timeTo, g);

        // Row 4: Department & Requester
        g.gridx = 0; g.gridy = 4;
        card.add(new JLabel("SECTION / DEPARTMENT"), g);
        g.gridx = 1;
        card.add(new JLabel("REQUESTER"), g);

        g.gridx = 0; g.gridy = 5;
        JTextField deptField = new JTextField("BSIT - 2A");
        card.add(deptField, g);
        g.gridx = 1;
        JTextField reqField = new JTextField("John Doe");
        card.add(reqField, g);

        // Row 6: Remarks
        g.gridx = 0; g.gridy = 6; g.gridwidth = 2;
        card.add(new JLabel("ADDITIONAL REMARKS (OPTIONAL)"), g);

        g.gridy = 7;
        JTextField remarksField = new JTextField("Enter additional information...");
        card.add(remarksField, g);

        g.gridy = 8;
        JLabel note = new JLabel("Note: ICT Staff assigns the specific equipment based on availability.");
        note.setForeground(TEXT_MUTED);
        note.setFont(new Font("SansSerif", Font.ITALIC, 12));
        card.add(note, g);

        // Buttons
        g.gridy = 9;
        JPanel btnBar = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        btnBar.setOpaque(false);
        JButton cancelBtn = new JButton("Cancel");
        JButton submitBtn = new JButton("Submit Request");
        submitBtn.setBackground(BRAND_BLUE);
        submitBtn.setForeground(Color.WHITE);

        submitBtn.addActionListener(e -> {
            service.submitRequest(purposeField.getText(), dateField.getText(), timeFrom.getText(), timeTo.getText(),
                    deptField.getText(), reqField.getText(), "johndoe", remarksField.getText());
            JOptionPane.showMessageDialog(this, "Borrowing request successfully submitted for ICT Staff review!",
                    "Request Created", JOptionPane.INFORMATION_MESSAGE);
            cardLayout.show(mainContentCardPanel, "USER_MY_REQUESTS");
        });

        btnBar.add(cancelBtn);
        btnBar.add(submitBtn);
        card.add(btnBar, g);

        panel.add(card, BorderLayout.CENTER);
        return panel;
    }

    /**
     * Page 4 & 12: Equipment Availability Matrix Calendar View
     */
    private JPanel createAvailabilityView() {
        JPanel panel = new JPanel(new BorderLayout(20, 20));
        panel.setBackground(BG_MAIN);
        panel.setBorder(new EmptyBorder(24, 28, 24, 28));

        panel.add(createHeaderBar("Equipment Availability", "Check available schedules before submitting a request"), BorderLayout.NORTH);

        JPanel content = new JPanel();
        content.setLayout(new BoxLayout(content, BoxLayout.Y_AXIS));
        content.setBackground(BG_MAIN);

        // Filters bar
        JPanel filterCard = new JPanel(new FlowLayout(FlowLayout.LEFT, 16, 12));
        filterCard.setBackground(Color.WHITE);
        filterCard.setBorder(BorderFactory.createLineBorder(new Color(226, 232, 240), 1));
        filterCard.add(new JLabel("Date: Apr 2026"));
        filterCard.add(new JLabel("View: Week"));
        filterCard.add(new JLabel("Status: All"));
        JButton searchBtn = new JButton("Search");
        searchBtn.setBackground(BRAND_BLUE);
        searchBtn.setForeground(Color.WHITE);
        filterCard.add(searchBtn);
        content.add(filterCard);
        content.add(Box.createVerticalStrut(16));

        // Availability Matrix
        JPanel matrixCard = createContentCard("Availability calendar", "Sample schedule view");
        String[] cols = {"Equipment", "8–10 AM", "10–12 PM", "1–3 PM", "3–5 PM"};
        Object[][] matrixData = {
                {"Projector", "Available", "Reserved", "Available", "Available"},
                {"TV", "Reserved", "Available", "In Use", "Available"},
                {"View Board", "Available", "Available", "Reserved", "Unavailable"},
                {"Speaker", "Available", "Available", "Available", "Reserved"},
                {"Laptop", "Unavailable", "Available", "Available", "Available"}
        };
        JTable table = new JTable(new DefaultTableModel(matrixData, cols));
        table.setRowHeight(38);
        for (int i = 1; i <= 4; i++) {
            table.getColumnModel().getColumn(i).setCellRenderer(new StatusBadgeTableCellRenderer());
        }
        matrixCard.add(new JScrollPane(table), BorderLayout.CENTER);
        content.add(matrixCard);

        panel.add(content, BorderLayout.CENTER);
        return panel;
    }

    /**
     * Page 5: My Requests Table View
     */
    private JPanel createUserMyRequestsView() {
        JPanel panel = new JPanel(new BorderLayout(20, 20));
        panel.setBackground(BG_MAIN);
        panel.setBorder(new EmptyBorder(24, 28, 24, 28));

        panel.add(createHeaderBar("My Requests", "Track the progress of your submitted requests"), BorderLayout.NORTH);

        JPanel body = new JPanel(new BorderLayout(0, 16));
        body.setBackground(BG_MAIN);

        // Search & Filter
        JPanel filterBar = new JPanel(new FlowLayout(FlowLayout.LEFT, 16, 12));
        filterBar.setBackground(Color.WHITE);
        filterBar.setBorder(BorderFactory.createLineBorder(new Color(226, 232, 240), 1));
        filterBar.add(new JLabel("Status: All"));
        filterBar.add(new JLabel("Date: Any"));
        filterBar.add(new JLabel("Search request ID:"));
        filterBar.add(new JTextField(14));
        filterBar.add(new JButton("Search"));
        body.add(filterBar, BorderLayout.NORTH);

        // Table
        String[] cols = {"Request ID", "Date", "Purpose", "Status", "Action"};
        List<BorrowRequest> reqs = service.getRequests();
        Object[][] data = new Object[reqs.size()][5];
        for (int i = 0; i < reqs.size(); i++) {
            BorrowRequest r = reqs.get(i);
            data[i][0] = r.getId();
            data[i][1] = r.getDateOfUse();
            data[i][2] = r.getPurpose();
            data[i][3] = r.getStatus().getLabel();
            data[i][4] = "View";
        }

        JTable table = new JTable(new DefaultTableModel(data, cols));
        table.setRowHeight(36);
        table.getColumnModel().getColumn(3).setCellRenderer(new StatusBadgeTableCellRenderer());

        table.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                int row = table.getSelectedRow();
                if (row != -1 && table.getSelectedColumn() == 4) {
                    String reqId = (String) table.getValueAt(row, 0);
                    showRequestDetailsDialog(reqId);
                }
            }
        });

        body.add(new JScrollPane(table), BorderLayout.CENTER);
        panel.add(body, BorderLayout.CENTER);
        return panel;
    }

    /**
     * Page 6: Request Details Dialog / View
     */
    private void showRequestDetailsDialog(String requestId) {
        BorrowRequest req = service.getRequests().stream()
                .filter(r -> r.getId().equalsIgnoreCase(requestId))
                .findFirst().orElse(null);

        if (req == null) return;

        JDialog dialog = new JDialog(this, "Request Details - " + requestId, true);
        dialog.setSize(680, 520);
        dialog.setLocationRelativeTo(this);

        JPanel content = new JPanel(new BorderLayout(16, 16));
        content.setBackground(BG_MAIN);
        content.setBorder(new EmptyBorder(20, 24, 20, 24));

        JPanel grid = new JPanel(new GridLayout(1, 2, 16, 0));
        grid.setBackground(BG_MAIN);

        // Details Panel
        JPanel left = createContentCard("Request details", "");
        JPanel lGrid = new JPanel(new GridLayout(5, 2, 6, 12));
        lGrid.setBackground(Color.WHITE);
        lGrid.add(new JLabel("Request ID:")); lGrid.add(new JLabel(req.getId()));
        lGrid.add(new JLabel("Purpose:")); lGrid.add(new JLabel(req.getPurpose()));
        lGrid.add(new JLabel("Date & Time:")); lGrid.add(new JLabel(req.getDateOfUse() + " · " + req.getTimeFrom() + "–" + req.getTimeTo()));
        lGrid.add(new JLabel("Department:")); lGrid.add(new JLabel(req.getSectionDepartment()));
        lGrid.add(new JLabel("Requested by:")); lGrid.add(new JLabel(req.getRequestedBy()));
        left.add(lGrid, BorderLayout.CENTER);

        // Status Panel
        JPanel right = createContentCard("Request status", "");
        JPanel rGrid = new JPanel(new GridLayout(3, 1, 6, 12));
        rGrid.setBackground(Color.WHITE);
        rGrid.add(new JLabel("Status: " + req.getStatus().getLabel()));
        rGrid.add(new JLabel("Staff approval: " + req.getStaffApproval()));
        rGrid.add(new JLabel("Director approval: " + req.getDirectorApproval()));
        right.add(rGrid, BorderLayout.CENTER);

        grid.add(left);
        grid.add(right);
        content.add(grid, BorderLayout.CENTER);

        // Assigned equipment card
        JPanel bottom = createContentCard("Assigned equipment", "");
        JLabel assignInfo = new JLabel("<html><b>" + (req.getAssignedEquipmentName() != null ? req.getAssignedEquipmentName() : "None Assigned Yet") +
                "</b> " + (req.getAssignedEquipmentId() != null ? "• " + req.getAssignedEquipmentId() : "") +
                "<br><font color='#64748B'>Assigned by: " + (req.getAssignedBy() != null ? req.getAssignedBy() : "Pending Assignment") + "</font></html>");
        bottom.add(assignInfo, BorderLayout.CENTER);
        content.add(bottom, BorderLayout.SOUTH);

        dialog.add(content);
        dialog.setVisible(true);
    }

    /**
     * Page 7 & 17: Borrowing History Table
     */
    private JPanel createHistoryView() {
        JPanel panel = new JPanel(new BorderLayout(20, 20));
        panel.setBackground(BG_MAIN);
        panel.setBorder(new EmptyBorder(24, 28, 24, 28));

        panel.add(createHeaderBar("Borrowing History", "Review your completed borrowing transactions"), BorderLayout.NORTH);

        String[] cols = {"Date", "Equipment", "Purpose", "Return", "Status"};
        List<BorrowRecord> history = service.getHistoryRecords();
        Object[][] data = new Object[history.size()][5];
        for (int i = 0; i < history.size(); i++) {
            BorrowRecord b = history.get(i);
            data[i][0] = b.getDate();
            data[i][1] = b.getEquipment();
            data[i][2] = b.getPurpose();
            data[i][3] = b.getReturnTime();
            data[i][4] = b.getStatus();
        }

        JTable table = new JTable(new DefaultTableModel(data, cols));
        table.setRowHeight(36);
        table.getColumnModel().getColumn(4).setCellRenderer(new StatusBadgeTableCellRenderer());

        panel.add(new JScrollPane(table), BorderLayout.CENTER);
        return panel;
    }

    /**
     * Page 10: ICT Staff Dashboard
     */
    private JPanel createStaffDashboardView() {
        JPanel panel = new JPanel(new BorderLayout(20, 20));
        panel.setBackground(BG_MAIN);
        panel.setBorder(new EmptyBorder(24, 28, 24, 28));

        panel.add(createHeaderBar("Dashboard", "Overview of equipment and borrowing activity"), BorderLayout.NORTH);

        JPanel body = new JPanel();
        body.setLayout(new BoxLayout(body, BoxLayout.Y_AXIS));
        body.setBackground(BG_MAIN);

        // Row 1: Equipment status cards
        JPanel row1 = new JPanel(new GridLayout(1, 4, 16, 0));
        row1.setBackground(BG_MAIN);
        row1.add(createStatMetricCard("Total Equipment", "50", "Registered items", new Color(59, 130, 246)));
        row1.add(createStatMetricCard("Available", "30", "Ready for use", new Color(16, 185, 129)));
        row1.add(createStatMetricCard("In Use", "7", "Currently borrowed", new Color(245, 158, 11)));
        row1.add(createStatMetricCard("Under Maintenance", "3", "Unavailable", new Color(239, 68, 68)));
        body.add(row1);
        body.add(Box.createVerticalStrut(16));

        // Row 2: Workflow status cards
        JPanel row2 = new JPanel(new GridLayout(1, 3, 16, 0));
        row2.setBackground(BG_MAIN);
        row2.add(createStatMetricCard("Pending Requests", "8", "Awaiting staff review", new Color(245, 158, 11)));
        row2.add(createStatMetricCard("Final Approval", "3", "With Campus Director", new Color(59, 130, 246)));
        row2.add(createStatMetricCard("Today's Schedules", "5", "Equipment reservations", new Color(139, 92, 246)));
        body.add(row2);
        body.add(Box.createVerticalStrut(20));

        // Recent requests
        JPanel recCard = createContentCard("Recent requests", "");
        String[] cols = {"Request ID", "Purpose", "Requested by", "Status", "Date"};
        Object[][] recData = {
                {"REQ-008", "Class Lecture", "John Doe", "Pending", "Apr 25"},
                {"REQ-007", "Meeting", "Jane Santos", "Staff Review", "Apr 25"},
                {"REQ-006", "Presentation", "Mark Cruz", "Director Approval", "Apr 26"}
        };
        JTable table = new JTable(new DefaultTableModel(recData, cols));
        table.setRowHeight(34);
        table.getColumnModel().getColumn(3).setCellRenderer(new StatusBadgeTableCellRenderer());
        recCard.add(new JScrollPane(table), BorderLayout.CENTER);
        body.add(recCard);

        panel.add(new JScrollPane(body), BorderLayout.CENTER);
        return panel;
    }

    /**
     * Page 11: ICT Staff Equipment Management
     */
    private JPanel createStaffEquipmentManagementView() {
        JPanel panel = new JPanel(new BorderLayout(20, 20));
        panel.setBackground(BG_MAIN);
        panel.setBorder(new EmptyBorder(24, 28, 24, 28));

        panel.add(createHeaderBar("Equipment Management", "Manage equipment records and status"), BorderLayout.NORTH);

        JPanel body = new JPanel(new BorderLayout(0, 16));
        body.setBackground(BG_MAIN);

        JPanel topBar = new JPanel(new FlowLayout(FlowLayout.LEFT, 16, 12));
        topBar.setBackground(Color.WHITE);
        topBar.setBorder(BorderFactory.createLineBorder(new Color(226, 232, 240), 1));
        topBar.add(new JLabel("Search equipment:"));
        topBar.add(new JTextField(12));
        topBar.add(new JLabel("Category: All"));
        topBar.add(new JLabel("Status: All"));

        JButton addBtn = new JButton("+ Add Equipment");
        addBtn.setBackground(BRAND_BLUE);
        addBtn.setForeground(Color.WHITE);
        addBtn.addActionListener(e -> {
            JOptionPane.showMessageDialog(this, "Add Equipment Dialog (Enter Name, Category, Location, Serial No)",
                    "Add Equipment", JOptionPane.PLAIN_MESSAGE);
        });
        topBar.add(addBtn);
        body.add(topBar, BorderLayout.NORTH);

        String[] cols = {"ID", "Equipment", "Category", "Status", "Location", "Action"};
        List<Equipment> list = service.getInventory();
        Object[][] data = new Object[list.size()][6];
        for (int i = 0; i < list.size(); i++) {
            Equipment eq = list.get(i);
            data[i][0] = eq.getId();
            data[i][1] = eq.getName();
            data[i][2] = eq.getCategory();
            data[i][3] = eq.getStatus().getDisplayName();
            data[i][4] = eq.getLocation();
            data[i][5] = "Edit";
        }

        JTable table = new JTable(new DefaultTableModel(data, cols));
        table.setRowHeight(36);
        table.getColumnModel().getColumn(3).setCellRenderer(new StatusBadgeTableCellRenderer());
        body.add(new JScrollPane(table), BorderLayout.CENTER);

        panel.add(body, BorderLayout.CENTER);
        return panel;
    }

    /**
     * Page 14: ICT Staff Approval Management
     */
    private JPanel createStaffApprovalManagementView() {
        JPanel panel = new JPanel(new BorderLayout(20, 20));
        panel.setBackground(BG_MAIN);
        panel.setBorder(new EmptyBorder(24, 28, 24, 28));

        panel.add(createHeaderBar("Approval Management", "Approve or reject requests within your authority"), BorderLayout.NORTH);

        JPanel body = new JPanel(new GridLayout(1, 2, 20, 0));
        body.setBackground(BG_MAIN);

        // Left list: Requests awaiting staff decision
        JPanel leftCard = createContentCard("Requests awaiting staff decision", "");
        String[] cols = {"Request ID", "Purpose", "Status", "Action"};
        Object[][] data = {
                {"REQ-008", "Class Lecture", "Pending", "Review"},
                {"REQ-007", "Meeting", "Pending", "Review"},
                {"REQ-006", "Presentation", "Pending", "Review"}
        };
        JTable table = new JTable(new DefaultTableModel(data, cols));
        table.setRowHeight(34);
        table.getColumnModel().getColumn(2).setCellRenderer(new StatusBadgeTableCellRenderer());
        leftCard.add(new JScrollPane(table), BorderLayout.CENTER);
        body.add(leftCard);

        // Right panel: Selected request review
        JPanel rightCard = createContentCard("Selected request REQ-008 · Class Lecture", "Borrower: John Doe");
        JPanel detailBox = new JPanel();
        detailBox.setLayout(new BoxLayout(detailBox, BoxLayout.Y_AXIS));
        detailBox.setBackground(Color.WHITE);
        detailBox.setBorder(new EmptyBorder(16, 16, 16, 16));

        detailBox.add(new JLabel("Schedule: Apr 25 · 8–10 AM"));
        detailBox.add(Box.createVerticalStrut(8));
        detailBox.add(new JLabel("Department: BSIT - 2A"));
        detailBox.add(Box.createVerticalStrut(16));
        detailBox.add(new JLabel("<html><font color='#64748B'>Check availability before approval.</font></html>"));
        detailBox.add(Box.createVerticalStrut(24));

        JPanel actionRow = new JPanel(new FlowLayout(FlowLayout.LEFT, 12, 0));
        actionRow.setOpaque(false);
        JButton approveBtn = new JButton("Approve");
        approveBtn.setBackground(BRAND_BLUE);
        approveBtn.setForeground(Color.WHITE);
        approveBtn.addActionListener(e -> {
            service.staffApprove("REQ-008", "Maria Santos");
            JOptionPane.showMessageDialog(this, "Request REQ-008 approved! Forwarded to Campus Director for final sanction.",
                    "Staff Approved", JOptionPane.INFORMATION_MESSAGE);
        });

        JButton rejectBtn = new JButton("Reject");
        rejectBtn.setBackground(new Color(239, 68, 68));
        rejectBtn.setForeground(Color.WHITE);
        rejectBtn.addActionListener(e -> {
            service.staffReject("REQ-008", "Maria Santos");
            JOptionPane.showMessageDialog(this, "Request REQ-008 marked rejected.", "Request Rejected", JOptionPane.WARNING_MESSAGE);
        });

        actionRow.add(approveBtn);
        actionRow.add(rejectBtn);
        detailBox.add(actionRow);

        rightCard.add(detailBox, BorderLayout.CENTER);
        body.add(rightCard);

        panel.add(body, BorderLayout.CENTER);
        return panel;
    }

    /**
     * Page 15: Equipment Assignment View
     */
    private JPanel createStaffAssignmentView() {
        JPanel panel = new JPanel(new BorderLayout(20, 20));
        panel.setBackground(BG_MAIN);
        panel.setBorder(new EmptyBorder(24, 28, 24, 28));

        panel.add(createHeaderBar("Equipment Assignment", "Assign available equipment to approved requests"), BorderLayout.NORTH);

        JPanel body = new JPanel(new GridLayout(1, 2, 20, 0));
        body.setBackground(BG_MAIN);

        JPanel left = createContentCard("Request schedule", "Request ID: REQ-001 | Borrower: John Doe");
        JPanel schedBox = new JPanel(new GridLayout(3, 1, 6, 12));
        schedBox.setBackground(Color.WHITE);
        schedBox.add(new JLabel("Date: Apr 25, 2026"));
        schedBox.add(new JLabel("Time: 8:00–10:00 AM"));
        schedBox.add(new JLabel("Status: Approved"));
        left.add(schedBox, BorderLayout.CENTER);

        JPanel right = createContentCard("Available equipment", "");
        String[] cols = {"Equipment", "ID", "Action"};
        Object[][] data = {
                {"Projector", "EQ-001", "Select"},
                {"TV", "EQ-002", "Select"}
        };
        JTable table = new JTable(new DefaultTableModel(data, cols));
        table.setRowHeight(34);
        right.add(new JScrollPane(table), BorderLayout.CENTER);

        JButton assignBtn = new JButton("Confirm Assignment");
        assignBtn.setBackground(BRAND_BLUE);
        assignBtn.setForeground(Color.WHITE);
        assignBtn.addActionListener(e -> {
            service.assignEquipment("REQ-001", "EQ-001", "Maria Santos");
            JOptionPane.showMessageDialog(this, "Equipment EQ-001 (Projector) successfully assigned to REQ-001!",
                    "Assignment Confirmed", JOptionPane.INFORMATION_MESSAGE);
        });
        right.add(assignBtn, BorderLayout.SOUTH);

        body.add(left);
        body.add(right);
        panel.add(body, BorderLayout.CENTER);
        return panel;
    }

    /**
     * Page 16: Borrowing & Return View
     */
    private JPanel createStaffReturnView() {
        JPanel panel = new JPanel(new BorderLayout(20, 20));
        panel.setBackground(BG_MAIN);
        panel.setBorder(new EmptyBorder(24, 28, 24, 28));

        panel.add(createHeaderBar("Borrowing & Return", "Record equipment release and return"), BorderLayout.NORTH);

        JPanel body = new JPanel();
        body.setLayout(new BoxLayout(body, BoxLayout.Y_AXIS));
        body.setBackground(BG_MAIN);

        // Find Request
        JPanel findBar = new JPanel(new FlowLayout(FlowLayout.LEFT, 16, 12));
        findBar.setBackground(Color.WHITE);
        findBar.setBorder(BorderFactory.createLineBorder(new Color(226, 232, 240), 1));
        findBar.add(new JLabel("Request ID / Borrower:"));
        findBar.add(new JTextField("REQ-001", 16));
        findBar.add(new JButton("Search"));
        body.add(findBar);
        body.add(Box.createVerticalStrut(16));

        // Active Borrowing
        JPanel curCard = createContentCard("Current borrowing", "Borrower: John Doe");
        JPanel cBox = new JPanel(new GridLayout(2, 2, 8, 8));
        cBox.setBackground(Color.WHITE);
        cBox.add(new JLabel("Equipment: Projector EQ-001"));
        cBox.add(new JLabel("Status: In Use"));
        cBox.add(new JLabel("Schedule: Apr 25 · 8–10 AM"));
        curCard.add(cBox, BorderLayout.CENTER);
        body.add(curCard);
        body.add(Box.createVerticalStrut(16));

        // Return Condition Box
        JPanel retCard = createContentCard("Return condition", "Record physical verification");
        JPanel retForm = new JPanel(new GridLayout(3, 2, 8, 8));
        retForm.setBackground(Color.WHITE);
        retForm.add(new JLabel("Condition after use:"));
        JComboBox<String> condBox = new JComboBox<>(new String[]{"Good", "With reported issue"});
        retForm.add(condBox);

        retForm.add(new JLabel("Remarks:"));
        JTextField remField = new JTextField("HDMI cable returned without defect");
        retForm.add(remField);

        JButton saveRetBtn = new JButton("Save Return");
        saveRetBtn.setBackground(BRAND_BLUE);
        saveRetBtn.setForeground(Color.WHITE);
        saveRetBtn.addActionListener(e -> {
            service.recordReturn("REQ-001", (String) condBox.getSelectedItem(), remField.getText());
            JOptionPane.showMessageDialog(this, "Return transaction saved! Equipment returned to available inventory.",
                    "Return Processed", JOptionPane.INFORMATION_MESSAGE);
        });

        retCard.add(retForm, BorderLayout.CENTER);
        retCard.add(saveRetBtn, BorderLayout.SOUTH);
        body.add(retCard);

        panel.add(body, BorderLayout.CENTER);
        return panel;
    }

    /**
     * Page 20: Campus Director Dashboard
     */
    private JPanel createDirectorDashboardView() {
        JPanel panel = new JPanel(new BorderLayout(20, 20));
        panel.setBackground(BG_MAIN);
        panel.setBorder(new EmptyBorder(24, 28, 24, 28));

        panel.add(createHeaderBar("Dashboard", "Overview of requests requiring final approval"), BorderLayout.NORTH);

        JPanel body = new JPanel();
        body.setLayout(new BoxLayout(body, BoxLayout.Y_AXIS));
        body.setBackground(BG_MAIN);

        // Stats
        JPanel sRow = new JPanel(new GridLayout(1, 3, 16, 0));
        sRow.setBackground(BG_MAIN);
        sRow.add(createStatMetricCard("Pending Final Approvals", "5", "Awaiting your decision", new Color(245, 158, 11)));
        sRow.add(createStatMetricCard("Approved Today", "8", "Final decisions", new Color(16, 185, 129)));
        sRow.add(createStatMetricCard("Rejected Today", "1", "Final decisions", new Color(239, 68, 68)));
        body.add(sRow);
        body.add(Box.createVerticalStrut(20));

        // Approvals Table & Notifications
        JPanel mid = new JPanel(new GridLayout(1, 2, 16, 0));
        mid.setBackground(BG_MAIN);

        JPanel reqCard = createContentCard("Requests for final approval", "");
        String[] cols = {"Request ID", "Purpose", "Requested by", "Action"};
        Object[][] data = {
                {"REQ-007", "Presentation", "Jane Santos", "View"},
                {"REQ-006", "Meeting", "Mark Cruz", "View"},
                {"REQ-005", "Class Lecture", "Ana Reyes", "View"}
        };
        JTable table = new JTable(new DefaultTableModel(data, cols));
        table.setRowHeight(34);
        reqCard.add(new JScrollPane(table), BorderLayout.CENTER);
        mid.add(reqCard);

        JPanel notifCard = createContentCard("Notifications", "5 requests require final approval");
        JLabel notice = new JLabel("<html><p>Review the request details and staff recommendations before making an approval decision.</p></html>");
        notifCard.add(notice, BorderLayout.CENTER);
        mid.add(notifCard);

        body.add(mid);
        panel.add(body, BorderLayout.CENTER);
        return panel;
    }

    /**
     * Page 21 & 22: Campus Director Pending Final Approvals View
     */
    private JPanel createDirectorPendingView() {
        JPanel panel = new JPanel(new BorderLayout(20, 20));
        panel.setBackground(BG_MAIN);
        panel.setBorder(new EmptyBorder(24, 28, 24, 28));

        panel.add(createHeaderBar("Pending Final Approvals", "Review staff-approved requests"), BorderLayout.NORTH);

        JPanel body = new JPanel(new GridLayout(1, 2, 20, 0));
        body.setBackground(BG_MAIN);

        // Table
        JPanel listCard = createContentCard("Pending final approval", "");
        String[] cols = {"Request ID", "Purpose", "Requested by", "Date"};
        Object[][] data = {
                {"REQ-007", "Presentation", "Jane Santos", "Apr 25, 2026"},
                {"REQ-006", "Meeting", "Mark Cruz", "Apr 26, 2026"},
                {"REQ-005", "Class Lecture", "Ana Reyes", "Apr 27, 2026"}
        };
        JTable table = new JTable(new DefaultTableModel(data, cols));
        table.setRowHeight(34);
        listCard.add(new JScrollPane(table), BorderLayout.CENTER);
        body.add(listCard);

        // Action panel for Director (Page 22)
        JPanel actionCard = createContentCard("Request Details · REQ-007", "Reviewed by: ICT Staff (Approved)");
        JPanel form = new JPanel();
        form.setLayout(new BoxLayout(form, BoxLayout.Y_AXIS));
        form.setBackground(Color.WHITE);
        form.setBorder(new EmptyBorder(16, 16, 16, 16));

        form.add(new JLabel("Purpose: Presentation"));
        form.add(Box.createVerticalStrut(6));
        form.add(new JLabel("Date & Time: Apr 25 · 1–3 PM"));
        form.add(Box.createVerticalStrut(6));
        form.add(new JLabel("Section: BSIT - 2A"));
        form.add(Box.createVerticalStrut(6));
        form.add(new JLabel("Requested by: Jane Santos"));
        form.add(Box.createVerticalStrut(18));

        JPanel btns = new JPanel(new FlowLayout(FlowLayout.LEFT, 12, 0));
        btns.setOpaque(false);
        JButton apBtn = new JButton("Approve");
        apBtn.setBackground(BRAND_BLUE);
        apBtn.setForeground(Color.WHITE);
        apBtn.addActionListener(e -> {
            service.directorApprove("REQ-007", "Dr. Roberto Mendoza");
            JOptionPane.showMessageDialog(this, "REQ-007 successfully granted Final Campus Director Approval!",
                    "Director Approval Complete", JOptionPane.INFORMATION_MESSAGE);
        });

        JButton rjBtn = new JButton("Reject");
        rjBtn.setBackground(new Color(239, 68, 68));
        rjBtn.setForeground(Color.WHITE);
        rjBtn.addActionListener(e -> {
            service.directorReject("REQ-007", "Dr. Roberto Mendoza");
            JOptionPane.showMessageDialog(this, "REQ-007 rejected by Campus Director.", "Decision Recorded", JOptionPane.WARNING_MESSAGE);
        });

        btns.add(apBtn);
        btns.add(rjBtn);
        form.add(btns);
        actionCard.add(form, BorderLayout.CENTER);
        body.add(actionCard);

        panel.add(body, BorderLayout.CENTER);
        return panel;
    }

    /**
     * Page 8, 18, 24: Notifications View
     */
    private JPanel createNotificationsView() {
        JPanel panel = new JPanel(new BorderLayout(20, 20));
        panel.setBackground(BG_MAIN);
        panel.setBorder(new EmptyBorder(24, 28, 24, 28));

        panel.add(createHeaderBar("Notifications", "Important updates about your requests and schedules"), BorderLayout.NORTH);

        JPanel list = new JPanel();
        list.setLayout(new BoxLayout(list, BoxLayout.Y_AXIS));
        list.setBackground(Color.WHITE);
        list.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(226, 232, 240), 1),
                new EmptyBorder(16, 20, 16, 20)
        ));

        for (NotificationItem n : service.getNotifications()) {
            list.add(createNotifRow(n.getTitle(), n.getMessage() + " · " + n.getTimestamp()));
            list.add(Box.createVerticalStrut(12));
        }

        panel.add(new JScrollPane(list), BorderLayout.CENTER);
        return panel;
    }

    /**
     * Page 9, 19, 25: Settings View
     */
    private JPanel createSettingsView() {
        JPanel panel = new JPanel(new BorderLayout(20, 20));
        panel.setBackground(BG_MAIN);
        panel.setBorder(new EmptyBorder(24, 28, 24, 28));

        panel.add(createHeaderBar("Settings", "Manage your account preferences"), BorderLayout.NORTH);

        JPanel grid = new JPanel(new GridLayout(1, 2, 20, 0));
        grid.setBackground(BG_MAIN);

        // Profile Form
        JPanel profCard = createContentCard("Profile information", "");
        JPanel pf = new JPanel(new GridLayout(4, 2, 10, 12));
        pf.setBackground(Color.WHITE);
        pf.add(new JLabel("FULL NAME")); pf.add(new JLabel("USERNAME"));
        pf.add(new JTextField(currentUser != null ? currentUser.getFullName() : "John Doe"));
        pf.add(new JTextField(currentUser != null ? currentUser.getUsername() : "johndoe"));
        pf.add(new JLabel("SECTION / DEPARTMENT")); pf.add(new JLabel("ROLE"));
        pf.add(new JTextField("BSIT - 2A"));
        pf.add(new JTextField(activeRole.getDisplayName()));

        JButton saveBtn = new JButton("Save Changes");
        saveBtn.setBackground(BRAND_BLUE);
        saveBtn.setForeground(Color.WHITE);
        saveBtn.addActionListener(e -> JOptionPane.showMessageDialog(this, "Profile preferences updated."));

        profCard.add(pf, BorderLayout.CENTER);
        profCard.add(saveBtn, BorderLayout.SOUTH);
        grid.add(profCard);

        // Password & Notification settings
        JPanel secCard = createContentCard("Account settings", "Change password & notification settings");
        JPanel sf = new JPanel(new GridLayout(3, 1, 6, 12));
        sf.setBackground(Color.WHITE);
        sf.add(new JButton("Change Password"));
        sf.add(new JLabel("Notification settings: In-app notifications Enabled"));
        secCard.add(sf, BorderLayout.CENTER);
        grid.add(secCard);

        panel.add(grid, BorderLayout.CENTER);
        return panel;
    }

    // Helper UI Builders
    private JPanel createHeaderBar(String title, String subtitle) {
        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);

        JPanel left = new JPanel();
        left.setLayout(new BoxLayout(left, BoxLayout.Y_AXIS));
        left.setOpaque(false);

        JLabel titleLbl = new JLabel(title);
        titleLbl.setFont(new Font("SansSerif", Font.BOLD, 22));
        titleLbl.setForeground(TEXT_DARK);

        JLabel subLbl = new JLabel(subtitle);
        subLbl.setFont(new Font("SansSerif", Font.PLAIN, 12));
        subLbl.setForeground(TEXT_MUTED);

        left.add(titleLbl);
        left.add(Box.createVerticalStrut(2));
        left.add(subLbl);

        JPanel right = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        right.setOpaque(false);
        JLabel acctBadge = new JLabel("■ Account (" + activeRole.getDisplayName() + ") ■");
        acctBadge.setFont(new Font("SansSerif", Font.PLAIN, 12));
        acctBadge.setForeground(TEXT_MUTED);
        right.add(acctBadge);

        header.add(left, BorderLayout.WEST);
        header.add(right, BorderLayout.EAST);
        return header;
    }

    private JPanel createStatMetricCard(String title, String value, String subtitle, Color accentColor) {
        JPanel card = new JPanel(new BorderLayout(12, 4));
        card.setBackground(Color.WHITE);
        card.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(226, 232, 240), 1),
                new EmptyBorder(16, 18, 16, 18)
        ));

        // Colored vertical bar on left (as seen in wireframes)
        JPanel indicator = new JPanel();
        indicator.setPreferredSize(new Dimension(5, 48));
        indicator.setBackground(accentColor);
        card.add(indicator, BorderLayout.WEST);

        JPanel textPanel = new JPanel();
        textPanel.setLayout(new BoxLayout(textPanel, BoxLayout.Y_AXIS));
        textPanel.setOpaque(false);

        JLabel t = new JLabel(title);
        t.setFont(new Font("SansSerif", Font.PLAIN, 12));
        t.setForeground(TEXT_MUTED);

        JLabel v = new JLabel(value);
        v.setFont(new Font("SansSerif", Font.BOLD, 26));
        v.setForeground(TEXT_DARK);

        JLabel s = new JLabel(subtitle);
        s.setFont(new Font("SansSerif", Font.PLAIN, 11));
        s.setForeground(TEXT_MUTED);

        textPanel.add(t);
        textPanel.add(Box.createVerticalStrut(2));
        textPanel.add(v);
        textPanel.add(Box.createVerticalStrut(2));
        textPanel.add(s);

        card.add(textPanel, BorderLayout.CENTER);
        return card;
    }

    private JPanel createContentCard(String title, String subtitle) {
        JPanel card = new JPanel(new BorderLayout(12, 12));
        card.setBackground(Color.WHITE);
        card.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(226, 232, 240), 1),
                new EmptyBorder(16, 20, 16, 20)
        ));

        JPanel header = new JPanel(new BorderLayout());
        header.setOpaque(false);

        JLabel t = new JLabel(title);
        t.setFont(new Font("SansSerif", Font.BOLD, 15));
        t.setForeground(TEXT_DARK);
        header.add(t, BorderLayout.WEST);

        if (!subtitle.isEmpty()) {
            JLabel s = new JLabel(subtitle);
            s.setFont(new Font("SansSerif", Font.PLAIN, 11));
            s.setForeground(TEXT_MUTED);
            header.add(s, BorderLayout.EAST);
        }

        card.add(header, BorderLayout.NORTH);
        return card;
    }

    private JPanel createNotifRow(String title, String sub) {
        JPanel row = new JPanel(new BorderLayout(10, 4));
        row.setOpaque(false);
        row.setBorder(new EmptyBorder(6, 4, 6, 4));

        JLabel icon = new JLabel("●");
        icon.setForeground(BRAND_BLUE);
        row.add(icon, BorderLayout.WEST);

        JPanel txt = new JPanel();
        txt.setLayout(new BoxLayout(txt, BoxLayout.Y_AXIS));
        txt.setOpaque(false);

        JLabel t = new JLabel(title);
        t.setFont(new Font("SansSerif", Font.BOLD, 13));
        t.setForeground(TEXT_DARK);

        JLabel s = new JLabel(sub);
        s.setFont(new Font("SansSerif", Font.PLAIN, 11));
        s.setForeground(TEXT_MUTED);

        txt.add(t);
        txt.add(s);
        row.add(txt, BorderLayout.CENTER);
        return row;
    }

    // Status Badge Cell Renderer for JTable
    private static class StatusBadgeTableCellRenderer extends DefaultTableCellRenderer {
        @Override
        public Component getTableCellRendererComponent(JTable table, Object value, boolean isSelected, boolean hasFocus, int row, int column) {
            JLabel label = (JLabel) super.getTableCellRendererComponent(table, value, isSelected, hasFocus, row, column);
            label.setHorizontalAlignment(SwingConstants.CENTER);
            label.setFont(new Font("SansSerif", Font.BOLD, 12));
            label.setOpaque(true);

            String status = value != null ? value.toString() : "";
            switch (status) {
                case "Available":
                case "Approved":
                case "Completed":
                    label.setBackground(new Color(220, 252, 231));
                    label.setForeground(new Color(21, 128, 61));
                    break;
                case "Reserved":
                case "Staff Review":
                    label.setBackground(new Color(224, 242, 254));
                    label.setForeground(new Color(3, 105, 161));
                    break;
                case "In Use":
                case "Pending":
                case "Director Approval":
                    label.setBackground(new Color(254, 243, 199));
                    label.setForeground(new Color(180, 83, 9));
                    break;
                case "Unavailable":
                case "Rejected":
                case "Under Maintenance":
                    label.setBackground(new Color(254, 226, 226));
                    label.setForeground(new Color(185, 28, 28));
                    break;
                case "Assigned":
                    label.setBackground(new Color(204, 251, 241));
                    label.setForeground(new Color(15, 118, 110));
                    break;
                default:
                    label.setBackground(Color.WHITE);
                    label.setForeground(TEXT_DARK);
            }
            return label;
        }
    }
}
`,
  },
  {
    name: 'EquipLinkRestController.java',
    path: 'src/main/java/com/equiplink/controller/EquipLinkRestController.java',
    package: 'com.equiplink.controller',
    description: 'Spring Boot REST API controller providing complete HTTP endpoints for the EquipLink web and mobile backend',
    content: `package com.equiplink.controller;

import com.equiplink.model.*;
import com.equiplink.service.EquipLinkService;

import java.util.List;
import java.util.Map;

/**
 * REST Controller for EquipLink Campus Equipment Borrowing System.
 * Compatible with Spring Boot framework.
 */
public class EquipLinkRestController {

    private final EquipLinkService service = EquipLinkService.getInstance();

    // GET /api/equipment - list all equipment
    public List<Equipment> getAllEquipment() {
        return service.getInventory();
    }

    // GET /api/requests - list all borrowing requests
    public List<BorrowRequest> getAllRequests() {
        return service.getRequests();
    }

    // POST /api/requests - submit a new paperless borrow request
    public BorrowRequest submitRequest(Map<String, String> payload) {
        return service.submitRequest(
                payload.get("purpose"),
                payload.get("dateOfUse"),
                payload.get("timeFrom"),
                payload.get("timeTo"),
                payload.get("sectionDepartment"),
                payload.get("requestedBy"),
                payload.get("requesterUsername"),
                payload.get("additionalRemarks")
        );
    }

    // POST /api/requests/{id}/staff-review - ICT staff review & approve
    public boolean staffReview(String requestId, boolean approved, String staffName) {
        if (approved) {
            return service.staffApprove(requestId, staffName);
        } else {
            return service.staffReject(requestId, staffName);
        }
    }

    // POST /api/requests/{id}/director-review - Campus director final decision
    public boolean directorReview(String requestId, boolean approved, String directorName) {
        if (approved) {
            return service.directorApprove(requestId, directorName);
        } else {
            return service.directorReject(requestId, directorName);
        }
    }

    // POST /api/requests/{id}/assign - Assign physical equipment
    public boolean assignEquipment(String requestId, String equipmentId, String staffName) {
        return service.assignEquipment(requestId, equipmentId, staffName);
    }

    // POST /api/requests/{id}/checkout - Release equipment
    public boolean checkOutEquipment(String requestId) {
        return service.recordCheckOut(requestId);
    }

    // POST /api/requests/{id}/return - Log return condition
    public boolean returnEquipment(String requestId, String condition, String remarks) {
        return service.recordReturn(requestId, condition, remarks);
    }

    // GET /api/history - Retrieve borrowing transaction history
    public List<BorrowRecord> getBorrowingHistory() {
        return service.getHistoryRecords();
    }
}
`,
  },
  {
    name: 'schema.sql',
    path: 'src/main/resources/schema.sql',
    package: 'database',
    description: 'PostgreSQL / MySQL relational schema for EquipLink with tables, constraints, and indexes',
    content: `-- EquipLink Campus Equipment Borrowing System Schema
-- Compatible with PostgreSQL, MySQL, and SQLite

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL, -- STUDENT_INSTRUCTOR, ICT_STAFF, CAMPUS_DIRECTOR
    department VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS equipment (
    id VARCHAR(36) PRIMARY KEY, -- e.g. EQ-001
    name VARCHAR(100) NOT NULL,  -- Projector, TV, View Board, Speaker, Laptop
    category VARCHAR(50) NOT NULL,
    status VARCHAR(30) NOT NULL, -- Available, Reserved, In Use, Unavailable, Under Maintenance
    location VARCHAR(100) NOT NULL,
    condition VARCHAR(255) DEFAULT 'Good',
    serial_number VARCHAR(100),
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS borrow_requests (
    id VARCHAR(36) PRIMARY KEY, -- e.g. REQ-001
    purpose VARCHAR(100) NOT NULL, -- Class Lecture, Meeting, Presentation, Activity
    date_of_use VARCHAR(50) NOT NULL,
    time_from VARCHAR(20) NOT NULL,
    time_to VARCHAR(20) NOT NULL,
    section_department VARCHAR(100) NOT NULL,
    requested_by VARCHAR(100) NOT NULL,
    requester_username VARCHAR(50) NOT NULL,
    additional_remarks TEXT,
    status VARCHAR(30) NOT NULL, -- Pending, Staff Review, Director Approval, Approved, Assigned, In Use, Completed, Rejected
    staff_approval VARCHAR(20) DEFAULT 'Pending',
    staff_reviewed_by VARCHAR(100),
    staff_review_date VARCHAR(50),
    director_approval VARCHAR(20) DEFAULT 'Pending',
    director_reviewed_by VARCHAR(100),
    director_review_date VARCHAR(50),
    assigned_equipment_id VARCHAR(36) REFERENCES equipment(id),
    assigned_equipment_name VARCHAR(100),
    assigned_by VARCHAR(100),
    check_out_date VARCHAR(50),
    actual_return_time VARCHAR(50),
    return_condition VARCHAR(50), -- Good, With reported issue
    return_remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS borrow_history (
    id VARCHAR(36) PRIMARY KEY,
    request_id VARCHAR(36) REFERENCES borrow_requests(id),
    borrower VARCHAR(100) NOT NULL,
    equipment_name VARCHAR(100) NOT NULL,
    equipment_id VARCHAR(36),
    purpose VARCHAR(100) NOT NULL,
    date_used VARCHAR(50) NOT NULL,
    return_time VARCHAR(20) NOT NULL,
    status VARCHAR(30) DEFAULT 'Completed',
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    badge VARCHAR(20) DEFAULT 'Update',
    target_role VARCHAR(30) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    request_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial seed data
INSERT INTO equipment (id, name, category, status, location, condition, serial_number) VALUES
('EQ-001', 'Projector', 'Projector', 'Available', 'ICT Room', 'Good', 'EPSON-EB-X06-4401'),
('EQ-002', 'TV', 'TV', 'In Use', 'AV Room', 'Good', 'SAMSUNG-55-4K-9921'),
('EQ-003', 'View Board', 'View Board', 'Reserved', 'Room 101', 'Good', 'VIEWSONIC-IFP6550'),
('EQ-004', 'Speaker', 'Speaker', 'Available', 'ICT Room', 'Good', 'JBL-PRX-ONE-3301'),
('EQ-005', 'Laptop', 'Laptop', 'Unavailable', 'Room 102', 'Needs servicing', 'DELL-LATITUDE-5430');
`,
  },
  {
    name: 'pom.xml',
    path: 'pom.xml',
    package: 'build',
    description: 'Maven build file with dependencies and configuration',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.equiplink</groupId>
    <artifactId>equiplink-management-system</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <name>EquipLink</name>
    <description>Campus Equipment Borrowing and Approval Management System</description>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <!-- Optional SQLite JDBC Driver for offline persistence -->
        <dependency>
            <groupId>org.xerial</groupId>
            <artifactId>sqlite-jdbc</artifactId>
            <version>3.45.1.0</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-jar-plugin</artifactId>
                <version>3.3.0</version>
                <configuration>
                    <archive>
                        <manifest>
                            <mainClass>com.equiplink.Main</mainClass>
                        </manifest>
                    </archive>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
`,
  },
  {
    name: 'README.md',
    path: 'README.md',
    package: 'documentation',
    description: 'Instructions on compiling, running, and testing the EquipLink Java code',
    content: `# EquipLink - Campus Equipment Borrowing & Approval Management System (Java)

EquipLink is a comprehensive Java-based system developed for campus equipment reservation, dual-tier administrative approval workflows (ICT Staff review + Campus Director final sanction), real-time equipment availability matrix tracking, check-out/return inspection, and audit logging.

## Architecture

- **Model Layer**: \`User\`, \`Role\`, \`Equipment\`, \`EquipmentStatus\`, \`BorrowRequest\`, \`RequestStatus\`, \`BorrowRecord\`, \`NotificationItem\`
- **Service Layer**: \`EquipLinkService\` singleton handling thread-safe state mutations and notifications
- **UI Layer**: \`EquipLinkSwingApp\` standalone Java Swing desktop application faithfully implementing all 25 screens from the wireframe PDF
- **Controller Layer**: \`EquipLinkRestController\` Spring Boot compatible REST endpoint signatures
- **Database Layer**: \`schema.sql\` relational schema for PostgreSQL / MySQL / SQLite

## How to Compile & Run

### Method 1: Using Standard \`javac\` & \`java\`
\`\`\`bash
# Compile all Java source files
javac -d bin src/main/java/com/equiplink/**/*.java src/main/java/com/equiplink/*.java

# Run EquipLink Swing Desktop Application
java -cp bin com.equiplink.Main
\`\`\`

### Method 2: Using Maven
\`\`\`bash
# Package the JAR
mvn clean package

# Run the executable JAR
java -jar target/equiplink-management-system-1.0.0.jar
\`\`\`

## System Credentials
- **Student / Instructor**: \`johndoe\` / \`pass123\`
- **ICT Staff**: \`m.santos\` / \`staff123\`
- **Campus Director**: \`director\` / \`admin123\`
`,
  },
];
