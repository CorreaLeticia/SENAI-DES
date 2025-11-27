const express = require("express");
const router = express.Router();
const c = require("../controllers/produtosControllers");

router.get("/", c.listarProdutos);
router.post("/", c.criarProduto);  
router.put("/:id", c.atualizarProduto);  
router.delete("/:id", c.excluirProduto);  
router.get("/relatorio/total-pedidos", c.totalPedidosPorProduto);

module.exports = router;
