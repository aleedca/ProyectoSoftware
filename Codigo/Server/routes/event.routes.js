const express = require("express");
const router = express.Router();
const { getConnection } = require('../connection.js');
const { getEvents, getEvent, addEvent, editEvent, deleteEvent } = require('../controllers/event.controller.js')

router.get('/getEvents', getEvents);

router.get('/getEvent', getEvent);

router.post('/addEvent', addEvent);

router.put('/editEvent', editEvent);

router.delete('/deleteEvent', deleteEvent);

module.exports = router;