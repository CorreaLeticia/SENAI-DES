const carros = [];

function cadastrarCarro(req, res) {
    let { placa, marcaModelo, ano } = req.body;

    if (!placa || !marcaModelo || !ano) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }

    placa = placa.trim().toUpperCase().replace(" ", "");

    if (!placa) {
        return res.status(400).json({ erro: "Placa não pode ser vazia." });
    }

    if (placa.length !== 7) {
        return res.status(400).json({ erro: "Placa deve ter exatamente 7 caracteres." });
    }

    if (placa.includes(" ")) {
        return res.status(400).json({ erro: "Placa não pode conter espaços." });
    }

    marcaModelo = marcaModelo.trim();

    if (!marcaModelo) {
        return res.status(400).json({ erro: "Marca e modelo não podem estar vazios." });
    }

    const palavras = marcaModelo.split(" ");
    let palavrasFormatadas = [];

    for (let i = 0; i < palavras.length; i++) {
        if (palavras[i] !== "") {
            let primeira = palavras[i][0].toUpperCase();
            let resto = palavras[i].slice(1).toLowerCase();
            palavrasFormatadas.push(primeira + resto);
        }
    }

    marcaModelo = palavrasFormatadas.join(" ");

    if (ano.length !== 4) {
        return res.status(400).json({ erro: "Ano deve ter exatamente 4 dígitos." });
    }

    if (ano.split("").some(c => c < "0" || c > "9")) {
        return res.status(400).json({ erro: "Ano não pode conter letras." });
    }

    if (carros.some(c => c.placa.toUpperCase() === placa)) {
        return res.status(400).json({ erro: "Já existe um carro com essa placa." });
    }

    carros.push({ placa, marcaModelo, ano });

    return res.status(201).json({ mensagem: "Carro cadastrado com sucesso.", carro: { placa, marcaModelo, ano } });
}

module.exports = { cadastrarCarro, carros };