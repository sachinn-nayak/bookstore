import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => (
  <div className="border p-4 rounded shadow hover:shadow-lg">
    <img src={book.coverImage} alt={book.title} className="w-full h-48 object-cover mb-4" />
    <h2 className="text-lg font-bold mb-2">{book.title}</h2>
    <p className="text-gray-700">${book.price.toFixed(2)}</p>
    <Link to={`/book/${book._id}`} className="text-blue-500 hover:underline mt-2 inline-block">
      View Details
    </Link>
  </div>
);

export default BookCard;
