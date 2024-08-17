const express = require('express')
const app = express();
const cors = require("cors");
const db = require("./models");
const sql = require("mssql");


app.use(express.json());
app.use(cors());

//database
const config = {
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

async function connectAndQuery() {
  const pool = new sql.ConnectionPool(config);

  try {
      // Conéctate a la base de datos
      await pool.connect();
      console.log("Conexión exitosa a la base de datos de Somee");

      // Realiza la consulta
      let result = await pool.request().query(`
        SELECT TABLE_NAME
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_TYPE = 'BASE TABLE'
      `);

      // Muestra el resultado de la consulta
      console.log(result.recordset);
  } catch (error) {
      console.error("Conexión fallida a la base de datos de Somee", error);
  } finally {
      // Cierra la conexión
      pool.close();
  }
}

connectAndQuery();


// Routers
const basicRouter = require("./routes/Basic");
app.use("/Basic", basicRouter);





app.listen(3001,() =>{
        console.log("Server running on port 3001")
 });



