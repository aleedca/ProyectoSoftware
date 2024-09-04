const { getConnection } = require('../connection.js');
const sql = require('mssql');

const getCatalogCourses = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('InloTEC_SP_Courses_List');
        res.json(result.recordset);
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

const getCatalogCourse = async (req, res) => {
    res.send("obteniendo un catalogo curso");
}

const addCatalogCourse = async (req, res) => {
    res.send("obteniendo un catalogo curso");
};

const editCatalogCourse = async (req, res) => {
    res.send("editando un  catalogo curso");
}

const deleteCatalogCourse = (req, res) => {
    res.send("eliminando un catalogo curso");
}

module.exports = { getCatalogCourses, getCatalogCourse, addCatalogCourse, editCatalogCourse, deleteCatalogCourse };