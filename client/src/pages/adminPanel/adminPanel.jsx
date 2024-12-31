import React, { useState } from 'react';
import AddProduct from './addProduct';
import ListItem from './listItem';
import ExclusiveAvailable from './exclusiveAvailable';
import User from './user';
import { useSelector } from 'react-redux';


function App() {
  const [selectedOption, setSelectedOption] = useState('Add Items');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSelector((state) => state.user.user);

  // Conditional rendering based on user role
  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center bg-gray-100 justify-center h-screen ">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-black mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-500 mb-6">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Sorry, you don't have access to this page. Please contact the administrator if you believe this is an error.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-md bg-white text-indigo-700 font-bold shadow-md hover:bg-gray-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  

  const renderContent = () => {
    switch (selectedOption) {
      case 'Add Items':
        return <AddProduct />;
      case 'List Items':
        return <ListItem />;
      case 'Order':
        return (
          <div className="content-box">
            <h2 className="text-3xl font-bold mb-4">Order Section</h2>
            <p className="text-gray-600">Here you can view customer orders and manage deliveries.</p>
          </div>
        );
      case 'User':
        return <User />;
      case 'Exclusive available product':
        return <ExclusiveAvailable />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen sticky">
      {/* Sidebar */}
      <div
        className={`fixed z-40 inset-0 bg-gray-800 bg-opacity-75 transition-opacity md:hidden ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <div
        className={`fixed z-50 inset-y-0 left-0 transform bg-white shadow-lg transition-transform md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64`}
      >
        <div className="p-6">
          <h3 className="py-10 text-center text-xl md:text-2xl font-bold tracking-wider">Dashboard</h3>
        </div>
        <ul className="flex flex-col space-y-1 px-2">
          {['Add Items', 'List Items', 'Order','User', 'Exclusive available product'].map((item) => (
            <li
              key={item}
              onClick={() => {
                setSelectedOption(item);
                setIsSidebarOpen(false); // Close menu on mobile after selection
              }}
              className={`cursor-pointer p-4 rounded-md transition duration-300 ${
                selectedOption === item
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'hover:bg-gray-200'
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow mx-2 my-6">
        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center mb-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <h1 className="text-xl md:text-2xl font-bold ml-4">Dashboard</h1>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}

export default App;
