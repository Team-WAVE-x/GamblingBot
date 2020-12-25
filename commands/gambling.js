const { MessageEmbed } = require('discord.js')
const settings = require('../settings.json')
const mysql = require('mysql2')

const connection = mysql.createConnection({
  host     : settings.mysql.host,
  port     : settings.mysql.port,
  user     : settings.mysql.user,
  password : settings.mysql.password,
  database : settings.mysql.database
})

exports.run = (client, message, args) => {

  let sql = `SELECT * FROM users WHERE id like '${message.author.id}'`
  connection.query(sql, (err, rows, fields) => {
    if (Math.floor(Math.random() * Math.floor(2))) {
      message.channel.send('도박 성공 ㅅㄱ 남은 돈: ' + rows[0].money * 2)
      sql = `UPDATE users SET money = ${rows[0].money * 2} WHERE id = '${message.author.id}'`
      connection.query(sql)
    } else {
      message.channel.send('도박 실패 ㅅㄱ 남은 돈: ' + 0)
      sql = `UPDATE users SET money = 0 WHERE id = '${message.author.id}'`
      connection.query(sql)
    }
    console.log()
  })
}

module.exports.help = {
  name: 'gambling',
  desc: '도박 명령어임',
  alias: ['도박', 'ehqkr'],
  authority: 'Basic'
}
