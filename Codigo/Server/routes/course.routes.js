const express = require("express");
const router = express.Router();
const { getConnection } = require('../connection.js');
const { getCourses, getCourse, addCourse, editCourse, deleteCourse,getCoursesCalendar } = require('../controllers/course.controller.js')

router.get('/getCoursesCalendar', getCoursesCalendar);

router.get('/getCourses', getCourses);

router.get('/getCourse', getCourse);

router.post('/addCourse', addCourse);

router.put('/editCourse', editCourse);

router.delete('/deleteCourse', deleteCourse);

module.exports = router;