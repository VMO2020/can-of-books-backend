const Book = require('../models/Book');

const UPDATEBook = async (request, response) => {
	const id = request.params.id;
	const book = request.body;
	const updatedBook = await Book.findByIdAndUpdate(id, book);
	response.json({ success: true, id, updatedBook });
};

module.exports = UPDATEBook;
