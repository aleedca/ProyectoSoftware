const express = require("express");
const router = express.Router();
const { getConnection } = require('../connection.js');
const { getModalitys, getModality, addModality, editModality, deleteModality } = require('../controllers/modality.controller.js')

router.get('/getModalitys', getModalitys);

router.get('/getModality', getModality);

router.post('/addModality', addModality);

router.put('/editModality', editModality);

router.delete('/deleteModality', deleteModality);

module.exports = router;