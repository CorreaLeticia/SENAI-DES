function getUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function setUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function getEventos() {
    return JSON.parse(localStorage.getItem("eventos")) || [];
}

function setEventos(eventos) {
    localStorage.setItem("eventos", JSON.stringify(eventos));
}

function getInscricoes() {
    return JSON.parse(localStorage.getItem("inscricoes")) || [];
}

function setInscricoes(inscricoes) {
    localStorage.setItem("inscricoes", JSON.stringify(inscricoes));
}

function abrirModalEvento() {
    document.getElementById("modalEvento")
        .classList.remove("hidden");
}

function fecharModalEvento() {
    document.getElementById("modalEvento")
        .classList.add("hidden");
}

function abrirModalUsuario() {
    document.getElementById("modalUsuario")
        .classList.remove("hidden");
}

function fecharModalUsuario() {
    document.getElementById("modalUsuario")
        .classList.add("hidden");
}

function abrirModalInscricao() {

    carregarSelectUsuarios();
    carregarSelectEventos();

    document.getElementById("modalInscricao")
        .classList.remove("hidden");
}

function fecharModalInscricao() {
    document.getElementById("modalInscricao")
        .classList.add("hidden");
}

function cadastrarUsuario() {

    let usuarios = getUsuarios();

    const novoUsuario = {
        id: usuarios.length + 1,
        nome: document.getElementById("nomeUsuario").value,
        email: document.getElementById("emailUsuario").value,
        senha: document.getElementById("senhaUsuario").value,
        data_cadastro: new Date().toISOString()
    };

    usuarios.push(novoUsuario);

    setUsuarios(usuarios);

    fecharModalUsuario();

    alert("Usuário cadastrado!");
}

function cadastrarEvento() {

    let eventos = getEventos();

    const novoEvento = {
        id: eventos.length + 1,
        titulo: document.getElementById("titulo").value,
        descricao: document.getElementById("descricao").value,
        data_evento: document.getElementById("data_evento").value,
        local: document.getElementById("local").value,
        capacidade_maxima: parseInt(
            document.getElementById("capacidade").value
        ),
        status: "ativo"
    };

    eventos.push(novoEvento);

    setEventos(eventos);

    atualizarEventos();

    fecharModalEvento();

    alert("Evento cadastrado!");
}

function atualizarEventos() {

    const tabela =
        document.getElementById("listaEventos");

    const cards =
        document.getElementById("cardsEventos");

    tabela.innerHTML = "";
    cards.innerHTML = "";

    let eventos = getEventos();

    eventos.forEach(evento => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
      <td>${evento.titulo}</td>

      <td>${evento.descricao}</td>

      <td>
        ${new Date(evento.data_evento)
                .toLocaleString("pt-BR")}
      </td>

      <td>${evento.local}</td>

      <td>${evento.capacidade_maxima}</td>

      <td>${evento.status}</td>

      <td>

        <button class="btn-secondary"
          onclick="cancelarEvento(${evento.id})">
          Cancelar
        </button>

        <button class="btn-secondary"
          onclick="encerrarEvento(${evento.id})">
          Encerrar
        </button>

        <button class="btn-secondary"
          onclick="excluirEvento(${evento.id})">
          Excluir
        </button>

      </td>
    `;

        tabela.appendChild(tr);

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
      <div class="card-content">

        <h3>${evento.titulo}</h3>

        <p>${evento.local}</p>

        <p>
          ${new Date(evento.data_evento)
                .toLocaleString("pt-BR")}
        </p>

        <p>
          Capacidade:
          ${evento.capacidade_maxima}
        </p>

        <p>Status: ${evento.status}</p>

      </div>
    `;

        cards.appendChild(card);
    });
}

function cancelarEvento(id) {

    let eventos = getEventos();

    const evento =
        eventos.find(e => e.id == id);

    if (evento) {

        evento.status = "cancelado";

        setEventos(eventos);
        atualizarEventos();
        alert("Evento cancelado!");
    }
}

function encerrarEvento(id) {

    let eventos = getEventos();

    const evento =
        eventos.find(e => e.id == id);

    if (evento) {

        evento.status = "encerrado";

        setEventos(eventos);

        atualizarEventos();

        alert("Evento encerrado!");
    }
}

function excluirEvento(id) {

    let eventos = getEventos();

    let inscricoes = getInscricoes();

    eventos =
        eventos.filter(e => e.id != id);

    inscricoes =
        inscricoes.filter(i =>
            i.evento_id != id
        );

    setEventos(eventos);

    setInscricoes(inscricoes);

    atualizarEventos();

    atualizarInscricoes();

    alert("Evento excluído!");
}

function carregarSelectUsuarios() {

    const select =
        document.getElementById("usuarioInscricao");

    select.innerHTML = "";

    let usuarios = getUsuarios();

    usuarios.forEach(usuario => {

        const option =
            document.createElement("option");

        option.value = usuario.id;

        option.textContent =
            usuario.nome;

        select.appendChild(option);
    });
}

function carregarSelectEventos() {

    const select =
        document.getElementById("eventoInscricao");

    select.innerHTML = "";

    let eventos = getEventos();

    eventos
        .filter(e => e.status === "ativo")
        .forEach(evento => {

            const option =
                document.createElement("option");

            option.value = evento.id;

            option.textContent =
                evento.titulo;

            select.appendChild(option);
        });
}

function realizarInscricao() {

    const usuario_id =
        document.getElementById("usuarioInscricao").value;

    const evento_id =
        document.getElementById("eventoInscricao").value;

    inscreverUsuario(usuario_id, evento_id);
    atualizarInscricoes();
    fecharModalInscricao();
}

function inscreverUsuario(usuario_id, evento_id) {

    let inscricoes = getInscricoes();

    let eventos = getEventos();

    const evento =
        eventos.find(e => e.id == evento_id);

    const duplicada =
        inscricoes.find(i =>
            i.usuario_id == usuario_id &&
            i.evento_id == evento_id &&
            i.status != "cancelada"
        );

    if (duplicada) {
        alert("Usuário já inscrito!");
        return;
    }

    const confirmados =
        inscricoes.filter(i =>
            i.evento_id == evento_id &&
            i.status == "confirmada"
        );

    let statusInscricao =
        confirmados.length <
            evento.capacidade_maxima
            ? "confirmada"
            : "lista_espera";

    const novaInscricao = {
        id: inscricoes.length + 1,
        usuario_id,
        evento_id,
        data_inscricao: new Date().toISOString(),
        status: statusInscricao
    };

    inscricoes.push(novaInscricao);

    setInscricoes(inscricoes);

    alert(
        `Inscrição realizada: ${statusInscricao}`
    );
}

function atualizarInscricoes() {

    const tabela =
        document.getElementById("listaInscricoes");

    tabela.innerHTML = "";

    let inscricoes = getInscricoes();

    let usuarios = getUsuarios();

    let eventos = getEventos();

    inscricoes.forEach(inscricao => {

        const usuario =
            usuarios.find(u =>
                u.id == inscricao.usuario_id
            );

        const evento =
            eventos.find(e =>
                e.id == inscricao.evento_id
            );

        const tr =
            document.createElement("tr");

        tr.innerHTML = `
      <td>${inscricao.id}</td>

      <td>${usuario?.nome}</td>

      <td>${evento?.titulo}</td>

      <td>${inscricao.status}</td>

      <td>
        ${new Date(inscricao.data_inscricao)
                .toLocaleDateString("pt-BR")}
      </td>

      <td>

        <button class="btn-secondary"
          onclick="cancelarInscricao(${inscricao.id})">

          Cancelar

        </button>

      </td>
    `;

        tabela.appendChild(tr);
    });
}

function cancelarInscricao(id) {

    let inscricoes = getInscricoes();

    let eventos = getEventos();

    const inscricao =
        inscricoes.find(i => i.id == id);

    const evento =
        eventos.find(e =>
            e.id == inscricao.evento_id
        );

    const agora = new Date();

    const dataEvento =
        new Date(evento.data_evento);

    const diferencaHoras =
        (dataEvento - agora) /
        (1000 * 60 * 60);

    if (diferencaHoras < 24) {

        alert(
            "Cancelamento não permitido!"
        );

        return;
    }

    inscricao.status = "cancelada";

    const fila =
        inscricoes.find(i =>
            i.evento_id == evento.id &&
            i.status == "lista_espera"
        );

    if (fila) {
        fila.status = "confirmada";
    }

    setInscricoes(inscricoes);

    atualizarInscricoes();

    alert("Inscrição cancelada!");
}

function filtrarEventos() {

    const filtro =
        document.getElementById("filtroStatus").value;

    const tabela =
        document.getElementById("listaEventos");

    tabela.innerHTML = "";

    let eventos = getEventos();

    eventos.forEach(evento => {

        if (
            filtro == "todos" ||
            evento.status == filtro
        ) {

            const tr =
                document.createElement("tr");

            tr.innerHTML = `
        <td>${evento.titulo}</td>

        <td>${evento.descricao}</td>

        <td>
          ${new Date(evento.data_evento)
                    .toLocaleString("pt-BR")}
        </td>

        <td>${evento.local}</td>

        <td>${evento.capacidade_maxima}</td>

        <td>${evento.status}</td>

        <td>

          <button class="btn-secondary"
            onclick="cancelarEvento(${evento.id})">
            Cancelar
          </button>

          <button class="btn-secondary"
            onclick="encerrarEvento(${evento.id})">
            Encerrar
          </button>

          <button class="btn-secondary"
            onclick="excluirEvento(${evento.id})">
            Excluir
          </button>

        </td>
      `;

            tabela.appendChild(tr);
        }
    });
}

window.onload = function () {

    atualizarEventos();

    atualizarInscricoes();
};