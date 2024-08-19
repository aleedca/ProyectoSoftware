const express = require("express");
const router = express.Router();
const { getConnection } = require('../connection.js');
const { getUsers, getUser, addUser, updateUser, deleteUser } = require('../controllers/user.controller')

router.get('/cuenta', getUsers);

router.get('/cuenta/:id', getUser);

router.post('/cuenta', addUser);

router.put('/cuenta/:id', updateUser);

router.delete('/cuenta/:id', deleteUser);

module.exports = router;
