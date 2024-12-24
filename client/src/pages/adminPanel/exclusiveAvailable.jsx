import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../url';

const ExclusiveAvailable = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    discountPrice: '',
    stockQuantity: '',
    brand: '',
    type: 'ExclusiveAvailable', // Default type to ExclusiveAvailable
    images: Array(5).fill(''), // Initialize with empty strings for five images
  });

  const [notification, setNotification] = useState('');

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

    // Check if at least one image is uploaded
    const hasImage = newProduct.images.some((image) => image !== '');

    if (!hasImage) {
      alert('Please upload at least one image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('category', newProduct.category);
    formData.append('price', Number(newProduct.price));
    formData.append('discountPrice', Number(newProduct.discountPrice));
    formData.append('stockQuantity', Number(newProduct.stockQuantity));
    formData.append('brand', newProduct.brand);
    formData.append('type', newProduct.type); // Static type value

    // Append images
    newProduct.images.forEach((image, index) => {
      if (image) {
        formData.append(`image${index + 1}`, image);
      }
    });
    console.log("Exclusive data is: ",formData);
    try {
      setNotification('Please wait...');
      const res = await axios.post(`${BASE_URL}/addProduct`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 200) {
        setNotification('Product added successfully!');
        setTimeout(() => {
          setNotification('');
        }, 3000);
      } else {
        setNotification('Unexpected response from server.');
        setTimeout(() => {
          setNotification('');
        }, 3000);
      }

      setNewProduct({
        name: '',
        description: '',
        category: '',
        price: '',
        discountPrice: '',
        stockQuantity: '',
        brand: '',
        type: 'ExclusiveAvailable', // Reset to default type
        images: Array(5).fill(''), // Reset images
      });
    } catch (error) {
      console.error('Error creating product:', error);
      setNotification('Error adding product. Please try again.');
      setTimeout(() => {
        setNotification('');
      }, 3000);
    }
  };

  return (
    <>
      {notification && (
        <div className="fixed top-5 right-5 m-4 p-4 bg-blue-500 text-white rounded-md shadow-lg">
          {notification}
        </div>
      )}
  
  <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

<div className="col-span-2">
  <label className="block font-semibold mb-1">Product Name</label>
  <input
    type="text"
    name="name"
    value={newProduct.name}
    onChange={handleChange}
    placeholder="Product Name"
    required
    className="p-3 border rounded-md w-full sm:w-1/2 min-w-[600px]"
  />
</div>

<div className="col-span-2">
  <label className="block font-semibold mb-1">Description</label>
  <textarea
    name="description"
    value={newProduct.description}
    onChange={handleChange}
    placeholder="Description"
    required
    className="p-3 border rounded-md w-full sm:w-1/2 min-w-[600px]"
    rows="2"
  ></textarea>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
  <div>
    <label className="block font-semibold mb-1">Category</label>
    <select
      name="category"
      value={newProduct.category}
      onChange={(e) => {
        handleChange(e);
        setNewProduct((prev) => ({
          ...prev,
          type: "ExclusiveAvailable",
        }));
      }}
      className="p-2 border rounded-md min-w-[300px]"
    >
      <option value="Furniture">Furniture</option>
      <option value="Kitchen">Kitchen</option>
      <option value="Electronic">Electronic</option>
      <option value="Jewellery">Jewellery</option>
    </select>
  </div>

  <div>
    <label className="block font-semibold mb-1">Price</label>
    <input
      type="number"
      name="price"
      value={newProduct.price}
      onChange={(e) => {
        if (e.target.value >= 0) handleChange(e);
      }}
      placeholder="Price"
      required
      className="p-2 border rounded-md min-w-[300px]"
      min="0"
    />
  </div>

  <div>
    <label className="block font-semibold mb-1">Discount Price</label>
    <input
      type="number"
      name="discountPrice"
      value={newProduct.discountPrice}
      onChange={(e) => {
        if (e.target.value >= 0) handleChange(e);
      }}
      placeholder="Discount Price"
      className="p-2 border rounded-md min-w-[300px]"
      min="0"
    />
  </div>
</div>

<div className="col-span-2 flex gap-4 w-1/2">
  <div className="w-full">
    <label className="block font-semibold mb-1">Stock Quantity</label>
    <input
      type="number"
      name="stockQuantity"
      value={newProduct.stockQuantity}
      onChange={(e) => {
        if (e.target.value >= 0) handleChange(e);
      }}
      placeholder="Stock Quantity"
      required
      className="p-2 border rounded-md w-full"
      min="0"
    />
  </div>

  <div className="w-full">
    <label className="block font-semibold mb-1">Brand</label>
    <input
      type="text"
      name="brand"
      value={newProduct.brand}
      onChange={handleChange}
      placeholder="Brand"
      className="p-2 border rounded-md w-ful"
    />
  </div>
</div>





{/* Image Upload Section */}
<div className="col-span-2">
  <label className="block font-semibold mb-1">Upload Images</label>
  <div className="flex space-x-4">
    {newProduct.images.map((image, index) => (
      <div
        key={index}
        className={`relative w-24 h-24 flex flex-col items-center justify-center cursor-pointer ${image ? '' : 'border-2 border-dashed border-gray-400 rounded-md'}`}
      >
        {image ? (
          <>
            <img
              src={URL.createObjectURL(image)}
              alt={`Uploaded ${index + 1}`}
              className="w-full h-full object-contain"
            />
            <button
              className="mt-1 text-sm text-white bg-gray-400 rounded-md px-1 py-0.5 hover:bg-gray-500 hover:text-white"
              onClick={() => {
                const updatedImages = [...newProduct.images];
                updatedImages[index] = null; // Set the image back to null
                setNewProduct((prev) => ({ ...prev, images: updatedImages }));
              }}
            >
              Cancel
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

<button
  type="submit"
  className="col-span-2 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-1/6"
>
  Add Product
</button>

</form>

    </>
  );
  
  
};  

export default ExclusiveAvailable;
