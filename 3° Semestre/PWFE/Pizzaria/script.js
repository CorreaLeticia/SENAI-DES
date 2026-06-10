import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signInWithPopup,
GoogleAuthProvider,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import {
getFirestore,
collection,
addDoc,
query,
orderBy,
onSnapshot
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyATkUMhm0L0N0RtEje__v5UFlwdhlUEeXo",
authDomain: "pizzaria-fc030.firebaseapp.com",
projectId: "pizzaria-fc030",
storageBucket: "pizzaria-fc030.firebasestorage.app",
messagingSenderId: "384302674517",
appId: "1:384302674517:web:878a84398c475fafd3dadc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Elementos Visuais
const authScreen = document.getElementById('auth-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const pizzaGrid = document.getElementById('pizza-grid');

// Elementos Login
const inputEmail = document.getElementById('auth-email');
const inputSenha = document.getElementById('auth-senha');

const InputNome = document.getElementById('pizza-nome');
const InputIgredientes = document.getElementById('pizza-ingredientes');
const InputTipo = document.getElementById('pizza-tipo');
const InputPreco = document.getElementById('pizza-preco');
const InputImagem = document.getElementById('pizza-imagem');

// Monitor de autenticação
onAuthStateChanged(auth, (user) => {

if (user){
authScreen.classList.add('hidden');
dashboardScreen.classList.remove('hidden');

document.getElementById('user-display-name').textContent =
user.displayName || user.email;

carregarCardapio();

}else{

authScreen.classList.remove('hidden');
dashboardScreen.classList.add('hidden');
pizzaGrid.innerHTML = '';

}

});

document.getElementById('btn-cadastro').addEventListener('click', async()=>{

const email = inputEmail.value.trim();
const senha = inputSenha.value.trim();

if(!email || !senha)
return alert('Preencha o email e senha!');

try{

await createUserWithEmailAndPassword(auth, email, senha);

alert("Conta criada com sucesso!");

}catch(e){

alert(e.message);

}

});

document.getElementById('btn-login').addEventListener('click', async()=>{

const email = inputEmail.value.trim();
const senha = inputSenha.value.trim();

if(!email || !senha)
return alert('Preencha o email e senha!');

try{

await signInWithEmailAndPassword(auth, email, senha);

}catch(e){

alert(e.message);

}

});

document.getElementById('btn-google').addEventListener('click', async () => {
try {
await signInWithPopup(auth, googleProvider);

} catch (e) {

alert('Erro Google: ' + e.message);

}

});

document.getElementById('btn-logout').addEventListener('click', () => {
signOut(auth);

});

//Criação do Cardapio

document.getElementById('btn-cadastrar').
addEventListener('click', async() => {
    const nome = InputNome.value.trim();
    const ingredientes = InputIngredientes.value.trim();
    const tipo = InputTipo.value.trim();
    const preco = InputPreco.value.trim();
    const imagem = InputImagem.value.trim();

    if(!nome || !ingredientes || !preco) return alert('Preencha os campos obrigatórios!');

    try{
        await addDoc(collection(db,"pizzas"), {
            nome, ingredientes, tipo, preco: Number(preco), imagem
        });
        InputNome.value = '';
        InputIngredientes.value = '';
        InputPreco.value = '';
        InputImagem.value = '';

    } catch (e){
        console.error(e);
    }
    
});