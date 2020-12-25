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
    if (!rows.length) {
      sql = `INSERT INTO users VALUES ('${message.author.id}', 100)`
      connection.query(sql, (err, rows, fields) => { if (err) console.log(err) })
      message.channel.send(new MessageEmbed().addField('가입 완료', '가입 완료함 ㅅㄱ'))
    } else message.channel.send(new MessageEmbed().addField('가입 이미했', '가입 이미했자나'))
  })
}

module.exports.help = {
  name: 'register',
  desc: '가입합니다',
  alias: ['가입', 'rkdlq'],
  authority: 'Basic'
}
