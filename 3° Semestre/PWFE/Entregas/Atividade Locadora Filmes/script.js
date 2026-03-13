const modalFilme = document.querySelector("#modalFilme");
var filmes = JSON.parse(localStorage.getItem("filmes")) || [];

renderizarTabela();

function salvarLocal() {
    localStorage.setItem("filmes", JSON.stringify(filmes));
    window.location.reload();
}

function abrirModal() {
    modalFilme.style.display = "block";
}

function fecharModal() {
    modalFilme.style.display = "none";
}

const formFilme = document.querySelector("#formFilme");

formFilme.addEventListener("submit", e => {

    e.preventDefault();

    const obj = {

        titulo: formFilme.titulo.value,
        genero: formFilme.genero.value,
        ano: formFilme.ano.value,
        produtora: formFilme.produtora.value,
        duracao: formFilme.duracao.value,
        foto: formFilme.foto.value,
        resumo: formFilme.resuno.value

    }

    filmes.push(obj);
    salvarLocal();
})

function renderizarTabela() {
    const corpo = document.querySelector("#dados");

    corpo.innerHTML = "";
    filmes.forEach((f, i) => {

        corpo.innerHTML += `
        <tr>
        <td><img src="${f.foto}" width="70"></td>
        <td>${f.titulo}</td>
        <td>${f.genero}</td>
        <td>${f.ano}</td>
        <td>${f.produtora}</td>
        <td>${f.duracao}</td>
        <td>${f.sintese}</td>
        <td>
        <button onclick="excluir(${i})">Excluir</button>
        </td>
        </tr>
        `;
    })
}
function excluir(indice) {
    filmes.splice(indice, 1);
    salvarLocal();
}
function filtrarGenero() {
    const generoSelecionado = document.querySelector("#filtroGenero").value;
    const corpo = document.querySelector("#dados");
    corpo.innerHTML = "";
    filmes.forEach((f, i) => {

        if (generoSelecionado == "todos" || f.genero == generoSelecionado) {
            corpo.innerHTML += `
            <tr>
            <td><img src="${f.foto}" width="70"></td>
            <td>${f.titulo}</td>
            <td>${f.genero}</td>
            <td>${f.ano}</td>
            <td>${f.produtora}</td>
            <td>${f.duracao}</td>
            <td>${f.sintese}</td>
            <td>
            <button onclick="excluir(${i})">Excluir</button>
            </td>
            </tr>
            `;
        }

    })

}