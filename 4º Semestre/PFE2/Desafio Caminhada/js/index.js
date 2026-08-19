const btnTema = document.getElementById("btnTema");

const btnEntrar = document.getElementById("btnEntrar");

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

btnEntrar.addEventListener("click", function () {

    window.location.href = "home.html";

});