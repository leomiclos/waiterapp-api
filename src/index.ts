import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import path from 'node:path';
import { connectRabbitMQ } from '../lib/rabbitmq';

import './workers/orderWorker';

async function bootstrap() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect('mongodb://localhost:27017/waiterapp');
    console.log('[MongoDB] Conectado com sucesso');

    // Conectar ao RabbitMQ
    await connectRabbitMQ();

    // Inicializar o app
    const app = express();
    const PORT = process.env.PORT || 3000;

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
