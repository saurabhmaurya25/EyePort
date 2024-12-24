import React from "react";

const ProductHighlights = () => {
  return (
    <div className="py-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-4 justify-between">
          {/* First Card */}
          <a
            href="/products/eye-glass"
            className="block shadow-lg transition-transform duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-2 hover:shadow-2xl flex-1 w-full sm:w-auto"
          >
            <div className="flex-shrink-0 mr-1">
                <i className="fa fa-eye text-2xl text-blue-600"></i>
                <strong className="text-lg md:text-xl font-bold block ">Eye Glass</strong>
                <span className="text-sm md:text-xl font-extrabold text-blue-800 mr-2">
                    ₹499 - ₹799
                  </span>
            </div>
            <div className="flex items-start">
              <div className="flex flex-col">
                <ul className="text-xs md:text-base list-disc pl-4 text-gray-700 font-medium">
                  <li>White Glass</li>
                  <li>Day Night Glass</li>
                  <li>Fibre Glass</li>
                  <li>CR.39 Quality</li>
                  <li>Lite Weight</li>
                </ul>
              </div>
            </div>
            <h3 className="text-center text-sm md:text-lg font-semibold mt-4 text-gray-700">
              Affordable & Durable
            </h3>
          </a>

          {/* Second Card */}
          <a
            href="/products/premium"
            className="block shadow-lg transition-transform duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 hover:shadow-2xl flex-1 w-full sm:w-auto"
          >
            <div className="flex-shrink-0 mr-1">
                <i className="fa fa-lightbulb text-2xl text-yellow-500"></i>
                <strong className="text-lg md:text-xl font-bold block ">Premium</strong>
                <span className="text-sm md:text-xl font-extrabold text-yellow-700 mr-2">
                    ₹599-₹1299
                  </span>
            </div>
            <div className="flex items-start">
              <div>
                <ul className="text-xs md:text-base list-disc pl-2 text-gray-700 font-medium">
                  <li>Radiation Reflect Glass</li>
                  <li>Screen Glass</li>
                  <li>Blue Cut Lens</li>
                </ul>
                <div>
                  <strong className="block text-gray-800 mb-1">Features:</strong>
                  <ul className="text-xs md:text-base list-disc pl-2 text-gray-600">
                    <li>Reflects Harmful Blue Light</li>
                    <li>Improves Clarity</li>
                    <li>No Pressure on Your Eye</li>
                  </ul>
                </div>
              </div>
            </div>
            <h3 className="text-center text-sm md:text-lg font-semibold mt-4 text-gray-700">
              Screen Protection
            </h3>
          </a>

          {/* Third Card */}
          <a
            href="/products/superglass"
            className="block shadow-lg transition-transform duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 hover:shadow-2xl flex-1 w-full sm:w-auto"
          >
            <div className="flex-shrink-0 mr-1">
                <i className="fa fa-star text-2xl text-green-600"></i>
                <strong className="text-lg md:text-xl font-bold block ">Superglass</strong>
                <span className="text-sm md:text-xl font-extrabold text-green-700 mr-2">
                    ₹1299-₹2999
                  </span>
            </div>
            <div className="flex items-start">
              <div>
                
                <ul className="text-xs md:text-base list-disc pl-2 text-gray-700 font-medium space-y-1">
                  <li>Eye feels cool</li>
                  <li>No effects from computer or sunlight</li>
                  <li>High sunlight reduction</li>
                  <li>Very comfortable</li>
                  <li>Clear vision</li>
                  <li>Anti-water</li>
                  <li>Anti-dust</li>
                </ul>
              </div>
            </div>
            <h3 className="text-center text-sm md:text-lg font-semibold mt-4 text-gray-700">
              Enhanced Vision
            </h3>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductHighlights;
