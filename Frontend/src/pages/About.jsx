import React from "react";

const About = () => {
  return (
    <div className="text-gray-900 flex items-center justify-center p-6 mt-8 mb-10">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-blue-900">
          About Us
        </h1>
        <p className="text-lg text-center text-gray-700 mt-4">
          Welcome to <span className="font-semibold">LIBRARYam</span>, your
          one-stop destination for discovering, reading, and collecting your
          favorite books. We believe that every book holds a world of knowledge,
          adventure, and imagination—waiting to be explored.
        </p>

        <div className="mt-6 p-6 rounded-lg bg-gray-50">
          <h2 className="text-2xl font-semibold text-blue-800">
            Why Choose LIBRARYam?
          </h2>
          <ul className="list-disc list-inside mt-3 text-gray-700">
            <li>
              <strong>📚 Endless Book Collection</strong> – Explore a vast range
              of books from classics to bestsellers.
            </li>
            <li>
              <strong>🔍 Personalized Recommendations</strong> – Get book
              suggestions tailored to your interests.
            </li>
            <li>
              <strong>📖 Read Anytime, Anywhere</strong> – Enjoy books online or
              download them for offline reading.
            </li>
            <li>
              <strong>💛 User-Friendly Experience</strong> – Browse, read, and
              purchase books effortlessly.
            </li>
          </ul>
        </div>

        <p className="text-lg text-center text-gray-700 mt-6">
          At <span className="font-semibold">LIBRARYam</span>, we are more than
          just a bookstore—we are a community of readers, learners, and
          dreamers. Join us in this journey of exploration and let every page
          take you somewhere new.
        </p>

        <div className="text-center mt-6">
          <a
            href="/"
            className="bg-blue-900 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Start Exploring
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
