const express = require("express");
const router = express.Router();
const { getConnection } = require('../connection.js');
const { getHolidays, getHoliday, addHoliday, editHoliday, deleteHoliday } = require('../controllers/holiday.controller.js')

router.get('/getHolidays', getHolidays);

router.get('/getHoliday', getHoliday);

router.post('/addHoliday', addHoliday);

router.put('/editHoliday', editHoliday);

router.delete('/deleteHoliday', deleteHoliday);

module.exports = router;