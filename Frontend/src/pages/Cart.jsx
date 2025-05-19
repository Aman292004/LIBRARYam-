import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImgUrl } from "../utils/getImgUrl";
import { clearCart, removeFromCart } from "../redux/features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems
    .reduce((total, item) => total + item.newPrice, 0)
    .toFixed(2);

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl rounded-lg">
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Cart Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#002366]">Shopping Cart</h2>
          <button
            type="button"
            onClick={handleClearCart}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Clear Cart
          </button>
        </div>

        {/* Cart Items */}
        <div className="mt-8">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty.</p>
          ) : (
            <ul role="list" className="divide-y divide-gray-300">
              {cartItems.map((product) => (
                <li key={product?.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-300">
                    <img
                      src={`${getImgUrl(product?.coverImage)}`}
                      alt={product?.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        <Link to="/">{product?.title}</Link>
                      </h3>
                      <p className="text-lg font-medium text-[#FFD700]">
                        Rs.{product?.newPrice}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      <strong>Category:</strong> {product?.category}
                    </p>

                    <div className="flex justify-between mt-4">
                      <p className="text-gray-500">
                        <strong>Qty:</strong> {product?.quantity}
                      </p>
                      <button
                        onClick={() => handleRemoveFromCart(product)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Cart Summary */}
      <div className="border-t border-gray-300 px-6 py-6">
        <div className="flex justify-between text-lg font-semibold text-gray-900">
          <p>Subtotal</p>
          <p className="text-[#FFD700]">Rs.{totalPrice ? totalPrice : 0}</p>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Shipping and taxes calculated at checkout.
        </p>

        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md bg-[#002366] px-6 py-3 text-white font-semibold shadow-md hover:bg-[#001A4D] transition"
          >
            Checkout
          </Link>
        </div>

        <div className="mt-6 text-center">
          <Link to="/">
            <button className="text-[#002366] font-medium hover:underline">
              Continue Shopping &rarr;
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
