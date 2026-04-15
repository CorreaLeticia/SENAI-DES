const express = require("express");
const router = express.Router();

const {
  cadastrar,
  listar,
  buscar,
  atualizar,
  excluir,
} = require("../controllers/imagens.controller");

const upload = require("../middleware/uploadImagem");

router.post("/cadastrar/:id", upload, cadastrar);
router.get("/listar", listar);
router.get("/buscar/:id", buscar);
router.put("/atualizar/:id", atualizar);
router.delete("/excluir/:id", excluir);

module.exports = router;