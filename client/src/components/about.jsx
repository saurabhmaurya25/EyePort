import React from 'react';
import Footer from './footer';

const About = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">About Our Furniture Store</h1>
            <p className="text-lg leading-relaxed mb-8 text-gray-700">
              Welcome to our online furniture store, where we believe in transforming houses into homes. Our passion for providing quality furniture has driven us to curate a collection that not only reflects style and comfort but also embraces individuality and personal taste.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-purple-100 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Our Mission</h2>
                <p className="text-base leading-relaxed text-gray-700">
                  At <span className="font-semibold">Home Heaven</span>, our mission is to offer a seamless shopping experience by providing a diverse range of furniture that caters to various tastes and preferences. We aim to help you create a space that truly feels like yours, where every piece of furniture tells a unique story.
                </p>
              </div>

              <div className="bg-blue-100 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Quality Assurance</h2>
                <p className="text-base leading-relaxed text-gray-700">
                  We take pride in the quality of our furniture. Each piece is crafted with precision and care, ensuring durability and longevity. We source our materials from reputable suppliers and work with skilled artisans to bring you furniture that stands the test of time.
                </p>
              </div>

              <div className="bg-green-100 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Customer Satisfaction</h2>
                <p className="text-base leading-relaxed text-gray-700">
                  Your satisfaction is our priority. Our dedicated customer support team is here to assist you at every step of your furniture shopping journey. We value your feedback and strive to continuously improve our services to exceed your expectations.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-yellow-100 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Contact Us</h2>
              <p className="text-base leading-relaxed text-gray-700">
                Have questions or need assistance? Feel free to reach out to us. You can contact our customer support team via email at <span className="font-semibold">saurabhmaurya0025@gmail.com</span> or give us a call at <span className="font-semibold">7266817216</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
