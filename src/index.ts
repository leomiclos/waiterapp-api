import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import path from 'node:path';
import { connectRabbitMQ } from './lib/rabbitmq';
import 'dotenv/config';  // já carrega as variáveis do .env
import dotenvFlow from 'dotenv-flow';

import './workers/orderWorker';
import './workers/statusWorker';

dotenvFlow.config();

async function bootstrap() {
  try {

    const mongoUri = process.env.MONGO_URL;
    // Conectar ao MongoDB
    await mongoose.connect(mongoUri!);
    console.log('[MongoDB] Conectado com sucesso');

    // Conectar ao RabbitMQ
    await connectRabbitMQ();

    // Inicializar o app
    const app = express();
    const PORT = 3000;

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'assets')));
    app.use(express.json());
    app.use('/api', router);

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
}

bootstrap();
