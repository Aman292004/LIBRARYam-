import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BookCard from "./books/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useFetchAllBooksQuery } from "../redux/features/books.Api";

const Recommened = () => {
  const { data: books = [] } = useFetchAllBooksQuery();

  return (
    <div className="py-4">
      <h2 className="text-3xl font-semibold mb-6 md:ml-0 ml-2">
        Recommened For You
      </h2>

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
        {books.length > 0 &&
          books.slice(4, 8).map((book, index) => (
            <SwiperSlide key={index} className="flex-1 p-1 place-items-center">
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Recommened;
