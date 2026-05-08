const prisma = require("../data/prisma");

const novaTarefa = async (req, res) => {
  try {
    const tarefa = req.body;

    const ntarefa = await prisma.tarefa.create({
      data: {
        ...tarefa,
        datainicio: new Date(tarefa.datainicio),
        datafinal: new Date(tarefa.datafinal)
      }
    });

    return res.status(201).json(ntarefa);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar tarefa" });
  }
};
const listTarefa = async (req, res) => {
  const tarefa = await prisma.tarefa.findMany();

  res.json(tarefa).status(200).end();
};

const buscarTarefa = async (req, res) => {
  const { id } = req.params;

  const tarefa = await prisma.tarefa.findUnique({
    where: { id: Number(id) },
  });

  res.status(200).json(tarefa);
};

const apagarTarefa = async (req, res) => {
  try {
    const { id } = req.params;

    const tarefa = await prisma.tarefa.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json(tarefa);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
};

const atualizarTarefa = async (req, res) => {
  const { id } = req.params;
  const dados = req.body;

  const tarefa = await prisma.tarefa.update({
    where: { id: Number(id) }, 
    data: dados,
  });

  res.json(tarefa).status(200).end();
};

module.exports = {
  novaTarefa,
  listTarefa,
  buscarTarefa,
  apagarTarefa,
  atualizarTarefa,
};
