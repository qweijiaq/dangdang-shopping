import { success } from '../common/ResResult'
import { Context } from 'koa'
import Router from 'koa-router'
import { Userinfo, addUser, findAllUsers, findByProps } from '../dao/UserDao'

const router = new Router()

router.prefix('/user')

router.get('/findUserInfo', async (ctx: Context) => {
  ctx.body = await findAllUsers()
})

router.get('findByProps', async (ctx: Context) => {
  ctx.body = success(await findByProps())
})

router.post('/addUser', async (ctx: Context) => {
  const userinfo: Userinfo = ctx.request.body
  const dbUserinfo = await addUser(userinfo)
  ctx.body = success(dbUserinfo)
})

module.exports = router
