import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../url';
import Footer from '../components/footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          toast.success(data.message); // Show success message from backend
        }
        setWishlistItems(wishlistItems.filter(item => item._id !== id)); // Remove the item locally after deletion
      } catch (error) {
        console.error('Error removing item from wishlist:', error);
        toast.error('Something went wrong, please try again later.');
      }
    }
  };

  const addToCart = async (item) => {
    console.log("Item is: ",item);
    try {
      // Assuming you have an endpoint for adding items to the cart
      await axios.post(`${BASE_URL}/addItem`, { 
      name: item.name,
      userId,
      productId: item.productId, 
      image: item.image,
      price: item.price,
      discountPrice : item.discountPrice,
      quantity: 1 
    });
      toast.success('Item added to cart!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="container mx-auto p-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Your Wishlist</h2>

        {wishlistItems.length === 0 ? (
          <p className="text-xl text-gray-500">Your wishlist is empty. Start adding items!</p>
        ) : (
          <div className="space-y-6">
            {wishlistItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between bg-white rounded-lg shadow-lg p-4">
                <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-lg" />
                <div className="flex flex-col flex-grow ml-4">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-lg text-gray-500 mb-2">${item.price}</p>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                      onClick={() => removeFromWishlist(item._id)}
                    >
                      Remove
                    </button>
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                      onClick={() => window.location.href = `/productDetails/${item.productId}`}
                    >
                      View Product
                    </button>
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toast notifications container */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeButton={true} />

      <Footer />
    </>
  );
};

export default Wishlist;
