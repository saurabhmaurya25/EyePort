import React from "react";
import { Link } from "react-router-dom";

const Tagline = () => {
  return (
    <div className="bg-green-50 py-8 sm:py-12 px-6 md:px-12 rounded-lg">
      <div className="max-w-4xl mx-auto text-center">
        {/* Subtitle */}
        <p className="text-xl md:text-2xl font-medium text-gray-600 mb-2">
            Our Purpose
        </p>

        
        {/* Tagline */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
          See Better, Live Better.
        </h1>
        
        {/* Link as a Button */}
        <Link
          to="/discover"
          className="mt-6 inline-block px-6 py-2 md:px-8 md:py-3 bg-blue-600 text-white font-medium text-base md:text-lg rounded-md hover:bg-blue-700 transition-colors"
        >
          Discover
        </Link>
      </div>
    </div>
  );
};

export default Tagline;
