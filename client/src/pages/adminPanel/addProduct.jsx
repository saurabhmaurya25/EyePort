import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../url'; // Ensure you have the correct BASE_URL
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    brandName: '',
    productType: '',
    frameType: '',
    frameShape: '',
    modelNo: '',
    frameSize: '',
    frameWidth: '',
    frameDimension: '',
    ageGroup: '',
    frameColour: '',
    weight: '',
    weightGroup: '',
    material: '',
    frameMaterial: '',
    templeMaterial: '',
    prescriptionType: '',
    frameStyle: '',
    productCollection: '',
    warranty: '',
    gender: '',
    height: '',
    condition: '',
    templeColour: '',
    deliveryTime: '',
    price: '',
    discountPrice: '',
    stockQuantity: '',
    description: '',
    images: Array(5).fill(''),
  });

    const user = useSelector((state) => state.user.user);
    const userId = user ? user._id : null;
    const userName = user ? user.username : "Error";

    const [loading, setLoading] = useState(false);

    // console.log("user id bhosdiwale is: ",userId,userName);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...newProduct.images];
      updatedImages[index] = file;
      setNewProduct((prev) => ({ ...prev, images: updatedImages }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Check if at least one image is uploaded
    const hasImage = newProduct.images.some((image) => image !== '');
  
    if (!hasImage) {
      toast.warning('Please upload at least one image.');
      setLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append('brandName', newProduct.brandName);
    formData.append('productType', newProduct.productType);
    formData.append('frameType', newProduct.frameType);
    formData.append('frameShape', newProduct.frameShape);
    formData.append('modelNo', newProduct.modelNo);
    formData.append('frameSize', newProduct.frameSize);
    formData.append('frameWidth', newProduct.frameWidth);
    formData.append('frameDimension', newProduct.frameDimension);
    formData.append('ageGroup', newProduct.ageGroup);
    formData.append('frameColour', newProduct.frameColour);
    formData.append('weight', newProduct.weight);
    formData.append('weightGroup', newProduct.weightGroup);
    formData.append('material', newProduct.material);
    formData.append('frameMaterial', newProduct.frameMaterial);
    formData.append('templeMaterial', newProduct.templeMaterial);
    formData.append('prescriptionType', newProduct.prescriptionType);
    formData.append('frameStyle', newProduct.frameStyle);
    formData.append('productCollection', newProduct.productCollection);
    formData.append('warranty', newProduct.warranty);
    formData.append('gender', newProduct.gender);
    formData.append('height', newProduct.height);
    formData.append('condition', newProduct.condition);
    formData.append('templeColour', newProduct.templeColour);
    formData.append('deliveryTime', newProduct.deliveryTime);
    formData.append('price', newProduct.price); // Convert to number
    formData.append('discountPrice', newProduct.discountPrice); // Convert to number
    formData.append('stockQuantity', newProduct.stockQuantity); // Convert to number
    formData.append('description', newProduct.description);
    formData.append('creatorId',userId);
    formData.append('creatorName',userName);
  
    // Append images
    newProduct.images.forEach((image, index) => {
      if (image) {
        formData.append(`image${index + 1}`, image);
      }
    });
  // console.log("data is: ",formData);
    try {
      const res = await axios.post(`${BASE_URL}/addProduct`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

  
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.warning(res.data.message);
      }
  
      // Reset product form state after submission
      setNewProduct({
        brandName: '',
        productType: '',
        frameType: '',
        frameShape: '',
        modelNo: '',
        frameSize: '',
        frameWidth: '',
        frameDimension: '',
        ageGroup: '',
        frameColour: '',
        weight: '',
        weightGroup: '',
        material: '',
        frameMaterial: '',
        templeMaterial: '',
        prescriptionType: '',
        frameStyle: '',
        productCollection: '',
        warranty: '',
        gender: '',
        height: '',
        condition: '',
        templeColour: '',
        deliveryTime: '',
        price: '',
        discountPrice: '',
        stockQuantity: '',
        description: '',
        images: Array(5).fill(''), // Reset images to empty
      });
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <div>
      <div className="max-w-7xl mx-auto bg-white p-4 rounded-lg shadow-lg">
      <h1 className="text-lg md:text-2xl font-bold text-blue-800 mb-6 text-center pb-4 bg-green-200 text-white p-4 rounded-md">
  Add New Product
</h1>


        {/* Description box */}
        <div className="bg-gray-100 p-4 mb-2 rounded-lg border border-gray-300">
          <p className="md:text-lg font-medium text-gray-600 mb-2">
            Welcome to the <span className="font-semibold text-blue-500">Add Product</span> section.
          </p>
          <p className="text-sm md:text-base text-pink-800">
            Here, you can easily add new products to your store. Fill in all the necessary details, upload product images, and specify pricing and stock information to ensure your customers have all the information they need.
          </p>
          <p className="text-sm md:text-base text-green-600">
            Make sure to provide accurate and complete information to enhance the shopping experience for your users.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Loop through all keys of the newProduct state */}
          {Object.keys(newProduct).map((key) => {
            if (key === 'images') {
              return (
                <div key={key} className="col-span-full">
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Upload Images
                  </label>
                  <div className="flex space-x-4">
                    {newProduct.images.map((image, index) => (
                      <div
                        key={index}
                        className={`relative w-full sm:w-24 h-24 flex flex-col items-center justify-center cursor-pointer ${
                          image ? '' : 'border-2 border-dashed border-gray-400 rounded-md'
                        }`}
                      >
                        {image ? (
                          <>
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Uploaded ${index + 1}`}
                              className="w-full h-full object-contain rounded-md"
                            />
                            <button
                              type="button"
                              className="mt-1 text-xs bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                              onClick={() => {
                                const updatedImages = [...newProduct.images];
                                updatedImages[index] = null;
                                setNewProduct((prev) => ({ ...prev, images: updatedImages }));
                              }}
                            >
                              Remove
                            </button>
                          </>
                        ) : (
                          <label className="flex flex-col items-center">
                            <span className="text-gray-500">Upload</span>
                            <span className="text-2xl">📤</span>
                            <input
                              type="file"
                              onChange={(e) => handleImageChange(index, e)}
                              accept="image/*"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                          </label>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            if (key === 'description') {
              return (
                <div key={key} className="lg:col-span-full">
                  <label className="block text-sm md:text-base font-medium text-gray-700 mb-2 capitalize">
                    Description
                  </label>
                  <textarea
                    name={key}
                    value={newProduct[key]}
                    onChange={handleChange}
                    placeholder="Enter description"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    rows="4"
                  ></textarea>
                </div>
              );
            }
            const isLargeField = key === 'brandName' || key === 'frameColour';
            return (
              <div
                key={key}
                className={`${
                  isLargeField ? 'col-span-2' : 'col-span-1'
                }`}
              >
                <label className="block text-sm md:text-base  font-medium text-gray-700 mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type={
                    key === 'price' || key === 'discountPrice' || key === 'stockQuantity'
                      ? 'number'
                      : 'text'
                  }
                  name={key}
                  value={newProduct[key]}
                  onChange={handleChange}
                  placeholder={key.replace(/([A-Z])/g, ' $1')}
                  className="p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            );
          })}

          {/* Submit Button */}
          <button
  type="submit"
  className={`col-span-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm md:text-base font-semibold 
    ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} 
    flex justify-center items-center space-x-2`}
  disabled={loading}
>
  {loading ? (
    <svg
      className="animate-spin h-6 w-6 text-white"
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
  ) : null}
  <span>{loading ? 'Adding...' : 'Add Product'}</span>
</button>

        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AddProduct;
