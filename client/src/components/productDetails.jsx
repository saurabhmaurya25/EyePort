import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../url";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [cartLoading, setCartLoading] = useState(false);

  const user = useSelector((state) => state.user.user);
  const userId = user?._id;
  const primaryAddress = user?.address || null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/getProductById/${productId}`);
        setProduct(data);
        setSelectedImage(data.images[0]); // Default image

        // Calculate delivery date
        if (data.deliveryTime) {
          const deliveryDays = parseInt(data.deliveryTime.replace("days", "").trim(), 10);
          const today = new Date();
          const delivery = new Date(today.setDate(today.getDate() + deliveryDays));
          const options = { weekday: "long", month: "long", day: "numeric" };
          setDeliveryDate(delivery.toLocaleDateString("en-US", options));
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = async () => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }
    setCartLoading(true); // Start spinner
      try {
      const cartItem = {
        name: product.brandName,
        userId,
        productId: product._id,
        image: product.images[0],
        price: product.price,
        discountPrice: product.discountPrice,
        quantity: quantity,
      };
        const res = await axios.post(`${BASE_URL}/addItem`, cartItem);
        if(res.data.success) 
          toast.success(res.data.message);
        else
          toast.error(res.data.message);
      }
        catch (error) {
          console.log('Error adding product to cart:', error);
          toast.error('Failed to add product to cart');
        } finally {
          setCartLoading(false); // Stop spinner
          setCartModel(false); // Close modal
        }
  };

  const buyNow = () => {
    if (!user) {
      toast.error("Please log in to proceed with purchase.");
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!product) return <div>Loading...</div>;

  const discountedPercentage = Math.round(
    ((product.price - product.discountPrice) / product.price) * 100
  );

  return (
    <div className="max-w-8xl mx-auto p-6">
      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Product Image Gallery (2/5) */}
        <div className="col-span-5 md:col-span-2">
          <div className="border rounded-lg p-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-28 md:h-96 object-contain rounded-lg"
            />
          </div>
          <div className="flex space-x-2 mt-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg cursor-pointer ${
                  selectedImage === img ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Information (2/5) */}
        <div className="col-span-5 md:col-span-2 space-y-2">
          <p className="text-black font-semibold text-xl md:text-2xl">
            {product.frameColour} Gradient {product.frameType} {product.frameShape}{" "}
            {product.brandName}
          </p>
          <p className="text-base md:text-lg text-gray-700">
            Size: <span>{product.frameSize}</span>
          </p>
          <hr />
          <div>
            <h2 className="text-red-500">
              <span className="text-red-600 ml-2 md:text-2xl">
                -{discountedPercentage}%{" "}
              </span>
              <span className="text-black text-2xl md:text-3xl font-semibold">
                ₹{product.discountPrice.toFixed(2)}
              </span>
              <div>
                <span className="text-gray-500 line-through md:text-lg ml-2">
                  M.R.P ₹{product.price.toFixed(2)}
                </span>
              </div>
            </h2>
            <p className="ml-2 text-sm">Inclusive of all taxes</p>
          </div>
          <div>
            {primaryAddress && (
              <p className="text-sm text-gray-600">
                Deliver to: <strong>{primaryAddress}</strong>
              </p>
            )}
          </div>

          <hr />
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="bg-blue-100 text-blue-700 text-xs md:text-sm font-medium px-3 py-1 rounded-full">
                7-day Replacement
              </span>
              <span className="bg-green-100 text-green-700 text-xs md:text-sm font-medium px-3 py-1 rounded-full">
                Pay on Delivery
              </span>
              <span className="bg-yellow-100 text-yellow-700 text-xs md:text-sm font-medium px-3 py-1 rounded-full">
                Top Brand
              </span>
              <span className="bg-gray-100 text-gray-700 text-xs md:text-sm font-medium px-3 py-1 rounded-full">
                Secure Transaction
              </span>
            </div>
            <div className="space-y-2 py-3">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">Technical Information</h3>
              <table className="text-xs md:text-sm w-full border border-gray-300 rounded-lg">
                <tbody>
                  {product && (
                    <>
                      {product.modelNo && (
                        <tr className="border-b">
                          <td className="px-4 py-2 font-medium text-gray-700">Model No:</td>
                          <td className="px-4 py-2">{product.modelNo}</td>
                        </tr>
                      )}
                      {product.frameDimension && (
                        <tr className="border-b">
                          <td className="px-4 py-2 font-medium text-gray-700">Frame Dimension:</td>
                          <td className="px-4 py-2">{product.frameDimension}</td>
                        </tr>
                      )}
                      {product.material && (
                        <tr className="border-b">
                          <td className="px-4 py-2 font-medium text-gray-700">Material:</td>
                          <td className="px-4 py-2">{product.material}</td>
                        </tr>
                      )}
                      {product.frameMaterial && (
                        <tr className="border-b">
                          <td className="px-4 py-2 font-medium text-gray-700">Frame Material:</td>
                          <td className="px-4 py-2">{product.frameMaterial}</td>
                        </tr>
                      )}
                      {product.frameColour && (
                        <tr className="border-b">
                          <td className="px-4 py-2 font-medium text-gray-700">Frame Colour:</td>
                          <td className="px-4 py-2">{product.frameColour}</td>
                        </tr>
                      )}
                      {product.warranty && (
                        <tr>
                          <td className="px-4 py-2 font-medium text-gray-700">Warranty:</td>
                          <td className="px-4 py-2">{product.warranty}</td>
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
              <button
                onClick={openModal}
                className="text-blue-600 text-sm mt-4"
              >
                Show All Information
              </button>
            </div>
          </div>
        </div>

        {/* Add to Cart Section (1/5) */}
        <div className="col-span-5 md:col-span-1 border rounded-lg p-4 space-y-2">
          <span className="font-semibold md:text-2xl">₹{product.discountPrice}</span>
          <div>
            <p className="text-sm md:text-base text-gray-600">
              Estimated Delivery: <strong>{deliveryDate}</strong>
            </p>
          </div>
          {product.stockQuantity <= 20 ? (
            <p className="text-red-600 font-medium">
              Only {product.stockQuantity} items left, hurry up!
            </p>
          ) : (
            <p className="text-green-600 font-medium">In Stock</p>
          )}

<div className="space-y-1 text-gray-500">
        <p className="text-sm">
          Payment: <span className="px-7 font-medium text-blue-600 cursor-pointer">Secure transaction</span>
        </p>
        <p className="text-sm">
          Ships from: <span className="px-4 font-medium text-gray-800">Eyeport</span>
        </p>
        <p className="text-sm">
          Sold by: <span className="px-9 font-medium text-blue-600 cursor-pointer">Eyeport</span>
        </p>
      </div>

          <div className="flex items-center space-x-4">
            <label htmlFor="quantity" className="text-gray-700">
              Quantity:
            </label>
            <select
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-1/2 border border-gray-300 rounded-md p-2"
            >
              {[1, 2, 3, 4, 5].map((qty) => (
                <option key={qty} value={qty}>
                  {qty}
                </option>
              ))}
            </select>
          </div>
        <button
                  className={`w-full bg-yellow-400 text-black hover:bg-yellow-500 px-6 py-2 rounded-full flex justify-center items-center ${
                    cartLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => addToCart()}
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
          <button
            onClick={buyNow}
            className="bg-green-500 text-white py-2 px-6 w-full rounded-full hover:bg-green-600"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Modal for Showing All Information */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center overflow-y-auto py-32 ">
          <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 max-h-screen overflow-y-auto">
            {/* Close Button */}
            <div className="sticky top-0 bg-gray-200 z-10 pb-4 border-b p-4">
        <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-1">Technical Information</h2>
        <button
              onClick={closeModal}
              className="text-gray-600 hover:text-gray-900 text-3xl font-bold focus:outline-none absolute top-4 right-4"
            >
              &times;
            </button> 
          </div>
            
            <div className="p-4">
              <div className="overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
                  {Object.keys(product).map((key, index) => (
                    product[key] !== "" &&
                    key !== 'images' &&
                    key !== 'stockQuantity' &&
                    key !== '_id' &&
                    key !== 'isActive' &&
                    key !== 'description' &&
                    key !== 'creatorId' &&
                    key !== 'creatorName' &&
                    key !== 'date' &&
                    key !== 'deliveryTime' &&
                    key !== 'discountPrice' &&
                    key !== 'price' &&
                    key !== '__v' &&
                    key !== 'createdAt' &&
                    key !== 'updatedAt' ?
                     (
                      <div key={index} className="text-sm md:text-base flex justify-between border-b py-2 md:py-3">
                        <span className=" text-gray-600">{key}:</span>
                        <span className="font-semibold text-green-600">{product[key]}</span>
                      </div>
                    ) : null
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
