import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Summary = ({ address, paymentData, onBack }) => {
  // Fetch cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate the total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.discountPrice * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    alert('Order Placed Successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-50 to-white shadow-lg rounded-xl p-2 lg:p-4">
      <h2 className="text-lg md:text-3xl font-bold text-gray-800 mb-2 lg:mb-4 text-center border-b pb-1 md:pb-2">
        Order Summary
      </h2>

      {/* Shipping Address Section */}
      <div className="p-2 lg:p-3 border border-gray-300 rounded-lg mb-2 lg:mb-2 bg-white shadow-sm">
        <h3 className="lg:text-lg font-bold text-black mb-1">Shipping Address</h3>
        <p className="text-gray-800 text-sm md:text-base font-semibold">{address.fullName}</p>
        <p className="text-gray-600 text-xs md:text-base">
          {address.flat}, {address.street}
        </p>
        <p className="text-gray-600 text-xs md:text-base">
          {address.city}, {address.state}, {address?.country} {address.postalCode}
        </p>
        <p className="text-gray-700 font-semibold mt-2 text-xs md:text-base">Phone: {address.mobileNo}</p>
      </div>

      {/* Cart Items Section */}
      <div className="p-2 lg:p-4 border border-gray-300 rounded-lg mb-2 bg-white shadow-sm">
        <h3 className="text-base lg:text-xl font-bold text-gray-700">Items and delivery</h3>
        {cartItems.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="grid grid-cols-3 md:grid-cols-4 items-center"
              >
                {/* Image */}
                <div className="col-span-1">
                  <Link to={`/productDetails/${item?.productId}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 md:w-32 md:h-32"
                    />
                  </Link>
                </div>
                {/* Data and Price */}
                <div className="col-span-2 md:col-span-3 mt-2">
                  <Link to={`/productDetails/${item?.productId}`}>
                    <h3 className="text-xs md:text-lg font-semibold text-gray-800">
                      {item.frameColour} Gradient {item.frameType} {item.frameShape} {item.name}
                    </h3>
                  </Link>
                  <p className="text-xs md:text-base text-gray-500">Quantity: {item.quantity}</p>
                  <p className="font-semibold text-sm md:text-base text-green-600 text-right">
                    ₹{item.discountPrice * item.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}
      </div>

      {/* Payment Method Section */}
      <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
        <h3 className="text-base lg:text-xl font-bold text-gray-700">Payment Method: {paymentData.method}</h3>
        {/* Show Total Amount */}
        <div className="text-sm md:text-base font-semibold">
          Total Amount: ₹{totalAmount}
        </div>
      </div>

      {/* Buttons Section */}
      <div className="mt-2 lg:mt-4 flex flex-col lg:flex-row justify-between items-center space-y-2 lg:space-y-0">
        <button
          onClick={onBack}
          className="w-full lg:w-auto bg-gray-600 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transform transition-transform hover:scale-105"
        >
          Back
        </button>
        <button
          onClick={handlePlaceOrder}
          className={`w-full lg:w-auto ${
            paymentData.method === 'COD'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-purple-800 hover:bg-purple-900'
          } text-white font-semibold px-8 py-3 rounded-lg shadow-lg transform transition-transform hover:scale-105`}
        >
          {paymentData.method === 'COD' ? `Place Order` : `Pay ₹${totalAmount} now`}
        </button>
      </div>
    </div>
  );
};

export default Summary;
