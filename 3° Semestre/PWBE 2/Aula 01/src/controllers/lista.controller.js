// const con = require("../data/connection");

// const listarItens = async (req, res) => {
//     try{
//         const [lista] = await con.query("SELECT * FROM lista");

//         res.json(lista).status(200).end();
//     }catch (err) {
//         res.json(err).status(500).end();
//     }
// };

const prisma = require("../data/prisma");

const listarClientes = async (req, res) => {
    try {
        const lista = await prisma.cliente.findMany();

        res.json(lista).status(200).end();
    } catch (err) {
        res.json(err).status(500).end();
    }

};

const cadastrarCliente = async (req, res) => {
    try {
        const dados = req.body;

        const novoCliente = await prisma.cliente.create({
            data: dados
        });
        res.json(novoCliente).status(201).end();
    } catch (err) {
        res.json(err).status(500).end();
    }
};
module.exports = {
    listarClientes,
    cadastrarCliente
};