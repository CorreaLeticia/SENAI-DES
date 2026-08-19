function cadastrar() {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    let usuario = {
        email: email,
        senha: senha
    };

    let lista = localStorage.getItem("usuarios");

    if (lista == null || lista.length == 0) {
        lista = [];
    } else {
        lista = JSON.parse(lista);
    }
    lista.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(lista));
};

function limparCadastro() {
    localStorage.removeItem("usuario");
    console.log("Cadastro removido!");
}

function recuperarCadastro() {
    let lista = localStorage.getItem("usuarios");

    lista = JSON.parse(lista);

    let tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    lista.forEach((usuario, indice) => {
        let linha = document.createElement("tr");
        let tdEmail = document.createElement("td");
        let tdSenha = document.createElement("td");
        let tdExclui = document.createElement("td");
        let btExclui = document.createElement("button");
        btExclui.innerHTML = "Excluir";
        btExclui.addEventListener("click", () => { excluirUsuario(indice) });
        tdExclui.appendChild(btExclui);

        tdEmail.innerHTML = usuario.email;
        tdSenha.innerHTML = usuario.senha;

        linha.appendChild(tdEmail);
        linha.appendChild(tdSenha);
        linha.appendChild(tdExclui);

        tbody.appendChild(linha);

    });
}

function excluirUsuario(indice) {
    let lista = localStorage.getItem("usuarios");

    lista = JSON.parse(lista);

    lista.splice(indice, 1);

    localStorage.setItem("usuarios", JSON.stringify(lista));

    recuperarCadastro();

}