import React from "react";
import BookCard from "./books/BookCard";
import { useLocation } from "react-router-dom";
import { useFetchAllBooksQuery } from "../redux/features/books.Api";

const Search = () => {
  const location = useLocation();
  const queryParam =
    new URLSearchParams(location.search).get("q")?.toLowerCase() || "";

  const { data: books = [] } = useFetchAllBooksQuery();

  const filteredBooks = books.filter((book) => {
    const title = book.title?.toLowerCase();
    const category = book.category?.toLowerCase();
    const author = book.author?.toLowerCase();
    return (
      title.includes(queryParam) ||
      category === queryParam ||
      author.includes(queryParam)
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Search results for:{" "}
        <span className="text-yellow-600">"{queryParam}"</span>
      </h2>

      {filteredBooks.length === 0 ? (
        <p className="text-gray-500">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
