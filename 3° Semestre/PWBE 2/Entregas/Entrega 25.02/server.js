const express = require("express");
const app = express();

app.use(express.json());

const clientesRoutes = require("./src/routes/clientes.routes");
const carrosRoutes = require("./src/routes/carros.routes");

app.use("/clientes", clientesRoutes);
app.use(carrosRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});