function isString(data: any): data is string {
  return typeof data === 'string'
}

interface DbConConfig {
  host: string
  user: string
  password: string
  port: number
  database: string
}

interface EnvConfig {
  dev: DbConConfig
  prod: DbConConfig
}

class Conf {
  static conf: Conf = new Conf()
  env!: keyof EnvConfig
  envConf!: EnvConfig
  constructor() {
    this.env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
    this.initConfig()
  }
  initConfig() {
    this.envConf = {
      dev: {
        host: 'localhost',
        user: 'root',
        password: 'weijia123',
        database: 'dangdang',
        port: 3306,
      },
      prod: {
        host: 'localhost',
        user: 'root',
        password: 'weijia123',
        database: 'dangdang',
        port: 3306,
      },
    }
  }
  getConf(): DbConConfig
  getConf(key: string): string
  getConf(key: any = ''): any {
    if (this.isDbConConfKeys(key) && key.length > 0) {
      return this.envConf[this.env][key]
    } else {
      return this.envConf[this.env]
    }
  }
  isDbConConfKeys(key: any): key is keyof DbConConfig {
    return (
      key === 'host' || key === 'user' || key === 'password' || key === 'database' || key === 'port'
    )
  }
}

export default Conf.conf
