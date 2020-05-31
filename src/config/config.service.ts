import { Injectable } from '@nestjs/common';
import { Config } from './config.interface';

// export type EnvConfig = Record<string, string>;

@Injectable()
export class ConfigService {
  private readonly envConfig: Config;
  constructor() {
    this.envConfig = this.initVars();
  }
  private initVars(): Config {
    return { NODE_ENV: 'dev', MYSQL_PORT: '3306' };
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
