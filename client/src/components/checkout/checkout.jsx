import React, { useState } from 'react';
import ShippingAddress from './shippingAddress';
import Payment from './payment';
import Summary from './summary';

const Dashboard = () => {
  const [currentStep, setCurrentStep] = useState('ShippingAddress');
const [completedSteps, setCompletedSteps] = useState({
  ShippingAddress: false,
  Payment: false,
});
const [address, setAddress] = useState([]);
const [paymentData, setPaymentData] = useState(null);
const [validSteps, setValidSteps] = useState(['ShippingAddress']); // Tracks valid steps

const handleNextStep = (step, data) => {
  if (step === 'ShippingAddress') {
    setAddress(data);
    setCompletedSteps({ ...completedSteps, ShippingAddress: true });
    setValidSteps(['ShippingAddress', 'Payment']); // Make 'Payment' valid now
    setCurrentStep('Payment');
  }
  if (step === 'Payment') {
    setPaymentData(data);
    setCompletedSteps({ ...completedSteps, Payment: true });
    setValidSteps(['ShippingAddress', 'Payment', 'Summary']); // Make 'Summary' valid now
    setCurrentStep('Summary');
  }
};

const handleGoBack = (step) => {
  if (validSteps.includes(step)) {
    setCurrentStep(step);
  }
};

const isClickable = (step) => {
  return validSteps.includes(step);
};


  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-gray-900 text-white py-3">
        <div className="container mx-auto flex justify-center items-center">
          <div className="text-xl md:text-3xl items-center font-semibold">Secure Checkout </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="container mx-auto p-2">
        <div className="breadcrumbs mb-6">
          <span
            className={`cursor-pointer ${currentStep === 'ShippingAddress' ? 'font-bold' : ''}`}
            onClick={() => isClickable('ShippingAddress') && handleGoBack('ShippingAddress')}
          >
            Shipping Address
          </span>
          {' > '}
          <span
            className={`cursor-pointer ${currentStep === 'Payment' ? 'font-bold' : ''} ${
              !completedSteps.ShippingAddress ? 'text-gray-400 cursor-not-allowed' : ''
            }`}
            onClick={() => isClickable('Payment') && handleGoBack('Payment')}
          >
            Payment
          </span>
          {' > '}
          <span
            className={`cursor-pointer ${currentStep === 'Summary' ? 'font-bold' : ''} ${
              !completedSteps.Payment ? 'text-gray-400 cursor-not-allowed' : ''
            }`}
            onClick={() => isClickable('Summary') && handleGoBack('Summary')}
          >
            Summary
          </span>
        </div>

        {/* Steps */}
        {currentStep === 'ShippingAddress' && (
          <ShippingAddress onNext={(data) => handleNextStep('ShippingAddress', data)} />
        )}
        {currentStep === 'Payment' && (
          <Payment onNext={(data) => handleNextStep('Payment', data)} onBack={() => handleGoBack('ShippingAddress')} />
        )}
        {currentStep === 'Summary' && (
          <Summary address={address} paymentData={paymentData} onBack={() => handleGoBack('Payment')} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
