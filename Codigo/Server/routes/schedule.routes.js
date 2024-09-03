const express = require("express");
const router = express.Router();
const { getConnection } = require('../connection.js');
const { getSchedules, getSchedule, addSchedule, editSchedule, deleteSchedule } = require('../controllers/schedule.controller.js')

router.get('/getSchedules', getSchedules);

router.get('/getSchedule', getSchedule);
 
router.post('/addSchedule', addSchedule);

router.put('/editSchedule', editSchedule);

router.delete('/deleteSchedule', deleteSchedule);

module.exports = router;