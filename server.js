const express = require('express');
const cors = require('cors');
const tarefasController = require('./controller');

const app = express();

// CORS policy configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API de gerenciador de tarefas funcionando!' });
});

app.use('/', tarefasController);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  // initialize DB
  const db = require('./database');
  await db.init();
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
