const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
  const { db } = client
  const rows = await db('users').select('*').where('id', message.author.id)
  if (!rows.length) message.channel.send(new MessageEmbed().addField('가입 먼저 해', '`$가입` 하라고요'))
  else {
    const { money } = (await db('users').select('*').where('id', message.author.id))[0]
    if (Math.floor(Math.random() * Math.floor(2))) {
      message.channel.send('도박 성공 ㅅㄱ 남은 돈: ' + (money * 2))
      await db('users').update({ money : money * 2 }).where('id', message.author.id)
    } else {
      message.channel.send('도박 실패 ㅅㄱ 남은 돈: ' + 0)
      await db('users').update({ money : 0 }).where('id', message.author.id)
    }
  }
}

module.exports.help = {
  name: '도박',
  desc: '도박 명령어임',
  alias: ['도박', 'ehqkr'],
  authority: 'Basic'
}
