const { MessageEmbed } = require('discord.js')
const settings = require('../settings.json')

exports.run = (client, message, args) => {
  const db = client.db
  let sql = `SELECT * FROM users WHERE id like '${message.author.id}'`
  db.query(sql, (err, rows, fields) => {
    if (err) console.log(err)
    if (!rows.length) {
      sql = `INSERT INTO users VALUES ('${message.author.id}', 100)`
      connection.query(sql, (err, rows, fields) => { if (err) console.log(err) })
      message.channel.send(new MessageEmbed().addField('가입 완료', '가입 완료함 ㅅㄱ'))
    } else message.channel.send(new MessageEmbed().addField('가입 이미했', '가입 이미했자나'))
  })
}

module.exports.help = {
  name: '가입',
  desc: '가입합니다',
  alias: ['rkdlq'],
  authority: 'Basic'
}
