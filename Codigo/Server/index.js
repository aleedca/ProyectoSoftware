const express = require('express')
const app = express();
const cors = require("cors");
const db = require("./models");


app.use(express.json());
app.use(cors());

//database
db.sequelize.sync()
    .then(() => {
   
      console.log("Base de datos conectada");
    
    })
    .catch(error =>{
        console.log("Error base de datos");
    });
  


// Routers
const basicRouter = require("./routes/Basic");
app.use("/Basic", basicRouter);





app.listen(3001,() =>{
        console.log("Server running on port 3001")
 });



