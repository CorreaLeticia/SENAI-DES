const key = "bd4829c39a2a2d5ac0214b075cddd711";

async function buscarCidade(cidade) {
    try {
        const resposta = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`
        );

        const dados = await resposta.json();

        if (dados.cod === "404") {
            alert("Cidade não encontrada!");
            return;
        }

        colocarDadosNaTela(dados);

    } catch (erro) {
        alert("Erro ao buscar dados da cidade.");
        console.error(erro);
    }
}

function colocarDadosNaTela(dados) {
    document.querySelector(".cidade").innerHTML =
        "Tempo em " + dados.name;

    document.querySelector(".temp").innerHTML =
        Math.floor(dados.main.temp) + "°C";

    document.querySelector(".texto-previsao").innerHTML =
        dados.weather[0].description;

    document.querySelector(".umidade").innerHTML =
        "Umidade: " + dados.main.humidity + "%";

    document.querySelector(".img-previsao").src =
        `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}

function CliqueinoBotao() {
    const cidade = document.querySelector(".input-cidade").value;

    if (!cidade) {
        alert("Digite o nome de uma cidade!");
        return;
    }

    buscarCidade(cidade);
}