import React from 'react';

const ReviewModal = ({ isOpen, onClose, onSave, formData, parties, partyLabels }) => {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const numberToWords = (num) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

    if (num === 0) return 'Zero';
    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + ones[num % 10] : '');
    if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' and ' + numberToWords(num % 100) : '');
    if (num < 100000) return numberToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 !== 0 ? ' ' + numberToWords(num % 1000) : '');
    if (num < 10000000) return numberToWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 !== 0 ? ' ' + numberToWords(num % 100000) : '');
    return numberToWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 !== 0 ? ' ' + numberToWords(num % 10000000) : '');
  };

  const amountInWords = formData.considerationAmount ? 
    `${numberToWords(parseInt(formData.considerationAmount))} Rupees Only` : '';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Review & Save Challan</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Challan Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-600 border-b pb-2">Challan Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">District:</span> {formData.district || 'Not specified'}
              </div>
              <div>
                <span className="font-medium">Taluka:</span> {formData.taluka || 'Not specified'}
              </div>
              <div>
                <span className="font-medium">Stamp Paper Type:</span> {formData.stampPaperType || 'Not specified'}
              </div>
              <div>
                <span className="font-medium">Deed Name:</span> {formData.deedName || 'Not specified'}
              </div>
              <div>
                <span className="font-medium">Challan Amount Paid By:</span> {formData.challanAmountPaidBy || 'Not specified'}
              </div>
              <div>
                <span className="font-medium">Online Payment:</span> {formData.onlinePayment === 'yes' ? 'Yes' : formData.onlinePayment === 'no' ? 'No' : 'Not specified'}
              </div>
              {formData.onlinePayment === 'yes' && (
                <div>
                  <span className="font-medium">Selected Bank:</span> {formData.bank || 'Not specified'}
                </div>
              )}
            </div>
          </div>

          {/* Applicant Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-600 border-b pb-2">Applicant Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Applicant Name:</span> {formData.applicantName || 'Not specified'}
              </div>
              <div>
                <span className="font-medium">Applicant CNIC:</span> {formData.applicantCNIC || 'Not specified'}
              </div>
              <div>
                <span className="font-medium">Applicant Contact:</span> {formData.applicantContact || 'Not specified'}
              </div>
              <div>
                <span className="font-medium">Applicant Email:</span> {formData.applicantEmail || 'Not specified'}
              </div>
            </div>
          </div>

          {/* Party Information */}
          {formData.challanAmountPaidBy && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-600 border-b pb-2">Party Information</h3>
              
              {/* First Party */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">{partyLabels.firstParty} Details:</h4>
                {parties.firstParty.length > 0 ? (
                  <div className="space-y-3">
                    {parties.firstParty.map((party, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div><span className="font-medium">Name:</span> {party.name}</div>
                          <div><span className="font-medium">Type:</span> {party.type}</div>
                          <div><span className="font-medium">CNIC:</span> {party.cnic}</div>
                          <div><span className="font-medium">Contact:</span> {party.contact}</div>
                          {party.email && <div><span className="font-medium">Email:</span> {party.email}</div>}
                          {party.relation && <div><span className="font-medium">Relation:</span> {party.relation}</div>}
                          {party.relationName && <div><span className="font-medium">Relation Name:</span> {party.relationName}</div>}
                          {party.address && <div className="md:col-span-2"><span className="font-medium">Address:</span> {party.address}</div>}
                          {party.throughPowerOfAttorney && (
                            <>
                              <div><span className="font-medium">Attorney Provider:</span> {party.attorneyProviderName}</div>
                              <div><span className="font-medium">Attorney CNIC:</span> {party.attorneyProviderCNIC}</div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No {partyLabels.firstParty} added</p>
                )}
              </div>

              {/* Second Party */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">{partyLabels.secondParty} Details:</h4>
                {parties.secondParty.length > 0 ? (
                  <div className="space-y-3">
                    {parties.secondParty.map((party, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div><span className="font-medium">Name:</span> {party.name}</div>
                          <div><span className="font-medium">Type:</span> {party.type}</div>
                          <div><span className="font-medium">CNIC:</span> {party.cnic}</div>
                          <div><span className="font-medium">Contact:</span> {party.contact}</div>
                          {party.email && <div><span className="font-medium">Email:</span> {party.email}</div>}
                          {party.relation && <div><span className="font-medium">Relation:</span> {party.relation}</div>}
                          {party.relationName && <div><span className="font-medium">Relation Name:</span> {party.relationName}</div>}
                          {party.address && <div className="md:col-span-2"><span className="font-medium">Address:</span> {party.address}</div>}
                          {party.throughPowerOfAttorney && (
                            <>
                              <div><span className="font-medium">Attorney Provider:</span> {party.attorneyProviderName}</div>
                              <div><span className="font-medium">Attorney CNIC:</span> {party.attorneyProviderCNIC}</div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No {partyLabels.secondParty} added</p>
                )}
              </div>
            </div>
          )}

          {/* Deed Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-600 border-b pb-2">Deed Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Amount of Consideration:</span> {formData.considerationAmount ? `Rs ${formData.considerationAmount}/-` : 'Not specified'}
              </div>
              <div>
                <span className="font-medium">Motor Vehicle Description:</span> {formData.motorVehicleDescription || 'Not specified'}
              </div>
              {formData.considerationAmount && (
                <div className="md:col-span-2">
                  <span className="font-medium">Amount In Words:</span> {amountInWords}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
            >
              Save to MongoDB
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
