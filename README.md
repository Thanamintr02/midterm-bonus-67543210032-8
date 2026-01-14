# Library Management System - Client-Server Architecture

## Project Information
- **Student Name:** [ธนมินทร์ เปลี่ยนพร้อม]
- **Student ID:** [67543210032-8]
- **Course:** ENGSE207 - Bonus Exam

## Architecture

### Before: Layered Architecture
- Single application
- Frontend + Backend ผูกติดกัน

### After: Client-Server Architecture
- **Backend:** REST API (Node.js + Express + SQLite)
- **Frontend:** Web Client (HTML + CSS + JavaScript)
- **Communication:** HTTP/JSON

## Project Structure

midterm-bonus-<67543210032-8>/
├── backend/         # Server (VM)
└── frontend/        # Client (Local)

## How to Run

### Backend (Server - VM)

cd backend
npm install
npm start
# Server: http://localhost:3000


### Frontend (Client - Local)

cd frontend
# Open index.html in browser
# Or use: python3 -m http.server 8000


## API Endpoints

Method	Endpoint	Description

GET	/api/books	ดึงข้อมูลหนังสือทั้งหมด (รองรับ Filter ?status=)
GET	/api/books/:id	ดึงข้อมูลหนังสือตาม ID
POST	/api/books	เพิ่มหนังสือใหม่
PUT	/api/books/:id	แก้ไขข้อมูลหนังสือ
PATCH	/api/books/:id/borrow	ยืมหนังสือ (เปลี่ยนสถานะเป็น borrowed)
PATCH	/api/books/:id/return	คืนหนังสือ (เปลี่ยนสถานะเป็น available)
DELETE	/api/books/:id	ลบหนังสือ

## Screenshots

[เพิ่ม screenshots ของ UI]