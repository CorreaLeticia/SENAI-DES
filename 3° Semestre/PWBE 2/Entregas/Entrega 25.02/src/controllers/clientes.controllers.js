const prisma = require('../data/prisma.js');

async function cadastrarCliente(req, res) {
    let { nome, cpf, email, cnh } = req.body;

    if (!nome || !cpf || !email || !cnh) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }

    nome = nome.trim();

    const palavras = nome.split(" ").filter(p => p !== "");

    if (palavras.length < 2) {
        return res.status(400).json({ erro: "Nome deve conter pelo menos duas palavras." });
    }

    if (nome.split("").some(c => c >= "0" && c <= "9")) {
        return res.status(400).json({ erro: "Nome não pode conter números." });
    }

    cpf = cpf.replace(".", "").replace(".", "").replace("-", "");

    if (cpf.length !== 11) {
        return res.status(400).json({ erro: "CPF deve ter exatamente 11 caracteres." });
    }

    email = email.toLowerCase();

    if (!email.includes("@") || !email.includes(".")) {
        return res.status(400).json({ erro: "Email inválido." });
    }

    const clienteExistente = await prisma.cliente.findUnique({
        where: { email }
    });

    if (clienteExistente) {
        return res.status(400).json({ erro: "Já existe cliente com esse email." });
    }

    const cnhArray = cnh.split("");

    if (cnhArray[0] < "0" || cnhArray[0] > "9") {
        return res.status(400).json({ erro: "CNH deve começar com número." });
    }

    const novoCliente = await prisma.cliente.create({
        data: { nome, cpf, email, cnh }
    });

    return res.status(201).json({
        mensagem: "Cliente cadastrado com sucesso.",
        cliente: novoCliente
    });
}

async function listarClientes(req, res) {
    const clientes = await prisma.cliente.findMany();
    return res.status(200).json(clientes);
}

async function buscarCliente(req, res) {
    const { id } = req.params;

    const cliente = await prisma.cliente.findUnique({
        where: { id: Number(id) }
    });

    if (!cliente) {
        return res.status(404).json({ erro: "Cliente não encontrado." });
    }

    return res.status(200).json(cliente);
}

async function atualizarCliente(req, res) {
    const { id } = req.params;

    const clienteExistente = await prisma.cliente.findUnique({
        where: { id: Number(id) }
    });

    if (!clienteExistente) {
        return res.status(404).json({ erro: "Cliente não encontrado." });
    }

    const clienteAtualizado = await prisma.cliente.update({
        where: { id: Number(id) },
        data: req.body
    });

    return res.status(200).json(clienteAtualizado);
}

async function deletarCliente(req, res) {
    const { id } = req.params;

    const clienteExistente = await prisma.cliente.findUnique({
        where: { id: Number(id) }
    });

    if (!clienteExistente) {
        return res.status(404).json({ erro: "Cliente não encontrado." });
    }

    await prisma.cliente.delete({
        where: { id: Number(id) }
    });

    return res.status(200).json({ mensagem: "Cliente deletado com sucesso." });
}


module.exports = {
    cadastrarCliente,
    listarClientes,
    buscarCliente,
    atualizarCliente,
    deletarCliente
};