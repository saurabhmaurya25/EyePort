import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItems } from '../redux/features/cartSlice';
import { BASE_URL } from '../url';

const Checkout = () => {
  const date = new Date();
  
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true // Use 12-hour format (AM/PM)
  });
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const userId = user?._id;
  const profileAddress = user?.address;
  const name = user?.username;
  const mobileNo = user?.phone;
  const [cartItems, setCartItemsState] = useState([]);
  const [address, setAddress] = useState('');
  const [productPairs, setProductPairs] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [newAddressInput, setNewAddressInput] = useState({
    fullName: '',
    mobileNumber: '',
    pincode: '',
    flatDetails: '',
    areaDetails: '',
    landmark: '',
    townCity: '',
    state: '',
    country: '',
  });

  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [makeDefault, setMakeDefault] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isPaymentSelected, setIsPaymentSelected] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getItembyUserId?userId=${userId}`);
        const cartItem = response.data;
        setCartItemsState(cartItem);
        dispatch(setCartItems(cartItem));
        
        // Now update productPairs after setting cartItemsState
        const updatedProductPairs = cartItem.map(item => [item.image, item.name, item.quantity, item.productId]);
        setProductPairs(updatedProductPairs);
        
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
  
    if (userId) {
      fetchCartItems();
    }
  }, [userId, dispatch]);
  
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddressSelect = () => {
    if (profileAddress) {
      setAddress(profileAddress); // Set profile address directly
      setIsAddressSelected(true);
    }
    setUserName(name);
    setPhoneNo(mobileNo);
  };

  const handleAddNewAddress = () => {
    setIsAddingNewAddress(true);
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddressInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveNewAddress = () => {
    if (newAddressInput.fullName.trim() && newAddressInput.mobileNumber.trim() && newAddressInput.pincode.trim()) {
      setAddress(formatAddress(newAddressInput));
      setUserName(newAddressInput.fullName);
      setPhoneNo(newAddressInput.mobileNumber);
      setIsAddressSelected(true);
      setIsAddingNewAddress(false);
    }
  };

  const handleCloseModal = () => {
    setIsAddingNewAddress(false);
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    setIsPaymentSelected(true);
  };
  
  const handlePlaceOrder = () => {
    const orderDetails = {
      userName,
      userId,
      productPairs,
      address,
      phoneNo,
      paymentMethod,
      totalPrice,
      formattedDate,
      formattedTime,
    };
    axios.post(`${BASE_URL}/addOrder`, orderDetails)
      .then(() => {
        axios.delete(`${BASE_URL}/deleteItemByUserId`, { data: { userId } }).then(() => {
          setOrderPlaced(true);
          setTimeout(() => {
            navigate('/');
          }, 2000);
        });
      })
      .catch((error) => {
        console.error('Error placing order:', error);
      });
  };

  const formatAddress = (address) => {
    if (!address) return '';  // Return an empty string if the address is not available
    return `${address.areaDetails}, ${address.flatDetails}, ${address.landmark}, ${address.townCity}, ${address.state}, ${address.country}, ${address.pincode}`;
  };

  if (orderPlaced) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl">Your order has been placed successfully. You will be redirected to the homepage.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col sm:flex-row items-start justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-6xl">
    
    {/* Main Heading */}
    <div className="w-full text-center mb-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-800">Checkout Page</h1>
    </div>

    {cartItems.length === 0 ? (
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl">There are no items to checkout. Please add products to your cart.</p>
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded inline-block">
          Go to Home
        </Link>
      </div>
    ) : (
      <div className="flex flex-col sm:flex-row">
        
        {/* Left Side - Address and Payment Selection */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-10 lg:p-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Select Address</h2>
          <div className="text-gray-600">
            {isAddressSelected ? (
              <div><strong>{userName}</strong> {address}</div>
            ) : (
              <div>
                <p>Select an address from your profile or add a new one.</p>
                <div className='space-x-8'>
                  <button onClick={handleAddressSelect} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
                    Use Profile Address
                  </button>
                  <button onClick={handleAddNewAddress} className="bg-green-500 text-white px-4 py-2 mt-2 rounded">
                    Add New Address
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Modal for Adding New Address */}
          {isAddingNewAddress && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-semibold mb-4">Add New Address</h2>
                <input
                  type="text"
                  name="fullName"
                  value={newAddressInput.fullName}
                  onChange={handleNewAddressChange}
                  placeholder="Full Name"
                  className="border rounded px-2 py-1 w-full mb-2"
                />
                <input
                  type="text"
                  name="mobileNumber"
                  value={newAddressInput.mobileNumber}
                  onChange={handleNewAddressChange}
                  placeholder="Mobile Number"
                  className="border rounded px-2 py-1 w-full mb-2"
                />
                <input
                  type="text"
                  name="pincode"
                  value={newAddressInput.pincode}
                  onChange={handleNewAddressChange}
                  placeholder="Pincode"
                  className="border rounded px-2 py-1 w-full mb-2"
                />
                <input
                  type="text"
                  name="flatDetails"
                  value={newAddressInput.flatDetails}
                  onChange={handleNewAddressChange}
                  placeholder="Flat, Building, etc."
                  className="border rounded px-2 py-1 w-full mb-2"
                />
                <input
                  type="text"
                  name="areaDetails"
                  value={newAddressInput.areaDetails}
                  onChange={handleNewAddressChange}
                  placeholder="Area, Street"
                  className="border rounded px-2 py-1 w-full mb-2"
                />
                <input
                  type="text"
                  name="landmark"
                  value={newAddressInput.landmark}
                  onChange={handleNewAddressChange}
                  placeholder="Landmark"
                  className="border rounded px-2 py-1 w-full mb-2"
                />
                <input
                  type="text"
                  name="townCity"
                  value={newAddressInput.townCity}
                  onChange={handleNewAddressChange}
                  placeholder="Town/City"
                  className="border rounded px-2 py-1 w-full mb-2"
                />
                <input
                  type="text"
                  name="state"
                  value={newAddressInput.state}
                  onChange={handleNewAddressChange}
                  placeholder="State"
                  className="border rounded px-2 py-1 w-full mb-2"
                />
                <input
                  type="text"
                  name="country"
                  value={newAddressInput.country}
                  onChange={handleNewAddressChange}
                  placeholder="Country"
                  className="border rounded px-2 py-1 w-full mb-2"
                />
                <div className="flex justify-between items-center">
                  <button onClick={handleSaveNewAddress} className="bg-blue-500 text-white px-4 py-2 rounded">Save Address</button>
                  <button onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Method Selection */}
          <div className="my-6">
            <h2 className="text-xl font-semibold text-gray-800">2. Select Payment Method</h2>
            <div className="text-gray-600">
              {isPaymentSelected ? (
                <p>Payment Method: {paymentMethod}</p>
              ) : (
                <div className='space-x-8'>
                  <button onClick={() => handlePaymentSelect('Credit Card')} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded cursor-not-allowed" disabled>
                    Credit Card
                  </button>
                  <button onClick={() => handlePaymentSelect('Cash on Delivery')} className="bg-green-500 text-white px-4 py-2 mt-2 rounded">
                    Cash on Delivery
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="w-full sm:w-96 p-6 sm:p-8 md:p-10 lg:p-12 bg-white shadow-lg rounded-lg ml-0 sm:ml-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                  <span>{item.name}</span>
                </div>
                <span>{item.quantity} x ${item.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t pt-4 text-lg font-semibold text-gray-800">
            <div className="flex justify-between">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
          <button 
            onClick={handlePlaceOrder} 
            className={`bg-blue-600 text-white px-6 py-3 rounded mt-4
            ${!isAddressSelected || !isPaymentSelected ? 'bg-gray-300 text-white-500 cursor-not-allowed' : ''}`}
            disabled={!isAddressSelected || !isPaymentSelected}
          >
            Place Order
          </button>
        </div>
      </div>
    )}
  </div>
</div>  
  
  );
}  

export default Checkout;
