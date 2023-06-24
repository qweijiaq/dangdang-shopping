import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

@Table({
  tableName: 'userinfo',
})
export default class UserinfoModel extends Model<UserinfoModel> {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  userid!: number
  @Column({
    type: DataTypes.STRING(30),
    field: 'username',
    allowNull: false,
  })
  public username!: string
  @Column({
    type: DataTypes.STRING(20),
    field: 'password',
    allowNull: false,
  })
  public password!: string
  @Column({
    type: DataTypes.STRING(20),
    field: 'address',
    allowNull: false,
  })
  public address!: string
  @Column({
    type: DataTypes.INTEGER,
    field: 'valid',
    allowNull: false,
  })
  public valid!: number
}
