const API = "http://localhost:3000/tarefas";

async function registrarTarefa() {

  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const dataInicio = document.getElementById("dataInicio").value;
  const dataFim = document.getElementById("dataFim").value;
  const urlImagem = document.getElementById("urlImagem").value;

  if (!titulo || !descricao) {
    return alert("Preencha os campos");
  }

  const tarefa = {
    titulo,
    descricao,
    datainicio: dataInicio,
    datafinal: dataFim,
    imagemurl: urlImagem
  };

  await fetch(API + "/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tarefa)
  });

  limparFormulario();

  alert("Tarefa salva!");
}


async function renderizarTarefas() {

  const grade = document.getElementById("grade");

  if (!grade) return;

  const resposta = await fetch(API + "/listar");

  const lista = await resposta.json();

  grade.innerHTML = "";

  lista.forEach(item => {

    grade.innerHTML += `
      <div class="cartao">

        <img src="${item.imagemurl || 'https://picsum.photos/300'}">

        <h3>${item.titulo}</h3>

        <p>${item.descricao}</p>

        <small>
          ${formatarData(item.datainicio)}
        </small>

        <br><br>

        <button onclick="removerTarefa(${item.id})">
          Excluir
        </button>

      </div>
    `;
  });
}


async function removerTarefa(id) {

  await fetch(API + "/excluir/" + id, {
    method: "DELETE"
  });

  renderizarTarefas();
}


const chaveClima = "bd4829c39a2a2d5ac0214b075cddd711";

async function pesquisarClima() {

  const campo = document.querySelector(".campo-cidade");

  if (!campo) return;

  const cidade = campo.value;

  if (!cidade) {
    return alert("Digite uma cidade");
  }

  const resposta = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chaveClima}&lang=pt_br&units=metric`
  );

  const dados = await resposta.json();

  if (dados.cod != 200) {
    return alert("Cidade não encontrada");
  }

  document.querySelector(".nome-cidade").innerHTML =
    "Tempo em " + dados.name;

  document.querySelector(".temperatura").innerHTML =
    Math.floor(dados.main.temp) + "°C";

  document.querySelector(".descricao-clima").innerHTML =
    dados.weather[0].description;

  document.querySelector(".umidade").innerHTML =
    "Umidade: " + dados.main.humidity + "%";

  document.querySelector(".icone-clima").src =
    `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}

function limparFormulario() {

  const titulo = document.getElementById("titulo");
  const descricao = document.getElementById("descricao");
  const dataInicio = document.getElementById("dataInicio");
  const dataFim = document.getElementById("dataFim");
  const urlImagem = document.getElementById("urlImagem");

  if (titulo) titulo.value = "";
  if (descricao) descricao.value = "";
  if (dataInicio) dataInicio.value = "";
  if (dataFim) dataFim.value = "";
  if (urlImagem) urlImagem.value = "";
}

function formatarData(data) {

  return new Date(data).toLocaleDateString("pt-BR");
}

renderizarTarefas();