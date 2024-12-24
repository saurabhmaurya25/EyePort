import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Footer from '../footer';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div className="min-h-screen flex justify-center"> {/* Changed from h-screen to min-h-screen */}
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Container with padding for desktop */}
        <div className="flex w-full md:w-2/3"> {/* 5/6th width for layout */}
          {/* Sidebar */}
          <aside
            className={`fixed z-20 inset-y-0 left-0 w-64 bg-gray-100 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:translate-x-0 md:relative`}
          >
            {/* Cancel button for mobile */}
            <button
              className="absolute top-16 right-4 text-gray-600 md:hidden z-30"
              onClick={closeSidebar}
            >
              ✖
            </button>
            <div className="py-20 p-4 md:p-6">
              <h2 className="text-lg font-semibold text-gray-800">Account</h2>
              <nav className="mt-4">
                <ul>
                  <li className="mb-2">
                    <NavLink
                      to="/account/profile"
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded ${isActive ? 'bg-green-400 text-gray-900' : 'text-gray-700 hover:bg-green-400'}`
                      }
                    >
                      Account Information
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/account/order"
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded ${isActive ? 'bg-green-400 text-gray-900' : 'text-gray-700 hover:bg-green-400'}`
                      }
                    >
                      My Order
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/account/address"
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded ${isActive ? 'bg-green-400 text-gray-900' : 'text-gray-700 hover:bg-green-400'}`
                      }
                    >
                      Address
                    </NavLink>
                  </li>

                  <li className="mb-2">
                    <NavLink
                      to="/account/change-password"
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded ${isActive ? 'bg-green-400 text-gray-900' : 'text-gray-700 hover:bg-green-400'}`
                      }
                    >
                      Change Password
                    </NavLink>
                  </li>
                  {/* Add more links as needed */}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top bar for mobile */}
            <header className="bg-white shadow-md p-4 md:hidden flex items-center">
              <button
                className="text-gray-600"
                onClick={toggleSidebar}
              >
                ☰
              </button>
              <h1 className="text-lg font-semibold ml-4">Account</h1>
            </header>
            <main className="p-6 bg-white rounded-md md:mx-auto md:max-w-5xl">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
