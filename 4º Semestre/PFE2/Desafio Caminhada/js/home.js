let caminhadas = JSON.parse(
    localStorage.getItem("caminhadas")
) || [];

let grafico;

const modal =
    document.getElementById("modal");

const form =
    document.getElementById("formCaminhada");

const lista =
    document.getElementById("listaCaminhadas");

const btnAdicionar =
    document.getElementById("btnAdicionar");

const fecharModal =
    document.getElementById("fecharModal");

const totalCaminhadas =
    document.getElementById("totalCaminhadas");

const distanciaTotal =
    document.getElementById("distanciaTotal");

const caloriasMedia =
    document.getElementById("caloriasMedia");

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


    const caminhada = {

        data:
            document.getElementById("data").value,

        partida:
            document.getElementById("partida").value,

        chegada:
            document.getElementById("chegada").value,

        distancia_em_km:
            Number(
                document.getElementById("distancia").value
            ),

        peso_atual_kg:
            Number(
                document.getElementById("peso").value
            )

    };


    caminhadas.push(caminhada);


    salvarDados();

    form.reset();

    modal.classList.remove("ativo");

    atualizarTela();

});
function salvarDados() {

    localStorage.setItem(
        "caminhadas",
        JSON.stringify(caminhadas)
    );

}
function calcularCalorias(caminhada) {

    return (
        0.7 *
        caminhada.peso_atual_kg *
        caminhada.distancia_em_km
    );

}
function mostrarLista() {

    lista.innerHTML = "";


    if (caminhadas.length === 0) {

        lista.innerHTML = `

            <div class="vazio">

                <h3>
                    Nenhuma caminhada registrada
                </h3>

                <p>
                    Clique no botão + para adicionar
                    sua primeira caminhada.
                </p>

            </div>

        `;

        return;
    }


    caminhadas.forEach(function (item, index) {

        const div =
            document.createElement("div");


        div.classList.add("caminhada");


        const calorias =
            calcularCalorias(item);


        div.innerHTML = `

            <div class="caminhada-info">

                <h3>
                    ${item.partida} → ${item.chegada}
                </h3>

                <p>
                    ${formatarData(item.data)}
                </p>

                <p>
                    ${item.distancia_em_km.toFixed(1)} km
                    •
                    ${item.peso_atual_kg} kg
                </p>

            </div>


            <div class="caminhada-calorias">

                <strong>
                    ${calorias.toFixed(1)} kcal
                </strong>

                <span>
                    gasto estimado
                </span>

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

                excluirCaminhada(index);

            }
        );


        lista.appendChild(div);

    });

}
function excluirCaminhada(index) {

    if (
        !confirm(
            "Deseja excluir esta caminhada?"
        )
    ) {

        return;

    }


    caminhadas.splice(index, 1);

    salvarDados();

    atualizarTela();

}
function calcularTotalCaminhadas() {

    totalCaminhadas.textContent =
        caminhadas.length;

}

function calcularDistanciaTotal() {

    let total = 0;


    caminhadas.forEach(function (item) {

        total += item.distancia_em_km;

    });


    distanciaTotal.textContent =
        `${total.toFixed(1)} km`;

}
function calcularMediaCalorias() {

    if (caminhadas.length === 0) {

        caloriasMedia.textContent =
            "0 kcal";

        return;

    }


    let total = 0;


    caminhadas.forEach(function (item) {

        total += calcularCalorias(item);

    });


    const media =
        total / caminhadas.length;


    caloriasMedia.textContent =
        `${media.toFixed(1)} kcal`;

}

function criarGrafico() {

    const canvas =
        document.getElementById("grafico");


    if (grafico) {

        grafico.destroy();

    }


    if (caminhadas.length === 0) {

        return;

    }


    const caminhadasOrdenadas =
        [...caminhadas].sort(
            function (a, b) {

                return (
                    new Date(a.data) -
                    new Date(b.data)
                );

            }
        );


    const datas =
        caminhadasOrdenadas.map(
            function (item) {

                return formatarData(
                    item.data
                );

            }
        );


    const distancias =
        caminhadasOrdenadas.map(
            function (item) {

                return item.distancia_em_km;

            }
        );


    const calorias =
        caminhadasOrdenadas.map(
            function (item) {

                return calcularCalorias(item);

            }
        );


    grafico = new Chart(canvas, {

        type: "bar",


        data: {

            labels: datas,


            datasets: [

                {

                    label:
                        "Distância (km)",

                    data:
                        distancias

                },

                {

                    label:
                        "Calorias gastas",

                    data:
                        calorias

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

                        text: "Valor"

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

    calcularTotalCaminhadas();

    calcularDistanciaTotal();

    calcularMediaCalorias();

    criarGrafico();

}
atualizarTela();