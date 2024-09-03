const express = require("express");
const router = express.Router();
const { getConnection } = require('../connection.js');
const { listTeachers, getTeacher, addTeacher, editTeacher, deleteTeacher } = require('../controllers/teacher.controller')

router.get('/listTeachers', listTeachers);

router.get('/getTeacher', getTeacher);

router.post('/addTeacher', addTeacher);

router.put('/editTeacher', editTeacher);

router.delete('/deleteTeacher', deleteTeacher);

module.exports = router;