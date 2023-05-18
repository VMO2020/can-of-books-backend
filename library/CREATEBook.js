const Book = require('../models/Book');

const CREATEBook = async (request, response) => {
	const book = request.body;
	await Book.create(book);
	response.json({ success: true, book });
};

module.exports = CREATEBook;
