import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: Record<string, string>;
  private readonly NODE_ENV = 'NODE_ENV';

  constructor(filePath?: string) {
    if (!filePath) {
      filePath = '.env';
    }
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  isProduction(): boolean {
    return this.envConfig[this.NODE_ENV] === 'production';
  }
}
