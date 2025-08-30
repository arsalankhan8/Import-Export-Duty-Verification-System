import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import { FaPhoneAlt, FaUser } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import Footer from './footer';

const Receipt = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [receiptData, setReceiptData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        setLoading(true);

        // Fetch data from MongoDB using API service
        const response = await apiService.getChallanByDocumentId(documentId);
        const data = response.data;

        // Transform the data to match receipt format
        const receiptData = {
          documentId: data.documentId,
          description: data.deedName,
          drawer: data.parties.firstParty.length > 0 ? data.parties.firstParty[0].name : 'N/A',
          drawee: data.parties.secondParty.length > 0 ? data.parties.secondParty[0].name : 'N/A',
          stampDutyPaidBy: data.challanAmountPaidBy,
          stampIssueDate: data.createdAt,
          paidThroughChallan: data.documentId,
          totalAmount: data.considerationAmount || 0,
          amountInWords: data.considerationAmount ?
            `${numberToWords(parseInt(data.considerationAmount))} Rupees Only` : 'Zero Rupees Only',
          district: data.district,
          taluka: data.taluka,
          stampPaperType: data.stampPaperType,
          applicantName: data.applicantName,
          applicantCNIC: data.applicantCNIC,
          applicantContact: data.applicantContact,
          applicantEmail: data.applicantEmail,
          considerationAmount: data.considerationAmount,
          motorVehicleDescription: data.motorVehicleDescription,
          parties: data.parties
        };

        setReceiptData(receiptData);
      } catch (err) {
        setError('Failed to load receipt data');
        console.error('Error fetching receipt data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReceiptData();
  }, [documentId]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading receipt...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (


      <div className="min-h-screen bg-gray-50 flex items-center justify-center">

        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (!receiptData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 text-6xl mb-4">📄</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Receipt Not Found</h2>
          <p className="text-gray-600 mb-4">The requested receipt could not be found.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (

    <>

      <div className="w-full bg-[#dff3e6] text-slate-800 text-sm">

        <div className="mx-auto max-w-7xl px-[10px] py-[10px] flex items-center justify-between gap-4 max-[768px]:flex max-[768px]:flex-col max-[768px]:items-start max-[768px]:[align-items:self-start] max-[768px]:gap-[10px] max-[768px]:p-[10px]">

          <div className="flex flex-wrap items-center gap-[20px]">

            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-black h-3.5 w-3.5 mr-[10px]" />
              <span className="whitespace-nowrap">For Any Query: 0800-77000</span>
            </div>
            <div className="flex items-center gap-2">
              <MdEmail className="text-black h-4 w-4 mr-[10px]" />
              <span className="whitespace-nowrap">Email: info@estamps.gos.pk</span>
            </div>
          </div>

          <a href="#login" className="text-slate-800 hover:underline" style={{ color: '#000000', textDecoration: 'none' }}>Member Login</a>
        </div>
      </div>

      <div
        className="relative bg-[#3E456A] w-full h-[100px] overflow-hidden"
        style={{ position: 'relative', width: '100%', height: 100, overflow: 'hidden' }}
      >
        {/* Logo top-left inside slider */}
        <div className="absolute top-4 left-4 z-20 rounded  shadow">
          <img
            src={`/images/stamping-logo.png`}
            alt="Logo"
            className="h-10 w-auto"
          />
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-8">

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 [@media(max-width:556px)]:p-1 ">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">eStamp Online Verification</h1>
            <div className="w-32 h-1 bg-blue-600 mx-auto"></div>
          </div>

          {/* Receipt Content */}

          <div className="bg-blue-50 p-6 rounded-lg [@media(max-width:556px)]:p-1">
            <table className="w-full border border-gray-300 text-sm border-collapse">
              <tbody>
                <tr>
                  <td className="font-semibold text-gray-700 pl-[10px] py-2 border border-gray-300">Description:</td>
                  <td className="text-gray-800 pl-[10px] py-2 border border-gray-300">{receiptData.description}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-700 pl-[10px] py-2 border border-gray-300">Drawer:</td>
                  <td className="text-gray-800 pl-[10px] py-2 border border-gray-300">[{receiptData.parties.firstParty.length}]</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-700 pl-[10px] py-2 border border-gray-300">Drawee:</td>
                  <td className="text-gray-800 pl-[10px] py-2 border border-gray-300">[{receiptData.parties.secondParty.length}]</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-700 pl-[10px] py-2 border border-gray-300">Stamp Duty Paid By:</td>
                  <td className="text-gray-800 pl-[10px] py-2 border border-gray-300">[{receiptData.stampDutyPaidBy}]</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-700 pl-[10px] py-2 border border-gray-300">Stamp Issue Date:</td>
                  <td className="text-gray-800 pl-[10px] py-2 border border-gray-300">{formatDate(receiptData.stampIssueDate)}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-700 pl-[10px] py-2 border border-gray-300">Paid Through Challan:</td>
                  <td className="text-gray-800 pl-[10px] py-2 border border-gray-300">{receiptData.paidThroughChallan}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-700 pl-[10px] py-2 border border-gray-300">Total Amount:</td>
                  <td className="text-gray-800 pl-[10px] py-2 border border-gray-300">Rs {receiptData.totalAmount}/-</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-700 pl-[10px] py-2 border border-gray-300">Amount In Words:</td>
                  <td className="text-gray-800 pl-[10px] py-2 border border-gray-300">{receiptData.amountInWords}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}

          <div className="flex justify-center space-x-4 mt-8 pt-6 border-t">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Print Receipt
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <Footer />

    </>
  );
};

export default Receipt;
