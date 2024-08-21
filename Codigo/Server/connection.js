const sql = require('mssql');
const fs = require('fs');
const path = require('path');

const dbSettings = {
    user: "InloTEC",
    password: "#$InloTEC1234",
    server: "InloTEC.mssql.somee.com",
    database: "InloTEC",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

let pool;
const getConnection = async () => {
    if (!pool) {
        pool = new sql.ConnectionPool(dbSettings);
        try {
            await pool.connect();
            console.log("Conexión exitosa a la base de datos de Somee");
        } catch (error) {
            console.error("Conexión fallida a la base de datos de Somee", error);
            throw error;
        }
    }
    return pool;
};

module.exports = { getConnection };