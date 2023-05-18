const Book = require('../models/Book');

// http://localhost:3001/books?title=The Clean Coder
// http://localhost:3001/books?status=true
const GETBooks = async (request, response) => {
	// sorted new first
	const books = await Book.find(request.query).sort({ _id: -1 });
	response.json(books);
};

module.exports = GETBooks;
