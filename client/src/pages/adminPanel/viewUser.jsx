import React from 'react';
import { useLocation } from 'react-router-dom';

const ViewUser = () => {
  const location = useLocation(); // Get the location object
  const userDetails = location.state; // Access state passed from the Link

  console.log('User Details:', userDetails); // Log to confirm data is received

  if (!userDetails) {
    return <p className="text-center text-gray-600">No user details available.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">User Details</h2>
      <div className="space-y-4">
        <div>
          <p className="font-semibold text-gray-600">Full Name: {userDetails.username}</p>
          
        </div>
        <div>
          <p className="font-semibold text-gray-600">Email:</p>
          <p className="text-gray-800">{userDetails.email}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-600">Phone Number:</p>
          <p className="text-gray-800">{userDetails.phone}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-600">Address:</p>
          <p className="text-gray-800">{userDetails.address}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
