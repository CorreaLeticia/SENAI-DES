const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientes.controllers");

router.post("/cadastrar", clientesController.cadastrarCliente);
router.get("/listar", clientesController.listarClientes);
router.get("/:id", clientesController.buscarCliente);
router.put("/:id", clientesController.atualizarCliente);
router.delete("/:id", clientesController.deletarCliente);

module.exports = router;