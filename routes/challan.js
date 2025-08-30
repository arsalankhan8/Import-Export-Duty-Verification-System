const express = require('express');
const router = express.Router();
const Challan = require('../models/Challan');

// @desc    Save new challan
// @route   POST /api/challan
// @access  Public
router.post('/', async (req, res) => {
  try {
    console.log('Received challan data:', req.body);
    
    const challanData = req.body;
    
    // Create new challan
    const challan = new Challan(challanData);
    console.log('Created challan object:', challan);
    
    const savedChallan = await challan.save();
    console.log('Saved challan:', savedChallan);
    
    res.status(201).json({
      success: true,
      data: savedChallan,
      message: 'Challan saved successfully'
    });
  } catch (error) {
    console.error('Error saving challan:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Get challan by document ID
// @route   GET /api/challan/:documentId
// @access  Public
router.get('/:documentId', async (req, res) => {
  try {
    const { documentId } = req.params;
    
    const challan = await Challan.findOne({ documentId });
    
    if (!challan) {
      return res.status(404).json({
        success: false,
        message: 'Challan not found'
      });
    }
    
    res.json({
      success: true,
      data: challan
    });
  } catch (error) {
    console.error('Error fetching challan:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Get all challans
// @route   GET /api/challan
// @access  Public
router.get('/', async (req, res) => {
  try {
    const challans = await Challan.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: challans.length,
      data: challans
    });
  } catch (error) {
    console.error('Error fetching challans:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Update challan
// @route   PUT /api/challan/:documentId
// @access  Public
router.put('/:documentId', async (req, res) => {
  try {
    const { documentId } = req.params;
    const updateData = req.body;
    
    const challan = await Challan.findOneAndUpdate(
      { documentId },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!challan) {
      return res.status(404).json({
        success: false,
        message: 'Challan not found'
      });
    }
    
    res.json({
      success: true,
      data: challan,
      message: 'Challan updated successfully'
    });
  } catch (error) {
    console.error('Error updating challan:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Delete challan
// @route   DELETE /api/challan/:documentId
// @access  Public
router.delete('/:documentId', async (req, res) => {
  try {
    const { documentId } = req.params;
    
    const challan = await Challan.findOneAndDelete({ documentId });
    
    if (!challan) {
      return res.status(404).json({
        success: false,
        message: 'Challan not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Challan deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting challan:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
