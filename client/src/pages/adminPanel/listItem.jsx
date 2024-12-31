import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../url";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListItem = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [sortOption, setSortOption] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.user);
    const userId = user ? user._id : null;
    const userName = user ? user.username : "Error";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getProduct`);
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handleSort = (option) => {
    setSortOption(option);
    const sortedProducts = [...products].sort((a, b) => {
      if (option === "date") return new Date(b.createdAt) - new Date(a.createdAt);
      if (option === "stockQuantity") return a.stockQuantity - b.stockQuantity;
      if (option === "price") return b.price - a.price;
      if (option === "name") return a.brandName.localeCompare(b.brandName);
      return 0;
    });
    setProducts(sortedProducts);
  };

  const filteredProducts = products.filter((product) => {
    if (searchBy === "name") {
      return product.brandName.toLowerCase().includes(searchQuery);
    } else if (searchBy === "id") {
      return product._id.toLowerCase().includes(searchQuery);
    } else if (searchBy === "modelNo") {
      return product.modelNo?.toLowerCase().includes(searchQuery);
    }
    return false;
  });

  const handleEditClick = (product) => {
    setSelectedProduct({ ...product });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      selectedProduct.creatorId = userId;
      selectedProduct.creatorName = userName;
      const res = await axios.put(`${BASE_URL}/updateProduct`, selectedProduct);
      if(res.data.success){
        toast.success(res.data.message);
        setProducts((prev) =>
          prev.map((product) =>
            product._id === selectedProduct._id ? selectedProduct : product
          )
        );
      }
      else{
        toast.error(res.data.message);
      }
      handleCloseModal();
    } catch (error) {
      toast.error("Server Error! ");
      handleCloseModal();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-1 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className="text-sm sm:text-sm md:text-2xl font-bold text-gray-800">Our Product Collection</h1>
        <p className="text-gray-600 text-xs sm:text-base">
          Explore our wide range of products. Use search and sort to find exactly what you need.
        </p>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-blue-100 p-3 sm:p-4 rounded-lg shadow-md mb-3 gap-4">
        {/* Search */}
        <div className="flex flex-col-2 w-full gap-2">
          <select
            value={searchBy}
            onChange={handleSearchByChange}
            className="p-2 border rounded-md bg-white text-blue-900 focus:ring-2 focus:ring-blue-400 w-full text-xs sm:text-sm"
          >
            <option value="name">Search by Name</option>
            <option value="modelNo">Search by Model No.</option>
            <option value="id">Search by ID</option>
          </select>
          <input
            type="text"
            placeholder="Enter your search query"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="p-2 border rounded-md bg-white text-blue-900 focus:ring-2 focus:ring-blue-400 w-full text-xs sm:text-sm"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:mt-0">
          <label htmlFor="sort" className="text-blue-800 w-1/3 font-medium text-xs sm:text-sm">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className="p-2 border rounded-md bg-white text-blue-900 focus:ring-2 focus:ring-blue-400 w-full md:w-auto text-xs sm:text-sm"
          >
            <option value="">Select</option>
            <option value="date">Date</option>
            <option value="stockQuantity">Stock Quantity</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-2 sm:p-3 shadow-md bg-white hover:shadow-lg transition-all duration-300 text-xs sm:text-sm"
          >
            <img
              src={product.images[0]}
              alt={product.brandName}
              className="w-full h-16 sm:h-24 md:h-32 object-cover rounded-md mb-2"
            />
            <h3 className="font-semibold text-gray-800 truncate text-xs md:text-base sm:scale-90">
              {product.brandName}
            </h3>

            <p className="text-xs sm:text-sm text-gray-500 truncate">{`ID: ${product._id}`}</p>
            <button
              onClick={() => handleEditClick(product)}
              className="mt-2 p-2 bg-blue-500 text-white rounded-md text-xs"
            >
              Edit
            </button>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No products found.</div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center overflow-y-auto py-32 ">
    <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 max-h-screen overflow-y-auto">
      {/* Sticky Heading */}
      <div className="sticky top-0 bg-white z-10 pb-4 border-b mb-4 p-4">
        <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-1">Edit Product</h2>
        <p className="text-gray-600 text-xs md:text-sm">
          Modify the details of your product below. Ensure all fields are correct before saving.
        </p>
      </div>

      <form>
        {/* Editable Fields */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-6">
          {Object.keys(selectedProduct).map((key) => {
            if (
              key === "_id" ||
              key === "createdAt" ||
              key === "updatedAt" ||
              key === "images" ||
              key === "creatorId" ||
              key === "creatorName" ||
              key === "date" ||
              key === "__v" ||
              key === "isActive"
            ) {
              return null;
            }
            return (
              <div key={key} className="">
                <label className="font-semibold block text-green-700 capitalize text-sm sm:text-base mb-1">
                  {key}
                </label>
                <input
                  type="text"
                  name={key}
                  value={selectedProduct[key] || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md text-xs sm:text-sm text-gray-900"
                />
              </div>
            );
          })}
        </div>

        {/* isActive Checkbox */}
        <div className="mt-6 mb-6 px-4 flex items-center justify-between">
          {/* Checkbox */}
          <label className="flex items-center space-x-2 text-blue-700 font-semibold">
            <input
              type="checkbox"
              name="isActive"
              checked={selectedProduct.isActive}
              onChange={(e) =>
                handleInputChange({ target: { name: "isActive", value: e.target.checked } })
              }
              className="w-5 h-5 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs sm:text-base">Is Active</span>
          </label>

          {/* Buttons */}
          <div className="flex space-x-4">
  <button
    type="button"
    onClick={handleCloseModal}
    className="text-sm md:text-base px-6 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400"
  >
    Cancel
  </button>
  <button
    type="submit"
    onClick={handleSubmit}
    className={`text-sm md:text-base px-6 py-2 bg-red-600 text-white rounded-full flex items-center justify-center space-x-2
      ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
    disabled={loading}
  >
    {loading && (
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M12 2a10 10 0 00-10 10h4a6 6 0 016-6V2zM2 12a10 10 0 0010 10v-4a6 6 0 01-6-6H2z"
        ></path>
      </svg>
    )}
    <span>{loading ? 'Updating...' : 'Update'}</span>
  </button>
</div>
        </div>
      </form>
    </div>
  </div>
)}
<ToastContainer/>
           
    </div>
  );
};

export default ListItem;
