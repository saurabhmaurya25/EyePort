import React, {useState } from 'react'
import Footer from './footer';

const faq = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionClick = (index) => {
    setSelectedQuestion((prevSelected) => (prevSelected === index ? null : index));
  };
  
  
  return (
    <>
          {/* <div className="border-r" style={{ borderTop: "1px solid black", borderRight: "1px solid black", borderLeft: "1px solid black"}}>
          <ul className="flex-col">
            <li className="border-b border-black p-2 bg-red-300 hover:bg-red-400">
              <Link href="#basics">Sale FAQ's</Link>
            </li>
            <li className="border-b border-black p-2 bg-yellow-200 hover:bg-yellow-300">
              <Link href="#mobile">Payments</Link>
            </li>
            <li className="border-b border-black p-2 bg-blue-300 hover:bg-blue-400">
              <Link href="#account">Gift Cards</Link>
            </li>
            <li className="border-b border-black p-2 bg-green-300 hover:bg-green-400">
              <Link href="#payments">Warranty And Post Delivery</Link>
            </li>
            <li className="border-b border-black p-2 bg-purple-300 hover:bg-purple-400">
              <Link href="#privacy">Orders</Link>
            </li>
          </ul>
      </div> */}
      <div class = "bg-gray-200">
        <div className = "px-64 font italic py-4 text-2xl text-gray-600 font-bold">
          SALE
        </div>
        <div className = "px-64">
          <div className="p-4 bg-white shadow transition duration-300 ease-in-out transform hover:shadow-lg">
            <button
              className={`question-button ${selectedQuestion === 1 ? 'active' : ''} `}
                onClick={() => handleQuestionClick(1)}
              >
            <span class = "font-bold text-2xl text-blue-400 hover:text-blue-600 transition duration-300 ease-in-out">Will there be After sales for these products?</span>
            </button>
            {selectedQuestion === 1 && (
              <p class = "py-4 text-lg font italic text-green-500 transition duration-300 ease-in-out">
                Yes, the same rules apply :) We will provide for a year’s warranty on the products (except for sofas and mattresses and no after sales for decor) and lifetime warranty against borers. Don’t worry!
              </p>
            )}
          </div>
        </div>

        <div className = "px-64 py-2">
          <div className="p-4 bg-white shadow transition duration-300 ease-in-out transform hover:shadow-lg">
            <button
              className={`question-button ${selectedQuestion === 2 ? 'active' : ''} `}
                onClick={() => handleQuestionClick(2)}
              >
            <span class = "font-bold text-2xl text-blue-400 hover:text-blue-600 transition duration-300 ease-in-out">Do these prices include delivery also?</span>
            </button>
            {selectedQuestion === 2 && (
              <p class = "py-4 text-lg font italic text-green-500 transition duration-300 ease-in-out">
                Our delivery and installation services come free for serviceable pincodes ONLY! No additional charges for those. We will install it too, for you.
              </p>
            )}
          </div>
        </div>

        <div className = "px-64">
          <div className="p-4 bg-white shadow transition duration-300 ease-in-out transform hover:shadow-lg">
            <button
              className={`question-button ${selectedQuestion === 3 ? 'active' : ''} `}
                onClick={() => handleQuestionClick(3)}
              >
            <span class = "font-bold text-2xl text-blue-400 hover:text-blue-600 transition duration-300 ease-in-out">What is the breakup of the tax in this pricing?</span>
            </button>
            {selectedQuestion === 3 && (
              <p class = "py-4 text-lg font italic text-green-500 transition duration-300 ease-in-out">
                You should see the break up when you get the invoice. Hope that’s okay.
              </p>
            )}
          </div>
        </div>

        <div className = "px-64 py-2">
          <div className="p-4 bg-white shadow transition duration-300 ease-in-out transform hover:shadow-lg">
            <button
              className={`question-button ${selectedQuestion === 4 ? 'active' : ''} `}
                onClick={() => handleQuestionClick(4)}
              >
            <span class = "font-bold text-2xl text-blue-400 hover:text-blue-600 transition duration-300 ease-in-out">Are you selling Seconds or liquidating all the products?</span>
            </button>
            {selectedQuestion === 4 && (
              <p class = "py-4 text-lg font italic text-green-500 transition duration-300 ease-in-out">
                Not at all! These are brand new products. Every year, we hold multiple discount sales for our customers and this is part of that. None of the products you will receive are part of the Seconds list. Don’t worry!
              </p>
            )}
          </div>
        </div>

        <div className = "px-64 py-4 text-2xl text-gray-600 font italic font-bold">
          PAYMENTS
        </div>
        <div className = "px-64">
          <div className="p-4 bg-white shadow transition duration-300 ease-in-out transform hover:shadow-lg">
            <button
              className={`question-button ${selectedQuestion === 5 ? 'active' : ''} `}
                onClick={() => handleQuestionClick(5)}
              >
            <span class = "font-bold text-2xl text-yellow-300 hover:text-yellow-500 transition duration-300 ease-in-out">What should I do if a transaction fails?</span>
            </button>
            {selectedQuestion === 5 && (
              <p class = "py-4 text-lg font italic text-green-500 transition duration-300 ease-in-out">
                Transactions could fail due to multiple reasons. Please check for the following:
              1.	Information passed on to payment gateway is accurate i.e.: account details, billing address, password (for net banking)
              2.	Your Internet connection is not disrupted in the process
              If your account has been debited after a payment failure, it will be rolled back within 7 working days.
              </p>
            )}
          </div>
        </div>

        <div className = "px-64 py-2">
          <div className="p-4 bg-white shadow transition duration-300 ease-in-out transform hover:shadow-lg">
            <button
              className={`question-button ${selectedQuestion === 6 ? 'active' : ''} `}
                onClick={() => handleQuestionClick(6)}
              >
            <span class = "font-bold text-2xl text-yellow-300 hover:text-yellow-500 transition duration-300 ease-in-out">What other things should I keep in mind during an online transaction?</span>
            </button>
            {selectedQuestion === 6 && (
              <p class = "py-4 text-lg font italic text-green-500 transition duration-300 ease-in-out">
                During the payment process using netbanking you may be redirected to your bank website. Once your transaction is completed you will be brought back to the Urban Ladder website with your order details which you can keep a copy of.
              Never press the browser back button when the transaction is still currently being done.
              </p>
            )}
          </div>
        </div>

        <div className = "px-64">
          <div className="p-4 bg-white shadow transition duration-300 ease-in-out transform hover:shadow-lg">
            <button
              className={`question-button ${selectedQuestion === 7 ? 'active' : ''} `}
                onClick={() => handleQuestionClick(7)}
              >
            <span class = "font-bold text-2xl text-yellow-300 hover:text-yellow-500 transition duration-300 ease-in-out">Is it safe to use my credit card, debit card or net banking?</span>
            </button>
            {selectedQuestion === 7 && (
              <p class = "py-4 text-lg font italic text-green-500 transition duration-300 ease-in-out">
                Absolutely. Shopping with EN’ DECORE is completely safe. Transactions with Urban Ladder are via the payment gateway PayU, which is both VeriSign Secured® as well as PCI compliant.
              The VeriSign Secured® Seal is the most trusted security mark on the Internet. PCI stands for Payment Card Industry and PayU is compliant with the global information security standards defined for organizations which handle cardholder information. Be assured that your card or account information is encrypted as it travels over the Internet making it well and truly safe.
              </p>
            )}
          </div>
        </div>

        <div className = "px-64 py-2">
          <div className="p-4 bg-white shadow transition duration-300 ease-in-out transform hover:shadow-lg">
            <button
              className={`question-button ${selectedQuestion === 8 ? 'active' : ''} `}
                onClick={() => handleQuestionClick(8)}
              >
            <span class = "font-bold text-2xl text-yellow-300 hover:text-yellow-500 transition duration-300 ease-in-out">Do you offer Payment on Delivery options (Cash / Card)?</span>
            </button>
            {selectedQuestion === 8 && (
              <p class = "py-4 text-lg font italic text-green-500 transition duration-300 ease-in-out">
                No, at this point in time, we do not offer cash on delivery/card on delivery as payment options.
              </p>
            )}
          </div>
        </div>

        <div className = "px-64 py-4 font italic text-2xl text-gray-600 font-bold">
          GIFT CARDS
        </div>
        <div className = "px-64">
          <div className="p-4 bg-white shadow transition duration-300 ease-in-out transform hover:shadow-lg">
            <button
              className={`question-button ${selectedQuestion === 9 ? 'active' : ''} `}
                onClick={() => handleQuestionClick(9)}
              >
            <span class = "font-bold text-2xl text-red-400 hover:text-red-600 transition duration-300 ease-in-out">When do e-gift cards get delivered?</span>
            </button>
            {selectedQuestion === 9 && (
              <p class = "py-4 text-lg font italic text-green-500 transition duration-300 ease-in-out">
                When you order an e-gift card, you can select any date within the next three months for delivery. If you’d like the e-gift card to be sent out the same day, it will be delivered within the hour.
              </p>
            )}
          </div>
        </div>

        <div className = "px-64 py-2">
          <div className="p-4 bg-white shadow transition duration-300 ease-in-out transform hover:shadow-lg">
            <button
              className={`question-button ${selectedQuestion === 10 ? 'active' : ''} `}
                onClick={() => handleQuestionClick(10)}
              >
            <span class = "font-bold text-2xl text-red-400 hover:text-red-600 transition duration-300 ease-in-out">Can I return items purchased using a gift card?</span>
            </button>
            {selectedQuestion === 10 && (
              <p class = "py-4 text-lg font italic text-green-500 transition duration-300 ease-in-out">
                Yes, you can. If you return an item, the gift card amount will be credited back to your card.
              </p>
            )}
          </div>
        </div>

        <div className = "px-64">
          <div className="p-4 bg-white shadow transition duration-300 ease-in-out transform hover:shadow-lg">
            <button
              className={`question-button ${selectedQuestion === 11 ? 'active' : ''} `}
                onClick={() => handleQuestionClick(11)}
              >
            <span class = "font-bold text-2xl text-red-400 hover:text-red-600 transition duration-300 ease-in-out">What if I don’t use up my whole gift card amount in one purchase?</span>
            </button>
            {selectedQuestion === 11 && (
              <p class = "py-4 text-lg font italic text-green-500 transition duration-300 ease-in-out">
                The unused balance amount can be used towards any EN’ DECORE purchase in the future.
              </p>
            )}
          </div>
        </div>

        <div className = "px-64 py-2">
          <div className="p-4 bg-white shadow transition duration-300 ease-in-out transform hover:shadow-lg">
            <button
              className={`question-button ${selectedQuestion === 12 ? 'active' : ''} `}
                onClick={() => handleQuestionClick(12)}
              >
            <span class = "font-bold text-2xl text-red-400 hover:text-red-600 transition duration-300 ease-in-out">Do you offer bulk or corporate orders?</span>
            </button>
            {selectedQuestion === 12 && (
              <p class = "py-4 text-lg font italic text-green-500 transition duration-300 ease-in-out">
                We sure do. If you’d like to purchase EN’ DECORE gift cards in quantities greater than 10, send an email to endecore123@rediffmail.com, and we’ll get you set up.
              </p>
            )}
          </div>
        </div>

        <div className = "px-64 py-4 text-2xl text-gray-600 font italic font-bold">
          WARRANTY AND POST DELIVERY SERVICES
        </div>
        <div className = "px-64">
          <div className="p-4 bg-white shadow transition duration-300 ease-in-out transform hover:shadow-lg">
            <button
              className={`question-button ${selectedQuestion === 13 ? 'active' : ''} `}
                onClick={() => handleQuestionClick(13)}
              >
            <span class = "font-bold text-2xl text-purple-400 hover:text-purple-600 transition duration-300 ease-in-out">What warranty does EN’ DECORE have for its products?</span>
            </button>
            {selectedQuestion === 13 && (
              <p class = "py-4 text-lg font italic text-green-500 transition duration-300 ease-in-out">
                The warranty we offer differs from product to product, based on the materials used. Please refer the Warranty tab on individual product pages for warranty details.
              </p>
            )}
          </div>
        </div>

        <div className = "px-64 py-2">
          <div className="p-4 bg-white shadow transition duration-300 ease-in-out transform hover:shadow-lg">
            <button
              className={`question-button ${selectedQuestion === 14 ? 'active' : ''} `}
                onClick={() => handleQuestionClick(14)}
              >
            <span class = "font-bold text-2xl text-purple-400 hover:text-purple-600 transition duration-300 ease-in-out">What can I do if my product is damaged?</span>
            </button>
            {selectedQuestion === 14 && (
              <p class = "py-4 text-lg font italic text-green-500 transition duration-300 ease-in-out">
                First off, apologies if that happens.
              If you notice that you are facing issues with your furniture, please feel free to write to us at endecore123@gmail.com.
              We will file a complaint on your behalf and have our After Sales team call you.
              In case your product(s) has crossed our warranty period, we can’t promise that we will replace or repair for you. However, do reach out to us and we’ll surely try to help as best as we can.
              </p>
            )}
          </div>
        </div>


        <div className = "px-64 py-4 text-2xl font italic text-gray-600 font-bold">
          MY ORDER QUERIES
        </div>
        <div className = "px-64">
          <div className="p-4 bg-white shadow transition duration-300 ease-in-out transform hover:shadow-lg">
            <button
              className={`question-button ${selectedQuestion === 15 ? 'active' : ''} `}
                onClick={() => handleQuestionClick(15)}
              >
            <span class = "font-bold text-2xl text-yellow-400 hover:text-yellow-600 transition duration-300 ease-in-out">What is the estimated delivery time?</span>
            </button>
            {selectedQuestion === 15 && (
              <p class = "py-4 text-lg font italic text-green-500 transition duration-300 ease-in-out">
                To know the tentative delivery date for your city, please enter your pincode in the Estimated Delivery Date For box available on the product page.
              Once an order is placed, we send out the estimated delivery timelines in the order confirmation email. You can subsequently track you order here.
              </p>
            )}
          </div>
        </div>

        <div className = "px-64 py-2">
          <div className="p-4 bg-white shadow transition duration-300 ease-in-out transform hover:shadow-lg">
            <button
              className={`question-button ${selectedQuestion === 16 ? 'active' : ''} `}
                onClick={() => handleQuestionClick(16)}
              >
            <span class = "font-bold text-2xl text-yellow-400 hover:text-yellow-600 transition duration-300 ease-in-out">How do I track my order status?</span>
            </button>
            {selectedQuestion === 16 && (
              <p class = "py-4 text-lg font italic text-green-500 transition duration-300 ease-in-out">
                Just use the Track Order link on the top right of the website! You will need to provide your
              1.	Order Number
              2.	the Phone Number you used to place the order.
              You can see the following details for each order:
              3.	the order number
              4.	the tentative delivery date and current tracking status of each product belonging to this order.
              Here’s a quick explanation of what each of the tracking statuses mean:
              5.	Placed - This means that the order has been placed and confirmed (for pay on delivery orders)
              6.	Quality Check - This means that the product(s) are through our Quality Check process, and will be dispatched soon.
              7.	Dispatched - This means that the product(s) have been dispatched from our fulfillment center and are en-route to a delivery center in your city.
              8.	At Delivery Center - This means that the product(s) have reached the delivery center in your city. Post this, you will get a call from our delivery team to schedule the delivery and installation.
              9.	Outbound - This means that the product(s) are out for delivery and are making their way to your home!
              </p>
            )}
          </div>
        </div>

        <div className = "px-64">
          <div className="p-4 bg-white shadow transition duration-300 ease-in-out transform hover:shadow-lg">
            <button
              className={`question-button ${selectedQuestion === 17 ? 'active' : ''} `}
                onClick={() => handleQuestionClick(17)}
              >
            <span class = "font-bold text-2xl text-yellow-400 hover:text-yellow-600 transition duration-300 ease-in-out">I want my product early, can you help?</span>
            </button>
            {selectedQuestion === 17 && (
              <p class = "py-4 text-lg font italic text-green-500 transition duration-300 ease-in-out">
                We usually do deliver products much earlier than the date shown on the site.
              However, if you have a specific request, we encourage you to reach out to us via email.
              </p>
            )}
          </div>
        </div>

        <div className = "px-64 py-2">
          <div className="p-4 bg-white shadow transition duration-300 ease-in-out transform hover:shadow-lg">
            <button
              className={`question-button ${selectedQuestion === 18 ? 'active' : ''} `}
                onClick={() => handleQuestionClick(18)}
              >
            <span class = "font-bold text-2xl text-yellow-400 hover:text-yellow-600 transition duration-300 ease-in-out">What does the current tracking ‘status’ of my order mean?</span>
            </button>
            {selectedQuestion === 18 && (
              <p class = "py-4 text-lg font italic text-green-500 transition duration-300 ease-in-out">
                Here’s a quick explanation of what each of the statuses mean:
              1.	Placed - This means that the order has been placed and confirmed (for pay on delivery orders)
              2.	Quality Check - This means that the product(s) are through our Quality Check process, and will be dispatched soon.
              3.	Dispatched - This means that the product(s) have been dispatched from our fulfillment center and are en-route to a delivery center in your city.
              4.	At Delivery Center - This means that the product(s) have reached the delivery center in your city. Post this, you will get a call from our delivery team to schedule the delivery and installation.
              5.	Outbound - This means that the product(s) are out for delivery and are making their way to your home!
              </p>
            )}
          </div>
        </div>

        <div className = "px-64">
          <div className="p-4 bg-white shadow transition duration-300 ease-in-out transform hover:shadow-lg">
            <button
              className={`question-button ${selectedQuestion === 19 ? 'active' : ''} `}
                onClick={() => handleQuestionClick(19)}
              >
            <span class = "font-bold text-2xl text-yellow-400 hover:text-yellow-600 transition duration-300 ease-in-out">Why is my delivery date so far away?</span>
            </button>
            {selectedQuestion === 19 && (
              <p class = "py-4 text-lg font italic text-green-500 transition duration-300 ease-in-out">
                1.	Some products may still be in the manufacturing stage, due to which delivery dates are beyond the usual 15 days.
              2.	Some products like sofas that are made to order take time to be delivered.
              Usually, we don’t take as many days as specified on the site and deliver much before the promised timeline!
              However, if you have a specific date in mind, do reach out to our Customer Service Team and they will be more than happy to see if they can get your order expedited.
              </p>
            )}
          </div>
        </div>
        <div class = "py-3">
          <Footer/>
        </div>
      </div>
    </>   
  )
}

export default faq;
