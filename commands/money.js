const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
  const { db } = client
  const rows = await db('users').select('*').where('id', message.author.id)
  if (!rows.length) message.channel.send(new MessageEmbed().addField('가입 먼저 해', '`$가입` 하라고요'))
  else {
    const { money } = (await db('users').select('*').where('id', message.author.id))[0]
    message.channel.send('돈: ' + money)
  }
}

module.exports.help = {
  name: '돈',
  desc: '돈 보여주는 명령어임',
  alias: ['돈', 'ehs'],
  authority: 'Basic'
}
