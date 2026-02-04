function bonus() {
    let salario = Number(document.getElementById("valor").value);
    let bonus = salario > 2000 ? salario * 0.10 : 0;

    document.getElementById("resultado").innerHTML =
        `Bônus: R$ ${bonus.toFixed(2)}<br>
         Salário final: R$ ${(salario + bonus).toFixed(2)}`;
}

function frete() {
    let valor = Number(document.getElementById("valor").value);
    let frete = valor >= 150 ? 0 : 20;

    resultado.innerHTML =
        `Frete: R$ ${frete}<br>Total: R$ ${valor + frete}`;
}

function combustivel() {
    let valor = Number(document.getElementById("valor").value);
    let desconto = valor > 200 ? valor * 0.05 : 0;

    resultado.innerHTML =
        `Desconto: R$ ${desconto.toFixed(2)}<br>
         Total: R$ ${(valor - desconto).toFixed(2)}`;
}

function taxa() {
    let valor = Number(document.getElementById("valor").value);
    let taxa = valor > 100 ? valor * 0.10 : 0;

    resultado.innerHTML =
        `Taxa: R$ ${taxa.toFixed(2)}<br>
         Total: R$ ${(valor + taxa).toFixed(2)}`;
}

function multa() {
    let valor = Number(document.getElementById("valor").value);
    let dias = Number(document.getElementById("dias").value);
    let multa = dias > 0 ? valor * 0.02 : 0;

    resultado.innerHTML =
        `Multa: R$ ${multa.toFixed(2)}<br>
         Total: R$ ${(valor + multa).toFixed(2)}`;
}

function cashback() {
    let valor = Number(document.getElementById("valor").value);
    let cashback = valor > 300 ? valor * 0.05 : 0;

    resultado.innerHTML =
        `Cashback: R$ ${cashback.toFixed(2)}<br>
         Valor líquido: R$ ${(valor - cashback).toFixed(2)}`;
}
