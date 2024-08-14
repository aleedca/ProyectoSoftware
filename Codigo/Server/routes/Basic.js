const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

router.get("/", async (req, res) => {
  
  res.json([{"nombre": "prueba"}]);
});

router.post("/", async (req, res) => {
  const post = req.body;
  console.log(req.body)

  res.json("hOLA POST" + post);
});

module.exports = router;
