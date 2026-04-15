const prisma = require("../data/prisma");

const {
  limiteInscricoes,
  inscricaoDuplicada,
  prazoCancelamento,
  promoverListaEspera
} = require("../services/inscricoes.services");

const cadastrar = async (req, res) => {
  try {
    const data = req.body;

    if (!data.usuariosId || !data.eventosId) {
      return res.status(400).json({ erro: "usuariosId e eventosId são obrigatórios" });
    }

    await inscricaoDuplicada(data.usuariosId, data.eventosId);

    const status = await limiteInscricoes(data.eventosId);

    const item = await prisma.inscricoes.create({
      data: {
        ...data,
        status: status || "CONFIRMADA"
      }
    });

    return res.status(201).json(item);

  } catch (error) {
    return res.status(400).json({ erro: error.message || error.toString() });
  }
};

const listar = async (req, res) => {
  const lista = await prisma.inscricoes.findMany();
  return res.status(200).json(lista);
};

const buscar = async (req, res) => {
  const { id } = req.params;

  const item = await prisma.inscricoes.findUnique({
    where: { id: Number(id) },
  });

  if (!item) {
    return res.status(404).json({ erro: "Inscrição não encontrada" });
  }

  return res.status(200).json(item);
};

const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = req.body;

    const existe = await prisma.inscricoes.findUnique({
      where: { id: Number(id) }
    });

    if (!existe) {
      return res.status(404).json({ erro: "Inscrição não encontrada" });
    }

    const item = await prisma.inscricoes.update({
      where: { id: Number(id) },
      data: dados,
    });

    return res.status(200).json(item);

  } catch (error) {
    return res.status(400).json({ erro: error.message || error.toString() });
  }
};

const excluir = async (req, res) => {
  try {
    const { id } = req.params;

    const existe = await prisma.inscricoes.findUnique({
      where: { id: Number(id) }
    });

    if (!existe) {
      return res.status(404).json({ erro: "Inscrição não encontrada" });
    }

    await prisma.inscricoes.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ mensagem: "Inscrição removida com sucesso" });

  } catch (error) {
    return res.status(400).json({ erro: error.message || error.toString() });
  }
};

const cancelar = async (req, res) => {
  try {
    const { id } = req.params;

    const inscricao = await prisma.inscricoes.findUnique({
      where: { id: Number(id) }
    });

    if (!inscricao) {
      return res.status(404).json({ erro: "Inscrição não encontrada" });
    }

    if (inscricao.status !== "CONFIRMADA") {
      return res.status(400).json({ erro: "Só inscrições confirmadas podem ser canceladas" });
    }

    await prisma.inscricoes.update({
      where: { id: Number(id) },
      data: { status: "CANCELADA" }
    });

    await promoverListaEspera(inscricao.eventosId);

    return res.status(200).json({ mensagem: "Inscrição cancelada com sucesso" });

  } catch (error) {
    return res.status(400).json({ erro: error.message || error.toString() });
  }
};

module.exports = {
  cadastrar,
  listar,
  buscar,
  atualizar,
  excluir,
  cancelar
};