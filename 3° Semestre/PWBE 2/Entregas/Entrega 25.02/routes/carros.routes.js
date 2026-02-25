const express = require("express");
const router = express.Router();

const { cadastrarCarro } = require("../controllers/carros.controllers");

router.post("/", cadastrarCarro);

module.exports = router;