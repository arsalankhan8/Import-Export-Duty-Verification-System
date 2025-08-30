const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Individual', 'Company'],
    required: false
  },
  isForeigner: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: false
  },
  cnic: {
    type: String,
    required: false
  },
  relation: {
    type: String,
    required: false
  },
  relationName: String,
  contact: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  useInForm: {
    type: Boolean,
    default: true
  },
  throughPowerOfAttorney: {
    type: Boolean,
    default: false
  },
  attorneyProviderName: String,
  attorneyProviderCNIC: String
});

const challanSchema = new mongoose.Schema({
  // Challan Details
  district: {
    type: String,
    required: false
  },
  taluka: {
    type: String,
    required: false
  },
  stampPaperType: {
    type: String,
    required: false
  },
  deedName: {
    type: String,
    required: false
  },
  challanAmountPaidBy: {
    type: String,
    required: false
  },
  
  // Online Payment
  onlinePayment: {
    type: String,
    required: false
  },
  bank: {
    type: String,
    required: false
  },
  
  // Applicant Information
  applicantName: {
    type: String,
    required: false
  },
  applicantCNIC: {
    type: String,
    required: false
  },
  applicantContact: {
    type: String,
    required: false
  },
  applicantEmail: {
    type: String,
    required: false
  },
  
  // Party Information
  parties: {
    firstParty: [partySchema],
    secondParty: [partySchema]
  },
  
  // Deed Details
  considerationAmount: {
    type: String,
    required: false
  },
  motorVehicleDescription: {
    type: String,
    required: false
  },
  
  // Metadata
  documentId: {
    type: String,
    unique: true,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate unique document ID before saving
challanSchema.pre('save', function(next) {
  if (!this.documentId) {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8);
    this.documentId = `PSID${timestamp}${random}`.toUpperCase();
  }
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Challan', challanSchema);
