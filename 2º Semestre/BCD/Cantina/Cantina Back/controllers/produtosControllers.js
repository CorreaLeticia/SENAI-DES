const db = require("../data/connection");

const criarProduto = async (req, res) => {
    try {
        const { nome, preco } = req.body;

     
        if (!nome || nome.trim() === "") {
            return res.status(400).json({ erro: "O nome do produto é obrigatório." });
        }

        if (preco == null || preco <= 0) {
            return res.status(400).json({ erro: "O preço deve ser maior que 0." });
        }
        

        const [resultado] = await db.query(
            "INSERT INTO produtos (nome, preco) VALUES (?, ?)",
            [nome, preco]
        );

        res.status(201).json({
            id_produto: resultado.insertId,
            nome,
            preco
        });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

const listarProdutos = async (req, res) => {
    try {
        const [produtos] = await db.query("SELECT * FROM produtos");
        res.json(produtos);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

const atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, preco } = req.body;

      
        if (!nome || nome.trim() === "") {
            return res.status(400).json({ erro: "O nome do produto é obrigatório." });
        }

        if (preco == null || preco <= 0) {
            return res.status(400).json({ erro: "O preço deve ser maior que 0." });
        }
        

        const [existe] = await db.query("SELECT * FROM produtos WHERE id_produto = ?", [id]);
        if (existe.length === 0) {
            return res.status(404).json({ erro: "Produto não encontrado." });
        }

        await db.query("UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?", 
            [nome, preco, id]
        );

        res.json({ mensagem: "Produto atualizado com sucesso!", produto: { id_produto: id, nome, preco } });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

const excluirProduto = async (req, res) => {
    try {
        const { id } = req.params;

        const [existe] = await db.query("SELECT * FROM produtos WHERE id_produto = ?", [id]);
        if (existe.length === 0) {
            return res.status(404).json({ erro: "Produto não encontrado." });
        }

        await db.query("DELETE FROM produtos WHERE id_produto = ?", [id]);

        res.json({ mensagem: "Produto removido com sucesso!" });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

const totalPedidosPorProduto = async (req, res) => {
    try {
        const [resultado] = await db.query(`
            SELECT 
                pr.id_produto,
                pr.nome,
                SUM(pi.quantidade) AS total_pedidos
            FROM produtos pr
            LEFT JOIN pedido_itens pi ON pr.id_produto = pi.id_produto
            GROUP BY pr.id_produto, pr.nome
        `);
        res.json(resultado);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

module.exports = {
    criarProduto,
    listarProdutos,
    atualizarProduto,
    excluirProduto,
    totalPedidosPorProduto
};

