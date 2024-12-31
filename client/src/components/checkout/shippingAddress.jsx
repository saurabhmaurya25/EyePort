import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {addAddressToStore, updateAddressInStore} from '../../redux/features/userSlice';
import axios from "axios";
import { BASE_URL } from "../../url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCartItems } from '../../redux/features/cartSlice';

const ShippingAddress = ({ onNext }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    flat: "",
    landmark: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    mobileNo: "",
    isDefault: false,
    _id: "", // to handle edit case
  });
  const [totalItemPrice, setTotalItemPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);

  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.addresses) {
      const sortedAddresses = [...user.addresses].sort((a, b) => {
        if (a.isDefault) return -1;
        if (b.isDefault) return 1;
        return 0;
      });
      setAddresses(sortedAddresses);
      const defaultAddress = sortedAddresses.find((addr) => addr.isDefault);
      setSelectedAddress(defaultAddress ? defaultAddress : sortedAddresses[0]);
    }

    // Fetch cart items
    if (user && user._id) {
      const fetchCartItems = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/getItembyUserId?userId=${user._id}`);
          dispatch(setCartItems(response.data)); // Store cart items in Redux store
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      };
      fetchCartItems();
    }
  }, [user, dispatch]);

  useEffect(() => {
    // Calculate total price, total discount, and total payable whenever cartItems change
    if (cartItems && cartItems.length > 0) {
      const totalItemPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      const totalDiscount = cartItems.reduce((acc, item) => acc + (item.price - item.discountPrice) * item.quantity, 0);
      const totalPayable = cartItems.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);

      setTotalItemPrice(totalItemPrice);
      setTotalDiscount(totalDiscount);
      setTotalPayable(totalPayable);
    }
  }, [cartItems]);

  const handleFormSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const url = addressForm._id ? `${BASE_URL}/updateAddress` : `${BASE_URL}/addAddress`;
    const method = addressForm._id ? "put" : "post";

    try {
      const res = await axios[method](url, { ...addressForm, userId: user._id });
      if (res.data.success) {
        const updatedAddress = res.data.address;
        toast.success(res.data.message);
        if (addressForm._id) {
            dispatch(updateAddressInStore(updatedAddress));
        } else {
            dispatch(addAddressToStore(updatedAddress)); // Dispatch Redux action for add
        }
        setIsFormVisible(false);
        setAddressForm({
          fullName: "",
          flat: "",
          landmark: "",
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          mobileNo: "",
          isDefault: false,
          _id: "",
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsFormVisible(false);
    setAddressForm({
      fullName: "",
      flat: "",
      landmark: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      mobileNo: "",
      isDefault: false,
      _id: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm({ ...addressForm, [name]: value });
  };

  const handleEdit = (address) => {
    setAddressForm(address);
    setIsFormVisible(true);
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  return (
    <div className="rounded flex flex-col sm:flex-row">
      <div className="p-4 bg-white w-full sm:w-2/3 mb-4 sm:mb-0">
        <h2 className="text-lg md:text-xl font-bold mb-2">Select a delivery address</h2>
        <hr className="border-t-2 mb-4" />
        
        <h3 className="text-base md:text-lg font-semibold mb-4">Delivery Addresses ({addresses.length})</h3>
        
        {addresses.map((address) => (
          <div
          key={address._id}
          className={`p-4 border mb-2 rounded cursor-pointer flex flex-col sm:flex-row items-start sm:items-center ${
            selectedAddress._id === address._id ? 'bg-red-50 border-yellow-500' : 'bg-white'
          }`}
          onClick={() => handleSelectAddress(address)} // Make the entire div clickable
        >
          <input
            type="radio"
            name="address"
            checked={selectedAddress._id === address._id}
            onChange={() => handleSelectAddress(address)}
            className="mr-4"
          />
          <div className="flex-1 sm:mb-0 text-xs md:text-base">
            <p className="font-bold">{address.fullName}</p>
            <p>{address.flat}, {address.street}</p>
            <p>{address.city}, {address.state}, {address?.country} {address.postalCode}</p>
            <p className="font-semibold">Phone number: {address.mobileNo}</p>
          </div>
          <button
            onClick={() => handleEdit(address)}
            className="text-blue-600 hover:underline font-semibold text-base mt-2 sm:mt-0 sm:ml-4 sm:self-end"
          >
            Edit
          </button>
        </div>
        
        ))}
        
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-green-500 hover:bg-green-600 text-sm md:text-base text-white px-4 py-2 rounded-full mt-4"
        >
          Add New Address
        </button>

        {isFormVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-4xl"
                onClick={handleCloseModal}
              >
                <span>&times;</span>
              </button>
              <h2 className="text-xl font-bold mb-4">{addressForm._id ? "Edit Address" : "Add New Address"}</h2>
              {/* Address Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="flex space-x-4">
                <div className="">
                  <label className="block text-sm font-semibold">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={addressForm.fullName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className=''>
                  <label className="block text-sm font-semibold">Flat, House no., Building, Apartment</label>
                  <input
                    type="text"
                    name="flat"
                    value={addressForm.flat}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className=''>
                  <label className="block text-sm font-semibold">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={addressForm.postalCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>

              {/* Street and City in one row */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold">Area, Street, Sector, Village</label>
                  <input
                    type="text"
                    name="street"
                    value={addressForm.street}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold">Landmark</label>
                  <input
                    type="text"
                    name="landmark"
                    value={addressForm.landmark}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* State and Postal Code in one row */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold">City</label>
                  <input
                    type="text"
                    name="city"
                    value={addressForm.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold">State</label>
                  <input
                    type="text"
                    name="state"
                    value={addressForm.state}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>

              {/* Mobile Number and Country in one row */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold">Phone Number</label>
                  <input
                    type="text"
                    name="mobileNo"
                    value={addressForm.mobileNo}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={addressForm.country}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>

              {/* Add Address/Update Address Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  ) : null}
                  {loading ? addressForm._id ? "Updating" : "Adding" : addressForm._id ? "Update Address" : "Add Address"}
                </button>

                {/* Cancel Button positioned at bottom-right */}
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg sm:absolute sm:bottom-4 sm:right-4"
                >
                  Cancel
                </button>
              </div>
            </form>
            </div>
          </div>
        )}
      </div>


<div className="w-full sm:w-1/3 sm:ml-6 p-4 bg-white rounded h-auto">
  <h3 className="text-base md:text-xl font-bold text-gray-800 mb-4">
    Bill Details ({cartItems.length} items)
  </h3>
  <div className=" flex justify-between mb-3">
    <span className="text-sm md:text-base text-gray-600">Total item price:</span>
    <span className="text-sm md:text-base text-gray-800">₹{totalItemPrice}</span>
  </div>
  <div className="flex justify-between mb-3">
    <span className="text-sm md:text-base text-gray-600">Total discount:</span>
    <span className="text-sm md:text-base text-green-400">- ₹{totalDiscount}</span>
  </div>
  <div className="flex justify-between mt-4 border-t pt-4">
    <span className="md:text-xl font-bold text-gray-800">Total Payable</span>
    <span className="md:text-xl font-bold text-black-600">
      ₹{totalPayable}
    </span>
  </div>
          <button
            onClick={() => onNext(selectedAddress)}
            className={`text-sm md:text-base mt-6 block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-2 md:py-3 rounded-full font-bold transition${!selectedAddress ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!selectedAddress}
          >
            Proceed to Payment
          </button>
</div>

      <ToastContainer />
    </div>
  );
};

export default ShippingAddress;
