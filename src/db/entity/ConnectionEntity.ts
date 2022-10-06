import { safeStorage } from 'electron';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { parseConnectionString } from '../../main/util';
import {
  ConnectionInputType,
  ConnectionModelType,
} from '../models/ConnectionModels';
import DBProvider from './enum';

@Entity({ name: 'Connection' })
class ConnectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  port: number;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    type: 'simple-enum',
    enum: DBProvider,
  })
  type: DBProvider;

  @CreateDateColumn()
  createdDate: Date;

  @Column('datetime')
  lastUsed: Date;

  @AfterLoad()
  decryptPassword() {
    this.password = safeStorage.decryptString(
      Buffer.from(this.password, 'base64')
    );
  }

  @BeforeUpdate()
  @BeforeInsert()
  encryptPassword() {
    if (safeStorage.isEncryptionAvailable()) {
      this.password = safeStorage
        .encryptString(this.password)
        .toString('base64');
    } else {
      throw new Error('Error Encrypting Password');
    }
  }

  constructor(model?: ConnectionInputType | ConnectionModelType) {
    if (model === undefined) return;
    if (model.connectionConfig.config === 'manual') {
      const { username, password, address, port } = model.connectionConfig;
      Object.assign(this, {
        config: 'manual',
        username,
        password,
        address,
        port,
      });
    } else {
      const fields = parseConnectionString(
        model.type,
        model.connectionConfig.connectionString
      );
      const { username, password } = fields;
      if (fields.hosts.length > 0) {
        Object.assign(this, {
          config: 'manual',
          username,
          password,
          address: fields.hosts[0].host,
          port: fields.hosts[0].port,
        });
      }
    }
    const { nickname, id, createdDate, lastUsed, type } = model;
    Object.assign(this, {
      nickname,
      id,
      createdDate,
      lastUsed,
      type,
    });
  }
}

export default ConnectionEntity;
