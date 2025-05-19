import React from "react";
import { useGetOrderByEmailQuery } from "../redux/features/ordersApi";
import { useAuth } from "../components/OAuth";

const OrderPage = () => {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser?.email);

  if (isLoading)
    return (
      <div className="text-center text-lg font-semibold py-10">
        Loading your orders...
      </div>
    );
  if (isError)
    return (
      <div className="text-center text-red-600 font-semibold py-10">
        Error retrieving orders. Please try again.
      </div>
    );

  return (
    <div className="container mx-auto p-10 min-h-screen">
      <h2 className="text-4xl font-bold text-[#002366] mb-8 text-center border-b-2 pb-3">
        Your Order History
      </h2>
      {orders.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          No orders found! Start shopping now.
        </div>
      ) : (
        <div className="space-y-10">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white p-8 rounded-lg shadow-lg border-l-8 border-[#FFD700]"
            >
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <p className="text-sm font-semibold bg-[#FFD700] text-[#002366] w-16 text-center rounded py-1">
                    Order #{index + 1}
                  </p>
                  <h3 className="text-2xl font-semibold text-[#002366]">
                    Order ID: {order._id}
                  </h3>
                </div>
                <p className="text-lg font-bold text-gray-800">
                  Total:{" "}
                  <span className="text-[#FFD700]">Rs.{order.totalPrice}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Customer Details:</h4>
                  <p className="text-gray-700">Name: {order.name}</p>
                  <p className="text-gray-700">Email: {order.email}</p>
                  <p className="text-gray-700">Phone: {order.phone}</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Shipping Address:</h4>
                  <p className="text-gray-700">
                    {order.address},{order.city}, {order.state}, {order.country}
                    , {order.pin}
                  </p>
                </div>
              </div>

              <h4 className="font-bold text-lg mt-6 border-b pb-2">
                Ordered Products:
              </h4>
              <div className="grid grid-cols-3 gap-6 mt-4">
                {order.productIds.map((product) => (
                  <div
                    key={product._id}
                    className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center"
                  >
                    <p className="text-gray-800 font-medium text-center">
                      {product.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
