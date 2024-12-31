import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FaTimes, FaTrash, FaShoppingCart } from 'react-icons/fa';
import Footer from './footer';
import { BASE_URL } from '../url';
import {
  setCartItems,
  updateItemQuantity,
  removeItem as removeItemAction,
} from '../redux/features/cartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const userId = user ? user._id : null;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const removeItem = async () => {
    if (selectedItem._id) {
      try {
        await axios.delete(`${BASE_URL}/deleteItem`, { data: { id: selectedItem._id } });
        dispatch(removeItemAction(selectedItem._id));
        toast.success('Item removed from cart!');
        closeModal();
      } catch (error) {
        toast.error('Error removing item from cart!');
        console.error('Error removing item:', error);
      }
    }
  };

  const moveToWishlist = async (selectedItem) => {
    try {
      const res = await axios.post(`${BASE_URL}/addItemInWishlist`, selectedItem);
      if(res.data.success){
        toast.success(res.data.message);
        removeItem();
      }
      else
        toast.error(res.data.message);
    } catch (err) {
      toast.error('Error adding to wishlist');
    } finally {
      closeModal();
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

  const calculateTotalDiscount = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price - item.discountPrice) * item.quantity,
      0
    ).toFixed(2);
  };

  const calculateFinalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.discountPrice * item.quantity),
      0
    ).toFixed(2);
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen py-4 md:py-8">
        <div className="container mx-auto flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1 bg-white p-4 md:p-6  overflow-auto max-h-[500px]">
            <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
              Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
            </h2>
            {cartItems.length === 0 ? (
              <div className="text-center">
                <FaShoppingCart className="text-gray-500 text-6xl mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Your cart is empty.</p>
                <Link
                  to="/products"
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex shadow-lg rounded-lg items-center justify-between p-4 pb-4 mb-4"
                >
                  <Link to={`/productDetails/${item?.productId}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 md:w-48 md:h-48"
                    />
                  </Link>
                  <div className="flex-1 ml-4 md:ml-6">
                    <Link to = {`/productDetails/${item?.productId}`}>
                    <h3 className="text-xs md:text-xl font-semibold text-gray-800">
                      {item.frameColour} Gradient {item.frameType} {item.frameShape} {item.name}
                    </h3>
                    </Link>
                    <p className="text-xs md:text-base text-gray-700">Price: ₹{item.discountPrice.toFixed(2)}/(per unit)</p>
                    <div className="text-sm inline-flex items-center mt-2 border-2 border-yellow-300 rounded-full m-2">
                      {item.quantity === 1 ? (
                        <button
                          onClick={() => openModal(item)}
                          className="text-red-500 px-2 md:px-3"
                        >
                          <FaTrash />
                        </button> 
                      ) : (
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="px-2 md:px-3 font-bold text-yellow-600 hover:text-yellow-800"
                        >
                          -
                        </button>
                      )}
                      <span className="mx-2 md:mx-2 px-2 font-bold text-yellow-700 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="px-2 md:px-3 py-1 font-bold text-yellow-600 hover:text-yellow-800"
                      >
                        +
                      </button>
                    </div>
                      <button onClick={() => openModal(item)}
                          className="hover:underline text-blue-700 text-xs md:text-base px-2 md:px-4"> Remove </button>
                      <button 
                        onClick={() => {
                        moveToWishlist(item);
                        }} 
                        className="hover:underline  text-blue-700 text-xs md:text-base px-2 md:px-3"
                      >
                        Add to Wishlist
                      </button>

                      <div className="border-t border-b border-dashed border-gray-300 py-4">
                      <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-xs md:text-base">Price</span>
                      <span className="text-black text-sm md:text-base">₹{calculateSubtotal(item.price, item.quantity)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                      <span className="text-xs md:text-base text-gray-700 font-medium">Discount</span>
                      <span className="text-gray-700 text-sm md:text-base">-₹{calculateSubtotal(item.price, item.quantity) - calculateSubtotal(item.discountPrice, item.quantity)}</span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium md:text-lg">Final Price</span>
                      <span className="text-green-700 text-base md:text-xl font-semibold">₹{calculateSubtotal(item.discountPrice, item.quantity)}</span>
                      </div>
                    </div>

                  </div>
                  <div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Billing Section */}
<div className="w-full lg:w-1/3 bg-white p-4 md:p-6 rounded-lg shadow-md min-w-[300px] flex flex-col">
  <h3 className="text-base md:text-xl font-bold text-gray-800 mb-4">
    Order Summary ({cartItems.length} items)
  </h3>
  <div className="flex justify-between mb-3">
    <span className="text-sm md:text-base text-gray-600">Subtotal:</span>
    <span className="text-sm md:text-base text-gray-800">₹{calculateTotalWithoutTax()}</span>
  </div>
  <div className="flex justify-between mb-3">
    <span className="text-sm md:text-base text-gray-600">Discount Applied:</span>
    <span className="text-sm md:text-base text-green-600">- ₹{calculateTotalDiscount()}</span>
  </div>
  <div className="flex justify-between mt-4 border-t pt-4">
    <span className="md:text-xl font-bold text-gray-800">Total Payable</span>
    <span className="md:text-xl font-bold text-black-600">
      ₹{calculateFinalPrice()}
    </span>
  </div>
  <Link
    to = "/checkout"
    className="text-sm md:text-base mt-6 block w-full bg-green-500 hover:bg-green-600 text-white text-center py-2 md:py-3 rounded-full font-bold transition"
  >
    Proceed to Checkout 
  </Link>
</div>

        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="p-4 fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-md relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              <FaTimes />
            </button>
            <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-2">
              Remove Item from cart?
            </h3>
            <p className="text-xs md:text-base text-gray-600 mb-2">
              Don't worry, you can add it to your wishlist and come back to it anytime.
            </p>

            <div className="items-center flex justify-center space-x-3">
              <button
                className="bg-red-500 hover:bg-red-600 text-white text-xs md:text-sm py-2 px-4 rounded-full"
                onClick={() => removeItem(selectedItem._id)}
              >
                Yes, delete
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm py-2 px-4 rounded-full"
                onClick={() => moveToWishlist(selectedItem)}
              >
                Move to Wishlist
              </button>
              <button
                className="text-xs md:text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-full"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Cart;
