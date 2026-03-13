const produtos = [
  { id: 1, nome: "Sonho", preco: 10 },
  { id: 2, nome: "Brigadeirão", preco: 15 },
  { id: 3, nome: "Cupcake", preco: 8 },
  { id: 4, nome: "Pudim", preco: 60 },
  { id: 5, nome: "Brigadeiro", preco: 4 },
  { id: 6, nome: "Maria Mole", preco: 8 },
  { id: 7, nome: "Bomba de Chocolate", preco: 10 },
  { id: 8, nome: "Bolo de Pote", preco: 12 },
  { id: 9, nome: "Cocada", preco: 9 },
  { id: 10, nome: "Mousse de Limão", preco: 11 }
];

var carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

renderizarProdutos();
renderizarCarrinho();

function salvarLocal(){
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderizarCarrinho();
}

function renderizarProdutos(){
  const lista = document.querySelector("#listaProdutos");
  lista.innerHTML = "";

  produtos.forEach(p => {
    lista.innerHTML += `
      <div class="card">
        <img>
        <h3>${p.nome}</h3>
        <p>R$ ${p.preco.toFixed(2)}</p>
        <button onclick="adicionar(${p.id})">Adicionar ao carrinho</button>
      </div>
    `;
  });
}

function adicionar(id){
  const produto = produtos.find(p => p.id === id);
  const item = carrinho.find(c => c.id === id);

  if(item){
    item.quantidade++;
  } else {
    carrinho.push({...produto, quantidade:1});
  }

  salvarLocal();
}

function renderizarCarrinho(){
  const corpo = document.querySelector("#dadosCarrinho");
  corpo.innerHTML = "";
  let total = 0;

  carrinho.forEach((c, i) => {
    total += c.preco * c.quantidade;

    corpo.innerHTML += `
      <tr>
        <td>${c.nome}</td>
        <td>${c.quantidade}</td>
        <td>R$ ${(c.preco * c.quantidade).toFixed(2)}</td>
        <td>
          <button onclick="diminuir(${i})">-</button>
          <button onclick="aumentar(${i})">+</button>
          <button onclick="remover(${i})">Excluir</button>
        </td>
      </tr>
    `;
  });

  document.querySelector("#total").innerText = 
    "Total: R$ " + total.toFixed(2);
}

function aumentar(i){
  carrinho[i].quantidade++;
  salvarLocal();
}

function diminuir(i){
  if(carrinho[i].quantidade > 1){
    carrinho[i].quantidade--;
  } else {
    carrinho.splice(i,1);
  }
  salvarLocal();
}

function remover(i){
  carrinho.splice(i,1);
  salvarLocal();
}

function abrirCarrinho(){
  document.querySelector("#modalCarrinho").style.display = "block";
}

function fecharCarrinho(){
  document.querySelector("#modalCarrinho").style.display = "none";
}