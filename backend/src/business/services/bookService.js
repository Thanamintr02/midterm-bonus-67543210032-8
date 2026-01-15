const bookRepository = require('../../data/repositories/bookRepository');
const bookValidator = require('../validators/bookValidator');

class BookService {
    // TODO: Implement getAllBooks
    async getAllBooks(status = null) {
        // 1. ถ้ามี status ให้ validate (สมมติว่า check ง่ายๆ ว่า status ถูกต้องไหม)
        if (status && !['available', 'borrowed'].includes(status)) {
            throw new Error('Invalid status filter');
        }
        // 2. เรียก bookRepository.findAll(status)
        const books = await bookRepository.findAll(status);
        // 3. คำนวณสถิติ
        const statistics = {
            total: books.length,
            available: books.filter(b => b.status === 'available').length,
            borrowed: books.filter(b => b.status === 'borrowed').length
        };
        // 4. return
        return { books, statistics };
    }

    // TODO: Implement getBookById
    async getBookById(id) {
        if (!id) throw new Error('ID is required');
        const book = await bookRepository.findById(id);
        if (!book) {
            const error = new Error('Book not found');
            error.name = 'NotFoundError';
            throw error;
        }
        return book;
    }

    // TODO: Implement createBook
    async createBook(bookData) {
        // 1. & 2. Validate data & ISBN (เปลี่ยนชื่อให้ตรงกับ validator)
        bookValidator.validateBookData(bookData); // ✅ แก้เป็นชื่อนี้
        bookValidator.validateISBN(bookData.isbn);
        const id = await bookRepository.create(bookData);
        return await bookRepository.findById(id);
}

    // TODO: Implement updateBook
    async updateBook(id, bookData) {
        bookValidator.validateBookData(bookData); // ✅ แก้เป็นชื่อนี้
        bookValidator.validateISBN(bookData.isbn);
        await this.getBookById(id);
        await bookRepository.update(id, bookData);
 return await bookRepository.findById(id);
    }

    // TODO: Implement borrowBook
    async borrowBook(id) {
        const book = await this.getBookById(id);
        if (book.status === 'borrowed') {
            const error = new Error('Book is already borrowed');
            error.name = 'ValidationError';
            throw error;
        }
        await bookRepository.updateStatus(id, 'borrowed');
        return await bookRepository.findById(id);
    }

    // TODO: Implement returnBook
    async returnBook(id) {
        const book = await this.getBookById(id);
        if (book.status !== 'borrowed') {
            const error = new Error('Book is not borrowed');
            error.name = 'ValidationError';
            throw error;
        }
        await bookRepository.updateStatus(id, 'available');
        return await bookRepository.findById(id);
    }

    // TODO: Implement deleteBook
    async deleteBook(id) {
        const book = await this.getBookById(id); // ตัวนี้จะเช็คเองว่ามีหนังสือไหม
    if (book.status === 'borrowed') {
        throw new Error('Cannot delete borrowed book');
    }
    await bookRepository.delete(id);
    return true;
    }
}

module.exports = new BookService();