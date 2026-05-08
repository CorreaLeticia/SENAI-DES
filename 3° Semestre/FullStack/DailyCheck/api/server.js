require('dotenv').config();
const express = require('express');
const cors = require("cors");
 
const app = express();
app.use(express.json());
app.use(cors());
 
const rotasTarefas = require('./src/routes/tarefas.routes');
 
app.use('/tarefas', rotasTarefas);
 
const PORTA = process.env.PORT || 3000;
 
app.listen(PORTA, () => {
  console.log(`Servidor online na porta ${PORTA}`);
});
 