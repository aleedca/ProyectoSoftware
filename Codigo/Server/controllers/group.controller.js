const { getConnection } = require('../connection.js');
const sql = require('mssql');

const getGroups = async (req, res) => {
    res.send("obteniendo todos los grupos");
}

const getGroup = async (req, res) => {
    res.send("obteniendo un grupo");
}

const addGroup = async (req, res) => {
    res.send("agregando un grupo");
}       

const editGroup = async (req, res) => {
    res.send("editando un grupo");
}

const deleteGroup = (req, res) => {
    res.send("eliminando un grupo");
}

module.exports = { getGroups, getGroup, addGroup, editGroup, deleteGroup };