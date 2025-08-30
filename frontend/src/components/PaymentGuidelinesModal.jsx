import React from 'react';

const PaymentGuidelinesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Payment Channels for ePay Sindh</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Payment through ATM */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-600">Payment through ATM:</h3>
            <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
              <p>1. Insert your ATM card in any ATM machine</p>
              <p>2. Select "Bill Payment" or "Utility Payment"</p>
              <p>3. Select "ePay Sindh" from the list</p>
              <p>4. Enter your challan number</p>
              <p>5. Verify the amount and confirm payment</p>
              <p>6. Collect your payment receipt</p>
            </div>
          </div>

          {/* Internet/Mobile Banking */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-600">Internet/Mobile Banking:</h3>
            <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
              <p>1. Log in to your internet banking account</p>
              <p>2. Navigate to "Bill Payment" or "Utility Payment"</p>
              <p>3. Select "ePay Sindh" from the available options</p>
              <p>4. Enter your challan number and amount</p>
              <p>5. Review and confirm the transaction</p>
              <p>6. Save the transaction receipt</p>
            </div>
          </div>

          {/* Pay via 1 Link Member Bank Branches */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-600">Pay via 1 Link Member Bank Branches:</h3>
            <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
              <p>1. Visit any 1 Link member bank branch</p>
              <p>2. Approach the counter and request for ePay Sindh payment</p>
              <p>3. Provide your challan number and payment amount</p>
              <p>4. Pay the amount in cash or through your account</p>
              <p>5. Collect the payment receipt</p>
              <p>6. Keep the receipt for future reference</p>
            </div>
          </div>

          {/* Need Help Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-3 text-green-600">Need Help?</h3>
            <p className="text-sm text-gray-700 mb-4">
              If you need a video tutorial on how to make payments, please visit the following link:
            </p>
            <a
              href="https://www.youtube.com/watch?v=XrfCRyORQ6s"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Watch Video Tutorial
            </a>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGuidelinesModal;
