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

    await inscricaoDuplicada(data.usuariosId, data.eventosId);

    const status = await limiteInscricoes(data.eventosId);

    data.status = status || "CONFIRMADA";

    const item = await prisma.inscricoes.create({
      data,
    });

    res.status(201).json(item);

  } catch (error) {
    res.status(400).json(error.toString());
  }
};

const listar = async (req, res) => {
  const lista = await prisma.inscricoes.findMany();
  res.status(200).json(lista);
};

const buscar = async (req, res) => {
  const { id } = req.params;

  const item = await prisma.inscricoes.findUnique({
    where: { id: Number(id) },
  });

  res.status(200).json(item);
};

const atualizar = async (req, res) => {
  const { id } = req.params;
  const dados = req.body;

  const item = await prisma.inscricoes.update({
    where: { id: Number(id) },
    data: dados,
  });

  res.status(200).json(item);
};

const excluir = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await prisma.inscricoes.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(item);

  } catch (error) {
    res.status(400).json(error.toString());
  }
};

const cancelar = async (req, res) => {
  try {
    const { id } = req.params;

    const inscricao = await prazoCancelamento(Number(id));

    const item = await prisma.inscricoes.update({
      where: { id: Number(id) },
      data: { status: "CANCELADA" }
    });

    if (inscricao.status === "CONFIRMADA") {
      await promoverListaEspera(inscricao.eventosId);
    }

    res.status(200).json(item);

  } catch (error) {
    res.status(400).json(error.toString());
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