const Staff = require('../models/staff_model'); 
const Roster= require('../models/roster_model')
const mongoose = require("mongoose");

const staffSignIn = async(req, res) => {
    const { email } = req.body;
    try {
        const staff = await Staff.findOne({ email });
        if (!staff) return res.status(404).json({ message: 'staff not found' });

        res.status(200).json({ message: 'Staff Sign-in successful', staff});
    } catch (error) {
        res.status(500).json({ message: 'Error signing in', error });
    }
}


const getStaffById = async (req, res) => {
    try {
      const staffId = req.params.id;
  
      if (!staffId) {
        return res.status(400).json({ message: 'Staff ID is required' });
      }
  
      const staffWithRoster = await Staff.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(staffId) }, 
        },
        {
          $lookup: {
            from: 'rosters',
            localField: '_id',
            foreignField: 'staffId', 
            as: 'rosterDetails',
          },
        },
      ]);
      if (!staffWithRoster || staffWithRoster.length === 0) {
        return res.status(404).json({ message: 'Staff not found' });
      }
  
      res.status(200).json(staffWithRoster[0]); 
    } catch (error) {
      console.error('Error fetching staff by ID:', error);
      res.status(500).json({ message: 'An error occurred', error });
    }
};

const createStaff = async (req, res) => {
  try {
    const { staffName, email, phone } = req.body;

    const newStaff = new Staff({
      staffName,
      email,
      phone
    });

    await newStaff.save();

    return res.status(201).json({ message: 'Staff created successfully', newStaff });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating staff', error });
  }
};

const updateStaff = async (req, res) => {
  try {
    const staffId = req.params.id;
    const updatedData = req.body;
    const updatedStaff = await Staff.findByIdAndUpdate(staffId, updatedData, { new: true });

    if (!updatedStaff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    return res.status(200).json({ message: 'Staff updated successfully', updatedStaff });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating staff', error });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const staffId = req.params.id;

    const deletedStaff = await Staff.findByIdAndDelete(staffId);

    if (!deletedStaff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    return res.status(200).json({ message: 'Staff deleted successfully', deletedStaff });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting staff', error });
  }
};

const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    return res.status(200).json({ staff });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching staff', error });
  }
};

module.exports = {
  staffSignIn,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
  getAllStaff
};
