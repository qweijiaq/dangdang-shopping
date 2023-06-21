import Koa, { Context } from 'koa'
import { fail } from './ResResult'
import logger from './LogUtil'

const globalException = async (ctx: Context, next: Koa.Next) => {
  logger.info('进入到通用异常')
  try {
    await next()
  } catch (err: any) {
    const err_reslut = err as { message: string }
    ctx.body = fail(`服务器错误: ${err_reslut.message}`)
  }
}

export default globalException
