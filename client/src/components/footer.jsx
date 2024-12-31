import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {/* Back to Top Link */}
      <div onClick={scrollToTop} className="bg-gray-700 text-white text-center py-2 cursor-pointer hover:bg-gray-600">
        <button className="text-sm md:text-base font-semibold">
          Back to Top
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          {/* Content Section */}
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-4">Discover Your Vision with EyePort</h3>
            <p className="text-sm md:text-lg mb-4">
              EyePort is your ultimate destination for premium eyewear that combines style, quality, and convenience. 
              As a trusted e-commerce platform, we’re redefining the way you shop for eyewear with a seamless online 
              experience and exceptional customer service.
            </p>
            <p className="text-sm md:text-lg mb-4">
              Whether you need eyeglasses, sunglasses, or contact lenses, EyePort offers an extensive collection for 
              men and women, featuring the latest designs and vibrant colors. Our range includes everything from 
              functional eyewear to fashion-forward styles.
              Shop with ease and enjoy fast doorstep delivery, flexible payment options, and unbeatable deals. 
              Choose EyePort for a clearer, more stylish vision today!
            </p>
          </div>

          {/* Help and Follow Us Section */}
          <div className="flex flex-wrap justify-between items-start gap-8">
  {/* Help Section */}
  <div className="flex-1 min-w-[200px]">
    <h3 className="text-lg md:text-xl font-semibold mb-4">Help</h3>
    <ul className="text-sm md:text-base space-y-2">
      <li>
        <a href="/faqs" className="hover:underline">FAQs</a>
      </li>
    </ul>
  </div>

  {/* Follow Us Section */}
  <div className="flex-1 min-w-[200px]">
    <h3 className="text-lg md:text-xl font-semibold mb-4">Follow Us</h3>
    <div className="flex space-x-4">
      <Link to="https://www.facebook.com/" target='_blank' className="text-gray-400 hover:text-white">
        <i className="fab fa-facebook text-2xl"></i>
      </Link>
      <Link to="https://www.twitter.com/" target='_blank' className="text-gray-400 hover:text-white">
        <i className="fab fa-twitter text-2xl"></i>
      </Link>
      <Link to="https://www.instagram.com/" target='_blank' className="text-gray-400 hover:text-white">
        <i className="fab fa-instagram text-2xl"></i>
      </Link>
      <Link to="https://www.youtube.com/" target='_blank' className="text-gray-400 hover:text-white">
        <i className="fab fa-youtube text-2xl"></i>
      </Link>
    </div>
  </div>
</div>


          {/* Footer Bottom */}
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm md:text-base">
            &copy; {new Date().getFullYear()} EyePort. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;