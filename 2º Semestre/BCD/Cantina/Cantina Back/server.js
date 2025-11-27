require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const alunosRoutes = require('./routes/alunosRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');


app.use(express.json());
app.use(cors());

app.use("/alunos", alunosRoutes);
app.use("/produtos", produtosRoutes);
app.use("/pedidos", pedidosRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

