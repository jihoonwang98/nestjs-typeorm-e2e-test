import { DataType, IBackup, IMemoryDb, newDb } from 'pg-mem';
import { v4 } from 'uuid';
import { Connection } from 'typeorm';

export class PgTestHelper {
  db: IMemoryDb;
  connection: Connection;
  backup: IBackup;

  async connect(entities?: any[]) {
    this.db = newDb({ autoCreateForeignKeyIndices: true });
    this.db.public.registerFunction({ implementation: () => 'test', name: 'current_database' });
    this.db.registerExtension('uuid-ossp', schema => {
      schema.registerFunction({
        name: 'uuid_generate_v4',
        returns: DataType.uuid,
        implementation: v4,
        impure: true,
      });
    });
    this.connection = await this.db.adapters.createTypeormConnection({
      type: 'postgres',
      entities: entities,
      logger: 'advanced-console',
      logging: true,
    });
    await this.sync();
    this.backup = this.db.backup();
    return this.connection;
  }

  restore() {
    this.backup.restore();
  }

  async disconnect() {
    await this.connection.close();
  }

  async sync() {
    await this.connection.synchronize();
  }

  query(sql: string) {
    this.db.public.many(sql);
  }
}
