let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

const id = new URLSearchParams(window.location.search).get("id");

function salvar() {
  localStorage.setItem("eventos", JSON.stringify(eventos));
  render();
}

function abrirModal() {
  document.getElementById("modal").style.display = "block";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

function cadastrar() {
  const obj = {
    titulo: titulo.value,
    descricao: descricao.value,
    local: local.value,
    data: data.value,
    capacidade: capacidade.value,
    foto: foto.value,
    imagens: []
  };

  eventos.push(obj);
  salvar();
}

function render() {
  const div = document.getElementById("lista");
  if (!div) return;

  div.innerHTML = "";

  eventos.forEach((e, i) => {
    div.innerHTML += `
      <div class="card">
        <div>
          <strong>${e.titulo}</strong><br>
          <small>${e.local}</small>
        </div>

        <div>
          <button onclick="ver(${i})">Ver</button>
          <button onclick="excluir(${i})">Excluir</button>
        </div>
      </div>
    `;
  });
}

function excluir(i) {
  eventos.splice(i, 1);
  salvar();
}

function ver(i) {
  window.location.href = `detalhes.html?id=${i}`;
}

function carregarDetalhes() {
  const div = document.getElementById("detalhes");
  if (!div) return;

  const e = eventos[id];

  div.innerHTML = `
    <h2>${e.titulo}</h2>
    <p>${e.descricao}</p>
    <p><b>Local:</b> ${e.local}</p>
    <p><b>Data:</b> ${e.data}</p>
    <p><b>Capacidade:</b> ${e.capacidade}</p>
  `;

  renderGaleria();
}

function adicionarImagem() {
  const url = document.getElementById("imgUrl").value;

  eventos[id].imagens.push(url);
  salvar();
}

function renderGaleria() {
  const div = document.getElementById("galeria");
  if (!div) return;

  div.innerHTML = "";

  eventos[id].imagens.forEach(img => {
    div.innerHTML += `<img src="${img}">`;
  });
}

render();
carregarDetalhes();