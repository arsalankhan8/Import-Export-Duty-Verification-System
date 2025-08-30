# eStamp Challan Backend API

This is the backend API server for the eStamp Challan system, built with Express.js and MongoDB.

## Features

- **MongoDB Integration**: Complete database schema for challan data
- **RESTful API**: Full CRUD operations for challan management
- **Document ID Generation**: Automatic unique document ID generation
- **Error Handling**: Comprehensive error handling and validation
- **CORS Support**: Cross-origin resource sharing enabled
- **Health Check**: API health monitoring endpoint

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the server directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/estamp-challan
   ```

3. **MongoDB Setup**
   - Install MongoDB locally, or
   - Use MongoDB Atlas (cloud)
   - Update MONGO_URI in .env file

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/api/health` - Check API status

### Challan Operations
- **POST** `/api/challan` - Create new challan
- **GET** `/api/challan/:documentId` - Get challan by document ID
- **GET** `/api/challan` - Get all challans
- **PUT** `/api/challan/:documentId` - Update challan
- **DELETE** `/api/challan/:documentId` - Delete challan

## Database Schema

### Challan Model
```javascript
{
  // Challan Details
  district: String (required)
  taluka: String (required)
  stampPaperType: String (enum: ['Judicial', 'Non-Judicial'])
  deedName: String (required)
  challanAmountPaidBy: String (required)
  
  // Online Payment
  selectedBank: String (enum: ['National Bank of Pakistan', 'Sindh Bank'])
  
  // Applicant Information
  applicantName: String (required)
  applicantCNIC: String (required)
  applicantContact: String (required)
  applicantEmail: String (required)
  
  // Party Information
  parties: [PartySchema]
  
  // Deed Details
  amountOfConsideration: Number (required)
  motorVehicleDescription: String (required)
  
  // Metadata
  documentId: String (unique, auto-generated)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

### Party Schema
```javascript
{
  type: String (enum: ['Individual', 'Company'])
  isForeigner: Boolean
  name: String (required)
  cnic: String (required)
  relation: String (required)
  relationName: String
  contact: String (required)
  email: String (required)
  address: String (required)
  useInForm: Boolean
  throughPowerOfAttorney: Boolean
  attorneyProviderName: String
  attorneyProviderCNIC: String
}
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Frontend Integration

The frontend React application connects to this API using the `ApiService` class in `src/services/api.js`. The API base URL is configured as `http://localhost:5000/api`.

## Development

### Project Structure
```
server/
├── config/
│   └── db.js          # MongoDB connection
├── models/
│   └── Challan.js     # Database schema
├── routes/
│   └── challan.js     # API routes
├── server.js          # Main server file
├── package.json       # Dependencies
└── README.md          # This file
```

### Adding New Features
1. Create new models in `models/` directory
2. Add routes in `routes/` directory
3. Update `server.js` to include new routes
4. Test endpoints using Postman or similar tool

## Production Deployment

1. **Environment Variables**
   - Set `NODE_ENV=production`
   - Configure production MongoDB URI
   - Set appropriate PORT

2. **Security**
   - Enable HTTPS
   - Add authentication middleware
   - Implement rate limiting
   - Add input validation

3. **Monitoring**
   - Add logging (Winston/Morgan)
   - Set up error tracking
   - Monitor API performance

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string in .env
   - Ensure network connectivity

2. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing process on port 5000

3. **CORS Errors**
   - Verify frontend URL is allowed
   - Check CORS configuration in server.js

## License

This project is licensed under the ISC License.
