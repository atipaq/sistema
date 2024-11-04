import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import databaseConfig from './config/database';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (_req, res) => {
  res.json({ message: 'Backend funcionando correctamente' });
});

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    // Asegurarse de que el directorio de la base de datos existe
    const dbDir = path.dirname(process.env.DB_PATH || path.join(__dirname, '../data/database.sqlite'));
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    // Inicializa la conexión a la base de datos
    await databaseConfig.initialize();
    console.log('Base de datos inicializada correctamente');
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
      console.log(`Ambiente: ${process.env.NODE_ENV}`);
      console.log(`Ruta de la base de datos: ${process.env.DB_PATH}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    if (error instanceof Error) {
      console.error('Detalles del error:', error.message);
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
};

process.on('unhandledRejection', (error) => {
  console.error('Error no manejado:', error);
  process.exit(1);
});

startServer();

export default app;