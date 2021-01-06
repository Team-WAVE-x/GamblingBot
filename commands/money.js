const { MessageEmbed } = require('discord.js')
const { comma } = require('../utils/comma')

exports.run = async (client, message, args) => {
  const { db } = client
  const rows = await db('users').select('*').where('id', message.author.id)
  if (!rows.length) message.channel.send(new MessageEmbed().addField('가입', '`$가입` 해주세요'))
  else {
    const { money } = (await db('users').select('*').where('id', message.author.id))[0]
    message.channel.send('돈: ' + comma(money))
  }
}

module.exports.help = {
  name: '돈',
  desc: '돈 보여주는 명령어임',
  alias: ['돈', 'ehs', '지갑', 'wlrkq'],
  authority: 'Basic'
}
