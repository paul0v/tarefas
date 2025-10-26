# API de Gerenciador de Tarefas

Arquitetura: Controller → Banco de dados (SQLite)

## Rotas
- `GET /` — rota de teste.
- `POST /tarefas` — cria uma tarefa. Corpo (JSON):
```json
{
  "titulo": "Comprar leite",
  "descricao": "Lembrar de pegar integral",
  "concluido": false
}
```
- `GET /tarefas` — lista tarefas (opcional, útil para verificar).

## Como usar

1. Extraia o zip.
2. Instale dependências:
```
npm install
```
3. Para desenvolvimento (com nodemon):
```
npm run dev
```
ou iniciar normalmente:
```
npm start
```
4. A API rodará em `http://localhost:3000`.

> Observação: usamos SQLite (arquivo `db.sqlite` criado automaticamente). Se preferir usar outro banco, ajuste `database.js`.

