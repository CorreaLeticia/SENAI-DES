let registros = JSON.parse(
    localStorage.getItem("registrosAgua")
) || [];

let grafico;

const modal = document.getElementById("modal");

const form = document.getElementById("formAgua");

const lista = document.getElementById("listaAgua");

const btnAdicionar =
    document.getElementById("btnAdicionar");

const fecharModal =
    document.getElementById("fecharModal");

const meta =
    document.getElementById("meta");

const consumido =
    document.getElementById("consumido");

const porcentagem =
    document.getElementById("porcentagem");

const btnTema =
    document.getElementById("btnTema");

if (localStorage.getItem("tema") === "dark") {

    document.body.classList.add("dark");

    btnTema.checked = true;

}


btnTema.addEventListener("change", function () {

    if (btnTema.checked) {

        document.body.classList.add("dark");

        localStorage.setItem("tema", "dark");

    } else {

        document.body.classList.remove("dark");

        localStorage.setItem("tema", "light");

    }

});

btnAdicionar.addEventListener("click", function () {

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


    const registro = {

        data:
            document.getElementById("data").value,

        quantidade_em_ml:
            Number(
                document.getElementById("quantidade").value
            ),

        peso_atual_kg:
            Number(
                document.getElementById("peso").value
            )

    };


    registros.push(registro);


    salvarDados();

    form.reset();

    modal.classList.remove("ativo");

    atualizarTela();

});

function salvarDados() {

    localStorage.setItem(
        "registrosAgua",
        JSON.stringify(registros)
    );

}

function mostrarLista() {

    lista.innerHTML = "";


    if (registros.length === 0) {

        lista.innerHTML = `

            <div class="vazio">

                <h3>
                    Nenhum registro
                </h3>

                <p>
                    Adicione seu primeiro consumo de água.
                </p>

            </div>

        `;

        return;
    }


    registros.forEach(function (item, index) {

        const div =
            document.createElement("div");


        div.classList.add("registro-agua");


        div.innerHTML = `

            <div>

                <h3>
                    ${item.quantidade_em_ml} ml
                </h3>

                <p>
                    Data: ${formatarData(item.data)}
                </p>

                <p>
                    Peso: ${item.peso_atual_kg} kg
                </p>

            </div>


            <button
                class="btn-excluir"
                type="button"
            >
                🗑️
            </button>

        `;


        const btnExcluir =
            div.querySelector(".btn-excluir");


        btnExcluir.addEventListener(
            "click",
            function () {

                excluirRegistro(index);

            }
        );


        lista.appendChild(div);

    });

}

function excluirRegistro(index) {

    if (
        !confirm(
            "Deseja excluir este registro?"
        )
    ) {

        return;

    }


    registros.splice(index, 1);


    salvarDados();

    atualizarTela();

}

function calcularMeta() {

    if (registros.length === 0) {

        meta.textContent = "0 ml";

        return 0;

    }


    const ultimoRegistro =
        registros[registros.length - 1];


    const peso =
        ultimoRegistro.peso_atual_kg;

    const metaDiaria =
        peso * 35;


    meta.textContent =
        `${metaDiaria.toFixed(0)} ml`;


    return metaDiaria;

}

function calcularConsumo() {

    const hoje =
        new Date()
            .toISOString()
            .split("T")[0];


    let total = 0;


    registros.forEach(function (item) {

        if (item.data === hoje) {

            total += item.quantidade_em_ml;

        }

    });


    consumido.textContent =
        `${total.toFixed(0)} ml`;


    return total;

}

function calcularPorcentagem() {

    const metaDiaria =
        calcularMeta();


    const totalConsumido =
        calcularConsumo();


    if (metaDiaria === 0) {

        porcentagem.textContent = "0%";

        return;

    }


    const resultado =
        (totalConsumido / metaDiaria) * 100;


    porcentagem.textContent =
        `${resultado.toFixed(0)}%`;

}

function criarGrafico() {

    const canvas =
        document.getElementById("grafico");


    if (grafico) {

        grafico.destroy();

    }


    if (registros.length === 0) {

        return;

    }


    const registrosOrdenados =
        [...registros].sort(
            function (a, b) {

                return (
                    new Date(a.data) -
                    new Date(b.data)
                );

            }
        );


    const datas =
        registrosOrdenados.map(
            function (item) {

                return formatarData(
                    item.data
                );

            }
        );


    const quantidades =
        registrosOrdenados.map(
            function (item) {

                return item.quantidade_em_ml;

            }
        );


    grafico = new Chart(canvas, {

        type: "bar",


        data: {

            labels: datas,


            datasets: [

                {

                    label:
                        "Consumo de água (ml)",

                    data:
                        quantidades

                }

            ]

        },


        options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

                y: {

                    beginAtZero: true,

                    title: {

                        display: true,

                        text: "Quantidade (ml)"

                    }

                }

            }

        }

    });

}

function formatarData(data) {

    const partes =
        data.split("-");


    return (
        `${partes[2]}/` +
        `${partes[1]}/` +
        `${partes[0]}`
    );

}

function atualizarTela() {

    mostrarLista();

    calcularPorcentagem();

    criarGrafico();

}
atualizarTela();