const Book = require('../models/Book');

// http://localhost:3001/book?_id=64625541980584ba2dd337ee
const GETBook = async (request, response) => {
	const books = await Book.find(request.query);
	response.json(books);
};

module.exports = GETBook;
