// backend/server.js
const express = require('express');
const bookRoutes = require('./src/presentation/routes/bookRoutes');
const corsMiddleware = require('./src/presentation/middlewares/cors'); // 🆕
const errorHandler = require('./src/presentation/middlewares/errorHandler');
const app = express();

// 🆕 Middleware
app.use(corsMiddleware);  // เพิ่ม CORS
app.use(express.json());

// 🆕 ลบ static files ออกตามใบงาน (ห้ามใช้ app.use(express.static('public')))

// Routes
app.use('/api/books', bookRoutes);

// Error handling
app.use(errorHandler);

// 🆕 แก้ PORT และ Log message ตามใบงานเป๊ะๆ
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔═══════════════════════════════════════════════╗
║  Library Management System API (Server)      ║
║  Server running on http://0.0.0.0:${PORT}     ║
║  API: http://localhost:${PORT}/api/books      ║
╚═══════════════════════════════════════════════╝
    `);
});