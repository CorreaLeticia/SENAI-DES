const url = "https://receitasapi-b-2025.vercel.app/"
const receitas = []

const modal = document.getElementById("modal")
const abrirModal = document.getElementById("abrirModal")
const fechar = document.getElementById("fechar")
const salvar = document.getElementById("salvar")

getReceitas()

function getReceitas(){
  fetch(`${url}receitas`)
    .then(response => response.json())
    .then(data => {
      data.forEach(receita => {
        receitas.push(receita)
      })
      renderReceitas()
    })
}

function renderReceitas(){
    const main = document.querySelector("main")
    main.innerHTML = ""

    receitas.forEach(r => {
        const card = document.createElement("div")
        card.classList.add("card")

        card.innerHTML = `
        <img src="${r.img}" alt="${r.nome}">
        <h2>${r.nome}</h2>
        <p>${r.ingredientes}</p>
        <p>${r.modoFazer}</p>
        `

        main.appendChild(card)
    })
}

abrirModal.onclick = () => {
    modal.classList.remove("hidden")
}

fechar.onclick = () => {
    modal.classList.add("hidden")
}

salvar.onclick = () => {
    const nome = document.getElementById("nome").value
    const img = document.getElementById("img").value
    const ingredientes = document.getElementById("ingredientes").value
    const modoFazer = document.getElementById("modoFazer").value

    const novaReceita = {
        nome,
        img,
        ingredientes,
        modoFazer
    }

    receitas.push(novaReceita)

    renderReceitas()

    modal.classList.add("hidden")
}