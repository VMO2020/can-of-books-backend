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

const GETBooks = require('./library/GETBooks.js');
const GETBook = require('./library/GETBook.js');
const CREATEBook = require('./library/CREATEBook.js');
const DELETEBook = require('./library/DELETEBook.js');
const UPDATEBook = require('./library/UPDATEBook.js');

app.get('/', (request, response) => {
	response.json('You are on the root route of my book app.');
});

// GET-Read (List)
app.get('/books', GETBooks);

// GET-Read (book)
app.get('/book', GETBook);

// POST-Create
app.post('/book', CREATEBook);

// DELETE-Delete
app.delete('/book/:id', DELETEBook);

// PUT - Update
app.put('/book/:id', UPDATEBook);

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
