const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
  const { db } = client

  const rows = await db('users').select('*').where('id', message.author.id)
  if (!rows.length) {
    await db('users').insert({id: message.author.id, money: 100})
    message.channel.send(new MessageEmbed().addField('가입 완료', '가입 완료함 ㅅㄱ'))
  } else message.channel.send(new MessageEmbed().addField('가입 이미했', '가입 이미했자나'))
}

module.exports.help = {
  name: '가입',
  desc: '가입합니다',
  alias: ['rkdlq'],
  authority: 'Basic'
}
