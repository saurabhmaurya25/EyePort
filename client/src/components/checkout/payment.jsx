import React, {useEffect, useState } from "react";
import { useSelector } from "react-redux";
import images from "../../images";

const Payment = ({ onNext }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [upiId, setUpiId] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    month: "",
    year: "",
    cvv: "",
    fullName: "",
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("paymentData"));
    console.log("data is: ",savedData);
    if (savedData) {
      setSelectedMethod(savedData.method);
      console.log("savedData.method is: ",savedData.method," and selectedMethod is: ",selectedMethod);
      if (savedData.method === "UPI ID") {
        setUpiId(savedData.data);
      } else if (savedData.method === "Card") {
        setCardDetails(savedData.data);
      }
    }
  }, []);

  useEffect(() => {
    console.log("selectedMethod is: ", selectedMethod);
  }, [selectedMethod]);


  const validatePaymentData = () => {
    if (selectedMethod === "UPI ID") {
      return upiId.trim() !== "";
    } else if (selectedMethod === "Card") {
      return (
        cardDetails.cardNumber.trim() !== "" &&
        cardDetails.month.trim() !== "" &&
        cardDetails.year.trim() !== "" &&
        cardDetails.cvv.trim() !== "" &&
        cardDetails.fullName.trim() !== ""
      );
    } else {
      return true; // No fields required for COD
    }
  };

  const handlePaymentSubmit = () => {
    if (!validatePaymentData()) {
      alert("Please fill in all the required fields.");
      return;
    }
    const paymentData = {
      method: selectedMethod,
      data: selectedMethod === "UPI ID" ? upiId : selectedMethod === "Card" ? cardDetails : null,
    };
    localStorage.setItem("paymentData", JSON.stringify(paymentData));
    // Send the selected payment method and its related data to the parent
    onNext(paymentData);
  };

  const cartItems = useSelector((state) => state.cart.items); // Assuming cart is in Redux
    const totalItemPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalDiscount = cartItems.reduce((acc, item) => acc + (item.price - item.discountPrice) * item.quantity, 0);
    const totalPayable = cartItems.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);

  return (
    <div className="container mx-auto flex flex-wrap md:flex-nowrap">
      {/* Left Section */}
      <div className="w-full sm:w-2/3 p-3 mb-3 bg-gray-50 rounded">
        {/* UPI ID and QR Code Section */}
        <div className="p-2 bg-white rounded mb-6 shadow">
          <h3 className="text-lg md:text-xl text-blue-900 font-semibold mb-4">UPI</h3>

          {/* Add new UPI ID Section */}
          <div
  className={`p-4 rounded mb-4 cursor-pointer transition-all duration-300 ${
    selectedMethod === "UPI ID"
      ? "border border-gray-500"
      : "border border-gray-500"
  }`}
  onClick={() =>
    setSelectedMethod("UPI ID")
  }
>
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center">
      <img src={images.upi} alt="UPI" className="w-8 h-8 mr-2" />
      <span className="text-gray-700 font-medium text-sm md:text-base">Add new UPI ID</span>
    </div>
    <button
      type="button"
      className="text-xl md:text-2xl font-bold text-gray-600 focus:outline-none"
    >
      {selectedMethod === "UPI ID" ? "-" : "+"}
    </button>
  </div>
  {selectedMethod === "UPI ID" && (
    <div className="overflow-hidden transition-all duration-300 ease-in-out">
      <div className="mb-4">
        <label
          htmlFor="upiId"
          className="ml-4 block text-xs md:text-sm font-semibold text-gray-600 mb-1"
        >
          Your UPI ID
        </label>
        <input
          id="upiId"
          type="text"
          placeholder="e.g., yourname@bank"
          value={upiId}
          required
          onChange={(e) => setUpiId(e.target.value)}
          className="md:w-1/2 ml-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {["@sbi", "@icicibank", "@okhdfcbank", "@okaxis", "@ybl"].map(
          (suffix) => (
            <button
              key={suffix}
              type="button"
              onClick={() =>
                setUpiId((prev) =>
                  prev ? `${prev.split("@")[0]}${suffix}` : `yourname${suffix}`
                )
              }
              className="px-3 py-1 border rounded-full text-xs md:text-sm bg-gray-100 hover:bg-gray-200"
            >
              {suffix}
            </button>
          )
        )}
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="saveUpi"
          checked={isSaved}
          onChange={(e) => setIsSaved(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="saveUpi" className="text-xs md:text-sm text-gray-600">
          Save this UPI ID for faster checkout
        </label>
      </div>
    </div>
  )}
</div>


          {/* UPI QR Code Section */}
          <div
  className={`p-4 rounded cursor-pointer flex justify-between items-center ${
    selectedMethod === "QR Code"
      ? "bg-purple-100 border border-gray-500"
      : "border border-gray-500"
  }`}
  onClick={() => setSelectedMethod("QR Code")}
>
  <div className="flex items-center">
    <img
      src={images.qr}
      alt="UPI QR Code"
      className="w-8 h-8 mr-2"
    />
    <span className="text-gray-700 text-sm md:text-base font-medium">UPI QR Code</span>
  </div>
  <input
    type="radio"
    name="paymentMethod"
    value="QR Code"
    checked={selectedMethod === "QR Code"}
    onChange={() => setSelectedMethod("QR Code")}
    className="form-radio text-green-500"
  />
</div>

        </div>

        {/* Credit Card and COD Section */}
        <div className="mb-4 bg-white">
          {/* Credit Card Section */}
          <div
            className={`p-4 border mb-4 rounded cursor-pointer ${
              selectedMethod === "Card"
                ? " border-gray-500"
                : "border-gray-500"
            }`}
            onClick={() => setSelectedMethod("Card")}
          >
            <div className="flex justify-between items-center">
  {/* Left Section: Image and Text */}
  <div className="flex items-center">
    <img src={images.card} alt="Card" className="w-8 h-8 mr-2" />
    <h3 className="font-semibold text-sm md:text-base">Add debit/credit/ATM card</h3>
  </div>

  {/* Right Section: Toggle Button */}
  <button
    type="button"
    className="text-2xl font-bold text-gray-600 focus:outline-none"
  >
    {selectedMethod === "Card" ? "-" : "+"}
  </button>
</div>

            {selectedMethod === "Card" && (
              <div className="mt-4">
              <label className="block mb-2">Card Number</label>
              <input
              type="text"
              placeholder="XXXX XXXX XXXX XXXX"
              value={cardDetails.cardNumber
                .replace(/\s/g, "") // Remove existing spaces
                .replace(/(\d{4})/g, "$1 ") // Add space after every 4 digits
                .trim()} // Remove trailing space
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\s/g, ""); // Remove spaces
                setCardDetails({
                  ...cardDetails,
                  cardNumber: rawValue, // Store digits without spaces
                });
              }}
              className="w-full p-2 border rounded mb-4"
              required
            />
            
              <div className="flex gap-4 mb-4">
                <div>
                  <label className="block mb-2">Month (MM)</label>
                  <input
                    type="text"
                    placeholder="MM"
                    value={cardDetails.month}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // Allow only digits
                      if (value <= 12 && value.length <= 2) {
                        setCardDetails({ ...cardDetails, month: value });
                      }
                    }}
                    className="w-full p-2 border rounded"
                    required
                  />
                  {cardDetails.month && (cardDetails.month < 1 || cardDetails.month > 12) && (
                    <p className="text-red-500 text-sm">Invalid month (01-12).</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2">Year (YY)</label>
                  <input
                    type="text"
                    placeholder="YY"
                    value={cardDetails.year}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // Allow only digits
                      if (value.length <= 2) {
                        setCardDetails({ ...cardDetails, year: value });
                      }
                    }}
                    className="w-full p-2 border rounded"
                    required
                  />
                  {cardDetails.year && cardDetails.year < new Date().getFullYear() % 100 && (
                    <p className="text-red-500 text-sm">Year must not be expired.</p>
                  )}
                </div>
              </div>
            
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // Allow only digits
                      if (value.length <= 4) {
                        setCardDetails({ ...cardDetails, cvv: value });
                      }
                    }}
                    className={`w-full p-2 border rounded `}
                    required
                  />
                  {cardDetails.cvv && (cardDetails.cvv.length < 3 || cardDetails.cvv.length > 4) && (
                    <p className="text-red-500 text-sm">CVV must be 3 or 4 digits.</p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Name on Card"
                    value={cardDetails.fullName}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        fullName: e.target.value,
                      })
                    }
                    className={`w-full p-2 border rounded `}
                    required
                  />
                  {!cardDetails.fullName.trim() && (
                    <p className="text-red-500 text-sm">Name cannot be empty.</p>
                  )}
                </div>
              </div>
            </div>
            
            )}
          </div>
        </div>

        <div className = " bg-white rounded">
          {/* Cash on Delivery Option */}
          <div
  className={`p-4 border mb-4 rounded cursor-pointer ${
    selectedMethod === "COD"
      ? "bg-blue-50 border-blue-500"
      : "border-gray-300"
  }`}
  onClick={() => setSelectedMethod("COD")}
>
  {/* Main Row: Image, Text, and Radio Button */}
  <div className="flex justify-between items-center">
    <div className="flex items-center">
      <img src={images.cod} alt="COD" className="w-6 h-6 mr-2" />
      <h3 className="font-semibold text-sm md:text-base">Cash on Delivery (COD)</h3>
    </div>
    <input
      type="radio"
      name="paymentMethod"
      value="COD"
      checked={selectedMethod === "COD"}
      onChange={() => setSelectedMethod("COD")}
      className="form-radio text-blue-500"
    />
  </div>

  {/* Conditional Content */}
  {selectedMethod === "COD" && (
    <div className="px-8">
      <p className="text-gray-600">
        You can pay cash when your order is delivered. No extra charges.
      </p>
    </div>
  )}
</div>

        </div>
      </div>

      {/* Right Section - Bill Details */}
      <div className="w-full sm:w-1/3 sm:ml-6 p-4 bg-white rounded h-auto">
        <h3 className="text-base md:text-xl font-bold text-gray-800 mb-4">
          Bill Details ({cartItems.length} items)
        </h3>
        <div className="flex justify-between mb-3">
          <span className="text-sm md:text-base text-gray-600">
            Total item price:
          </span>
          <span className="text-sm md:text-base text-gray-800">
            ₹{totalItemPrice}
          </span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-sm md:text-base text-gray-600">
            Total discount:
          </span>
          <span className="text-sm md:text-base text-green-400">
            - ₹{totalDiscount}
          </span>
        </div>
        <div className="flex justify-between mt-4 border-t pt-4">
          <span className="md:text-xl font-bold text-gray-800">
            Total Payable
          </span>
          <span className="md:text-xl font-bold text-black-600">
            ₹{totalPayable}
          </span>
        </div>
        <button
        onClick={handlePaymentSubmit}
        className={`text-sm md:text-base mt-6 block w-full text-white text-center py-2 md:py-3 rounded-full font-bold transition transform transition-transform hover:scale-105 ${
          selectedMethod === null ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={selectedMethod === null}
      >
        {selectedMethod === "COD" && "Review and Place Order"}
        {selectedMethod === "UPI ID" || selectedMethod === "Card" ? "Verify And Pay now" : ""}
        {selectedMethod === "QR Code" && "Review and Pay now"}
        {selectedMethod === null && "Please select a payment method"}
      </button>


      </div>
    </div>
  );
};

export default Payment;
