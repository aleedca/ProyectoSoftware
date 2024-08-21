const express = require("express");
const router = express.Router();
const { getConnection } = require('../connection.js');
const { getUsers, getUser, addUser, editUser, deleteUser } = require('../controllers/user.controller')

router.get('/getUsers', getUsers);

router.get('/getUser', getUser);

router.post('/addUser', addUser);

router.put('/editUser', editUser);

router.delete('/deleteUser', deleteUser);

module.exports = router;
