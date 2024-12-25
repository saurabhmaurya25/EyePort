import React, { useState, useEffect, useRef } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import Footer from './footer';
import { BASE_URL } from '../url';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    frameType: [],
    frameShape: [],
    frameColour: [],
    frameSize: [],
    gender: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false); // Spinner for "Add to Cart"
  const [error, setError] = useState(null);
  const [addToCart,setAddToCart] = useState(null);
  const [cartModel,setCartModel] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState(new Map()); // Track wishlist products

  const sidebarRef = useRef(null);
  const cartModelRef = useRef(null); // Ref for cart modal
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const userId = user ? user._id : null; // Extract user ID safely

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
      if (cartModel && cartModelRef.current && !cartModelRef.current.contains(event.target)) {
        setCartModel(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartModel]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/getProduct`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProductList(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (category, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      const filterCategory = updatedFilters[category];

      if (filterCategory.includes(value)) {
        updatedFilters[category] = filterCategory.filter((item) => item !== value);
      } else {
        updatedFilters[category] = [...filterCategory, value];
      }

      return updatedFilters;
    });
  };

  const handleWishlistToggle = async (product) => {
    if(!userId){
      toast.error('Please login to add items to your wishlist');
      navigate('/login');
    } else {
      const key = `${product._id}-${userId}`; // Create the composite key
      const updatedWishlistMap = new Map(wishlist); // Copy the current map
      if (updatedWishlistMap.has(key)) {
        const id = updatedWishlistMap.get(key);
        console.log(`Found wishlistId: ${id} for key: ${key}`);
        // Call backend to remove from wishlist
        try {
          const res = await axios.delete(`${BASE_URL}/deleteItemFromWishlist`,{ data: { id } });
          if(res.data.success){
            updatedWishlistMap.delete(key);
            toast.success(res.data.message);
          }
          else
            toast.error(res.data.message);
        } catch (err) {
          toast.error('Error removing from wishlist');
        }
      } else {
        // Call backend to add to wishlist
        try {
          const wishlistItem = {
            name: product.brandName,
            userId,
            productId: product._id,
            image: product.images[0],
            price: product.price,
            discountPrice: product.discountPrice
          };
          const res = await axios.post(`${BASE_URL}/addItemInWishlist`, wishlistItem);
          if(res.data.success){
            const wishlistId = res.data.wishlistId;
            updatedWishlistMap.set(key, wishlistId);
            toast.success("Successfully added to wishlist");
          }
          else
            toast.error(res.data.message);
        } catch (err) {
          toast.error('Error adding to wishlist');
        }
      }
      setWishlist(updatedWishlistMap);
    }
  };

  const handleAddToCart = async (product) => {
    console.log("Product is: ",product);
    if(!userId){
      toast.error('Please login to add items to your cart');
      navigate('/login');
      return;
    }
    setCartLoading(true); // Start spinner
      try {
      const cartItem = {
        name: product.brandName,
        userId,
        productId: product._id,
        image: product.images[0],
        frameColour: product.frameColour,
        frameShape: product.frameShape,
        frameType: product.frameType,
        price: product.price,
        discountPrice: product.discountPrice,
        quantity: 1,
      };
        const res = await axios.post(`${BASE_URL}/addItem`, cartItem);
        toast.success(res.data.message);
      }
        catch (error) {
          console.log('Error adding product to cart:', error);
          toast.error('Failed to add product to cart');
        } finally {
          setCartLoading(false); // Stop spinner
          setCartModel(false); // Close modal
        }
  };

  useEffect(() => {
    let updatedProducts = [...productList];

    Object.keys(filters).forEach((key) => {
      if (filters[key].length > 0) {
        updatedProducts = updatedProducts.filter((product) =>
          filters[key].some(
            (filterValue) => product[key]?.toLowerCase() === filterValue.toLowerCase()
          )
        );
      }
    });

    if (searchQuery) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchQuery) ||
          product.brandName?.toLowerCase().includes(searchQuery)
      );
    }

    if (sortBy === 'Price: Low to High') {
      updatedProducts.sort((a, b) => a.discountPrice - b.discountPrice);
    } else if (sortBy === 'Price: High to Low') {
      updatedProducts.sort((a, b) => b.discountPrice - a.discountPrice);
    } else if (sortBy === 'New') {
      updatedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'Biggest Saving') {
      updatedProducts.sort((a, b) => {
          const discountPercentageA = ((a.price - a.discountPrice) / a.price) * 100;
          const discountPercentageB = ((b.price - b.discountPrice) / b.price) * 100;
  
          return discountPercentageB - discountPercentageA; // Descending order
      });
  }
  
  

    setFilteredProducts(updatedProducts);
  }, [filters, searchQuery, sortBy, productList, wishlist]);

  const getDistinctValues = (key) =>
    Array.from(new Set(productList.map((product) => product[key] || '').filter(Boolean)));

  if (loading) {
    return <div className="text-center mt-20 text-xl font-bold">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500 text-lg font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        {/* Add to cart Model */}
        {cartModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        {/* <div
              ref={cartModelRef} 
        > */}
    <div className="bg-white w-11/12 max-w-lg rounded-lg shadow-2xl overflow-hidden">
      {/* Heading and Close Button */}
      <div className="bg-gray-200 text-black flex justify-center items-center relative">
        <h3 className="md:text-lg font-bold p-4">
          Confirmation box
        </h3>
        <button
          className="text-black text-4xl text-gray-600 hover:text-gray-800 absolute right-4"
          onClick={() => setCartModel(false)}
        >
          &times;
        </button>
      </div>


      {/* Product Details */}
      <div className="flex items-start mt-6 px-4 gap-4">
        {/* Product Image */}
        <img
          src={addToCart?.images[0]}
          alt={addToCart?.brandName}
          className="w-20 h-20 object-cover"
        />

        {/* Product Name and Link */}
        <div className="flex-1">
          <h3 className="text-sm md:text-lg font-bold text-gray-800">{addToCart?.brandName}</h3>
          <h3 className='text-xs md:text-base font-bold text-gray-800'>Size: {addToCart.frameSize}</h3>
          <Link
            to={`/productDetails/${addToCart?._id}`}
            className="text-blue-500 hover:underline text-xs md:text-sm"
          >
            View Product
          </Link>
        </div>
      </div>

      {/* Price and Discount */}
      <div className="px-6 text-gray-700">
  <p className="flex items-baseline ">
    <span className="text-xs md:text-sm font-bold">₹</span>
    <span className="px-0.5 text-xl md:text-3xl font-semibold text-black">{addToCart?.discountPrice}</span>
    <span className="text-sm md:text-base text-gray-700 pl-2">
      M.R.P: <span className="line-through text-gray-500">₹{addToCart?.price}</span>
    </span>
  </p>
  <p className="md:text-base text-sm text-green-600">
    ({Math.round(
      ((addToCart?.price - addToCart?.discountPrice) / addToCart?.price) * 100
    )}
    % OFF)
  </p>
</div>


      {/* Buttons */}
      <div className="flex justify-end mb-4 mr-4 gap-4 text-xs md:text-sm">
        <button
          className=" bg-gray-300 text-black hover:bg-gray-400 px-6 py-2 rounded-full"
          onClick={() => setCartModel(false)}
        >
          Cancel
        </button>
        <button
                  className={`bg-yellow-400 text-black hover:bg-yellow-500 px-6 py-2 rounded-full flex justify-center items-center ${
                    cartLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleAddToCart(addToCart)}
                  disabled={cartLoading}
                >
                  {cartLoading ? (
                    <svg
                    className="animate-spin h-5 w-5 text-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-50"
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
                  </svg>) : (
                    "Add to Cart"
                  )}
                </button>
      </div>
      {/* </div> */}
    </div>
  </div>
)}


        {/* Sidebar Filters */}
        <div
          ref={sidebarRef}
          className={`${
            isFilterOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed top-0 left-0 z-40 bg-gray-100 w-3/4 h-full overflow-y-auto transform transition-transform lg:relative lg:translate-x-0 lg:w-1/4 lg:h-auto lg:border-r lg:sticky lg:top-0 lg:h-screen`}
        >
          {/* Sidebar content */}
          <div className="p-4 lg:pt-0 pt-16 border-b">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                className="text-lg font-bold text-gray-500 lg:hidden"
                onClick={() => setIsFilterOpen(false)}
              >
                ✕
              </button>
            </div>
            {[{ label: 'Frame Type', key: 'frameType' }, { label: 'Frame Shape', key: 'frameShape' }, { label: 'Frame Colour', key: 'frameColour' }, { label: 'Frame Size', key: 'frameSize' }, { label: 'Gender', key: 'gender' }]
              .map(({ label, key }) => (
                <div key={key} className="mb-6">
                  <h4 className="font-medium mb-2">{label}</h4>
                  {getDistinctValues(key).map((value) => (
                    <label key={value} className="block">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={filters[key].includes(value)}
                        onChange={() => handleFilterChange(key, value)}
                      />
                      {value}
                    </label>
                  ))}
                </div>
              ))}
          </div>
        </div>
        
        
        {/* Product List */}
        <div className="lg:w-3/4">
          {/* Search Bar */}
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Search by name or brand"
              className="border p-2 rounded-md w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            />
          </div>

          {/* Filter and Sort Buttons */}
          <div className="flex items-center justify-between px-4 py-2 border-t lg:border-0">
            <button
              className="lg:hidden border p-2 rounded-md text-sm bg-blue-500 text-white"
              onClick={() => setIsFilterOpen(true)}
            >
              Apply Filter
            </button>
            <select
              className="border p-2 rounded-md text-sm text-black"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Default Sorting</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="New">New</option>
              <option value="Biggest Saving">Biggest Saving</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-2">
            {filteredProducts.map((product) => {
              // Calculate discount percentage
              const discountPercentage = product.discountPrice
                ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
                : 0;

              return (
                <div
                  key={product._id}
                  className="border rounded-lg shadow-md overflow-hidden bg-white"
                >
                  <div className="relative">
                    <Link to={`/productDetails/${product?._id}`}>
                    <img
                      src={product.images?.[0] || '/placeholder.png'}
                      alt={product.name || 'Product'}
                      className="w-full h-32 sm:h-48 object-cover"
                    />
                    </Link>
                    {/* Wishlist heart icon */}
                    <button
                      className="absolute top-2 right-2 text-2xl text-red-500"
                      onClick={() => handleWishlistToggle(product)}
                    >
                      {wishlist.has(`${product._id}-${userId}`) ? '♥' : '♡'}

                    </button>
                  </div>

                  <div className="px-4 mb-4">
                    <Link to = {`/productDetails/${product._id}`}>
                    <p className="text-sm md:text-base font-semibold text-gray-700">{product.brandName}</p>
                    </Link>

                    {/* Discount Price and Percentage */}
                    {product.discountPrice && (
                      <Link to = {`/productDetails/${product?._id}`}>
                      <span className="font-semibold">₹</span>
                      <span className="font-semibold text-xl md:text-2xl">{product.discountPrice}</span>
                      <span className="px-1 md:text-lg line-through text-red-500">₹{product.price}</span>
                      <span className="font-semibold text-green-700 block md:inline">
                        ({discountPercentage}% OFF)
                      </span>
                    </Link>
                    
                    )}

                    {/* Original Price */}
                    {!product.discountPrice && (
                      <div className="text-gray-800 font-bold">₹{product.price}</div>
                    )}

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => {
                        setCartModel(true);
                        setAddToCart(product)
                      }
                      }
                      className={`mt-4 bg-yellow-400 text-black py-2 w-full rounded-full hover:bg-yellow-500 text-xs md:text-sm font-semibold 
                        ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'} 
                        flex justify-center items-center space-x-2`}
                      disabled={loading}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Products;
