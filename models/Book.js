const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
	title: String,
	description: String,
	author: String,
	price: Number,
	status: Boolean,
	link: String,
	image: String,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
