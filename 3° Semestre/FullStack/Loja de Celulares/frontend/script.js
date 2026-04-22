const api = "http://localhost:3000/celulares";

async function carregar() {
    const res = await fetch(api);
    const dados = await res.json();

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    dados.forEach(c => {
        lista.innerHTML += `
            <div class="card">
                <img src="${c.imagem}" alt="${c.nome}">
                <div class="card-content">
                    <h3>${c.nome}</h3>
                    <p class="preco">R$ ${c.preco}</p>
                    <p>${c.marca}</p>
                    <p>${c.categoria}</p>

                    <div class="buttons">
                        <button class="edit" onclick='editar(${JSON.stringify(c)})'>Editar </button>
                        <button class="delete" onclick="deletar(${c.id})">Excluir</button>
                    </div>
                </div>
            </div>
        `;
    });
}

async function salvar() {
    const id = document.getElementById("id").value;

    const celular = {
        nome: nome.value,
        imagem: imagem.value,
        preco: preco.value,
        categoria: categoria.value,
        marca: marca.value
    };

    if (id) {
        await fetch(api + "/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(celular)
        });
    } else {
        await fetch(api, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(celular)
        });
    }

    limpar();
    carregar();
}

function editar(c) {
    document.getElementById("id").value = c.id || "";
    document.getElementById("nome").value = c.nome || "";
    document.getElementById("imagem").value = c.imagem || "";
    document.getElementById("preco").value = c.preco || "";
    document.getElementById("categoria").value = c.categoria || "";
    document.getElementById("marca").value = c.marca || "";
}

async function deletar(id) {
    if (confirm("Deseja excluir?")) {
        await fetch(api + "/" + id, { method: "DELETE" });
        carregar();
    }
}


function limpar() {
    document.getElementById("id").value = "";
    nome.value = "";
    imagem.value = "";
    preco.value = "";
    categoria.value = "";
    marca.value = "";
}

carregar();