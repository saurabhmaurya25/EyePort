import React from "react";

const ContactSection = () => {
  return (
    <div className="bg-teal-100 pt-12 py-8 px-4 md:pt-16 md:py-12 md:px-8">
      {/* Title with Lines */}
      <h2 className="text-xl md:text-3xl font-bold text-center mb-8 relative">
        <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/4 sm:w-2/5 border-t-4 border-gray-400"></span>
            Buy It Your Way
            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/4 sm:w-2/5 border-t-4 border-gray-400"></span>
        </h2>


      <div className="max-w-6xl mx-auto">
        {/* Box for content */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 space-y-8">
          <div className="flex flex-wrap items-center justify-between">
            {/* Call Experts Section */}
            <div className="flex items-center space-x-4 w-full md:w-auto justify-center md:justify-start mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <span className="text-black text-base md:text-xl font-semibold">
                  CALL US TO PLACE AN ORDER
                </span>
              </div>
              <div className="flex items-center space-x-2 text-black text-base md:text-xl font-semibold">
                <i className="fas fa-phone-alt"></i> {/* Replace with phone icon */}
                <span>7266817216</span>
              </div>
            </div>

            {/* Buy on WhatsApp Section */}
            <div className="flex items-center justify-center md:justify-end w-full md:w-auto space-x-4">
              <div className="flex items-center space-x-2">
                <i className="fab fa-whatsapp text-black text-2xl"></i> {/* WhatsApp icon */}
                <span className="text-black text-base md:text-xl font-semibold">
                  BUY ON WHATSAPP
                </span>
              </div>
              <span className="bg-yellow-500 text-black px-4 py-2 md:px-6 md:py-3 rounded-full text-base md:text-xl font-bold shadow-md transition-colors">
                7266817216
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
