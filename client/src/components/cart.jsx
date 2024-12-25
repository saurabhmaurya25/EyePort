import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
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
      <div className="bg-gray-100 min-h-screen py-4 md:py-8">
        <div className="container mx-auto flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1 bg-white p-4 md:p-6 rounded-lg shadow-md overflow-auto max-h-[500px]">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
              Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
            </h2>
            {cartItems.length === 0 ? (
              <div className="text-center">
                <FaShoppingCart className="text-gray-500 text-6xl mx-auto mb-4" />
                <p className="text-gray-600">Your cart is empty.</p>
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
                  className="flex items-center justify-between border-b pb-4 mb-4"
                >
                  <Link to={`/productDetails/${item?.productId}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg shadow-md"
                    />
                  </Link>
                  <div className="flex-1 ml-4 md:ml-6">
                    <h3 className="text-sm md:text-lg font-bold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">Price: ₹{item.price.toFixed(2)}</p>
                    <p className="text-gray-600">Frame Type: {item.frameType}</p>
                    <p className="text-gray-600">Shape: {item.frameShape}</p>
                    <p className="text-gray-600">Colour: {item.frameColour}</p>
                    <div className="flex items-center mt-2">
                      {item.quantity === 1 ? (
                        <button
                          onClick={() => removeItem(item._id)}
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
                      <span className="mx-2 md:mx-3 px-2 font-bold text-yellow-700 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="px-2 md:px-3 font-bold text-yellow-600 hover:text-yellow-800"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm md:text-lg font-bold text-gray-800">
                      ₹{calculateSubtotal(item.price, item.quantity)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Billing Section */}
          <div className="w-full lg:w-1/3 bg-white p-4 md:p-6 rounded-lg shadow-md min-w-[300px]">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
            <div className="flex justify-between mb-3">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800">₹{calculateTotalWithoutTax()}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-gray-600">SGST (2.5%)</span>
              <span className="text-gray-800">
                ₹{(calculateTotalWithoutTax() * 0.025).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-gray-600">CGST (2.5%)</span>
              <span className="text-gray-800">
                ₹{(calculateTotalWithoutTax() * 0.025).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mt-4 border-t pt-4">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-lg font-bold text-purple-600">
                ₹{calculateTotal()}
              </span>
            </div>
            <Link
              to="/checkout"
              className="mt-6 block w-full bg-purple-500 hover:bg-purple-600 text-white text-center py-2 md:py-3 rounded-lg font-bold transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Cart;
