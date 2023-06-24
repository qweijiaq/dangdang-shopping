import { Sequelize } from 'sequelize-typescript'
import { Dialect } from 'sequelize'
import path from 'path'
import dbconfig from '../conf/dbconfig'
class BaseDaoOrm {
  static baseDaoOrm: BaseDaoOrm = new BaseDaoOrm()
  sequelize!: Sequelize
  constructor() {
    this.initSeqConf('mysql')
  }
  initSeqConf(dialect: Dialect) {
    let { host, user, password, database, port } = dbconfig.getConf()
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect, // 方言 - 表示何种数据库
      define: {
        timestamps: false,
        freezeTableName: true,
      },
    })
    this.addModels()
  }
  addModels() {
    const modelPath = path.join(process.cwd(), '/src/model/UserInfo.ts')
    this.sequelize.addModels([modelPath])
  }
}

export default BaseDaoOrm.baseDaoOrm
