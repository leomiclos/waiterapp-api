🍽️ WaiterApp API

API RESTful desenvolvida em **TypeScript** e **Express** para o **WaiterApp**, um sistema de gerenciamento de pedidos voltado para garçons e estabelecimentos gastronômicos.

Gerencia categorias, produtos e pedidos com persistência em **MongoDB** via container **Docker**, e comunicação assíncrona com **RabbitMQ** para processamento eficiente via workers.

---

## 📁 Estrutura do Projeto

```
.
├── src/
│   ├── app/
│   │   ├── models/
│   │   ├── useCases/
│   ├── workers/
│   ├── index.ts
│   └── router.ts
├── dist/
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

---

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado: versão 18 ou superior)  
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)  
- [MongoDB](https://www.mongodb.com/) (local ou via Docker)  
- [RabbitMQ](https://www.rabbitmq.com/) (local ou via Docker)

---

## 🚀 Iniciando o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/waiterapp-api.git
cd waiterapp-api
```

### 2. Instalar as Dependências

```bash
npm install
```

### 4. Rodar em Modo Desenvolvimento

```bash
npm run dev
```

### 5. Gerar Build para Produção

```bash
npm run build
npm start
```

---

## 🐳 Rodando com Docker

### 1. Docker Compose: MongoDB + RabbitMQ + API

```yaml
version: "3"

services:
  mongodb:
    image: mongo:5
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: guest
      RABBITMQ_DEFAULT_PASS: guest

  api:
    build: .
    ports:
      - "3001:3001"
    environment:
      - MONGO_URL=mongodb://mongodb:27017/waiterapp
      - RABBITMQ_URL=amqp://rabbitmq
      - PORT=3001
    depends_on:
      - mongodb
      - rabbitmq

volumes:
  mongo_data:
```

```bash
docker-compose up --build
```

### 2. Acessar API

```
http://localhost:3001
```

### 3. Acessar painel RabbitMQ

```
http://localhost:15672
```

> Login padrão: `guest` / `guest`

---

## 🛠 Tecnologias Usadas

- Node.js + Express + TypeScript  
- MongoDB + Mongoose  
- RabbitMQ + amqp-lib  
- Docker e Docker Compose  
- ESLint + Prettier  

---

## 🧑‍💻 Executando os Workers

Os workers processam mensagens das filas RabbitMQ:

### Rodando Worker Localmente

```bash
npm run worker
```

### Script Worker

```json
"scripts": {
  "dev": "ts-node-dev src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js",
  "worker": "ts-node-dev src/workers/orderWorker.ts"
}
```

---

## 📚 Endpoints da API

| Método | Rota                        | Descrição                     |
|--------|-----------------------------|-------------------------------|
| GET    | /api/categories             | Listar categorias             |
| POST   | /api/categories             | Criar categoria               |
| GET    | /api/products               | Listar produtos               |
| POST   | /api/products               | Criar produto (com upload)    |
| GET    | /api/category/:id/products  | Listar produtos por categoria |
| GET    | /api/orders                 | Listar pedidos                |
| POST   | /api/orders                 | Criar pedido                  |
| PATCH  | /api/orders/:id/status      | Alterar status do pedido      |
| DELETE | /api/orders/:id             | Cancelar pedido               |
| DELETE | /api/orders                 | Cancelar todos os pedidos     |

---

## 💡 Fluxo Assíncrono com RabbitMQ

1. API recebe requisição de pedido ou alteração  
2. Publica mensagem nas filas `orders` ou `statusChange`  
3. Worker consome e processa as mensagens  
4. Worker salva log no MongoDB e confirma a fila

---

## 🤝 Contribuição

Contribuições são bem-vindas!  
Abra um Pull Request com melhorias, correções ou sugestões 🚀

---

## 📄 Licença

**MIT** © Leonardo Ribeiro Miclos de Abreu
```

