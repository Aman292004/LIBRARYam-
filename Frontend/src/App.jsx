import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./App.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "/logo9.png";
import { AuthProvider } from "./components/OAuth";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth <= 768;
      setIsSmallScreen(smallScreen);

      if (smallScreen) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AuthProvider>
      <>
        <Navbar toggleSidebar={toggleSidebar} />
        {(!isSmallScreen || sidebarOpen) && <Sidebar open={sidebarOpen} />}
        <div
          style={{
            flex: 1,
            marginLeft: isSmallScreen
              ? sidebarOpen
                ? ""
                : "0"
              : sidebarOpen
              ? "260px"
              : "80px",
            transition: "margin-left 0.5s",
            overflow: "hidden",
            width: isSmallScreen ? "98%" : sidebarOpen ? "1250px" : "1425px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <main style={{ marginTop: "30px" }}>
            <Outlet />
          </main>
        </div>

        {/* Fotter */}
        <div
          style={{
            flex: 1,
            marginLeft: isSmallScreen
              ? sidebarOpen
                ? ""
                : "0"
              : sidebarOpen
              ? "240px"
              : "60px",
            transition: "margin-left 0.5s",
            overflow: "hidden",
            width: isSmallScreen ? "100%" : sidebarOpen ? "1273px" : "1450px",
            flexDirection: "column",
          }}
        >
          <footer
            style={{
              padding: isSmallScreen ? "10px 15px" : "20px 40px",
              textAlign: "center",
              backgroundColor: "#F2F8FF",
            }}
          >
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand & About */}
                <div className="mt-6">
                  <div className="flex items-center space-x-3 mx-16">
                    <img src={logo} alt="Library Logo" className="w-14 h-14" />
                    <h2 className="text-2xl font-bold text-yellow-400">
                      LIBRARYam
                    </h2>
                  </div>
                  <p className="text-blue-600 mt-2">
                    Your one-stop destination for books of all genres. Find your
                    next favorite read with us!
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400">
                    Quick Links
                  </h3>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-blue-600 hover:text-yellow-400 transition"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-blue-600 hover:text-yellow-400 transition"
                      >
                        Categories
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-blue-600 hover:text-yellow-400 transition"
                      >
                        Bestsellers
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-blue-600 hover:text-yellow-400 transition"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400">
                    Contact
                  </h3>
                  <p className="text-blue-600 mt-2">
                    📍 123 Book Street, New York
                  </p>
                  <p className="text-blue-600">📧 support@libraryam.com</p>
                  <p className="text-blue-600">📞 +1 234 567 890</p>

                  {/* Social Media Icons */}
                  <div className="flex space-x-4 mt-8 ml-24">
                    <a href="#" className="hover:text-yellow-400 transition">
                      <FaFacebook className="text-xl" />
                    </a>
                    <a href="#" className="hover:text-yellow-400 transition">
                      <FaTwitter className="text-xl" />
                    </a>
                    <a href="#" className="hover:text-yellow-400 transition">
                      <FaInstagram className="text-xl" />
                    </a>
                    <a href="#" className="hover:text-yellow-400 transition">
                      <FaLinkedin className="text-xl" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="mt-8 border-t border-gray-700 pt-4 text-center text-blue-700 text-sm">
                © {new Date().getFullYear()} LIBRARYam. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </>
    </AuthProvider>
  );
}
