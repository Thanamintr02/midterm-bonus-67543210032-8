function showBookForm(book = null) {
    const modal = document.getElementById('modal');
    const formTitle = document.getElementById('form-title');
    const form = document.getElementById('book-form');
    
    modal.style.display = 'flex';
    
    if (book) {
        formTitle.innerText = 'Edit Book';
        document.getElementById('book-id').value = book.id;
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('isbn').value = book.isbn;
    } else {
        formTitle.innerText = 'Add New Book';
        form.reset();
        document.getElementById('book-id').value = '';
    }
}

function hideBookForm() {
    document.getElementById('modal').style.display = 'none';
}