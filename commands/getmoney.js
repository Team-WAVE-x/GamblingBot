const { MessageEmbed } = require('discord.js')
const settings = require('../settings.json')

const cooltime = new Set()

exports.run = (client, message, args) => {
  const db = client.db
  let sql = `SELECT * FROM users WHERE id like '${message.author.id}'`
  db.query(sql, (err, rows, fields) => {
    if (err) console.log(err)
    if (!rows.length) message.channel.send(new MessageEmbed().addField('가입 먼저 해', '`$가입` 하라고요'))
    else {
      if (!cooltime.has(message.author.id)) {
        sql = `SELECT * FROM users WHERE id like '${message.author.id}'`
        db.query(sql, (err, rows, fields) => {
          sql = `UPDATE users SET money = ${Number(rows[0].money) + 100} WHERE id = '${message.author.id}'`
          db.query(sql)
          message.channel.send('돈 받음.\n현재 돈 : ' + (Number(rows[0].money) + 100))
          cooltime.add(message.author.id)
          setTimeout(() => {cooltime.delete(message.author.id)}, 15000)
        })
      } else {
        message.channel.send('쿨타임임 좀만 기다리셈')
      }
    }
  })
}

module.exports.help = {
  name: '돈받기',
  desc: '돈받는 명령어임',
  alias: ['ehsqkerl', '돈 받기', 'ehs qkerl'],
  authority: 'Basic'
}
