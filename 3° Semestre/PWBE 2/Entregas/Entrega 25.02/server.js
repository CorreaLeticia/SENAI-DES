const express = require("express");
const app = express();

app.use(express.json());

const carrosRoutes = require("./routes/carros.routes");
const clientesRoutes = require("./routes/clientes.routes");

app.use("/carros", carrosRoutes);
app.use("/clientes", clientesRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
