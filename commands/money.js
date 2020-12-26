const { MessageEmbed } = require('discord.js')

exports.run = (client, message, args) => {
  const { db } = client
  let sql = `SELECT * FROM users WHERE id like '${message.author.id}'`
  db.query(sql, (err, rows, fields) => {
    if (err) console.log(err)
    if (!rows.length) message.channel.send(new MessageEmbed().addField('가입 먼저 해', '`$가입` 하라고요'))
    else {
      sql = `SELECT * FROM users WHERE id like '${message.author.id}'`
      db.query(sql, (err, rows, fields) => message.channel.send('돈: ' + rows[0].money))
    }
  })
}

module.exports.help = {
  name: '돈',
  desc: '돈 보여주는 명령어임',
  alias: ['돈', 'ehs'],
  authority: 'Basic'
}
