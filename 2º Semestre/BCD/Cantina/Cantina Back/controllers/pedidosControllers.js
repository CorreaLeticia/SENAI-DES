const db = require("../data/connection");

const criarPedido = async (req, res) => {
    try {
        const { id_aluno, data_pedido, itens } = req.body;

        if (!id_aluno || !data_pedido || !Array.isArray(itens) || itens.length === 0) {
            return res.status(400).json({ erro: "id_aluno, data_pedido e itens são obrigatórios." });
        }

        const [pedido] = await db.query(
            "INSERT INTO pedidos (id_aluno, data_pedido) VALUES (?, ?)",
            [id_aluno, data_pedido]
        );

        const id_pedido = pedido.insertId;

        for (let item of itens) {
            await db.query(
                "INSERT INTO pedido_itens (id_pedido, id_produto, quantidade) VALUES (?, ?, ?)",
                [id_pedido, item.id_produto, item.quantidade]
            );
        }

        res.status(201).json({ mensagem: "Pedido criado com sucesso.", id_pedido });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

const listarPedidos = async (req, res) => {
    try {
        const [pedidos] = await db.query(`
            SELECT 
                pe.id_pedido,
                pe.data_pedido,
                a.nome AS aluno
            FROM pedidos pe
            INNER JOIN alunos a ON pe.id_aluno = a.id_aluno
        `);
        res.json(pedidos);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

const atualizarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_aluno, data_pedido } = req.body;

        const [existe] = await db.query("SELECT * FROM pedidos WHERE id_pedido = ?", [id]);
        if (existe.length === 0) {
            return res.status(404).json({ erro: "Pedido não encontrado." });
        }

        await db.query("UPDATE pedidos SET id_aluno = ?, data_pedido = ? WHERE id_pedido = ?", [id_aluno, data_pedido, id]);

        res.json({ mensagem: "Pedido atualizado com sucesso!", pedido: { id_pedido: id, id_aluno, data_pedido } });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

const excluirPedido = async (req, res) => {
    try {
        const { id } = req.params;

        const [existe] = await db.query("SELECT * FROM pedidos WHERE id_pedido = ?", [id]);
        if (existe.length === 0) {
            return res.status(404).json({ erro: "Pedido não encontrado." });
        }

        await db.query("DELETE FROM pedido_itens WHERE id_pedido = ?", [id]);
        await db.query("DELETE FROM pedidos WHERE id_pedido = ?", [id]);

        res.json({ mensagem: "Pedido removido com sucesso!" });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

const totalFaturado = async (req, res) => {
    try {
        const [resultado] = await db.query(`
            SELECT SUM(p.preco * pi.quantidade) AS total_faturado
            FROM pedidos pe
            LEFT JOIN pedido_itens pi ON pe.id_pedido = pi.id_pedido
            LEFT JOIN produtos p ON pi.id_produto = p.id_produto
        `);
        res.json(resultado);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

module.exports = {
    criarPedido,
    listarPedidos,
    atualizarPedido,
    excluirPedido,
    totalFaturado
};
