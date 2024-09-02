const { getConnection } = require('../connection.js');
const sql = require('mssql');

const getCourses = async (req, res) => {
    res.send("obteniendo todos los cursos");
}

const getCourse = async (req, res) => {
    res.send("obteniendo un curso");
}

const addCourse = async (req, res) => {
    res.send("agregando un curso");
}

const editCourse = async (req, res) => {
    res.send("editando un curso");
}

const deleteCourse = (req, res) => {
    res.send("eliminando un curso");
}

module.exports = { getCourses, getCourse, addCourse, editCourse, deleteCourse };