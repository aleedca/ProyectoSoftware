const express = require("express");
const router = express.Router();
const { getConnection } = require('../connection.js');
const { getCatalogCourses, getCatalogCourse, addCatalogCourse, editCatalogCourse, deleteCatalogCourse } = require('../controllers/catalog.course.controller.js')

router.get('/getCatalogCourses', getCatalogCourses);

router.get('/getCatalogCourse', getCatalogCourse);

router.post('/addCatalogCourse', addCatalogCourse);

router.put('/editCatalogCourse', editCatalogCourse);

router.delete('/deleteCatalogCourse', deleteCatalogCourse);

module.exports = router;