import React from "react";
import { Link } from "react-router-dom";
import logo from "/logo10.png";
import { IoHomeOutline } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BsBagCheckFill, BsInfoCircle } from "react-icons/bs";

const Sidebar = ({ open }) => {
  const menus = [
    { name: "Home", link: "/", icon: IoHomeOutline },
    { name: "About", link: "/About", icon: BsInfoCircle },
    { name: "Cart", link: "/cart", icon: HiOutlineShoppingCart, margin: true },
    { name: "Check Out", link: "/Checkout", icon: BsBagCheckFill },
    {
      name: "Order History",
      link: "/orders",
      icon: LuNotebookPen,
      margin: true,
    },
  ];

  return (
    <div
      className={`bg-[#002366] z-50 min-h-screen mt-6 fixed transition-transform ${
        open ? "w-60" : "w-16"
      } duration-500 rounded-lg shadow-md`}
    >
      <span className="mt-3 flex flex-col gap-4 mx-2 relative">
        {menus?.map((menu, i) => (
          <Link
            to={menu?.link}
            key={i}
            className={` ${
              menu?.margin && "mt-5"
            } group flex items-center text-md gap-10 font-semibold p-3 hover:bg-[#E9ECEF] hover:text-[#002366] rounded-md text-[#FFD700]`}
          >
            <span>{React.createElement(menu?.icon, { size: "20" })}</span>
            <h1
              className={`whitespace-pre  ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {menu?.name}
            </h1>
            <h1
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-normal whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 
        overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-16 group-hover:duration-500 group-hover:w-fit `}
            >
              {menu?.name}
            </h1>
          </Link>
        ))}

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
      </span>
    </div>
  );
};

export default Sidebar;
