const express = require("express");
const router = express.Router();
const { getConnection } = require('../connection.js');
const { getGroups, getGroup, addGroup, editGroup, deleteGroup } = require('../controllers/group.controller.js')

router.get('/getGroups', getGroups);

router.get('/getGroup', getGroup);

router.post('/addGroup', addGroup);

router.put('/editGroup', editGroup);

router.delete('/deleteGroup', deleteGroup);

module.exports = router;