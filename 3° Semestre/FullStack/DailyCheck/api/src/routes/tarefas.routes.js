const express = require("express");
const router = express.Router();

const {
  novaTarefa,
  listTarefa,
  buscarTarefa,
  apagarTarefa,
  atualizarTarefa
} = require("../controllers/tarefas.controller");

router.post("/cadastrar", novaTarefa);
router.get("/listar", listTarefa);
router.get("/buscar/:id", buscarTarefa);
router.put("/atualizar/:id", atualizarTarefa);
router.delete("/excluir/:id", apagarTarefa);

module.exports = router;