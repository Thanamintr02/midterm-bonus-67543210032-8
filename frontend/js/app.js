//app.js Main Application Logic for Library Management
let currentFilter = "all";

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  loadBooks();
});

// Setup event listeners
function setupEventListeners() {
  document.getElementById("add-btn").addEventListener("click", showAddModal);

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const filter = e.target.dataset.filter;
      filterBooks(filter);
    });
  });

  document.querySelector(".close").addEventListener("click", closeModal);
  document.getElementById("cancel-btn").addEventListener("click", closeModal);
  document.getElementById("book-form").addEventListener("submit", handleSubmit);
}

// Load books
async function loadBooks(status = null) {
    try {
        const response = await api.getAllBooks(status);
        // Backend ส่งมาเป็น { success: true, data: { books: [], statistics: {} } }
        const actualData = response.data; 
        displayBooks(actualData.books);
        updateStatistics(actualData.statistics);
    } catch (error) {
        console.error(error);
    }
}

// Display books
function displayBooks(books) {
  const container = document.getElementById("book-list");

  if (books.length === 0) {
    container.innerHTML = '<div class="no-books">📚 No books found</div>';
    return;
  }

  container.innerHTML = books.map((book) => createBookCard(book)).join("");
}

// Create book card HTML
function createBookCard(book) {
  return `
        <div class="book-card">
            <h3>${escapeHtml(book.title)}</h3>
            <p class="author">👤 ${escapeHtml(book.author)}</p>
            <p class="isbn">🔖 ISBN: ${escapeHtml(book.isbn)}</p>
            <span class="status-badge status-${book.status}">
                ${
                  book.status === "available" ? "✅" : "📖"
                } ${book.status.toUpperCase()}
            </span>
            <div class="actions">
                ${
                  book.status === "available"
                    ? `<button class="btn btn-success" onclick="borrowBook(${book.id})">Borrow</button>`
                    : `<button class="btn btn-warning" onclick="returnBook(${book.id})">Return</button>`
                }
                <button class="btn btn-secondary" onclick="editBook(${
                  book.id
                })">Edit</button>
                <button class="btn btn-danger" onclick="deleteBook(${
                  book.id
                })">Delete</button>
            </div>
        </div>
    `;
}

// Update statistics
function updateStatistics(stats) {
  document.getElementById("stat-available").textContent = stats.available;
  document.getElementById("stat-borrowed").textContent = stats.borrowed;
  document.getElementById("stat-total").textContent = stats.total;
}

// Filter books
function filterBooks(status) {
  currentFilter = status;

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.filter === status) {
      btn.classList.add("active");
    }
  });

  loadBooks(status === "all" ? null : status);
}

// Show/hide loading
function showLoading() {
  document.getElementById("loading").style.display = "block";
  document.getElementById("book-list").style.display = "none";
}

function hideLoading() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("book-list").style.display = "grid";
}

// Modal functions
function showAddModal() {
  document.getElementById("modal-title").textContent = "Add New Book";
  document.getElementById("book-form").reset();
  document.getElementById("book-id").value = "";
  document.getElementById("book-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("book-modal").style.display = "none";
}

// Form submit
async function handleSubmit(event) {
  event.preventDefault();

  const id = document.getElementById("book-id").value;
  const bookData = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    isbn: document.getElementById("isbn").value,
  };

  try {
    if (id) {
    await api.updateBook(id, bookData);
    alert('Book updated successfully!');
} else {
    await api.createBook(bookData);
    alert('Book added successfully!');
}

    closeModal();
    loadBooks(currentFilter === "all" ? null : currentFilter);
  } catch (error) {
    alert("Error: " + error.message);
  }
}

// Edit book
async function editBook(id) {
    try {
        const response = await api.getBookById(id);
        const book = response.data; 
        
        // นำข้อมูลไปใส่ใน Form
        document.getElementById('modal-title').innerText = 'Edit Book';
        document.getElementById('book-id').value = book.id;
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('isbn').value = book.isbn;
        
        document.getElementById('book-modal').style.display = 'flex';
    } catch (error) {
        console.error('Edit Error:', error);
        alert('Error: ' + error.message);
    }
}

// Borrow book
async function borrowBook(id) {
  if (!confirm("Do you want to borrow this book?")) return;

  try {
    await api.borrowBook(id);
    alert("Book borrowed successfully!");
    loadBooks(currentFilter === "all" ? null : currentFilter);
  } catch (error) {
    alert("Error: " + error.message);
  }
}

// Return book
async function returnBook(id) {
  if (!confirm("Do you want to return this book?")) return;

  try {
    await api.returnBook(id);
    alert("Book returned successfully!");
    loadBooks(currentFilter === "all" ? null : currentFilter);
  } catch (error) {
    alert("Error: " + error.message);
  }
}

// Delete book
async function deleteBook(id) {
    if (confirm('Are you sure you want to delete this book?')) {
        try {
            await api.deleteBook(id);
            alert('Book deleted successfully!');
            loadBooks(); // โหลดรายการใหม่หลังจากลบ
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
}

// Escape HTML
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
