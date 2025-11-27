const express = require("express");
const router = express.Router();
const c = require("../controllers/alunosControllers");

router.get("/", c.listarAlunos);
router.post("/", c.criarAluno);  
router.put("/:id", c.atualizarAluno);  
router.delete("/:id", c.excluirAluno);  
router.get("/relatorio/total-gasto", c.totalGastoPorAluno);

module.exports = router;
