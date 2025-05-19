import React from "react";
import {
  useDeleteBookMutation,
  useFetchAllBooksQuery,
} from "../redux/features/books.Api";
import { Link, useNavigate } from "react-router-dom";

const ManageBook = () => {
  const navigate = useNavigate();

  const { data: books, refetch } = useFetchAllBooksQuery();

  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id).unwrap();
      alert("Book deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to delete book:", error.message);
      alert("Failed to delete book. Please try again.");
    }
  };

  const handleEditClick = (id) => {
    navigate(`dashboard/edit-book/${id}`);
  };

  return (
    <section className="py-6">
      <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-6 mx-auto mt-12">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-md rounded-lg">
          {/* Header */}
          <div className="rounded-t bg-[#002366] text-white px-6 py-4 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-lg">All Books</h3>
              </div>
              <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                <button
                  className="bg-[#FFD700] text-[#002366] text-sm font-bold uppercase px-4 py-2 rounded-md shadow hover:bg-yellow-500 transition duration-150"
                  type="button"
                >
                  See all
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                    #
                  </th>
                  <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                    Book Title
                  </th>
                  <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                    Category
                  </th>
                  <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                    Price
                  </th>
                  <th className="px-6 py-3 text-xs uppercase font-semibold text-left">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {books && books.length > 0 ? (
                  books.map((book, index) => (
                    <tr
                      key={index}
                      className="border-t hover:bg-gray-100 transition"
                    >
                      <td className="border-t-0 px-6 py-4 text-sm font-medium text-gray-800">
                        {index + 1}
                      </td>
                      <td className="border-t-0 px-6 py-4 text-sm">
                        {book.title}
                      </td>
                      <td className="border-t-0 px-6 py-4 text-sm">
                        {book.category}
                      </td>
                      <td className="border-t-0 px-6 py-4 text-sm font-semibold text-[#002366]">
                        Rs. {book.newPrice}
                      </td>
                      <td className="border-t-0 px-6 py-4 text-sm space-x-4">
                        <Link
                          to={`/dashboard/update/${book._id}`}
                          className="text-[#002366] hover:text-blue-700 font-medium underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteBook(book._id)}
                          className="bg-red-500 text-white px-4 py-1 rounded-full text-sm hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      No books available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageBook;
