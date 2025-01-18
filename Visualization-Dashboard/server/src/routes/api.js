const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');


router.post('/attendancedata', dataController.addAttendance);
router.post('/resultsdata', dataController.addResults);

module.exports = router;
