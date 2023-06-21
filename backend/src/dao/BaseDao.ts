import dbconfig from '../conf/dbconfig'
import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript' // npm i sequelize-typescript

// 所有 Dao 的通用 Dao
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
}

export const { sequelize } = BaseDao.baseDao
