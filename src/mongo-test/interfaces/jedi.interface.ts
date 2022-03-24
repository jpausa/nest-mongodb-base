import { IMasterInfo } from './master.interface';

export interface IJediInfo {
  name: string;

  master: IMasterInfo;

  isAlive: string;
}
