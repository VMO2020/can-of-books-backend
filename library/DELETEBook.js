const Book = require('../models/Book');

// http://localhost:3001/book/1234
// request.params = { id: 1234 }
const DELETEBook = async (request, response) => {
	const id = request.params.id;
	// Checking if the book is already in the database
	const bookExist = await Book.findOne({ _id: id });
	if (!bookExist)
		return response.status(404).send({
			success: false,
			error: `No book with id: ${id}`,
		});
	// Delete Book
	await Book.findByIdAndDelete(id);
	response.json({ success: true, id });
};

module.exports = DELETEBook;
