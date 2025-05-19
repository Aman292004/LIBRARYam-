import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/OAuth";
import Swal from "sweetalert2";
import { clearCart } from "../redux/features/cartSlice";
import { useCreateOrderMutation } from "../redux/features/ordersApi";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isChecked, setIsChecked] = useState(false);
  const { currentUser } = useAuth();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pin: "",
    country: "",
    state: "",
  });

  const shippingAmount = cartItems.length > 0 ? 5.0 : 0;

  const totalPrice = cartItems
    .reduce((total, item) => total + item.newPrice, 0)
    .toFixed(2);

  const totalAmount = (parseFloat(totalPrice) + shippingAmount).toFixed(2);

  const onSubmit = async (e) => {
    e.preventDefault();

    const newOrder = {
      name: formData.name,
      email: currentUser?.email || formData.email,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      state: formData.state,
      pin: formData.pin,
      phone: formData.phone,
      productIds: cartItems.map((item) => item?._id),
      totalPrice: totalAmount,
    };

    try {
      await createOrder(newOrder).unwrap();
      Swal.fire({
        title: "Order Placed!",
        text: "Your order was placed successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Okay!",
      });
      dispatch(clearCart());
      localStorage.removeItem("cart");
      navigate("/orders");
    } catch (error) {
      console.error("Error place an order", error);
      alert("Failed to place an order");
    }
  };

  if (isLoading) return <div>Loading....</div>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center text-[#002366]">
          Checkout
        </h2>
        <p className="text-gray-600 text-center mb-4">Complete your purchase</p>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || currentUser?.email || ""}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              disabled
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              placeholder="Enter your address"
            />
          </div>

          {/* City & Zip */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                placeholder="City"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">
                PIN Code
              </label>
              <input
                type="text"
                name="pin"
                value={formData.pin}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                placeholder="PIN Code"
              />
            </div>
          </div>

          {/* Country & State*/}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                placeholder="Country"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                placeholder="State"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Order Summary
            </h3>
            <p className="text-gray-600 mb-2">
              Items: {cartItems.length > 0 ? cartItems.length : 0}
            </p>
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span>Rs.{totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping:</span>
              <span>Rs.{shippingAmount}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total:</span>
              <span>Rs.{totalAmount}</span>
            </div>
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="md:col-span-5 flex items-center">
            <input
              type="checkbox"
              name="billing_same"
              id="billing_same"
              className="form-checkbox text-indigo-600"
              onChange={() => setIsChecked(!isChecked)}
            />
            <label htmlFor="billing_same" className="ml-2">
              I agree to the{" "}
              <Link className="text-indigo-600 underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link className="text-indigo-600 underline">Shopping Policy</Link>
              .
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isChecked || cartItems.length === 0}
            className={`w-full py-2 rounded-md font-bold transition ${
              !isChecked || cartItems.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#FFD700] text-[#002366] hover:bg-[#F2F8FF]"
            }`}
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
