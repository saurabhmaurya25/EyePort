import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../url';
import { Link } from 'react-router-dom';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user.user);
  const userId = user ? user._id : null;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getOrderByUserId?userId=${userId}`);
        console.log("Backend data is:", response.data);

        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else if (response.data === 'No order found') {
          setError('No orders found in history');
        } else {
          setOrders([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError('Failed to load orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>No orders found</p>
          <img
            src="https://via.placeholder.com/300x200?text=No+Orders+Yet"
            alt="No Orders"
            className="mx-auto mt-5 rounded-lg"
          />
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-200 rounded-lg shadow-md">
              {/* Order Header with line below and background color */}
              <div className="bg-gray-200 rounded-t-lg p-4 border-gray-300">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <h2 className="text-md md:text-lg font-semibold mb-2 md:mb-0">
                    Order Placed: {new Date(order.date).toLocaleDateString()}
                  </h2>
                  <p className="text-md md:text-lg font-bold">Total: ${order.price ? order.price.toFixed(2) : '0.00'}</p>
                  <p className="text-sm text-gray-600 mt-1 md:mt-0">Order ID: {order._id}</p>
                </div>
              </div>

              {/* Order Products and View Order Button */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-4 mt-4 p-4">
                <div className="flex flex-wrap items-center">
                  {order.products.map((product, index) => (
                    <Link key={index} to={`/productDetails/${product.productId}`} className="mr-4 mb-4">
                      <img
                        src={product.image}
                        alt={product.productName}
                        className="w-20 md:w-24 h-20 md:h-24 object-cover rounded-md"
                      />
                    </Link>
                  ))}
                </div>

                {/* View Order Button */}
                <Link
                  to={`/orderDetails/${order._id}`}
                  className="bg-green-500 text-white px-3 md:px-4 py-1 md:py-2 rounded hover:bg-green-600 mt-4 md:mt-0"
                >
                  View Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
