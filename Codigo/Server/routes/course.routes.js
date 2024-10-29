const express = require("express");
const router = express.Router();
const { getConnection } = require('../connection.js');
const { getCourses, getCourse, addCourse, editCourse, deleteCourse, getCoursesCalendar, fusionCourses} = require('../controllers/course.controller.js')

router.get('/getCoursesCalendar', getCoursesCalendar);

router.get('/getCourses', getCourses);

router.get('/getCourse', getCourse);

router.post('/addCourse', addCourse);

router.put('/editCourse', editCourse);

router.delete('/deleteCourse', deleteCourse);

router.post('/fusionCourses', fusionCourses);

module.exports = router;