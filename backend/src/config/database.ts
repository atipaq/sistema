import { DataSource } from 'typeorm';
import { User } from '../models/user.model';
import path from 'path';

const databaseConfig = new DataSource({
  type: 'sqlite',
  database: process.env.DB_PATH || path.join(__dirname, '../../data/database.sqlite'),
  entities: [User],
  synchronize: true,
  logging: true,
  logger: 'advanced-console',
  // Agregando opciones adicionales para mejor manejo de errores
  maxQueryExecutionTime: 1000,
  // Opciones específicas de SQLite
  driver: require('sqlite3'),
  // Asegurarse de que el directorio existe
  cache: {
    duration: 30000 // 30 segundos de caché
  },
  // Opciones de migración
  migrationsRun: false,
  migrationsTableName: "migrations"
});

export default databaseConfig;