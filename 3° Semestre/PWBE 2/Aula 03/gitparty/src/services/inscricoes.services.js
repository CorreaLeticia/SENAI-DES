const prisma = require("../data/prisma");

const limiteInscricoes = async (eventoId) => {
  const evento = await prisma.eventos.findUnique({
    where: { id: eventoId },
    include: {
      inscricoes: true,
    },
  });

  const numeroInscricoes = evento.inscricoes.filter(
    (inscricao) => inscricao.status == "CONFIRMADA",
  ).length;

  if (numeroInscricoes == evento.capacidade_maxima) {
    return "LISTA_ESPERA";
  } else {
    return "";
  }
};

const inscricaoDuplicada = async (usuarioId, eventoId) => {
  const evento = await prisma.eventos.findUnique({
    where: { id: eventoId },
    include: {
      inscricoes: true,
    },
  });
  const inscrito = evento.inscricoes.filter(
    (inscricao) => inscricao.usuarioId == usuarioId,
  ).length;

  if (inscrito == 1) {
    throw new Error("Usuário já inscrito no evento!");
  }
};

const prazoCancelamento = async (inscricaoId) => {
  const inscricao = await prisma.inscricoes.findUnique({
    where: { id: inscricaoId },
    include: {
      evento: true,
    },
  });

  const agora = new Date();
  const dataEvento = new Date(inscricao.evento.data);

  const diferencaHoras = (dataEvento - agora) / (1000 * 60 * 60);

  if (diferencaHoras < 24) {
    throw new Error("Prazo de cancelamento encerrado (menos de 24h).");
  }
};

const promoverListaEspera = async (eventoId) => {
  const proximo = await prisma.inscricoes.findFirst({
    where: {
      eventosId: eventoId,
      status: "LISTA_ESPERA",
    },
    orderBy: {
      id: "asc",
    },
  });

  if (proximo) {
    await prisma.inscricoes.update({
      where: { id: proximo.id },
      data: { status: "CONFIRMADA" },
    });
  }
};

const verificarExcluirEvento = async (eventoId) => {
  const evento = await prisma.eventos.findUnique({
    where: { id: eventoId },
    include: { inscricoes: true },
  });

  const agora = new Date();

  if (new Date(evento.data) < agora) {
    throw new Error("Esse evento já ocorreu e não pode ser excluído.");
  }

  if (evento.inscricoes.length > 0) {
    throw new Error(
      "Esse evento possui participantes e não pode ser excluído.",
    );
  }
};

const encerrarEvento = async (eventoId) => {
  await prisma.inscricoes.updateMany({
    where: {
      eventosId: eventoId,
      status: "LISTA_ESPERA",
    },
    data: {
      status: "CANCELADA",
    },
  });
};

module.exports = {
  limiteInscricoes,
  inscricaoDuplicada,
  prazoCancelamento,
  promoverListaEspera,
  verificarExcluirEvento,
  encerrarEvento
};