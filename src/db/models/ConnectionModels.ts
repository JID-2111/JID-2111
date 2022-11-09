import { DBProvider } from '../entity/enum';
import { ExecutionModelType } from './ExecutionModel';

export type ManualConnectionConfig = {
  config: 'manual';

  defaultDatabase: string;

  address: string;

  port: number;

  username: string;

  password: string;
};

export type ConnectionString = {
  config: 'string';

  connectionString: string;
};

type ConnectionInfo = {
  id?: number;

  nickname: string;

  type: DBProvider;

  createdDate?: Date;

  lastUsed?: Date;
};

export type ConnectionInputType = ConnectionInfo & {
  connectionConfig: ManualConnectionConfig | ConnectionString;
};

export type ConnectionModelType = ConnectionInfo & {
  id: number;

  testDataTable?: string;

  defaultDatabase: string;

  address: string;

  port: number;

  username: string;

  password: string;

  executions?: ExecutionModelType[];
};
