import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
    gender: 'male',
    email: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneChangeData, setPhoneChangeData] = useState({
    userId: '',
    newPhone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [phoneChangeLoading, setPhoneChangeLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        id: user._id,
        name: user.username || '',
        address: user.address || '',
        phone: user.phone || '',
        gender: user.gender || 'male',
        email: user.email || '',
      });

      setPhoneChangeData((prev) => ({
        ...prev,
        userId: user._id,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    setPhoneChangeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`${BASE_URL}/updateProfile`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLoading(false);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || 'Failed to update profile. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setPhoneChangeLoading(true);
    try {
      const response = await axios.put(`${BASE_URL}/changePhone`, phoneChangeData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPhoneChangeLoading(false);
      setIsModalOpen(false);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData((prev) => ({
          ...prev,
          phone: phoneChangeData.newPhone,
        }));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setPhoneChangeLoading(false);
      const errorMessage = error.response?.data?.message || 'Failed to update phone number. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5 border rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-5">Edit Account Information</h2>
      <h2 className="text-2xl font-semibold mb-5">Account Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            readOnly
            className="border rounded-md p-2 w-full bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            readOnly
            className="border rounded-md p-2 w-full bg-gray-100 cursor-not-allowed"
          />
          <button
            type="button"
            className="flex justify-end text-blue-500 underline"
            onClick={() => setIsModalOpen(true)}
          >
            Change
          </button>
        </div>
        <div>
          <label htmlFor="gender" className="block mb-1">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md flex items-center justify-center"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Change Phone Number</h3>
            <form onSubmit={handlePhoneSubmit} className="space-y-4" autoComplete="off">
              <div>
                <label htmlFor="newPhone" className="block mb-1">New Phone Number</label>
                <input
                  type="tel"
                  id="newPhone"
                  name="newPhone"
                  value={phoneChangeData.newPhone}
                  onChange={handlePhoneChange}
                  className="border rounded-md p-2 w-full"
                  placeholder="Enter your new phone number"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-1">Current Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={phoneChangeData.password}
                  onChange={handlePhoneChange}
                  className="border rounded-md p-2 w-full"
                  placeholder="Enter your current password"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
                  disabled={phoneChangeLoading}
                >
                  {phoneChangeLoading ? 'Changing...' : 'Change'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Profile;
