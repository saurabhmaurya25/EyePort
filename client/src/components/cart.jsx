import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import Footer from './footer';
import { BASE_URL } from '../url';
import { setCartItems, updateItemQuantity, removeItem as removeItemAction } from '../redux/features/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const userId = user ? user._id : null;

  useEffect(() => {
    const fetchCartItems = async () => {
      if (userId) {
        try {
          const response = await axios.get(`${BASE_URL}/getItembyUserId?userId=${userId}`);
          dispatch(setCartItems(response.data));
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      }
    };

    fetchCartItems();
  }, [userId, dispatch]);

  const removeItem = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      try {
        await axios.delete(`${BASE_URL}/deleteItem`, { data: { id } });
        dispatch(removeItemAction(id));
        toast.success('Item removed from cart!');
      } catch (error) {
        toast.error('Error removing item from cart!');
        console.error('Error removing item:', error);
      }
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity >= 0) {
      try {
        dispatch(updateItemQuantity({ id, quantity: newQuantity }));
        await axios.put(`${BASE_URL}/updateQuantity`, { id, quantity: newQuantity });
        toast.success('Cart updated successfully!');
      } catch (error) {
        toast.error('Error updating quantity!');
        console.error('Error updating quantity:', error);
      }
    }
  };

  const calculateSubtotal = (price, quantity) => {
    return (price && quantity ? price * quantity : 0).toFixed(2);
  };

  const calculateTotalWithoutTax = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(calculateSubtotal(item.price, item.quantity)),
      0
    ).toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateTotalWithoutTax());
    const sgst = (subtotal * 0.025).toFixed(2);
    const cgst = (subtotal * 0.025).toFixed(2);

    const totalAmount = subtotal + parseFloat(sgst) + parseFloat(cgst);

    return totalAmount.toFixed(2);
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen relative">
        <div className="container mx-auto py-12 px-4 md:px-8">
          {cartItems.length === 0 ? (
            <div className="text-center mt-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
              <Link
                to="/products"
                className="inline-block mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                {cartItems.map((item) => (
                  <div key={item._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <button
                          onClick={() => removeItem(item._id)}
                          className="text-red-500 hover:text-red-700 transition duration-150"
                          aria-label="Delete item"
                        >
                          <FaTrash />
                        </button>
                      </div>
                      <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                      <p className="text-gray-600 mb-2">Price: ${item.price.toFixed(2)}</p>

                      {/* Quantity Control */}
                      <div className="flex items-center justify-center border rounded-full w-max p-1 border-yellow-300">
                        {item.quantity === 1 ? (
                          <button onClick={() => removeItem(item._id)} className="text-red-500 px-2 font-bold">
                            <FaTrash />
                          </button>
                        ) : (
                          <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-2 font-bold text-yellow-600">
                            -
                          </button>
                        )}
                        <div className="mx-2 px-2 font-bold text-yellow-700 text-center">
                          {item.quantity}
                        </div>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-2 font-bold text-yellow-600">
                          +
                        </button>
                      </div>

                      <p className="mt-3 font-semibold">Subtotal: ${calculateSubtotal(item.price, item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Section */}
              <div className="bg-white rounded-md shadow-lg p-6 mb-8">
                <h3 className="font-semibold text-xl mb-4">Order Summary</h3>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${calculateTotalWithoutTax()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>SGST (2.5%)</span>
                  <span>${(calculateTotalWithoutTax() * 0.025).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>CGST (2.5%)</span>
                  <span>${(calculateTotalWithoutTax() * 0.025).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-4 border-t pt-4">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-purple-600">${calculateTotal()}</span>
                </div>

                {/* Proceed to Checkout Button */}
                <div className="mt-6 text-center">
                  <Link to="/checkout" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300">
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Toast Container for Notifications */}
      <ToastContainer />

      <Footer />
    </>
  );
};

export default Cart;
