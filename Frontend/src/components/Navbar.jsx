import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { BsBagCheckFill } from "react-icons/bs";
import { LuNotebookPen } from "react-icons/lu";
import { FaSellcast, FaSignOutAlt, FaBars } from "react-icons/fa";
import {
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import logoLight from "/logo10.png";
import logoDark from "/logo9.png";
import { useSelector } from "react-redux";
import { useAuth } from "./OAuth";
import { getAuth } from "firebase/auth";
import { useFetchAllBooksQuery } from "../redux/features/books.Api";

const Navbar = ({ toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const { data: books = [] } = useFetchAllBooksQuery();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (title) => {
    navigate(`/search?q=${encodeURIComponent(title)}`);
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const filteredSuggestions = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { currentUser, signout } = useAuth();
  const auth = getAuth();

  const handleSignout = () => {
    signout();
  };

  return (
    <header className="max-w-screen-2xl mx-auto py-6">
      <nav className="flex justify-between items-center bg-[#002366] sm:p-3 p-3 fixed w-full top-0 rounded-md z-50">
        {/*leftside*/}
        <div className="flex items-center md:gap-16 gap-4">
          <div className="flex">
            {/* Button */}
            <button
              className="btn btn-square btn-ghost hover:bg-[#E9ECEF] text-[#FFFFFF] hover:text-[#002366]"
              onClick={toggleSidebar}
            >
              <FaBars className="h-5" />
            </button>

            {/* Name */}
            <Link to="/" className="hidden sm:block">
              <div
                className="font-bold mx-2 text-sm sm:text-xl flex flex-wrap p-2 btn btn-ghost"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  backgroundColor: isHovered ? "#E9ECEF" : "transparent",
                }}
              >
                <img
                  src={isHovered ? logoDark : logoLight}
                  alt="Library Logo"
                  className="w-8 h-8 transition duration-300"
                />
                <span>
                  <span
                    className={isHovered ? "text-blue-900" : "text-[#FFFFFF]"}
                  >
                    LIBRARY
                  </span>
                  <span
                    className={isHovered ? "text-[#333333]" : "text-[#FFD700]"}
                  >
                    am
                  </span>
                </span>
              </div>
            </Link>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="relative sm:w-80 w-48 font-semibold"
          >
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-[#002366] text-lg" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              placeholder="Search books..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-[#EAEAEA] text-[#002366] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all duration-200"
            />
            {searchTerm &&
              showSuggestions &&
              filteredSuggestions.length > 0 && (
                <ul className="absolute mt-1 bg-white border border-gray-200 w-full max-h-56 overflow-y-auto shadow-lg z-50 rounded-md">
                  {filteredSuggestions.slice(0, 6).map((book) => (
                    <li
                      key={book._id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSuggestionClick(book.title)}
                    >
                      {book.title}
                    </li>
                  ))}
                </ul>
              )}
          </form>
        </div>

        {/*rightside*/}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <ul className="hidden sm:block">
            <Link to="/Signin">
              <li className="btn btn-square btn-ghost hover:bg-[#E9ECEF] hover:text-blue-900 p-3 text-[#FFFFFF] font-bold">
                Signin
              </li>
            </Link>
          </ul>

          <button className="btn btn-ghost text-[#FFFFFF] hover:bg-[#E9ECEF] hover:text-blue-900 hidden sm:block">
            <HiOutlineHeart className="size-7" />
          </button>

          <Link
            to="/cart"
            className="btn btn-ghost text-[#FFFFFF] hover:bg-[#E9ECEF] hover:text-blue-900 flex items-center rounded-md"
          >
            <HiOutlineShoppingCart className="size-6" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1">0</span>
            )}
          </Link>

          {/* Admin */}
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    className={`btn-ghost hover:bg-[#FFD700] size-9 rounded-full ${
                      currentUser ? "ring-2 ring-[#FFFFFF]" : ""
                    }`}
                    src={
                      auth.currentUser?.photoURL ||
                      "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
                    }
                    alt="User Avatar"
                  />
                </button>

                {/* Show Dropdown */}

                {isDropdownOpen && (
                  <ul
                    tabIndex={0}
                    className={`absolute menu dropdown-content bg-base-100 rounded-box z-10 mt-4 w-52 p-2 shadow-md right-0`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <li>
                      <a>
                        <FaSellcast className=" text-slate-600 mx-3" />
                        <Link to="/Profile">Profile</Link>
                      </a>
                    </li>
                    <hr />
                    <li>
                      <a>
                        <LuNotebookPen className="mx-3 text-slate-600" />
                        <Link to="/orders">Orders</Link>
                      </a>
                    </li>
                    <hr />
                    <li>
                      <a>
                        <HiOutlineShoppingCart className="mx-3 text-slate-600" />
                        <Link to="/cart">Cart</Link>
                      </a>
                    </li>
                    <hr />
                    <li>
                      <a>
                        <BsBagCheckFill className="mx-3 text-slate-600" />
                        <Link to="/Checkout">Check Out</Link>
                      </a>
                    </li>
                    <hr />
                    <li>
                      <a onClick={handleSignout}>
                        <FaSignOutAlt className="mx-3 text-slate-600" />
                        Sign out
                      </a>
                    </li>
                    <hr />
                  </ul>
                )}
              </>
            ) : (
              <Link to="/Signin">
                <HiOutlineUser className="size-8 rounded-s-box text-[#FFFFFF] hover:bg-[#E9ECEF] hover:text-blue-900" />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
