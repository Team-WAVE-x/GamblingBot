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
    if (err) console.log(err)
    if (!rows.length) message.channel.send(new MessageEmbed().addField('가입 먼저 해', '`$가입` 하라고요'))
    else {
      sql = `SELECT * FROM users WHERE id like '${message.author.id}'`
      connection.query(sql, (err, rows, fields) => {
        sql = `UPDATE users SET money = ${Number(rows[0].money) + 100} WHERE id = '${message.author.id}'`
        connection.query(sql)
        message.channel.send('돈 받음.\n현재 돈 : ' + (Number(rows[0].money) + 100))
      })
    }
  })
  
}

module.exports.help = {
  name: 'getmoney',
  desc: '돈받는 명령어임',
  alias: ['돈받기', 'ehsqkerl', '돈 받기', 'ehs qkerl'],
  authority: 'Basic'
}
