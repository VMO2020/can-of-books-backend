const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL);

const Book = require('./models/Book');

async function seed() {
	// create a few book
	await Book.create({
		title: 'The Road to React',
		description: 'Your journey to master plain yet pragmatic React.js',
		author: 'Robin Wieruch',
		price: 24.86,
		status: true,
		link: 'https://www.amazon.co.uk/dp/172004399X/',
		image:
			'https://m.media-amazon.com/images/I/41+B0usacbL._SX384_BO1,204,203,200_.jpg',
	});

	console.log('New book created');
	mongoose.disconnect();
}

seed();
