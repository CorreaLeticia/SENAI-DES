const express = require("express");
const router = express.Router();

const { cadastrarCliente } = require("../controllers/clientes.controllers");

router.post("/", cadastrarCliente);

module.exports = router;