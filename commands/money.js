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
      connection.query(sql, (err, rows, fields) => message.channel.send('돈: ' + rows[0].money))
    }
  })
}

module.exports.help = {
  name: 'money',
  desc: '돈 명령어임',
  alias: ['돈', 'ehs'],
  authority: 'Basic'
}
