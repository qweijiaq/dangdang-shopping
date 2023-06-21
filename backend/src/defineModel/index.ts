import { sequelize } from '../dao/BaseDao'
import { DataTypes } from 'sequelize'

class UserInfo {
  static createModel() {
    const model = sequelize.define(
      'userinfo',
      {
        userid: {
          type: DataTypes.INTEGER,
          field: 'userid',
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING(30),
          field: 'username',
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(20),
          field: 'password',
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(50),
          field: 'address',
          allowNull: true,
        },
        valid: {
          type: DataTypes.TINYINT,
          field: 'valid',
          allowNull: true,
        },
        brithday: {
          type: DataTypes.DATEONLY,
          field: 'birthday',
          allowNull: true,
          defaultValue: Date.now(),
        },
      },
      {
        freezeTableName: true, // true 表示使用给定的表名，false 表示模型名后加 s 作为表名
        timestamps: false, // true 表示给模型加上时间戳属性(createAt、updateAt), false 表示不带时间戳属性
      }
    )
    // model.sync({
    //   force: true, // true 表示若表存在则先删除后创建，false 表示表不存在才创建
    // })
    return model
  }
}

export const model = UserInfo.createModel()
