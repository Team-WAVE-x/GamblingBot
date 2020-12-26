const { MessageEmbed } = require('discord.js')
const knex = require('knex')

exports.run = (client, message, args) => {
  let sql = `SELECT * FROM users WHERE id like '${message.author.id}'`
  client.db.query(sql, (err, rows, fields) => {
    if (err) console.log(err)
    if (!rows.length) message.channel.send(new MessageEmbed().addField('가입 먼저 해', '`$가입` 하라고요'))
    else {
      sql = `SELECT * FROM users WHERE id like '${message.author.id}'`
      client.db.query(sql, (err, rows, fields) => {
        if (Math.floor(Math.random() * Math.floor(2))) {
          message.channel.send('도박 성공 ㅅㄱ 남은 돈: ' + rows[0].money * 2)
          sql = `UPDATE users SET money = ${rows[0].money * 2} WHERE id = '${message.author.id}'`
          client.db.query(sql)
        } else {
          message.channel.send('도박 실패 ㅅㄱ 남은 돈: ' + 0)
          sql = `UPDATE users SET money = 0 WHERE id = '${message.author.id}'`
          client.db.query(sql)
        }
      })
    }
  })
  
}

module.exports.help = {
  name: 'gambling',
  desc: '도박 명령어임',
  alias: ['도박', 'ehqkr'],
  authority: 'Basic'
}
