import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
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
    _id: "", // To handle edit case
  });

  // Get user directly from Redux store
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user && user.addresses) {
      setAddresses(user.addresses);
    }
  }, [user]);

  const handleDelete = async (addressId) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${BASE_URL}/deleteAddress`, {
        data: { userId: user._id, addressId },
      });
      setLoading(false);
      if(res.data.success){
        toast.success(res.data.message);
        setAddresses(addresses.filter((address) => address._id !== addressId));
      } else{
        toast.error(res.data.message);
      }
      setIsDeleteModalVisible(false);
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || 'Server error';
      toast.error(errorMessage);
    }
    
  };

  const handleMakeDefault = async (address) => {
    const addressId = address._id;
    try {
      const res = await axios.put(`${BASE_URL}/updateAddress`, {
        fullName: address.fullName,
        mobileNo: address.mobileNo,
        flat: address.flat,
        landmark: address.landmark,
        street: address.street,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
        isDefault: true,
        _id: address._id,
        userId: user._id,
      });
      if(res.data.success){
        toast.success(res.data.message);
      setAddresses((prevAddresses) =>
        prevAddresses.map((address) =>
          address._id === addressId
            ? { ...address, isDefault: true }
            : { ...address, isDefault: false }
        )
      );
    } else {
      toast.error(res.data.message);
    }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Server error';
      toast.error(errorMessage);
    }
  };

  const handleEdit = (address) => {
    setAddressForm(address);
    setIsFormVisible(true); // Show the form in modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm({ ...addressForm, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const url = addressForm._id ? `${BASE_URL}/updateAddress` : `${BASE_URL}/addAddress`;
    const method = addressForm._id ? "put" : "post";
    const data = { ...addressForm, userId: user._id };

    try {
      const res = await axios[method](url, data);
      setLoading(false);
      if(res.data.success){
        toast.success(res.data.message);
        if (addressForm._id) {
          setAddresses(
            addresses.map((address) =>
              address._id === addressForm._id ? addressForm : address
            )
          );
        } else {
          setAddresses([...addresses, { ...addressForm, _id: Date.now() }]);
        }
      } else {
        toast.error(res.data.message);
      }
      setIsFormVisible(false); // Close the form modal
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
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || 'Server error';
      toast.error(errorMessage);
    }
  };

  const handleCloseModal = () => {
    setIsFormVisible(false); // Close the modal without saving
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
    }); // Reset form fields when closing modal
  };

  const handleDeleteCloseModal = () => {
    setIsDeleteModalVisible(false);
    setAddressToDelete(null);
  };

  if (!user) {
    return <div className="text-center text-gray-500 mt-10">User not logged in</div>;
  }



  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Your Addresses</h1>

      {/* Add New Address Button */}
      {!isFormVisible && (
        <button
          className="w-full sm:w-auto bg-gray-200 border-dashed border-2 border-gray-400 text-gray-500 px-6 py-4 rounded-lg text-center mb-6"
          onClick={() => setIsFormVisible(true)}
        >
          <span className="font-semibold text-xl">+ Add address</span>
        </button>
      )}
      {/* Delete Confirmation Modal */}
      {isDeleteModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/3 relative">
          
          {/* Modal Title */}
          <h3 className="text-lg font-bold mb-4 text-center bg-gray-200 p-4 rounded-t-lg">
            Confirm Deletion
          </h3>
          
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl"
            onClick={handleDeleteCloseModal}
          >
            &times;
          </button>
          
          {/* Address Details */}
          <div className="px-4 mb-2">
            <p className="text-sm text-gray-800 mb-2">
              <strong>{addressToDelete?.fullName}</strong>
            </p>
            <p className="text-sm text-gray-700 font-semibold">
              {addressToDelete?.flat} <br /> 
              {addressToDelete?.street}<br />
              {addressToDelete?.city}, {addressToDelete?.state} {addressToDelete?.postalCode}<br />
              India<br />
              Phone number: {addressToDelete?.mobileNo}
            </p>
          </div>
      
          {/* Disclaimer */}
          <p className="px-4 text-sm text-gray-500 mb-6">
            Please note: Deleting this address will not delete any pending orders being shipped to this address. 
            To ensure uninterrupted fulfillment of future orders, please update any wishlists, subscribe-and-save 
            settings, and periodical subscriptions using this address.
            <div className="border-t border-gray-300 my-4"></div>
          </p>

          {/* Action Buttons */}
          <div className="pb-4 px-16 flex justify-between">
  <button
    onClick={handleDeleteCloseModal}
    className="px-12 py-1 border border-gray-400 rounded-full text-gray-700 hover:bg-gray-200"
  >
    No
  </button>
  <button
    onClick={() => handleDelete(addressToDelete._id)}
    className="px-12 py-1 bg-red-500 text-white rounded-full hover:bg-red-600"
  >
    Yes
  </button>
</div>

        </div>
      </div>
      
      )}
      {/* Modal for Form */}
      {isFormVisible && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 relative">
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
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
          { 
            loading ? addressForm._id ? "Updating" : "Adding": addressForm._id ? "Update Address" : "Add Address"}
          </button>

          {/* Cancel Button positioned at bottom-right */}
          <button
            type="button"
            onClick={handleCloseModal}
            className="w-full sm:w-auto bg-gray-300 text-gray-700 px-6 py-3 rounded-lg sm:absolute sm:bottom-4 sm:right-4"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* Display All Addresses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {[...addresses]
          .sort((a, b) => b.isDefault - a.isDefault) // Sort by `isDefault`, placing `true` first
          .map((address) => (
          <div
            key={address._id}
            className={`relative border rounded-lg shadow-md p-4 ${
              address.isDefault ? "bg-blue-100" : "bg-white"
            }`}
          >
            {/* Default Address Tag */}
            {address.isDefault && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                Default Address
              </div>
            )}

            <div className="mt-4">
              <h3 className="font-semibold text-lg">{address.fullName}</h3>
              <p className="text-sm text-gray-600">{address.flat}</p>
              <p className="text-sm text-gray-600">{address.street}, {address.landmark}</p>
              <p className="text-sm text-gray-600">{address.city}, {address.state},{address.postalCode}</p>
              <p className="text-sm text-gray-600">{address.country}</p>
              <p className="text-sm text-gray-600">Phone number: {address.mobileNo}</p>

              <div className="flex justify-end mt-4 space-x-3">
                <button
                  onClick={() => handleEdit(address)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setIsDeleteModalVisible(true);
                    setAddressToDelete(address);
                  }}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
                {!address.isDefault && (
                  <button
                    onClick={() => handleMakeDefault(address)}
                    className="text-green-600 hover:underline text-sm"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Address;
