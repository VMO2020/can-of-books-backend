const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());

const bp = require('body-parser');
app.use(bp.json());

const Book = require('./models/Book');

app.get('/', (request, response) => {
	response.json('You are on the root route of my book app.');
});

// GET-Read (List)
// http://localhost:3001/books?title=The Clean Coder
// http://localhost:3001/books?status=true
app.get('/books', async (request, response) => {
	// sorted new first
	const books = await Book.find(request.query).sort({ _id: -1 });
	response.json(books);
});

// http://localhost:3001/book?_id=64625541980584ba2dd337ee
app.get('/book', async (request, response) => {
	const books = await Book.find(request.query);
	response.json(books);
});

// POST-Create
app.post('/book', async (request, response) => {
	const book = request.body;
	await Book.create(book);
	response.json({ success: true, book });
});

// DELETE-Delete
// http://localhost:3001/book/1234
// request.params = { id: 1234 }
app.delete('/book/:id', async (request, response) => {
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
});

// PUT - Update
app.put('/book/:id', async (request, response) => {
	const book = request.body;
	const id = request.params.id;
	const updatedBook = await Book.findByIdAndUpdate(id, book);
	response.json({ success: true, id, book });
});

mongoose
	.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('MongoDB Atlas Connected!');
	})
	.then(() =>
		app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`))
	)
	.catch((error) => console.log(error.message));
