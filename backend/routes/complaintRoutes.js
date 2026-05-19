const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  addComplaint,
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
  searchByLocation
} = require("../controllers/complaintController");

const router = express.Router();

router.get("/search/location", protect, searchByLocation);

router.post("/", protect, addComplaint);
router.get("/", protect, getAllComplaints);
router.put("/:id", protect, updateComplaintStatus);
router.delete("/:id", protect, deleteComplaint);

module.exports = router;