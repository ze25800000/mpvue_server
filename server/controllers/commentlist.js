const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {bookid, openid} = ctx.request.query
  const mysqlSelect = mysql('comments')
    .select('comments.*', 'csessioninfo.user_info')
    .join('csessioninfo', 'comments.openid', 'csessioninfo.open_id')
  let comments
  if (bookid) {
    comments = await mysqlSelect.where('bookid', bookid)
  } else if (openid) {
    comments = await mysqlSelect.where('openid', openid)
  }

  ctx.state.data = {
    list: comments.map(v => {
      const info = JSON.parse(v.user_info)
      return Object.assign({}, v, {
        title: info.nickName,
        image: info.avatarUrl
      })
    })
  };
}
