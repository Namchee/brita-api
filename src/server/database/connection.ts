import { createConnection, Connection } from 'typeorm';
import config from 'config/env';

/**
 * Connects to a database based on configuration URL
 *
 * @return {Promise<Connection>} A typeorm connection instance
 */
export function connectToDatabase(): Promise<Connection> {
  return createConnection({
    type: 'postgres',
    url: config.dbUrl,
    entities: ['model/*.ts'],
  });
}