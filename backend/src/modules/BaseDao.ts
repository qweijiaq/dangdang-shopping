import { Sequelize } from 'sequelize-typescript'
import { Dialect } from 'sequelize'
import path from 'path'
import dbconfig from '../conf/dbconfig'
class BaseDao {
  static baseDao: BaseDao = new BaseDao()
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
  }
  addModels() {
    const modelPath = path.join(process.cwd(), '/src/modules/decorateModel/UserInfo.ts')
    this.sequelize.addModels([modelPath])
  }
}

const baseDao = BaseDao.baseDao
baseDao.addModels()
export const { sequelize } = baseDao
