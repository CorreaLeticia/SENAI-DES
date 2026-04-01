const prisma = require("../data/prisma");

// ✅ CADASTRAR
const cadastrar = async (req, res) => {
    try {
        const data = req.body;

        const item = await prisma.usuarios.create({
            data
        });

        res.status(201).json(item);

    } catch (error) {
        res.status(400).json(error.toString());
    }
};

// ✅ LISTAR
const listar = async (req, res) => {
    try {
        const lista = await prisma.usuarios.findMany();

        res.status(200).json(lista);

    } catch (error) {
        res.status(400).json(error.toString());
    }
};

// ✅ BUSCAR
const buscar = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.usuarios.findUnique({
            where: { id: Number(id) }
        });

        res.status(200).json(item);

    } catch (error) {
        res.status(400).json(error.toString());
    }
};

// ✅ ATUALIZAR
const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;

        const item = await prisma.usuarios.update({
            where: { id: Number(id) },
            data: dados
        });

        res.status(200).json(item);

    } catch (error) {
        res.status(400).json(error.toString());
    }
};

// ✅ EXCLUIR
const excluir = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.usuarios.delete({
            where: { id: Number(id) }
        });

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
    excluir
};