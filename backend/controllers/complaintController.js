const Complaint = require("../models/Complaint");
const analyzeComplaint = require("../utils/aiService");

const addComplaint = async (req, res) => {
  try {
    const {
      name,
      email,
      title,
      description,
      category,
      location
    } = req.body;

    const aiResult = await analyzeComplaint(
      title,
      description,
      category
    );

    const complaint = await Complaint.create({
      name,
      email,
      title,
      description,
      category,
      location,
      priority: aiResult.priority,
      department: aiResult.department,
      summary: aiResult.summary,
      autoResponse: aiResult.autoResponse,
      createdBy: req.user.id
    });

    res.status(201).json(complaint);

  } catch (error) {
    console.log("ADD COMPLAINT ERROR:", error.message);

    res.status(500).json({
      message: error.message
    });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();

    res.json(complaints);

  } catch (error) {
    console.log("GET COMPLAINT ERROR:", error.message);

    res.status(500).json({
      message: error.message
    });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    complaint.status = req.body.status;

    await complaint.save();

    res.json(complaint);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    await complaint.deleteOne();

    res.json({
      message: "Deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const searchByLocation = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      location: {
        $regex: req.query.location,
        $options: "i"
      }
    });

    res.json(complaints);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  addComplaint,
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
  searchByLocation
};