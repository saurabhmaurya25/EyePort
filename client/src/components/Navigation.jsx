import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/userSlice";
import images from "../images";
import { useState, useEffect, useRef } from "react";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const username = user?.username || null;
  const userId = user?._id || null;
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveringDropdown, setHoveringDropdown] = useState(false);
  const menuRef = useRef(null);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    alert("Logout successfully");
    navigate("/");
  };

  const closeDropdownAfterDelay = () => {
    setTimeout(() => {
      if (!hoveringDropdown) {
        setDropdownOpen(false);
      }
    }, 300);
  };

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

  return (
    <div className="sticky top-0 z-50 bg-white shadow">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo & Name */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img className="h-8" src={images.logo} alt="logo" />
          </Link>
          <Link to = "/" className="text-lg font-semibold text-gray-700">EyePort</Link>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen ? (
          <div className="flex items-center flex-1 space-x-3">
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : (
          <div className="flex items-center space-x-4 md:hidden">
            {/* Search Icon */}
            <button
              className="text-gray-700 focus:outline-none"
              onClick={() => setMobileSearchOpen(true)}
            >
              <img className="w-5 h-5" src={images.search} alt="search-icon" />
            </button>

            {/* Wishlist Icon */}
            <Link to="/wishlist" className="relative hover:text-blue-500">
              <img className="w-6 h-6" src={images.wishlist} alt="wishlist-icon" />
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative hover:text-blue-500">
              <div className="relative">
                <img className="w-6 h-6" src={images.cart} alt="cart-icon" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
                    {totalQuantity}
                  </span>
                )}
              </div>
            </Link>

            {/* Hamburger Menu */}
            <button
              className="text-gray-700 focus:outline-none"
              onClick={() => setMenuOpen(true)}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 flex-1">
          <div className="flex-1 px-6">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full max-w-lg px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {user?.role === "admin" && (
            <Link
              to="/adminPanel"
              className="text-base text-gray-700 hover:text-blue-500"
            >
              Admin Panel
            </Link>
          )}
          <Link to="/" className="text-base text-gray-700 hover:text-blue-500">
            Track Order
          </Link>
          {user ? (
            <div
              className="relative text-base text-gray-700 cursor-pointer hover:text-blue-500"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={closeDropdownAfterDelay}
            >
              Hello, {username}
              {dropdownOpen && (
                <div
                  className="absolute right-0 w-48 bg-white shadow-lg rounded-md"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={closeDropdownAfterDelay}
                >
                  <Link
                    to="/account/profile"
                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/account/order"
                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                  >
                    My Wishlist
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-base text-gray-700 hover:text-blue-500">
              Sign In
            </Link>
          )}
          <div className="flex items-center space-x-2">
            <Link to="/wishlist" className="flex items-center space-x-1 hover:text-blue-500">
              <img className="w-5 h-5" src={images.wishlist} alt="wishlist-icon" />
              <span className="text-base">Wishlist</span>
            </Link>
            <Link to="/cart" className="px-2 flex items-center space-x-1 hover:text-blue-500">
              <img className="w-5 h-5" src={images.cart} alt="cart-icon" />
              <span className="text-base">Cart</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } w-3/4`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button
            className="text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="space-y-4 p-4">
          {!user ? (
            <>
              <li className="text-sm text-gray-700">User not logged in</li>
              <li>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-700 hover:text-blue-500"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="text-sm text-gray-700">Hello, {username}</li>
              <li>
                <Link
                  to="/account/profile"
                  className="block px-4 py-2 text-gray-700 hover:text-blue-500"
                  onClick={() => setMenuOpen(false)}
                >
                  Account Information
                </Link>
              </li>
              <li>
                <Link
                  to="/account/order"
                  className="block px-4 py-2 text-gray-700 hover:text-blue-500"
                  onClick={() => setMenuOpen(false)}
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="block px-4 py-2 text-gray-700 hover:text-blue-500"
                  onClick={() => setMenuOpen(false)}
                >
                  My Wishlist
                </Link>
              </li>
              {user.role === "admin" && (
                <li>
                  <Link
                    to="/adminPanel"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;