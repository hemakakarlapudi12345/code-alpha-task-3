<?php
// index.php
?> 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personal Book Library</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Personal Book Library</h1>
        <div class="form-section">
            <h2>Add a Book</h2>
            <form id="bookForm">
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" required>
                <label for="author">Author:</label>
                <input type="text" id="author" name="author" required>
                <label for="category">Category:</label>
                <input type="text" id="category" name="category" required>
                <button type="submit">Add Book</button>
            </form>
        </div>
        <div class="search-section">
            <h2>Search Books</h2>
            <input type="text" id="search" placeholder="Search by title or author">
        </div>
        <div class="library-section">
            <h2>Library</h2>
            <table id="libraryTable">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Borrowed</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Books will be displayed here -->
                </tbody>
            </table>
        </div>
        <div class="history-section">
            <h2>Borrowing History</h2>
            <ul id="historyList">
                <!-- Borrowing history will be displayed here -->
            </ul>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
