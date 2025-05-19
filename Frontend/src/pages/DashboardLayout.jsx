import React, { useState } from "react";
import logoLight from "/logo10.png";
import logoDark from "/logo9.png";
import logo from "/logo10.png";
import { Link, Outlet } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { FaBars, FaBook, FaHome, FaUser } from "react-icons/fa";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: FaHome },
    {
      name: "Add Book",
      link: "/dashboard/add-new-book",
      icon: FaUser,
      margin: true,
    },
    { name: "Manage-Book", link: "/dashboard/manage-books", icon: FaBook },
    { name: "Update-Book", link: "/dashboard/update/:id", icon: FaBook },
  ];

  const handleLogout = () => {};

  return (
    <header className="max-w-screen-2xl mx-auto py-6">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-[#002366] sm:p-3 p-3 fixed w-full top-0 rounded-md z-50">
        <div className="flex items-center md:gap-16 gap-4">
          <div className="flex">
            {/* Button */}
            <button
              className="btn btn-square btn-ghost hover:bg-[#E9ECEF] text-[#FFFFFF] hover:text-[#002366]"
              onClick={toggleSidebar}
            >
              <FaBars className="h-5" />
            </button>

            {/* Logo */}
            <Link to="/">
              <h1
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
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
                <h2>
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
                </h2>
              </h1>
            </Link>
          </div>

          {/* Search */}
          <div className="relative sm:w-72 w-40 space-x-2 font-semibold hidden sm:block">
            <IoSearchOutline className="absolute inline-block left-64 inset-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-[#EAEAEA]  focus:outline-none w-full py-1 md:px-8 px-6 rounded-md"
            />
          </div>
        </div>

        {/* Profile Picture */}
        <button>
          <img
            className={`btn-ghost hover:bg-[#FFD700] size-11 rounded-full`}
            src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
            alt=""
          />
        </button>
      </nav>

      <div>
        {/* Sidebar */}
        <div
          className={`bg-[#002366] z-50 min-h-screen fixed transition-transform ${
            open ? "w-60" : "w-16"
          } duration-500 rounded-lg shadow-md`}
        >
          <div className="mt-3 flex flex-col gap-4 mx-2 relative">
            {menus.map((menu, i) => (
              <Link
                to={menu.link}
                key={i}
                className={`${
                  menu.margin && ""
                } group flex items-center text-md gap-10 font-semibold p-3 hover:bg-[#E9ECEF] hover:text-[#002366] rounded-md text-[#FFD700]`}
              >
                <span>{React.createElement(menu.icon, { size: "20" })}</span>
                <h1
                  style={{ transitionDelay: `${i + 1}00ms` }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu.name}
                </h1>
                <h1
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-normal whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 
                  overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-16 group-hover:duration-300 group-hover:w-fit`}
                >
                  {menu.name}
                </h1>
              </Link>
            ))}

            {/* Bottom Profile Section */}
            <div className="border-t items-center mt-36 p-3">
              <div className="overflow-hidden mx-10">
                <div className="leading-4">
                  <Link to="/">
                    <h1 className="font-bold flex flex-row">
                      <img src={logo} alt="Library Logo" className="w-6 h-6" />
                      <span className="text-[#E9ECEF] mx-1 mt-1">LIBRARY</span>
                      <span className="text-[#FFD700] mt-1 ">am</span>
                    </h1>
                    <span className="text-xs text-[#E9ECEF] mx-1">
                      libraryam@gmail.com
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-500 mt-12 ${
            open ? "ml-64" : "ml-20"
          }`}
        >
          <h1 className="p-6 text-2xl font-bold">Dashboard</h1>
          <h2 className="text-gray-600 ml-6">Book Store Inventory</h2>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-end gap-3 md:gap-6">
            <Link
              to="/dashboard/manage-books"
              className="inline-flex px-5 py-3 text-purple-600 border border-purple-600 rounded-md"
            >
              <RiPencilLine className="w-5 h-5 mr-2" /> Manage Books
            </Link>
            <Link
              to="/dashboard/add-new-book"
              className="inline-flex px-5 py-3 text-white bg-purple-600 rounded-md"
            >
              <RiAddLine className="w-5 h-5 mr-2" /> Add New Book
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </header>
  );
};

export default DashboardLayout;
