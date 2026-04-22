const db = require('../db');

exports.listar = (req, res) => {
    db.query('SELECT * FROM celulares', (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

exports.buscarPorId = (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM celulares WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]);
    });
};

exports.criar = (req, res) => {
    const { nome, imagem, preco, categoria, marca } = req.body;

    const sql = `
        INSERT INTO celulares (nome, imagem, preco, categoria, marca)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [nome, imagem, preco, categoria, marca], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensagem: 'Celular cadastrado com sucesso' });
    });
};

exports.atualizar = (req, res) => {
    const { id } = req.params;
    const { nome, imagem, preco, categoria, marca } = req.body;

    const sql = `
        UPDATE celulares 
        SET nome=?, imagem=?, preco=?, categoria=?, marca=? 
        WHERE id=?
    `;

    db.query(sql, [nome, imagem, preco, categoria, marca, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensagem: 'Atualizado com sucesso!' });
    });

    db.query(sql, [nome, imagem, preco, categoria, marca, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensagem: 'Celular atualizado com sucesso' });
    });
};

exports.deletar = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM celulares WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ mensagem: 'Celular deletado com sucesso' });
    });
};