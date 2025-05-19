import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import { useFetchBookByIdQuery } from "../../redux/features/books.Api";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-[#002366]">
        Loading...
      </div>
    );

  if (isError || !book)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading book information.
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        {/* Title & Author */}
        <h1 className="text-3xl font-bold text-[#002366] mb-1 text-center">
          {book?.title || "Unknown Title"}
        </h1>
        <h2 className="text-lg text-gray-600 mb-6 text-center">
          By {book?.author || "Unknown Author"}
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Book Cover */}
          <img
            src={getImgUrl(String(book?.coverImage || ""))}
            alt={book?.title || "Book Cover"}
            className="w-48 h-auto rounded-lg shadow-md mb-6 md:mb-0 md:mr-8"
          />

          {/* Book Details */}
          <div className="flex-1 space-y-3">
            <p className="text-gray-600">
              <strong>Added On:</strong>{" "}
              {book?.createdAt
                ? new Date(book.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
            <p className="text-gray-600 capitalize">
              <strong>Category:</strong> {book?.category || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Description:</strong>{" "}
              {book?.description || "No description available."}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={() => handleAddToCart(book)}
                className="bg-[#002366] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#001a4d] transition duration-300"
              >
                <FiShoppingCart />
                <span>Add to Cart</span>
              </button>

              {book?.bookPdf && (
                <>
                  <a
                    href={book.bookPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FFD700] text-[#002366] px-4 py-2 rounded-md hover:bg-[#f5c400] transition duration-300"
                  >
                    Read Online
                  </a>
                  <a
                    href={`${book.bookPdf}?alt=media`}
                    download={book.title || "book.pdf"}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
                  >
                    Download
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
