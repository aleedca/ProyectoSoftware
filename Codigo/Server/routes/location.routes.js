const express = require("express");
const router = express.Router();
const { getConnection } = require('../connection.js');
const { getLocations, getLocation, addLocation, editLocation, deleteLocation } = require('../controllers/location.controller.js')

router.get('/getLocations', getLocations);

router.get('/getLocation', getLocation);

router.post('/addLocation', addLocation);

router.put('/editLocation', editLocation);

router.delete('/deleteLocation', deleteLocation);

module.exports = router;