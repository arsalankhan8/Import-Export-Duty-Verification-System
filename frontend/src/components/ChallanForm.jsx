import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PartyModal from './PartyModal';
import PaymentGuidelinesModal from './PaymentGuidelinesModal';
import ReviewModal from './ReviewModal';
import BarcodeModal from './BarcodeModal';
import apiService from '../services/api';

const ChallanForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    district: '',
    taluka: '',
    stampPaperType: '',
    deedName: '',
    challanAmountPaidBy: '',
    onlinePayment: '',
    bank: '',
    applicantName: '',
    applicantCNIC: '',
    applicantContact: '',
    applicantEmail: '',
    considerationAmount: '',
    motorVehicleDescription: ''
  });

  const [parties, setParties] = useState({
    firstParty: [],
    secondParty: []
  });

  const [showPartyModal, setShowPartyModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [editingParty, setEditingParty] = useState(null);
  const [currentPartyType, setCurrentPartyType] = useState('');
  const [barcodeData, setBarcodeData] = useState('');

  // Data for dropdowns
  const districts = [
    'Badin', 'Dadu', 'Ghotki', 'Hyderabad', 'Jacobabad', 'Jamshoro',
    'Karachi', 'Kashmore', 'Khairpur', 'Larkana', 'Matiari', 'Mirpurkhas',
    'Naushero Feroz', 'Qambar Shahdadkot', 'Sanghar', 'Shaheed Benazirabad',
    'Shikarpur', 'Sujawal', 'Sukkur', 'Tando Allahyar', 'Tando Muhammad Khan',
    'Tharparkar', 'Thatta', 'Umerkot'
  ];

  const talukas = [
    'Daharki', 'Daharki (Non-Barrage)', 'Dharki', 'Ghotki', 'Ghotki (Non-Barrage)',
    'Khangarh', 'Khangarh (Non-Barrage)', 'Mirpur Mathelo', 'Mirpur Mathelo (Non-Barrage)',
    'Ubauro', 'Ubauro (Non-Barrage)', 'Ubuaro'
  ];

  const judicialDeeds = ['Court Fee'];

  const nonJudicialDeeds = [
    'Acknowledgement, Receipts - 1',
    'Agreement or Memorandum of an Agreement - 3(a)(i)',
    'Agreement or Memorandum of an Agreement - 3(a)(ii)',
    'Agreement or Memorandum of an Agreement - 3(a)(iii)',
    'Agreement or Memorandum of an Agreement - 3(b)',
    'Agreement or Memorandum of an Agreement - 3(c)',
    'Air Tickets - 3(A)',
    'Allotment Order or Issuance or Renewal of sanads by the Government 4(A)',
    'Allotment Order or Transfer of Allotment Order - 4(A)(i)(a)',
    'Allotment Order or Transfer of Allotment Order - 4(A)(i)(b)',
    'Allotment Order or Transfer of Allotment Order - 4(A)(ii)',
    'Allotment Order or Transfer of Allotment Order - 4(A)(iii)',
    'Allotment Order or Transfer of Allotment Order - 4(B)(i)',
    'Allotment Order or Transfer of Allotment Order - 4(B)(ii)',
    'Allotment Order or Transfer of Allotment Order - 4(B)(iii)',
    'Allotment Order or Transfer of Allotment Order - 4(B)(iv)',
    'Any bond not otherwise provided for - 10(F)',
    'Bank Guarantee - 6',
    'Bill of Entry or Goods Declaration - 7',
    'Bill of Exchange/Foreign Bill - 8',
    'Bill of Lading - 9',
    'Bond - 10(A)',
    'Bottomry Bond - 10(D)',
    'Certificate of Sale - 11',
    'Certificate or other document (Shares) - 12',
    'Charter Party - 13',
    'Contract - 15(a)',
    'Conveyance - 16(A)(i)',
    'Conveyance - 16(A)(ii)',
    'Counterpart or Duplicate - 17',
    'Custom Bond - 10(B)',
    'Debenture - 10(C)',
    'Exchange of Property - 18',
    'Financing Document - 19(i)',
    'Financing Document - 19(i)(a)',
    'Financing Document - 19(ii)',
    'Financing Document - 19(iii)',
    'Financing Document - 19(iv)',
    'Financing Document - 19(v)',
    'Financing Document - 19(vi)',
    'Financing Document - 19(vii)',
    'Gift Instrument - 20(i)',
    'Gift Instrument - 20(ii)',
    'Lease - 21(i)',
    'Lease (Rent Agreement) - 21(iii)',
    'Lease/Sub-Lease - 21(iv)',
    'Lease/Sub-Lease (Surrendered) - 21(ii)',
    'Letter of Credit - 22(a)',
    'Letter of Credit - 22(b)',
    'Letter of Credit - 22(c)',
    'Letter of Credit - 22(d)',
    'Mortgage Deed or a Deed of Further Charge - 23(a)',
    'Mortgage Deed or a Deed of Further Charge - 23(b)',
    'Mortgage Deed or a Deed of Further Charge - 23(c)',
    'Mortgage Deed or a Deed of Further Charge - 23(d)',
    'Mortgage Deed or any Other Financing Instrument - 23(A)',
    'Partition - 25',
    'Partnership or Dissolution of Partnership - 24(A)',
    'Policy of Fire Insurance - 26(B)',
    'Policy of Insurance (if not otherwise provided for) - 26(D)',
    'Policy of Life/Health Insurance - 26(C)',
    'Policy of Sea Insurance for each voyage - 26(A)(1)',
    'Policy of Sea Insurance for Time - 26(A)(2)',
    'Power of Attorney - 27(a)',
    'Power of Attorney - 27(b)',
    'Power of Attorney - 27(c)',
    'Promissory Note - 28(a)(i)',
    'Promissory Note - 28(a)(ii)',
    'Promissory Note - 28(b)',
    'Purchase Order - 15(b)',
    'Release - 29',
    'Respondentia Bond - 10(E)',
    'Settlement - 30(B)',
    'Settlement (including a deed of dower) - 30(A)(i)',
    'Settlement (including a deed of dower) - 30(A)(ii)',
    'Tranfer of Lease (Assignment Deed) - 16(B)',
    'Transfer - 31(a)',
    'Transfer - 31(b)',
    'Transfer - 31(c)(i)',
    'Trust - 32(i)',
    'Trust - 32(ii)',
    'Trust - 32(iii)',
    'Will'
  ];

  // Mapping for radio options based on deed selection
  const getRadioOptions = (deedName) => {
    const deedIndex = nonJudicialDeeds.indexOf(deedName);
    if (deedName === 'Court Fee') {
      return ['Plaintiff / Appellant / Petitioner', 'Defendant / Respondent'];
    }

    const mappings = {
      0: ['Issuer', 'Receiver'],
      1: ['Seller', 'Purchaser'],
      2: ['Seller', 'Purchaser'],
      3: ['Seller', 'Purchaser'],
      4: ['Seller', 'Purchaser'],
      5: ['Seller', 'Purchaser'],
      6: ['Seller', 'Purchaser'],
      7: ['Seller', 'Purchaser'],
      8: ['Allotment Authority/Transferor', 'Allotee/Transferee'],
      9: ['Allotment Authority/Transferor', 'Allotee/Transferee'],
      10: ['Allotment Authority/Transferor', 'Allotee/Transferee'],
      11: ['Allotment Authority/Transferor', 'Allotee/Transferee'],
      12: ['Allotment Authority/Transferor', 'Allotee/Transferee'],
      13: ['Allotment Authority/Transferor', 'Allotee/Transferee'],
      14: ['Allotment Authority/Transferor', 'Allotee/Transferee'],
      15: ['Allotment Authority/Transferor', 'Allotee/Transferee'],
      16: ['Allotment Authority/Transferor', 'Allotee/Transferee'],
      17: ['Borrower', 'Borrowee'],
      18: ['Borrower', 'Borrowee'],
      19: ['Exporter', 'Importer'],
      20: ['Drawer', 'Drawee'],
      21: ['Shipper', 'Buyer/Consignee'],
      22: ['Indemnifier/Mortgagor', 'Indemnified/Mortgagee'],
      23: ['Master of Ship', 'Borrowee'],
      24: ['Court Auction', 'Purchaser'],
      25: ['Company', 'Share Holder'],
      26: ['Company/Owner', 'Charterer'],
      27: ['Principal', 'Contractor'],
      28: ['Seller/Vendor', 'Purchaser/Vendee'],
      29: ['Seller/Vendor', 'Purchaser/Vendee'],
      30: ['First Party', 'Second Party'],
      31: ['First Party', 'Second Party'],
      32: ['First Party', 'Second Party'],
      33: ['First Party', 'Second Party'],
      34: ['Financial Institution', 'Borrower'],
      35: ['Financial Institution', 'Borrower'],
      36: ['Financial Institution', 'Borrower'],
      37: ['Financial Institution', 'Borrower'],
      38: ['Financial Institution', 'Borrower'],
      39: ['Financial Institution', 'Borrower'],
      40: ['Financial Institution', 'Borrower'],
      41: ['Financial Institution', 'Borrower'],
      42: ['Donor', 'Donee'],
      43: ['Donor', 'Donee'],
      44: ['Lessor', 'Lessee'],
      45: ['Land Owner/Authority', 'Tenant'],
      46: ['Lessor', 'Lessee'],
      47: ['Lessor', 'Lessee'],
      48: ['Bank', 'Beneficiary'],
      49: ['Bank', 'Beneficiary'],
      50: ['Bank', 'Beneficiary'],
      51: ['Bank', 'Beneficiary'],
      52: ['Mortgagor', 'Mortagagee'],
      53: ['Mortgagor', 'Mortagagee'],
      54: ['Mortgagor', 'Mortagagee'],
      55: ['Mortgagor', 'Mortagagee'],
      56: ['First Party', 'Second Party'],
      57: ['First Party', 'Second Party'],
      58: ['Insurance Company', 'Policy Holder'],
      59: ['Insurance Company', 'Policy Holder'],
      60: ['Insurance Company', 'Policy Holder'],
      61: ['Insurance Company', 'Policy Holder'],
      62: ['Insurance Company', 'Policy Holder'],
      63: ['Principal', 'Attorney'],
      64: ['Principal', 'Attorney'],
      65: ['Principal', 'Attorney'],
      66: ['Purchaser', 'Supplier'],
      67: ['Purchaser', 'Supplier'],
      68: ['Purchaser', 'Supplier'],
      69: ['Purchaser', 'Supplier'],
      70: ['Releaser', 'Releasee'],
      71: ['Master of Ship', 'Borrowee'],
      72: ['First Party/Dower', 'Second Party/Dowee'],
      73: ['First Party/Dower', 'Second Party/Dowee'],
      74: ['First Party/Dower', 'Second Party/Dowee'],
      75: ['Assignor, Assignee', 'Consenting Party'],
      76: ['Transferor', 'Transferee'],
      77: ['Transferor', 'Transferee'],
      78: ['Transferor', 'Transferee'],
      79: ['Transferor', 'Trust'],
      80: ['Transferor', 'Trust'],
      81: ['Transferor', 'Trust'],
      82: ['Executor', 'Beneficiary']
    };

    return mappings[deedIndex] || ['First Party', 'Second Party'];
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Reset dependent fields
    if (field === 'district') {
      setFormData(prev => ({ ...prev, taluka: '' }));
    }
    if (field === 'stampPaperType') {
      setFormData(prev => ({ ...prev, deedName: '', challanAmountPaidBy: '' }));
    }
    if (field === 'deedName') {
      setFormData(prev => ({ ...prev, challanAmountPaidBy: '' }));
    }
  };

  const handleAddParty = (partyType) => {
    setCurrentPartyType(partyType);
    setEditingParty(null);
    setShowPartyModal(true);
  };

  const handleEditParty = (partyType, index) => {
    setCurrentPartyType(partyType);
    setEditingParty({ ...parties[partyType][index], index });
    setShowPartyModal(true);
  };

  const handleDeleteParty = (partyType, index) => {
    setParties(prev => ({
      ...prev,
      [partyType]: prev[partyType].filter((_, i) => i !== index)
    }));
  };

  const handlePartySubmit = (partyData) => {
    if (editingParty !== null) {
      // Edit existing party
      setParties(prev => ({
        ...prev,
        [currentPartyType]: prev[currentPartyType].map((party, index) =>
          index === editingParty.index ? partyData : party
        )
      }));
    } else {
      // Add new party
      setParties(prev => ({
        ...prev,
        [currentPartyType]: [...prev[currentPartyType], partyData]
      }));
    }
    setShowPartyModal(false);
  };

  const handleSaveToMongoDB = async () => {
    try {
      console.log('=== SAVE BUTTON CLICKED ===');
      console.log('Current form data:', formData);
      console.log('Current parties:', parties);
      console.log('Starting to save challan...');

      // Clean up the data - remove empty strings and set defaults
      const cleanedFormData = {
        ...formData,
        deedName: formData.deedName || 'Not Specified',
        challanAmountPaidBy: formData.challanAmountPaidBy || 'Not Specified',
        considerationAmount: formData.considerationAmount || '0',
        motorVehicleDescription: formData.motorVehicleDescription || 'Not Specified'
      };

      const challanData = {
        ...cleanedFormData,
        parties
      };

      console.log('Cleaned challan data to save:', challanData);
      console.log('Making API call...');

      // Save to MongoDB using API service
      const result = await apiService.saveChallan(challanData);

      console.log('API response received:', result);
      console.log('Result type:', typeof result);
      console.log('Result keys:', Object.keys(result));

      if (result && result.success) {
        console.log('✅ SUCCESS! Challan saved successfully!');
        console.log('Document ID:', result.data.documentId);
        console.log('Setting barcode data to:', result.data.documentId);
        console.log('Setting showBarcodeModal to true');
        setBarcodeData(result.data.documentId);
        setShowBarcodeModal(true);
        console.log('Barcode modal should now be open');
        alert('Challan saved successfully! Barcode generated.');
      } else {
        console.error('❌ API returned success: false or no result');
        console.error('Result:', result);
        throw new Error(result?.message || 'Failed to save challan');
      }
    } catch (error) {
      console.error('❌ ERROR saving to MongoDB:', error);
      console.error('Error details:', error.message);
      alert(`Error saving the challan: ${error.message}. Please try again.`);
    }
  };

  const getCurrentRadioOptions = () => {
    if (!formData.deedName) return [];
    return getRadioOptions(formData.deedName);
  };

  const getPartyLabels = () => {
    const options = getCurrentRadioOptions();
    return {
      firstParty: options[0] || 'First Party',
      secondParty: options[1] || 'Second Party'
    };
  };

  const partyLabels = getPartyLabels();

  return (

    <div className="min-h-screen bg-gray-50 bg-blue-500 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Challan Details</h1>

        {/* Challan Details Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Challan Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* District */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
              <select
                value={formData.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select District</option>
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>

            {/* Taluka */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Taluka</label>
              <select
                value={formData.taluka}
                onChange={(e) => handleInputChange('taluka', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!formData.district}
              >
                <option value="">Select Taluka</option>
                {talukas.map(taluka => (
                  <option key={taluka} value={taluka}>{taluka}</option>
                ))}
              </select>
            </div>

            {/* Stamp Paper Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stamp paper type</label>
              <select
                value={formData.stampPaperType}
                onChange={(e) => handleInputChange('stampPaperType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select stamp paper type</option>
                <option value="Judicial">Judicial</option>
                <option value="non-judicial">non-judicial</option>
              </select>
            </div>

            {/* Deed Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deed Name</label>
              <select
                value={formData.deedName}
                onChange={(e) => handleInputChange('deedName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!formData.stampPaperType}
              >
                <option value="">Select Deed Name</option>
                {formData.stampPaperType === 'Judicial' && judicialDeeds.map(deed => (
                  <option key={deed} value={deed}>{deed}</option>
                ))}
                {formData.stampPaperType === 'non-judicial' && nonJudicialDeeds.map(deed => (
                  <option key={deed} value={deed}>{deed}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Challan Amount Paid By */}
          {formData.deedName && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Challan Amount Paid By?</label>
              <div className="space-y-2">
                {getCurrentRadioOptions().map((option, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="radio"
                      name="challanAmountPaidBy"
                      value={option}
                      checked={formData.challanAmountPaidBy === option}
                      onChange={(e) => handleInputChange('challanAmountPaidBy', e.target.value)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Online Payment */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Do you want to pay challan online? (e-Pay)?
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="onlinePayment"
                  value="yes"
                  checked={formData.onlinePayment === 'yes'}
                  onChange={(e) => handleInputChange('onlinePayment', e.target.value)}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="onlinePayment"
                  value="no"
                  checked={formData.onlinePayment === 'no'}
                  onChange={(e) => handleInputChange('onlinePayment', e.target.value)}
                  className="mr-2"
                />
                No
              </label>
            </div>

            {formData.onlinePayment === 'yes' && (
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800 mb-4">
                  In this case the challan can only be paid through online and receive the e-Stamp by visiting selected bank.
                </p>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Bank</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="bank"
                        value="National Bank of Pakistan"
                        checked={formData.bank === 'National Bank of Pakistan'}
                        onChange={(e) => handleInputChange('bank', e.target.value)}
                        className="mr-2"
                      />
                      National Bank of Pakistan
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="bank"
                        value="Sindh Bank"
                        checked={formData.bank === 'Sindh Bank'}
                        onChange={(e) => handleInputChange('bank', e.target.value)}
                        className="mr-2"
                      />
                      Sindh Bank
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPaymentModal(true)}
                  className="text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  Guidelines for online payment, click here.
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Applicant Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Applicant Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Applicant Name</label>
              <input
                type="text"
                value={formData.applicantName}
                onChange={(e) => handleInputChange('applicantName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Applicant CNIC</label>
              <input
                type="text"
                value={formData.applicantCNIC}
                onChange={(e) => handleInputChange('applicantCNIC', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Applicant Contact</label>
              <input
                type="text"
                value={formData.applicantContact}
                onChange={(e) => handleInputChange('applicantContact', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Applicant Email</label>
              <input
                type="email"
                value={formData.applicantEmail}
                onChange={(e) => handleInputChange('applicantEmail', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Party Sections */}
        {formData.challanAmountPaidBy && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* First Party Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">{partyLabels.firstParty} Information</h3>
                <button
                  type="button"
                  onClick={() => handleAddParty('firstParty')}
                  className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add {partyLabels.firstParty}
                </button>

                {parties.firstParty.length > 0 && (
                  <div className="space-y-4">
                    {parties.firstParty.map((party, index) => (
                      <div key={index} className="border border-gray-200 rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{party.name}</h4>
                          <div className="space-x-2">
                            <button
                              type="button"
                              onClick={() => handleEditParty('firstParty', index)}
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteParty('firstParty', index)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Type: {party.type}</p>
                        <p className="text-sm text-gray-600">CNIC: {party.cnic}</p>
                        <p className="text-sm text-gray-600">Contact: {party.contact}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Second Party Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">{partyLabels.secondParty} Information</h3>
                <button
                  type="button"
                  onClick={() => handleAddParty('secondParty')}
                  className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add {partyLabels.secondParty}
                </button>

                {parties.secondParty.length > 0 && (
                  <div className="space-y-4">
                    {parties.secondParty.map((party, index) => (
                      <div key={index} className="border border-gray-200 rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{party.name}</h4>
                          <div className="space-x-2">
                            <button
                              type="button"
                              onClick={() => handleEditParty('secondParty', index)}
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteParty('secondParty', index)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Type: {party.type}</p>
                        <p className="text-sm text-gray-600">CNIC: {party.cnic}</p>
                        <p className="text-sm text-gray-600">Contact: {party.contact}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Deed Details */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Deed Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount of Consideration</label>
              <input
                type="number"
                value={formData.considerationAmount}
                onChange={(e) => handleInputChange('considerationAmount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">motor vechivle description</label>
              <input
                type="text"
                value={formData.motorVehicleDescription}
                onChange={(e) => handleInputChange('motorVehicleDescription', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleSaveToMongoDB}
            className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg font-medium"
          >
         Save to Generate Barcode

          </button>
        </div>
      </div>

      {/* Modals */}
      {showPartyModal && (
        <PartyModal
          isOpen={showPartyModal}
          onClose={() => setShowPartyModal(false)}
          onSubmit={handlePartySubmit}
          editingParty={editingParty}
          partyType={currentPartyType}
        />
      )}

      {showPaymentModal && (
        <PaymentGuidelinesModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
        />
      )}



      {showBarcodeModal && (
        <BarcodeModal
          isOpen={showBarcodeModal}
          onClose={() => setShowBarcodeModal(false)}
          barcodeData={barcodeData}
          onViewReceipt={() => navigate(`/receipt/${barcodeData}`)}
        />
      )}
    </div>

  );

};

export default ChallanForm;
