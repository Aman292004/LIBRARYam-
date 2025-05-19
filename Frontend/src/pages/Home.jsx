import React from "react";
import bannerImg from "../assets/banner.png";
import TopSellers from "./TopSellers";
import Recommened from "./Recommened";
import News from "./News";

const Home = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row-reverse justify-between items-center">
        {/* Banner Image */}
        <div className="md:justify-end">
          <img src={bannerImg} alt="" />
        </div>

        {/* Body */}
        <div className="md:w-1/2 w-full md:ml-0 ml-2">
          <h1 className="flex flex-col md:text-5xl text-2xl font-bold mb-7">
            <span className="font-primary md:mt-10 mt-5">
              Discover Your Next Favorite Book.
            </span>
            <span className="font-primary md:mt-10 mt-4 md:mb-6 mb-0">
              Your Library,Anytime, Anywhere.
            </span>
          </h1>
          <p className="mb-10">
            Welcome to LIBRARYam, where the world of books is at your
            fingertips. Whether you're in the mood for a gripping novel, a
            thought-provoking biography, or an educational resource, our app
            offers a vast collection for every reader. With personalized
            recommendations and seamless access to your library anytime and
            anywhere, discovering your next favorite read has never been easier.
            Your journey into the world of stories, knowledge, and adventure
            starts here.
          </p>
          <button className="btn-primary">Subscribe</button>
        </div>
      </div>

      <TopSellers />
      <Recommened />
      <News />
    </>
  );
};

export default Home;
