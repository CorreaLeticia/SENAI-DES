const db = require("../data/connection");

const criarAluno = async (req, res) => {
    try {
        const { nome, turma } = req.body;

        if (!nome || !turma) {
            return res.status(400).json({ erro: "Os campos 'nome' e 'turma' são obrigatórios." });
        }

        const [resultado] = await db.query(
            "INSERT INTO alunos (nome, turma) VALUES (?, ?)",
            [nome, turma]
        );

        const novoAluno = {
            id_aluno: resultado.insertId,
            nome,
            turma
        };

        res.status(201).json(novoAluno);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

const listarAlunos = async (req, res) => {
    try {
        const [alunos] = await db.query("SELECT * FROM alunos");
        res.json(alunos);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

const atualizarAluno = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, turma } = req.body;

        const [existe] = await db.query("SELECT * FROM alunos WHERE id_aluno = ?", [id]);
        if (existe.length === 0) {
            return res.status(404).json({ erro: "Aluno não encontrado." });
        }

        await db.query("UPDATE alunos SET nome = ?, turma = ? WHERE id_aluno = ?", [nome, turma, id]);

        res.json({ mensagem: "Aluno atualizado com sucesso!", aluno: { id_aluno: id, nome, turma } });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

const excluirAluno = async (req, res) => {
    try {
        const { id } = req.params;

        const [existe] = await db.query("SELECT * FROM alunos WHERE id_aluno = ?", [id]);
        if (existe.length === 0) {
            return res.status(404).json({ erro: "Aluno não encontrado." });
        }

        await db.query("DELETE FROM alunos WHERE id_aluno = ?", [id]);

        res.json({ mensagem: "Aluno removido com sucesso!" });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

const totalGastoPorAluno = async (req, res) => {
    try {
        const [resultado] = await db.query(`
            SELECT 
                a.id_aluno,
                a.nome,
                SUM(p.preco * pi.quantidade) AS total_gasto
            FROM alunos a
            LEFT JOIN pedidos pe ON a.id_aluno = pe.id_aluno
            LEFT JOIN pedido_itens pi ON pe.id_pedido = pi.id_pedido
            LEFT JOIN produtos p ON pi.id_produto = p.id_produto
            GROUP BY a.id_aluno, a.nome
        `);
        res.json(resultado);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

module.exports = {
    criarAluno,
    listarAlunos,
    atualizarAluno,
    excluirAluno,
    totalGastoPorAluno
};
