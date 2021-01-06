const { MessageEmbed } = require('discord.js')
const { comma } = require('../utils/comma')

exports.run = async (client, message, args) => {
  const { db } = client

  const rows = await db('users').orderBy('money', 'desc')
  const embed = new MessageEmbed().setTitle('랭킹임')
  for (let i = 0; i < 10; i++)
    if (rows[i]) {
      const user = await client.users.fetch(rows[i].id)
      embed.addField(`${i + 1}위 ${user.username}님`, `${comma(rows[i].money)}원`, true)
    }
  message.channel.send(embed)
}

module.exports.help = {
  name: '랭킹',
  desc: '랭크 보여줍니다',
  alias: ['fodzld', '랭크', 'fodzm'],
  authority: 'Basic'
}
