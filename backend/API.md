# CampusFix API Documentation

**Base URL:** `http://localhost:5000`

All protected routes require:

```
Authorization: Bearer <jwt_token>
```

---

## Authentication

### Register

```
POST /api/auth/register
```

**Body:**
```json
{
  "name": "Priya Sharma",
  "email": "priya@bbdu.ac.in",
  "password": "secret123",
  "hostelBlock": "A",
  "roomNumber": "101"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "user": {
    "_id": "...",
    "name": "Priya Sharma",
    "email": "priya@bbdu.ac.in",
    "hostelBlock": "A",
    "roomNumber": "101",
    "role": "student"
  }
}
```

---

### Login

```
POST /api/auth/login
```

**Body:**
```json
{
  "email": "priya@bbdu.ac.in",
  "password": "secret123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

---

## Issues (Student)

### Upload Images (optional, before creating issue)

```
POST /api/upload/images
Authorization: Bearer <student_token>
Content-Type: multipart/form-data
```

**Form Data:**
| Key | Type | Notes |
|-----|------|-------|
| `images` | File | Up to 5 images, max 5MB each |

**Response (200):**
```json
{
  "success": true,
  "message": "Images uploaded successfully",
  "count": 2,
  "urls": [
    "https://res.cloudinary.com/.../image1.jpg",
    "https://res.cloudinary.com/.../image2.jpg"
  ]
}
```

---

### Create Issue

```
POST /api/issues
Authorization: Bearer <student_token>
```

**Body:**
```json
{
  "title": "Leaking tap in washroom",
  "description": "Tap has been leaking for 2 days.",
  "category": "Plumbing",
  "location": "Hostel Block A, Room 101",
  "images": [
    "https://res.cloudinary.com/.../image1.jpg"
  ]
}
```

**Categories:** Plumbing, Electricity, Internet, Cleaning, Furniture, Water, Other

**Response (201):**
```json
{
  "success": true,
  "issue": {
    "_id": "...",
    "title": "Leaking tap in washroom",
    "status": "Pending",
    "priority": "Medium",
    "reportedBy": {
      "_id": "...",
      "name": "Priya Sharma",
      "email": "priya@bbdu.ac.in"
    }
  }
}
```

> Creates a notification for the student automatically.

---

### Get My Issues

```
GET /api/issues/my
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "issues": [ ... ]
}
```

---

### Get Issue by ID

```
GET /api/issues/:id
Authorization: Bearer <token>
```

- Student can view **only their own** issues.
- Admin can view **any** issue.

**Response (200):**
```json
{
  "success": true,
  "issue": { ... }
}
```

---

## Admin

All admin routes require `Authorization: Bearer <admin_token>`.

### Get All Issues

```
GET /api/admin/issues
```

**Response (200):**
```json
{
  "success": true,
  "count": 10,
  "issues": [
    {
      "_id": "...",
      "title": "Leaking tap",
      "status": "Pending",
      "reportedBy": {
        "name": "Priya Sharma",
        "email": "priya@bbdu.ac.in"
      }
    }
  ]
}
```

---

### Update Issue Status

```
PATCH /api/admin/issues/:id/status
```

**Body:**
```json
{
  "status": "In Progress",
  "adminRemark": "Plumber assigned."
}
```

**Allowed statuses:** Pending, In Progress, Resolved, Rejected

**Response (200):**
```json
{
  "success": true,
  "message": "Issue updated successfully",
  "issue": { ... }
}
```

> Creates notifications when status changes or admin remark is added.

---

### Dashboard Statistics

```
GET /api/admin/dashboard
```

**Response (200):**
```json
{
  "success": true,
  "stats": {
    "totalIssues": 42,
    "pendingIssues": 10,
    "inProgressIssues": 8,
    "resolvedIssues": 20,
    "rejectedIssues": 4,
    "todayIssues": 3,
    "categoryWiseStats": [
      { "category": "Plumbing", "count": 12 },
      { "category": "Electricity", "count": 8 }
    ],
    "monthlyIssueStats": [
      { "month": "Jan", "year": 2026, "count": 5 },
      { "month": "Feb", "year": 2026, "count": 8 }
    ]
  }
}
```

---

## Notifications (Student)

### Get My Notifications

```
GET /api/notifications
Authorization: Bearer <student_token>
```

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "unreadCount": 2,
  "notifications": [
    {
      "_id": "...",
      "type": "status_changed",
      "message": "Your issue \"Leaking tap\" status changed from \"Pending\" to \"In Progress\".",
      "isRead": false,
      "issue": {
        "_id": "...",
        "title": "Leaking tap",
        "status": "In Progress",
        "category": "Plumbing"
      },
      "createdAt": "2026-07-23T..."
    }
  ]
}
```

**Notification types:** `issue_created`, `status_changed`, `admin_remark`

---

### Mark Notification as Read

```
PATCH /api/notifications/:id/read
Authorization: Bearer <student_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Notification marked as read",
  "notification": { ... }
}
```

---

### Mark All Notifications as Read

```
PATCH /api/notifications/read-all
Authorization: Bearer <student_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

## Health Check

```
GET /
```

**Response (200):**
```json
{
  "message": "CampusFix Backend Running"
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Validation error |
| 401 | Missing or invalid token |
| 403 | Forbidden (wrong role or unauthorized access) |
| 404 | Resource not found |
| 409 | Duplicate email (registration) |
| 500 | Server error |

---

## Postman Quick Start

1. **Login** → copy `token` from response.
2. Set **Authorization → Bearer Token** with the copied token.
3. For image upload, use **Body → form-data** with key `images` (type: File).
4. Pass returned `urls` into the `images` array when creating an issue.

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing secret |
| `JWT_EXPIRE` | Token expiry (default: 7d) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
