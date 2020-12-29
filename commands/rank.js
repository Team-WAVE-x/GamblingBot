const { MessageEmbed } = require('discord.js')
const { token } = require('../settings.json')

exports.run = async (client, message, args) => {
  const { db } = client

  const rows = await db('users').orderBy('money', 'desc')
  const embed = new MessageEmbed().setTitle('랭킹임')
  for (let i = 0; i < 10; i++)
    if (rows[i]) {
      const user = await client.users.fetch(rows[i].id)
      embed.addField((i + 1) + '위', `${user.username || '없음'}: ${rows[i].money || '없음'}`)
    }
  message.channel.send(embed)
}

module.exports.help = {
  name: '랭킹',
  desc: '랭크 보여줍니다',
  alias: ['fodzld', '랭크', 'fodzm'],
  authority: 'Basic'
}
