let abastecimentos = JSON.parse(
    localStorage.getItem("abastecimentos")
) || [];

let indiceEditando = null;
let grafico = null;

const modal = document.getElementById("modal");
const form = document.getElementById("formAbastecimento");

const btnAdicionar = document.getElementById("btnAdicionar");
const fecharModal = document.getElementById("fecharModal");

const lista = document.getElementById("listaAbastecimentos");

const precoMedio = document.getElementById("precoMedio");
const consumoMedio = document.getElementById("consumoMedio");

const tituloModal = document.getElementById("tituloModal");

const btnTema = document.getElementById("btnTema");

btnTema.addEventListener("change", function () {

    document.body.classList.toggle("dark");

    if (btnTema.checked) {
        localStorage.setItem("tema", "dark");
    } else {
        localStorage.setItem("tema", "light");
    }

});

const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "dark") {
    document.body.classList.add("dark");
    btnTema.checked = true;
}

btnAdicionar.addEventListener("click", function () {

    indiceEditando = null;

    tituloModal.textContent = "Novo abastecimento";

    form.reset();

    modal.classList.add("ativo");

});

fecharModal.addEventListener("click", function () {

    modal.classList.remove("ativo");

});

modal.addEventListener("click", function (event) {

    if (event.target === modal) {
        modal.classList.remove("ativo");
    }

});

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const abastecimento = {

        data: document.getElementById("data").value,

        combustivel: document.getElementById("combustivel").value,

        litros: Number(
            document.getElementById("litros").value
        ),

        valor_pago: Number(
            document.getElementById("valorPago").value
        ),

        quilometragem: Number(
            document.getElementById("quilometragem").value
        )

    };


    if (indiceEditando !== null) {

        abastecimentos[indiceEditando] = abastecimento;

    } else {

        abastecimentos.push(abastecimento);

    }


    salvarDados();

    form.reset();

    modal.classList.remove("ativo");

    indiceEditando = null;

    atualizarTela();

});

function salvarDados() {

    localStorage.setItem(
        "abastecimentos",
        JSON.stringify(abastecimentos)
    );

}

function mostrarLista() {

    lista.innerHTML = "";


    if (abastecimentos.length === 0) {

        lista.innerHTML = `
            <div class="vazio">
                <h3>Nenhum abastecimento cadastrado</h3>
                <p>Clique no botão + para adicionar seu primeiro registro.</p>
            </div>
        `;

        return;

    }


    const registrosOrdenados = abastecimentos
        .map(function (item, index) {

            return {
                ...item,
                indiceOriginal: index
            };

        })
        .sort(function (a, b) {

            return new Date(b.data) - new Date(a.data);

        });


    registrosOrdenados.forEach(function (item) {

        const div = document.createElement("div");

        div.classList.add("abastecimento");


        const dataFormatada = formatarData(item.data);


        div.innerHTML = `

            <div class="abastecimento-info">

                <h3>${item.combustivel}</h3>

                <p>
                    ${dataFormatada} •
                    ${item.litros.toFixed(2)} L
                </p>

                <p>
                    ${item.quilometragem.toFixed(0)} km
                </p>

            </div>


            <div class="abastecimento-valor">

                <strong>
                    R$ ${item.valor_pago.toFixed(2)}
                </strong>

                <span>
                    R$ ${(item.valor_pago / item.litros).toFixed(2)}/L
                </span>

            </div>


            <button
                class="btn-excluir"
                onclick="excluirAbastecimento(event, ${item.indiceOriginal})"
            >
                🗑️
            </button>

        `;


        div.addEventListener("click", function () {

            abrirEdicao(item.indiceOriginal);

        });


        lista.appendChild(div);

    });

}

function excluirAbastecimento(event, indice) {

    event.stopPropagation();


    const confirmar = confirm(
        "Deseja realmente excluir este abastecimento?"
    );


    if (!confirmar) {
        return;
    }


    abastecimentos.splice(indice, 1);

    salvarDados();

    atualizarTela();

}

function abrirEdicao(indice) {

    indiceEditando = indice;

    const item = abastecimentos[indice];


    tituloModal.textContent = "Editar abastecimento";


    document.getElementById("data").value =
        item.data;

    document.getElementById("combustivel").value =
        item.combustivel;

    document.getElementById("litros").value =
        item.litros;

    document.getElementById("valorPago").value =
        item.valor_pago;

    document.getElementById("quilometragem").value =
        item.quilometragem;


    modal.classList.add("ativo");

}

function calcularPrecoMedio() {

    if (abastecimentos.length === 0) {

        precoMedio.textContent = "R$ 0,00/L";

        return;

    }


    let valorTotal = 0;
    let litrosTotal = 0;


    abastecimentos.forEach(function (item) {

        valorTotal += item.valor_pago;
        litrosTotal += item.litros;

    });


    if (litrosTotal === 0) {

        precoMedio.textContent = "R$ 0,00/L";

        return;

    }


    const media = valorTotal / litrosTotal;


    precoMedio.textContent =
        `R$ ${media.toFixed(2)}/L`;

}

function calcularConsumoMedio() {

    if (abastecimentos.length < 2) {

        consumoMedio.textContent = "0,00 km/L";

        return;

    }


    const registros = [...abastecimentos].sort(
        function (a, b) {

            return a.quilometragem - b.quilometragem;

        }
    );


    let consumos = [];


    for (let i = 1; i < registros.length; i++) {

        const kmPercorridos =
            registros[i].quilometragem -
            registros[i - 1].quilometragem;


        const litros =
            registros[i].litros;


        if (kmPercorridos > 0 && litros > 0) {

            const consumo =
                kmPercorridos / litros;

            consumos.push(consumo);

        }

    }


    if (consumos.length === 0) {

        consumoMedio.textContent = "0,00 km/L";

        return;

    }


    let soma = 0;


    consumos.forEach(function (valor) {

        soma += valor;

    });


    const media =
        soma / consumos.length;


    consumoMedio.textContent =
        `${media.toFixed(2)} km/L`;

}


// CRIAR GRÁFICO

function criarGrafico() {

    const canvas = document.getElementById("grafico");


    if (grafico) {
        grafico.destroy();
    }


    if (abastecimentos.length === 0) {
        return;
    }


    const registros = [...abastecimentos].sort(
        function (a, b) {

            return new Date(a.data) -
                new Date(b.data);

        }
    );


    const labels = registros.map(function (item) {

        return formatarData(item.data);

    });


    const litros = registros.map(function (item) {

        return item.litros;

    });


    const valores = registros.map(function (item) {

        return item.valor_pago;

    });


    const precos = registros.map(function (item) {

        return item.valor_pago / item.litros;

    });


    grafico = new Chart(canvas, {

        type: "bar",

        data: {

            labels: labels,

            datasets: [

                {
                    label: "Litros",
                    data: litros,
                    yAxisID: "y"
                },

                {
                    label: "Valor pago (R$)",
                    data: valores,
                    yAxisID: "y1",
                    type: "line"
                },

                {
                    label: "Preço por litro (R$)",
                    data: precos,
                    yAxisID: "y1",
                    type: "line"
                }

            ]

        },


        options: {

            responsive: true,

            maintainAspectRatio: false,

            interaction: {
                mode: "index",
                intersect: false
            },

            scales: {

                y: {

                    beginAtZero: true,

                    title: {
                        display: true,
                        text: "Litros"
                    }

                },

                y1: {

                    beginAtZero: true,

                    position: "right",

                    title: {
                        display: true,
                        text: "Valor (R$)"
                    },

                    grid: {
                        drawOnChartArea: false
                    }

                }

            }

        }

    });

}

function formatarData(data) {

    if (!data) {
        return "";
    }


    const partes = data.split("-");


    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}

function atualizarTela() {

    mostrarLista();

    calcularPrecoMedio();

    calcularConsumoMedio();

    criarGrafico();

}

atualizarTela();