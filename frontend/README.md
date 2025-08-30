# Challan Details Form - eStamp System

A comprehensive React-based web application for generating and managing challan forms for eStamp services. This application includes dynamic forms with dependent dropdowns, conditional logic, party management, and barcode generation for receipt tracking.

## Features

### 🎯 Core Features

- **Dynamic Challan Form**: Complete form with all required fields for eStamp challan generation
- **Dependent Dropdowns**: District → Taluka, Stamp Paper Type → Deed Name with conditional logic
- **Conditional Radio Buttons**: Dynamic party labels based on deed selection
- **Party Management**: Add, edit, and delete party information with detailed forms
- **Online Payment Integration**: Bank selection and payment guidelines
- **Review & Save**: Complete data review before saving to database
- **Barcode Generation**: Unique barcode for each challan with receipt linking
- **Receipt System**: Detailed receipt page accessible via barcode scan

### 📋 Form Sections

#### 1. Challan Details
- **District**: 24 districts of Sindh
- **Taluka**: Dependent on district selection
- **Stamp Paper Type**: Judicial/Non-Judicial
- **Deed Name**: Dynamic based on stamp paper type
- **Challan Amount Paid By**: Conditional radio options
- **Online Payment**: Bank selection and guidelines

#### 2. Applicant Information
- Applicant Name, CNIC, Contact, Email

#### 3. Dynamic Party Sections
- **First Party**: Based on deed selection (e.g., Drawer, Seller, etc.)
- **Second Party**: Based on deed selection (e.g., Drawee, Purchaser, etc.)
- **Party Details**: Individual/Company, Foreigner status, Relations, Power of Attorney

#### 4. Deed Details
- Amount of Consideration
- Motor Vehicle Description

### 🔧 Technical Features

- **React 19** with modern hooks and functional components
- **React Router** for navigation and routing
- **Tailwind CSS** for responsive design
- **Barcode Generation** using react-barcode
- **Modal System** for forms and popups
- **Form Validation** and error handling
- **Local Storage** simulation for MongoDB (easily replaceable with real backend)

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd challan-form
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## Project Structure

```
src/
├── components/
│   ├── ChallanForm.jsx          # Main form component
│   ├── PartyModal.jsx           # Party add/edit modal
│   ├── PaymentGuidelinesModal.jsx # Payment instructions
│   ├── ReviewModal.jsx          # Data review modal
│   ├── BarcodeModal.jsx         # Barcode display modal
│   └── Receipt.jsx              # Receipt page component
├── services/
│   └── api.js                   # API service for MongoDB operations
├── App.jsx                      # Main app with routing
└── main.jsx                     # App entry point
```

## Usage Guide

### 1. Accessing the Form
- Navigate to the home page
- Click on "Challan Form No. 32-A" card
- Or directly visit `/challan-form`

### 2. Filling the Form
1. **Select District** → **Select Taluka**
2. **Choose Stamp Paper Type** (Judicial/Non-Judicial)
3. **Select Deed Name** (options change based on type)
4. **Choose Challan Amount Paid By** (radio options appear)
5. **Fill Applicant Information**
6. **Add Parties** using the dynamic sections
7. **Complete Deed Details**

### 3. Adding Parties
- Click "Add [Party Type]" button
- Fill party details in the modal
- Support for Individual/Company types
- Power of Attorney options
- Edit/Delete existing parties

### 4. Review & Save
- Click "Review & Save" to see all data
- Verify information is correct
- Click "Save to MongoDB" to generate barcode

### 5. Receipt Access
- Barcode is generated after successful save
- Click "View Receipt" to see the receipt page
- Receipt URL: `/receipt/[document-id]`

## Deed Mapping System

The application includes a comprehensive mapping system for deed types to party labels:

- **Judicial Deeds**: Court Fee → Plaintiff/Defendant options
- **Non-Judicial Deeds**: 82 different deed types with specific party mappings
- **Dynamic Labels**: Party section headers change based on deed selection

### Example Mappings:
- Bill of Exchange → Drawer/Drawee
- Conveyance → Seller/Purchaser
- Lease → Lessor/Lessee
- Mortgage → Mortgagor/Mortgagee

## API Integration

### Current Implementation
- Uses localStorage for demonstration
- Simulates MongoDB operations
- Includes proper error handling

### Production Setup
Replace the API service with real backend calls:

```javascript
// In src/services/api.js
const response = await fetch(`${this.baseURL}/challan`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(challanData),
});
```

## Styling & UI

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface
- **Accessibility**: Proper labels and keyboard navigation
- **Loading States**: Spinners and progress indicators
- **Error Handling**: User-friendly error messages

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Structure

- **Functional Components**: All components use modern React patterns
- **Custom Hooks**: State management with useState and useEffect
- **Props Validation**: Proper prop passing and validation
- **Error Boundaries**: Graceful error handling

## Future Enhancements

- [ ] Real MongoDB integration
- [ ] User authentication system
- [ ] Admin dashboard for challan management
- [ ] PDF generation for receipts
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Advanced search and filtering
- [ ] Bulk operations
- [ ] Audit trail
- [ ] API rate limiting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: info@estamps.gos.pk
- Phone: 0800-77000

## Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first styling
- React Router for navigation
- React Barcode for barcode generation
