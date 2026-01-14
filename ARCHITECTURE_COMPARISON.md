# Architecture Comparison

## Layered Architecture (Before)

### Pros:
- **Simplicity:** พัฒนาและดูแลรักษาได้ง่ายในโปรเจกต์ขนาดเล็ก
- **No CORS issues:** ไม่ต้องกังวลเรื่องความปลอดภัยของการข้าม Domain เพราะทุกอย่างรันบนพอร์ตเดียวกัน
- **Speed of Development:** การรับส่งข้อมูลภายในโปรเจกต์ทำได้รวดเร็วผ่านฟังก์ชันภายใน

### Cons:
- **Tightly Coupled:** Frontend และ Backend ผูกติดกันเกินไป เปลี่ยนแปลงเทคโนโลยีลำบาก
- **Scalability:** ไม่สามารถขยายเฉพาะส่วนได้ (เช่น ถ้าคนใช้ UI เยอะ แต่ DB งานน้อย ก็ต้อง Scale ทั้งก้อน)
- **Deployment:** เมื่อมีการแก้ไขหน้าตาเว็บเพียงเล็กน้อย ต้อง Deploy ระบบใหม่ทั้งหมด (ทั้ง Server)

## Client-Server Architecture (After)

### Pros:
- **Separation of Concerns:** แยกหน้าที่ชัดเจน Backend สนใจแค่ข้อมูล Frontend สนใจแค่การแสดงผล
- **Independent Scaling:** สามารถแยกเครื่องรันได้ (เช่น Backend รันบน VM สเปกสูง, Frontend รันบน CDN)
- **Cross-Platform:** Backend ตัวเดียวสามารถรองรับได้ทั้ง Web, Mobile App และ IoT

### Cons:
- **Network Dependency:** การทำงานต้องพึ่งพาระบบเครือข่าย หาก Network ช้าจะส่งผลต่อ UI ทันที

## Changes Made

### 1. Separation
- แยก Frontend และ Backend เป็น 2 โปรเจกต์

### 2. Communication
- ใช้ REST API (HTTP/JSON)

### 3. CORS
- เพิ่ม CORS middleware เพื่อให้ Client-Server คุยกันได้

### 4. API Response Format
- มาตรฐาน: { success, data, timestamp }