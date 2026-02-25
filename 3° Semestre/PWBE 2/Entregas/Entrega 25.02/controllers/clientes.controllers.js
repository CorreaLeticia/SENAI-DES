const clientes = [];

function cadastrarCliente(req, res) {
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

    if (clientes.some(c => c.email === email)) {
        return res.status(400).json({ erro: "Já existe cliente com esse email." });
    }

    const cnhArray = cnh.split("");

    if (cnhArray[0] < "0" || cnhArray[0] > "9") {
        return res.status(400).json({ erro: "CNH deve começar com número." });
    }

    clientes.push({ nome, cpf, email, cnh });

    return res.status(201).json({ mensagem: "Cliente cadastrado com sucesso.", cliente: { nome, cpf, email, cnh } });
}

module.exports = { cadastrarCliente, clientes };