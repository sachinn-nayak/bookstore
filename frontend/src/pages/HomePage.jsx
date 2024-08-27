import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookList from '../components/BookList';

const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold">Bookstore</h1>
      <BookList books={books} />
    </div>
  );
};

export default HomePage;
