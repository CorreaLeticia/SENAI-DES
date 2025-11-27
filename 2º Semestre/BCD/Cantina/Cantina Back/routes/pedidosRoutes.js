const express = require("express");
const router = express.Router();
const c = require("../controllers/pedidosControllers");

router.get("/", c.listarPedidos);
router.post("/", c.criarPedido);  
router.put("/:id", c.atualizarPedido);  
router.delete("/:id", c.excluirPedido); 
router.get("/relatorio/total-faturado", c.totalFaturado);

module.exports = router;
