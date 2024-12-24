// NavigationMenu.js
import React, { useState, useRef } from "react";

const NavigationMenu = ({ categories }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [modalTimeout, setModalTimeout] = useState(null);

  const linkRefs = useRef([]);
  const modalRef = useRef(null);

  const handleHover = (e) => {
    const link = e.target.getBoundingClientRect();
    setModalPosition({
      top: link.bottom + window.scrollY + 10,
      left: link.left + window.scrollX,
    });
    setShowModal(true);

    if (modalTimeout) {
      clearTimeout(modalTimeout);
    }

    const timeout = setTimeout(() => {
      setShowModal(false);
    }, 500);

    setModalTimeout(timeout);
  };

  const handleMouseLeave = (e) => {
    if (!modalRef.current?.contains(e.relatedTarget)) {
      setShowModal(false);
    }
  };

  const handleMouseEnterModal = () => {
    if (modalTimeout) {
      clearTimeout(modalTimeout);
    }
  };

  return (
    <div>
      <div className="bg-gray-100 py-3 px-6 flex overflow-x-scroll whitespace-nowrap space-x-2 md:space-x-16 text-sm md:text-base font-semibold text-gray-800 shadow-sm">
        {categories.map((category, index) => (
          <a
            key={index}
            href={`#${category.name.toLowerCase().replace(" ", "-")}`}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
            className="hover:text-blue-600 transition duration-200"
            ref={(el) => (linkRefs.current[index] = el)}
          >
            {category.name.toUpperCase()}
          </a>
        ))}
      </div>

      {showModal && (
        <div
          ref={modalRef}
          className="absolute bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96 md:w-[450px] lg:w-[600px]"
          style={{
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
            zIndex: 50,
          }}
          onMouseEnter={handleMouseEnterModal}
          onMouseLeave={handleMouseLeave}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Men / Women / Kids</h3>
              <ul>
                <li className="mb-2 hover:text-blue-600">Men</li>
                <li className="mb-2 hover:text-blue-600">Women</li>
                <li className="mb-2 hover:text-blue-600">Kids</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Select Category</h3>
              <ul>
                <li className="mb-2 hover:text-blue-600">Eyeglasses</li>
                <li className="mb-2 hover:text-blue-600">Sunglasses</li>
                <li className="mb-2 hover:text-blue-600">Screen Glasses</li>
                <li className="mb-2 hover:text-blue-600">Contact Lenses</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Frame Type</h3>
              <ul>
                <li className="mb-2 hover:text-blue-600">Rectangle Frames</li>
                <li className="mb-2 hover:text-blue-600">Wayfarer Frames</li>
                <li className="mb-2 hover:text-blue-600">Aviator Frames</li>
                <li className="mb-2 hover:text-blue-600">Cat-Eye Frames</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationMenu;
