import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BookCard from "./books/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useFetchAllBooksQuery } from "../redux/features/books.Api";

const TopSellers = () => {
  const { data: books = [] } = useFetchAllBooksQuery();
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    "Choose a genre",
    "Business",
    "Fuction",
    "Horror",
    "Adventure",
  ];

  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter(
          (book) =>
            book.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  useEffect(() => {
    const handleScroll = () => setIsOpen(false);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6 md:ml-0 ml-2">Top Sellers</h2>

      {/* Category Filtering */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:w-48 w-44 flex justify-between items-center border bg-[#E9ECEF] text-[#002366] border-[#002366] hover:bg-[#F2F8FF] hover:border-[#FFD700] rounded-md px-4 py-2 transition mb-4 z-20 md:ml-0 ml-2"
      >
        {selected || "Choose a genre"}
        <span className={`transition ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <ul
          tabIndex={0}
          className={`absolute menu dropdown-content bg-white text-[#002366] border border-gray-300 hover:border-[#FFD700] rounded-md z-10 mt-2 shadow-md md:w-48 w-44 md:ml-0 ml-2`}
        >
          {categories.map((category) => (
            <li
              key={category}
              className="px-4 py-2 hover:bg-[#002366] hover:text-[#FFFFFF] rounded-md cursor-pointer items-center"
              onClick={() => {
                setSelected(category);
                setSelectedCategory(category);
                setIsOpen(false);
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      )}

      <Swiper
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          0: {
            slidesPerView: "auto",
            centeredSlides: true,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {filteredBooks.length > 0 &&
          filteredBooks.map((book, index) => (
            <SwiperSlide key={index} className="flex-1 p-1 place-items-center">
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default TopSellers;
