# API Tests

## 1. Get All Books
\`\`\`bash
curl http://localhost:3000/api/books
\`\`\`

## 2. Get Book by ID
\`\`\`bash
curl http://localhost:3000/api/books/1
\`\`\`

## 3. Create Book
\`\`\`bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "9780132350884"
  }'
\`\`\`

# 4. Borrow Book
Bash

curl -X PATCH http://localhost:3000/api/books/1/borrow
# 5. Return Book
Bash

curl -X PATCH http://localhost:3000/api/books/1/return
# 6. Delete Book
Bash

curl -X DELETE http://localhost:3000/api/books/1

