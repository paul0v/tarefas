const express = require('express');
const router = express.Router();
const db = require('./database');

// POST /tarefas - criar tarefa
router.post('/tarefas', async (req, res) => {
  try {
    const { titulo, descricao, concluido } = req.body;
    if (!titulo || titulo.toString().trim() === '') {
      return res.status(400).json({ error: 'O campo "titulo" é obrigatório.' });
    }
    const tarefa = {
      titulo: titulo.toString(),
      descricao: descricao ? descricao.toString() : null,
      concluido: Boolean(concluido)
    };
    const created = await db.createTask(tarefa);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar tarefa.' });
  }
});

// optional: GET /tarefas - listar tarefas
router.get('/tarefas', async (req, res) => {
  try {
    const tarefas = await db.getTasks();
    res.json(tarefas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar tarefas.' });
  }
});

// DELETE /tarefas/:id - deletar tarefa
router.delete('/tarefas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteTask(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar tarefa.' });
  }
});

// PUT /tarefas/:id - atualizar tarefa
router.put('/tarefas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { concluido } = req.body;
    await db.updateTask(id, { concluido });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
  }
});

module.exports = router;
