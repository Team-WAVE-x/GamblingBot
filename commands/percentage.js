const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
  const embed = new MessageEmbed()
    .setTitle('도박 확률')
    .addField('성공', '49%')
    .addField('실패', '50%')
    .addField('잭팟', '1%')
  message.channel.send(embed)
}

module.exports.help = {
  name: '확률',
  desc: '도박의 확률 알려드림',
  alias: ['ghkrfbf'],
  authority: 'Basic'
}
