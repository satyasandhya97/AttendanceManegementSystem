const Roster = require('../models/roster_model'); 
const Staff = require('../models/staff_model'); 


const getAllAttandance = async (req, res) => {
    try {
      const roster = await Roster.aggregate([
        {
          $match: { status: 'Present' },
        },
        {
          $lookup: {
            from: 'staffs', 
            localField: 'staffId', 
            foreignField: '_id', 
            as: 'staffDetails', 
          },
        },
        {
          $unwind: '$staffDetails',
        },
        {
          $project: { 
            'staffDetails.staffName': 1,
            'staffDetails.email': 1,
            'staffDetails.phone': 1,
            'staffDetails.createdAt': 1,
            Date: 1,
            shiftTiming: 1,
            shiftType: 1,
            workingDays: 1,
            status: 1,
          },
        },
      ]);
  
      if (roster.length === 0) {
        return res.status(404).json({ message: 'No attendance records found with status "Present"' });
      }
  
      res.status(200).json(roster);
    } catch (error) {
      console.error('Error fetching attendance and staff:', error);
      res.status(500).json({ message: 'An error occurred', error });
    }
  };

const AddAttandance = async (req, res) => {
    try {
      const { id, imageUrl, status } = req.body;
  
      const roster = await Roster.findById(id);
  
      if (!roster) {
        return res.status(404).json({ message: 'Roster not found' });
      }
  
      roster.imageUrl = imageUrl;
      roster.status = status || 'Absent'; 
  
      const updatedRoster = await roster.save();
  
      return res.status(200).json({ message: 'Attendance updated successfully', updatedRoster });
    } catch (error) {
      console.error('Error updating attendance:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  };
const createRoster = async (req, res) => {
  try {
    const { staffId,Date,shiftType, workingDays, shiftTiming } = req.body;

    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    const newRoster = new Roster({
      staffId,
      workingDays,
      shiftTiming,
      Date,
      shiftType,
    });

    await newRoster.save();

    return res.status(201).json({ message: 'Roster created successfully', newRoster });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating roster', error });
  }
};

const updateRoster = async (req, res) => {
  try {
    const rosterId = req.params.id;
    const updatedData = req.body;

    const updatedRoster = await Roster.findByIdAndUpdate(rosterId, updatedData, { new: true });

    if (!updatedRoster) {
      return res.status(404).json({ message: 'Roster not found' });
    }

    return res.status(200).json({ message: 'Roster updated successfully', updatedRoster });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating roster', error });
  }
};

const deleteRoster = async (req, res) => {
  try {
    const rosterId = req.params.id;

    const deletedRoster = await Roster.findByIdAndDelete(rosterId);

    if (!deletedRoster) {
      return res.status(404).json({ message: 'Roster not found' });
    }

    return res.status(200).json({ message: 'Roster deleted successfully', deletedRoster });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting roster', error });
  }
};

const getAllRostersByStaff = async (req, res) => {
  try {
    const staffId = req.params.staffId;

    const rosters = await Roster.find({ staffId });

    if (rosters.length === 0) {
      return res.status(404).json({ message: 'No rosters found for this staff member' });
    }

    return res.status(200).json({ rosters });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching rosters', error });
  }
};

module.exports = {
  getAllAttandance,
  createRoster,
  updateRoster,
  deleteRoster,
  getAllRostersByStaff,
  AddAttandance
};
