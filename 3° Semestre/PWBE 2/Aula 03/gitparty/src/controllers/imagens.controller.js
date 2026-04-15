const prisma = require("../data/prisma");
const fs = require("fs");

const cadastrar = async (req, res) => {
  try {
    const idPublicacao = parseInt(req.params.id);
    const arquivo = req.file;

    if (!arquivo) {
      return res.status(400).json({ erro: "Arquivo não enviado" });
    }

    const pastaFinal = `uploads/publicacoes/${idPublicacao}`;
    const caminhoFinal = `${pastaFinal}/${arquivo.filename}`;

    if (!fs.existsSync(pastaFinal)) {
      fs.mkdirSync(pastaFinal, { recursive: true });
    }

    fs.renameSync(arquivo.path, caminhoFinal);

   const imagem = await prisma.imagem.create({
  data: {
    nomeOriginal: arquivo.originalname,
    nomeArquivo: arquivo.filename,
    mimeType: arquivo.mimetype,
    path: caminhoFinal,
    eventosId: idPublicacao,
  },
});

    return res.status(201).json(imagem);

  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({ erro: error.message });
  }
};

const listar = async (req, res) => {
  const lista = await prisma.imagem.findMany();
  return res.status(200).json(lista);
};

const buscar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const imagem = await prisma.imagem.findUnique({
      where: { id },
    });

    if (!imagem) {
      return res.status(404).json({ erro: "Imagem não encontrada" });
    }

    if (!fs.existsSync(imagem.path)) {
      return res.status(404).json({ erro: "Arquivo não encontrado no servidor" });
    }

    return res.sendFile(require("path").resolve(imagem.path));

  } catch (erro) {
    return res.status(500).json({ erro: "Erro ao buscar imagem" });
  }
};

const atualizar = async (req, res) => {
  const { id } = req.params;

  const item = await prisma.imagem.update({
    where: { id: Number(id) },
    data: req.body,
  });

  return res.status(200).json(item);
};

const excluir = async (req, res) => {
  const { id } = req.params;

  const item = await prisma.imagem.delete({
    where: { id: Number(id) },
  });

  return res.status(200).json(item);
};

module.exports = {
  cadastrar,
  listar,
  buscar,
  atualizar,
  excluir,
};