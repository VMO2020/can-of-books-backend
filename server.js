const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());

const Book = require('./models/Book');

app.get('/', (request, response) => {
	response.json('You are on the root route of my book app.');
});

// http://localhost:3001/books?title=The Clean Coder
// http://localhost:3001/books?status=true
app.get('/books', async (request, response) => {
	const books = await Book.find(request.query);
	response.json(books);
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
