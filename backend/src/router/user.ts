import { success } from '../common/ResResult'
import { Context } from 'koa'
import Router from 'koa-router'
import userDao, { Userinfo } from '../dao/UserDao'

const router = new Router()

router.prefix('/user')

router.get('/findUserInfo', async (ctx: Context) => {
  ctx.body = await userDao.findAllUsers()
})

router.get('/findByProps', async (ctx: Context) => {
  ctx.body = success(await userDao.findByProps())
})

router.get('/findByLike', async (ctx: Context) => {
  ctx.body = success(await userDao.findByLike())
})

router.get('/findByLike/:key', async (ctx: Context) => {
  const { key } = ctx.params
  ctx.body = success(await userDao.findByLikeOfKey(key))
})

router.get('/findByUsernameAndAddress', async (ctx: Context) => {
  ctx.body = success(await userDao.findByUsernameAndAddress())
})

router.get('/countTotal', async (ctx: Context) => {
  ctx.body = success(await userDao.countUserinfo())
})

router.get('/findUserWithPager/:page/:size', async (ctx: Context) => {
  const { page, size } = ctx.params
  const offset = (page - 1) * size
  ctx.body = success(await userDao.findUserWithPager(offset, parseInt(size)))
})

router.post('/addUser', async (ctx: Context) => {
  const userinfo: Userinfo = ctx.request.body
  const dbUserinfo = await userDao.addUser(userinfo)
  ctx.body = success(dbUserinfo)
})

module.exports = router
