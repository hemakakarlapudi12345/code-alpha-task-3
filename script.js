document.getElementById('bookForm').addEventListener('submit', addBook);
document.getElementById('searchButton').addEventListener('click', searchBooks);
 
let books = [];
let history = [];
let currentBorrowIndex = null;

function addBook(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;

    const book = { title, author, category, borrowed: false, borrowerName: null, borrowTime: null };
    books.push(book);
    displayBooks();
    document.getElementById('bookForm').reset();
}

function displayBooks() {
    const libraryTable = document.getElementById('libraryTable').getElementsByTagName('tbody')[0];
    libraryTable.innerHTML = '';

    books.forEach((book, index) => {
        const row = libraryTable.insertRow();
        row.insertCell(0).innerText = book.title;
        row.insertCell(1).innerText = book.author;
        row.insertCell(2).innerText = book.category;
        const borrowCell = row.insertCell(3);
        const borrowButton = document.createElement('button');
        borrowButton.innerText = book.borrowed ? 'Return' : 'Borrow';
        borrowButton.onclick = () => toggleBorrow(index);
        borrowCell.appendChild(borrowButton);
    });
}

function toggleBorrow(index) {
    const book = books[index];

    if (!book.borrowed) {
        currentBorrowIndex = index;
        openBorrowModal();
    } else {
        book.borrowed = false;
        book.borrowerName = null;
        book.borrowTime = null;
        history.push(`Returned "${book.title}" by ${book.author} on ${new Date().toLocaleString()}`);
        displayBooks();
        displayHistory();
    }
}

function displayHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    history.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.innerText = entry;
        historyList.appendChild(listItem);
    });
}

function searchBooks() {
    const query = document.getElementById('search').value.toLowerCase();
    const searchResult = document.getElementById('searchResult');
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query));

    if (filteredBooks.length > 0) {
        searchResult.innerText = 'Book found in the library!';
    } else {
        searchResult.innerText = 'Book not found in the library!';
    }

    const libraryTable = document.getElementById('libraryTable').getElementsByTagName('tbody')[0];
    libraryTable.innerHTML = '';

    filteredBooks.forEach((book, index) => {
        const row = libraryTable.insertRow();
        row.insertCell(0).innerText = book.title;
        row.insertCell(1).innerText = book.author;
        row.insertCell(2).innerText = book.category;
        const borrowCell = row.insertCell(3);
        const borrowButton = document.createElement('button');
        borrowButton.innerText = book.borrowed ? 'Return' : 'Borrow';
        borrowButton.onclick = () => toggleBorrow(index);
        borrowCell.appendChild(borrowButton);
    });
}

function openBorrowModal() {
    const modal = document.getElementById('borrowModal');
    modal.style.display = 'block';
}

function closeBorrowModal() {
    const modal = document.getElementById('borrowModal');
    modal.style.display = 'none';
    currentBorrowIndex = null;
}

document.getElementById('borrowForm').addEventListener('submit', confirmBorrow);
document.querySelector('.close').onclick = closeBorrowModal;
window.onclick = function(event) {
    const modal = document.getElementById('borrowModal');
    if (event.target == modal) {
        closeBorrowModal();
    }
};

function confirmBorrow(e) {
    e.preventDefault();
    const borrowerName = document.getElementById('borrowerName').value;

    if (borrowerName.trim() === '') {
        alert('Please enter your name.');
        return;
    }

    const book = books[currentBorrowIndex];
    book.borrowed = true;
    book.borrowerName = borrowerName;
    book.borrowTime = new Date().toLocaleString();

    history.push(`Borrowed "${book.title}" by ${book.author} by ${borrowerName} on ${book.borrowTime}`);
    displayBooks();
    displayHistory();
    closeBorrowModal();
}
