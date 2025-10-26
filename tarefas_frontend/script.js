const API_URL = 'http://localhost:3000/tarefas';

async function carregarTarefas() {
  const resp = await fetch(API_URL);
  const tarefas = await resp.json();
  const lista = document.getElementById('lista');
  lista.innerHTML = '';
  tarefas.forEach(t => {
    const card = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${t.titulo}</h5>
          <p class="card-text">${t.descricao}</p>
          <p class="card-text">Concluído: ${t.concluido ? '✅' : '⏳'}</p>
          <button class="btn btn-danger" onclick="deleteTask(${t.id})">Excluir</button>
          <button class="btn btn-success" onclick="updateTask(${t.id}, ${!t.concluido})">${t.concluido ? 'Reabrir' : 'Concluir'}</button>
        </div>
      </div>
    `;
    lista.innerHTML += card;
  });
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  carregarTarefas();
}

async function updateTask(id, concluido) {
  await fetch(`${API_URL}/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ concluido })
    });
  carregarTarefas();
}

async function criarTarefa() {
  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  await fetch(API_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ titulo, descricao })
  });
  document.getElementById('titulo').value = '';
  document.getElementById('descricao').value = '';
  carregarTarefas();
}

carregarTarefas();
