import React, { useState } from "react";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";

const BookCard = ({ book }) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  const handelAddToCart = (product) => {
    const productWithResolvedImage = {
      ...product,
      coverImage: getImgUrl(String(product.coverImage || "")),
    };

    dispatch(addToCart(productWithResolvedImage));
  };

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="bg-gray-100 border border-blue-900 rounded-lg p-4 shadow-md hover:shadow-lg w-72">
      <Link>
        <div className="w-full h-96 relative">
          <img
            src={getImgUrl(String(book?.coverImage || ""))}
            alt="Book Cover"
            className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform transform"
          />
        </div>
      </Link>
      <div className="mt-3">
        <Link to={`/books/${book._id}`}>
          <h3 className="text-blue-900 font-bold text-lg mb-1">
            {book.title.length > 26
              ? `${book?.title.slice(0, 24)}...`
              : book?.title}
          </h3>
        </Link>
        <p className="text-blue-700 text-sm mb-2">
          By {book?.author || "Unknown Author"}
        </p>

        <p className="font-medium mb-5">
          Rs.{book?.newPrice}{" "}
          <span className="text-yellow-500 line-through ml-2">
            Rs.{book?.oldPrice}
          </span>
        </p>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => handelAddToCart(book)}
          className="bg-blue-900 text-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-blue-900 transition"
        >
          Add to Cart
        </button>
        <button
          className="border border-blue-900 text-blue-900 px-4 py-2 rounded-md hover:bg-blue-900 hover:text-white transition"
          onClick={handleDetailsClick}
        >
          {showDetails ? "Description" : "Description"}
        </button>
      </div>
      {showDetails && (
        <div className="absolute top-96 left-1 mt-2 bg-white p-4 rounded-lg shadow-md z-10 transform -translate-y-1/2 w-72 border border-blue-900">
          <p className="text-blue-900 font-bold text-lg mb-2">
            Name: {book.title}
          </p>
          <p className="text-blue-700 text-sm mb-4">
            Author: {book?.author || "Unknown Author"}
          </p>
          <p className="text-gray-800">{book.description}</p>
        </div>
      )}
    </div>
  );
};

export default BookCard;
