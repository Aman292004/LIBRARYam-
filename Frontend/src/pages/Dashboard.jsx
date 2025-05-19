import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getBaseUrl from "../utils/baseURl";
import Loading from "./Loading";
import axios from "axios";
import { MdIncompleteCircle } from "react-icons/md";
import RevenuChart from "./RevenuChart";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      <section className="shadow-md rounded-lg p-6 flex flex-col gap-6 mt-7">
        {/* Total Books & Total Sales */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center p-6 shadow rounded-lg">
            <div className="h-16 w-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-4">
              📚
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {data?.totalBooks}
              </span>
              <span className="block text-gray-500">Total Books</span>
            </div>
          </div>

          <div className="flex items-center p-6 shadow rounded-lg">
            <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4">
              💰
            </div>
            <div>
              <span className="block text-2xl font-bold">
                Rs.{data?.totalSales}
              </span>
              <span className="block text-gray-500">Total Sales</span>
            </div>
          </div>
        </div>

        {/* Trending Books & Total Orders (Below) */}
        <div className="grid grid-cols-2 gap-6 mt-7">
          <div className="flex items-center p-6 shadow rounded-lg">
            <div className="h-16 w-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-4">
              🔥
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {data?.trendingBooks}
              </span>
              <span className="block text-gray-500">Trending Books</span>
            </div>
          </div>

          <div className="flex items-center p-6 shadow rounded-lg">
            <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
              <MdIncompleteCircle className="size-6" />
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {data?.totalOrders}
              </span>
              <span className="block text-gray-500">Total Orders</span>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side - Revenue Chart (50% Width) */}
      <section className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-center mt-2">
        <h2 className="font-semibold mb-4 flex">Orders Per Month</h2>
        <RevenuChart />
      </section>
    </div>
  );
};

export default Dashboard;
