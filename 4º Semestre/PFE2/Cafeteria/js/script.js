const menuBtn = document.querySelector("#menu-btn");

const menu = document.querySelector(".menu");


menuBtn.addEventListener("click",()=>{

    menu.classList.toggle("active");


    const icon = menuBtn.querySelector("i");


    if(menu.classList.contains("active")){

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    }else{

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});



/* ================================
   FECHAR MENU AO CLICAR NO LINK
================================ */


const links = document.querySelectorAll(".menu a");


links.forEach(link=>{


    link.addEventListener("click",()=>{


        menu.classList.remove("active");


        const icon = menuBtn.querySelector("i");


        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");


    });


});



/* ================================
   HEADER AO ROLAR A PÁGINA
================================ */


const header = document.querySelector("header");


window.addEventListener("scroll",()=>{


    if(window.scrollY > 50){


        header.style.boxShadow =
        "0 5px 20px rgba(0,0,0,.15)";


    }else{


        header.style.boxShadow = "none";


    }


});



/* ================================
   ANIMAÇÃO AO APARECER
================================ */


const elementos = document.querySelectorAll(
".card, .produto, .depoimento, .sobre-img, .sobre-text"
);



const observer = new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            entry.target.classList.add("mostrar");


        }


    });


},
{
    threshold:.2
});



elementos.forEach(elemento=>{


    elemento.classList.add("esconder");


    observer.observe(elemento);


});



/* ================================
   ANO AUTOMÁTICO FOOTER
================================ */


const ano = new Date().getFullYear();


const copyright = document.querySelector(".copy");


if(copyright){


    copyright.innerHTML =
    `© ${ano} Cafeteria Aroma - Todos os direitos reservados.`;


}



/* ================================
   BOTÃO VOLTAR AO TOPO
================================ */


const voltarTopo = document.createElement("button");


voltarTopo.innerHTML =
'<i class="fa-solid fa-arrow-up"></i>';


voltarTopo.classList.add("topo");



document.body.appendChild(voltarTopo);



window.addEventListener("scroll",()=>{


    if(window.scrollY > 400){


        voltarTopo.classList.add("mostrar-topo");


    }else{


        voltarTopo.classList.remove("mostrar-topo");


    }


});



voltarTopo.addEventListener("click",()=>{


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


});



/* ================================
   PRODUTOS - BOTÃO ADICIONAR
================================ */


const botoesProduto =
document.querySelectorAll(".produto .btn");



let quantidadeCarrinho = 2;



const contador =
document.querySelector(".cart span");



botoesProduto.forEach(botao=>{


    botao.addEventListener("click",(e)=>{


        e.preventDefault();



        quantidadeCarrinho++;



        if(contador){

            contador.textContent =
            quantidadeCarrinho;

        }



        botao.innerHTML =
        "Adicionado ✓";



        botao.style.background =
        "#6F4E37";


        botao.style.color =
        "#FFFFFF";



        setTimeout(()=>{


            botao.innerHTML =
            "Adicionar";


            botao.style.background =
            "";


            botao.style.color =
            "";


        },1500);



    });


});
