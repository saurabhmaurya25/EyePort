import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../url';
import Footer from '../components/footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsTrash3 } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);
  const userId = user ? user._id : null;

  useEffect(() => {
    const fetchWishlist = async () => {
      if (userId) {
        try {
          const { data } = await axios.get(`${BASE_URL}/getItemInWishlistByUserId?userId=${userId}`);
          setWishlistItems(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
          setLoading(false);
        }
      }
    };
    fetchWishlist();
  }, [userId]);

  const removeFromWishlist = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      try {
        const { data } = await axios.delete(`${BASE_URL}/deleteItemFromWishlist`, { data: { id } });
        if (data.message) {
          toast.success(data.message);
        }
        setWishlistItems(wishlistItems.filter((item) => item._id !== id));
      } catch (error) {
        console.error('Error removing item from wishlist:', error);
        toast.error('Something went wrong, please try again later.');
      }
    }
  };

  const addToCart = async (item) => {
    try {
      await axios.post(`${BASE_URL}/addItem`, {
        name: item.name,
        userId,
        productId: item.productId,
        image: item.image,
        frameType: item.frameType,
        frameShape: item.frameShape,
        frameColour: item.frameColour,
        price: item.price,
        discountPrice: item.discountPrice,
        quantity: 1,
      });
      toast.success('Item added to cart!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart.');
    }
  };

  const discountedPercentage = (price, discountPrice) => {
    return (((price - discountPrice) / price) * 100).toFixed(2);
  };

  if (loading) return <div className="text-center text-xl text-gray-600 mt-16">Loading...</div>;

  return (
    <>
      <div className="container mx-auto p-4 md:p-6 max-w-5xl">
  {/* Banner Section */}
  <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white p-4 md:p-8 rounded-lg shadow-lg mb-6 md:mb-8">
    <h1 className="text-2xl md:text-4xl font-bold mb-2">Your Wishlist</h1>
    <p className="text-sm md:text-lg">
      Save your favorite items and never miss out on the best deals!
    </p>
  </div>

  {/* Wishlist Items */}
  {wishlistItems.length === 0 ? (
    <div className="text-center mt-8 md:mt-16">
      <p className="mt-16 mb-8 text-lg md:text-xl text-gray-500">Your wishlist is empty. Start adding items!</p>
      <Link to = "/products" className="mt-4 bg-blue-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-blue-600 transition duration-300">
        Continue Shopping
      </Link>
    </div>
  ) : (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
  {wishlistItems.map((item) => (
    <div
      key={item._id}
      className="grid grid-cols-4 md:grid-cols-5 gap-4 lg:gap-8 bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition duration-200"
    >
      {/* Column 1: Product Image (1/4th of the width) */}
      <Link to={`/productDetails/${item?.productId}`}>
      <div className=" col-span-1 md:col-span-2 flex justify-center items-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 md:w-32 md:h-32 lg:w-52 lg:h-52 object-contain rounded-lg"
        />
      </div>
      </Link>

      {/* Column 2: Product Details and Buttons (3/4th of the width) */}
      <div className="col-span-3 md:col-span-3 flex flex-col justify-between space-y-2 md:space-y-3 lg:space-y-4">
        {/* Product Description */}
        <div className="space-y-1">
        <Link to={`/productDetails/${item?.productId}`}>
          <h3 className="text-xs md:text-xl font-semibold text-blue-800">
            {item.frameColour} Gradient {item.frameType} {item.frameShape} {item.name}
          </h3>
          </Link>
          <div>
            <h2 className="text-red-500">
            <span className="text-red-600 ml-2 md:text-xl">
              -{Math.floor(discountedPercentage(item.price, item.discountPrice))}% 
            </span>

              <span className="text-black px-1 text-xl md:text-2xl font-semibold">
                ₹{item.discountPrice}.00
              </span>
              <div>
                <span className="text-gray-500 line-through md:text-lg ml-2">
                  M.R.P ₹{item.price}
                </span>
              </div>
            </h2>
            <p className="ml-2 text-sm">(Inclusive of all taxes)</p>
          </div>
          <p className="text-xs md:text-base text-gray-700 px-2">
            Item added: {new Date(item.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap space-x-4 md:space-x-16 mt-2 md:mt-4">
          <button
            className="bg-yellow-400 text-black px-3 md:px-8 py-1 md:py-2 rounded-full hover:bg-yellow-500 transition duration-200 text-sm md:text-base"
            onClick={() => addToCart(item)}
          >
            Add to Cart
          </button>

<button
  className=" text-black border border-black px-8 md:px-12 py-1 rounded-full hover:bg-gray-100 transition duration-200 text-sm md:text-lg flex items-center justify-center"
  onClick={() => removeFromWishlist(item._id)}
>
  <BsTrash3/> 
</button>

        </div>
      </div>
    </div>
  ))}
</div>

  )}

</div>


      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeButton={true} />

      <Footer />
    </>
  );
};

export default Wishlist;
