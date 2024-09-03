const express = require("express");
const router = express.Router();
const { getTeachers, getTeacher, addTeacher, editTeacher, deleteTeacher } = require('../controllers/teacher.controller')

router.get('/getTeachers', listTeachers);

router.get('/getTeacher', getTeacher);

router.post('/addTeacher', addTeacher);

router.put('/editTeacher', editTeacher);

router.delete('/deleteTeacher', deleteTeacher);

module.exports = router;