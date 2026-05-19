const express = require("express");
const {
  addComplaint,
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
  searchByLocation
} = require("../controllers/complaintController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addComplaint);
router.get("/", protect, getAllComplaints);
router.put("/:id", protect, updateComplaintStatus);
router.delete("/:id", protect, deleteComplaint);
router.get("/search/location", protect, searchByLocation);

module.exports = router;