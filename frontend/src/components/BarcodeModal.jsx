import React from "react";
import { useNavigate } from "react-router-dom";
import Barcode from "react-barcode";
import { QRCodeCanvas } from "qrcode.react";

// Print styles
const printStyles = `
@media print {
  body * {
    visibility: hidden !important;
  }
  .print-section, .print-section * {
    visibility: visible !important;
    display: block !important; /* override Tailwind hidden */
  }
  .print-section {
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    width: 100% !important;
    background: white !important;
    z-index: 9999 !important;
  }
}
`;

const BarcodeModal = ({ isOpen, onClose, barcodeData, onViewReceipt }) => {
  const navigate = useNavigate();
  console.log(
    "BarcodeModal render - isOpen:",
    isOpen,
    "barcodeData:",
    barcodeData
  );

  const handlePrint = () => {
    window.print();
  };

  // If modal closed or no data, don't render
  if (!isOpen || !barcodeData) return null;

  return (
    <>
      <style>{printStyles}</style>

      {/* Print-only section */}
      <div className="print-section hidden">
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">eStamp Challan Barcode</h1>
          <div className="mb-4 border-2 border-gray-300 p-6 rounded-lg inline-block">
            <div className="mb-4 border-2 border-gray-300 p-6 rounded-lg inline-block">
              <QRCodeCanvas
                value={`${window.location.origin}/receipt/${barcodeData}`}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>
          <p className="text-lg font-semibold">Document ID: {barcodeData}</p>
          <p className="text-sm text-gray-600 mt-2">
            Generated on: {new Date().toLocaleString()}
          </p>
        </div>
      </div>

      {/* Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
        <div
          className="bg-white rounded-lg p-8 w-full max-w-md mx-4 barcode-modal-content"
          style={{ zIndex: 10000 }}
        >
          <div className="text-center">
            {/* QR Code */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Generated Barcode</h3>
              <div className="bg-white p-4 border border-gray-200 rounded-md overflow-hidden">
                <div className="flex justify-center">
                  <QRCodeCanvas
                    value={`${window.location.origin}/receipt/${barcodeData}`}
                    size={200}
                    level="H"
                    includeMargin={true}
                    version={200} // Increase version for more alignment dots
                  />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">
                Scan this barcode or click the buttons below to view your
                receipt or print the barcode.
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => navigate(`/receipt/${barcodeData}`)}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  View Receipt
                </button>
                <button
                  onClick={handlePrint}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
                >
                  Print Barcode
                </button>
              </div>
            </div>

            {/* Close button */}
            <div className="border-t pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BarcodeModal;
