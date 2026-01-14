const bookService = require('../../business/services/bookService');

class BookController {
    // ตัวอย่างการปรับ getAllBooks ตามใบงาน
    async getAllBooks(req, res, next) {
        try {
            const { status } = req.query;
            const result = await bookService.getAllBooks(status);
            res.json({
                success: true,
                data: result,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            next(error);
        }
    }

    async getBookById(req, res, next) {
        try {
            const book = await bookService.getBookById(req.params.id);
            res.json({
                success: true,
                data: book,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            next(error);
        }
    }

    async createBook(req, res, next) {
        try {
            // แก้ไข: ใน bookService ของคุณใช้ชื่อ createBook (ไม่ใช่ addBook)
            const newBook = await bookService.createBook(req.body); 
            res.status(201).json({
                success: true,
                data: newBook,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            next(error);
        }
    }

    async updateBook(req, res, next) {
        try {
            const updatedBook = await bookService.updateBook(req.params.id, req.body);
            res.json({
                success: true,
                data: updatedBook,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            next(error);
        }
    }

    async borrowBook(req, res, next) {
        try {
            const result = await bookService.borrowBook(req.params.id);
            res.json({ success: true, data: result, timestamp: new Date().toISOString() });
        } catch (error) { next(error); }
    }

    async returnBook(req, res, next) {
        try {
            const result = await bookService.returnBook(req.params.id);
            res.json({ success: true, data: result, timestamp: new Date().toISOString() });
        } catch (error) { next(error); }
    }

    async deleteBook(req, res, next) {
        try {
            await bookService.deleteBook(req.params.id);
            res.json({
                success: true,
                message: 'Book deleted successfully',
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BookController();