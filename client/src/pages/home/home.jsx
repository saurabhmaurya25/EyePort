import React, { useEffect } from "react";
import images from "../../images";
import NavigationMenu from "./nav"; // Adjust the path based on your folder structure
import ProductHighlight from "./productHighlight";
import Tagline from './tagline';
import Call from './call';
import Footer from "../../components/footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate,Link } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a success message in the location state
    if (location.state?.successMessage) {
      toast.success(location.state.successMessage);

      // Reset the state to prevent showing the toast again
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const categories = [
    { name: "Eyeglasses", image: images.eyeglass },
    { name: "Sunglasses", image: images.sunglass },
    { name: "Screen Glasses", image: images.screenglass },
    { name: "Contact Lenses", image: images.contactlens },
    { name: "Power Sunglasses", image: images.sunglass },
    { name: "Progressive Lenses", image: images.progressiveLens },
  ];

  return (
    <div className="bg-white">
      {/* Navigation Menu */}
      <NavigationMenu categories={categories} />

      {/* Categories Section */}
      <div className="grid grid-cols-3 gap-4 p-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 bg-gray-50">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white shadow-sm p-4 rounded-lg group hover:shadow-md transition duration-300"
          >
            <Link className="w-full h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden rounded-lg" to = "/products">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <span className="mt-3 text-sm sm:text-lg font-medium text-gray-800 group-hover:text-blue-600 transition duration-200">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-800 to-purple-900 text-white py-8 px-4 md:py-8 md:px-8 rounded-lg">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between">
          {/* Left Section - Text and Button */}
          <div className="flex-1 text-center md:text-left mb-6 md:mb-0 flex flex-col justify-center items-center md:items-start">
            <h2 className="text-xl md:text-4xl font-bold leading-tight mb-2 md:mb-4">
              Extra <span className="text-yellow-400">₹200 OFF</span>
            </h2>
            <p className="text-sm md:text-lg font-medium mb-2 md:mb-4">on your first order</p>
            <button className="bg-white text-blue-800 hover:bg-gray-100 px-4 py-2 md:px-6 md:py-3 text-sm md:text-lg font-semibold rounded transition-transform duration-300 transform hover:scale-105">
              Shop Now
            </button>
          </div>

          {/* Right Section - Image */}
          <div className="flex-1 max-w-full flex justify-center items-center mt-4 md:mt-0">
            <img
              src={images.sandeep_maheshwari}
              alt="Promotional Offer"
              className="w-full h-auto object-contain max-h-24 sm:max-h-32 md:max-h-72"
            />
          </div>
        </div>
      </div>

      <div className="text-center my-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Pick your perfect choice
        </h2>
      </div>

      <ProductHighlight />

      <Tagline />
      <Call />

      {/* Footer Section */}
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Home;
