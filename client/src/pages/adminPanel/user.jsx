import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate to the ViewUser page
import axios from 'axios';
import { BASE_URL } from '../../url';

const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState('mobile'); // Default search type
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/userList`); // Adjust the endpoint as needed
        console.log(response.data.data);
        setUserData(response.data.data); // Adjust if your API response has a nested structure
        setFilteredData(response.data.data); // Initialize filtered data
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle Search
  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = userData.filter((user) => {
      if (searchType === 'mobile') {
        return user.phone?.toLowerCase().includes(lowerCaseQuery);
      }
      if (searchType === 'email') {
        return user.email?.toLowerCase().includes(lowerCaseQuery);
      }
      if (searchType === 'username') {
        return user.username?.toLowerCase().includes(lowerCaseQuery);
      }
      return false;
    });
    setFilteredData(filtered);
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading user data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">User List</h2>

      {/* Search Bar */}
      <div className="mb-6 flex flex-col sm:flex-row items-center">
        <select
          className="border rounded-lg px-4 py-2 w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="mobile">Search by Mobile No</option>
          <option value="email">Search by Email ID</option>
          <option value="username">Search by Username</option>
        </select>
        <input
          type="text"
          className="border rounded-lg px-4 py-2 w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4"
          placeholder={`Enter ${searchType}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white rounded-lg px-6 py-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* User List */}
      {filteredData.length === 0 ? (
        <p className="text-center text-gray-600">No users found.</p>
      ) : (
        <div className="space-y-6">
          {filteredData.map((user) => (
            <div key={user._id} className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800">Name/username: {user.username}</h3>
                <p className="text-gray-600">Email: {user.email}</p>
                <p className="text-gray-600">Phone: {user.phone}</p>

              </div>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={() => navigate(`/viewUser/${user._id}`,{state: user})}
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
