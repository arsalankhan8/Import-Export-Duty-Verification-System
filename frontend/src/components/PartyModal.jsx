import React, { useState, useEffect } from 'react';

const PartyModal = ({ isOpen, onClose, onSubmit, editingParty, partyType }) => {
  const [formData, setFormData] = useState({
    type: 'Individual',
    isForeigner: false,
    name: '',
    cnic: '',
    relation: '',
    relationName: '',
    contact: '',
    email: '',
    address: '',
    useInForm: false,
    throughPowerOfAttorney: false,
    attorneyProviderName: '',
    attorneyProviderCNIC: ''
  });

  const relations = [
    'D/O', 'F/O', 'guardian', 'H/O', 'M/O', 'On behalf of', 'S/O', 'W/O', 'widow of'
  ];

  useEffect(() => {
    if (editingParty) {
      setFormData(editingParty);
    } else {
      setFormData({
        type: 'Individual',
        isForeigner: false,
        name: '',
        cnic: '',
        relation: '',
        relationName: '',
        contact: '',
        email: '',
        address: '',
        useInForm: false,
        throughPowerOfAttorney: false,
        attorneyProviderName: '',
        attorneyProviderCNIC: ''
      });
    }
  }, [editingParty]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {editingParty ? `Edit ${partyType === 'firstParty' ? 'First' : 'Second'} Party` : `Add ${partyType === 'firstParty' ? 'First' : 'Second'} Party`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="Individual"
                  checked={formData.type === 'Individual'}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="mr-2"
                />
                Individual
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="Company"
                  checked={formData.type === 'Company'}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="mr-2"
                />
                Company
              </label>
            </div>
          </div>

          {/* Is Foreigner */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isForeigner}
                onChange={(e) => handleInputChange('isForeigner', e.target.checked)}
                className="mr-2"
              />
              Is Foreigner
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* CNIC */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CNIC</label>
            <input
              type="text"
              value={formData.cnic}
              onChange={(e) => handleInputChange('cnic', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Relation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Relation</label>
            <select
              value={formData.relation}
              onChange={(e) => handleInputChange('relation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Relation</option>
              {relations.map(relation => (
                <option key={relation} value={relation}>{relation}</option>
              ))}
            </select>
          </div>

          {/* Relation Name */}
          {formData.relation && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Relation Name</label>
              <input
                type="text"
                value={formData.relationName}
                onChange={(e) => handleInputChange('relationName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact No</label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => handleInputChange('contact', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.useInForm}
                onChange={(e) => handleInputChange('useInForm', e.target.checked)}
                className="mr-2"
              />
              Use this {partyType === 'firstParty' ? 'First' : 'Second'} Party in the form
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.throughPowerOfAttorney}
                onChange={(e) => handleInputChange('throughPowerOfAttorney', e.target.checked)}
                className="mr-2"
              />
              Through Power Of Attorney
            </label>
          </div>

          {/* Power of Attorney Fields */}
          {formData.throughPowerOfAttorney && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attorney Provider name</label>
                <input
                  type="text"
                  value={formData.attorneyProviderName}
                  onChange={(e) => handleInputChange('attorneyProviderName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attorney Provider CNIC/passport</label>
                <input
                  type="text"
                  value={formData.attorneyProviderCNIC}
                  onChange={(e) => handleInputChange('attorneyProviderCNIC', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {editingParty ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartyModal;
