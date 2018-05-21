/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
async function get(ctx, next) {
  ctx.body = {
    code: 0,
    data: {
      msg: 'hello 小程序'
    }
  }
}

module.exports = {
  get
}
