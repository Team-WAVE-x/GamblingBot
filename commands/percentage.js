const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
  const embed = new MessageEmbed()
    .setTitle('도박 확률')
    .addField('성공', '49% `1배 추가`', true)
    .addField('실패', '49% `1배 감소`', true)
    .addField('잭팟', '1% `99배 추가`', true)
    .addField('폭발', '1% `모두 잃음`', true)
  message.channel.send(embed)
}

module.exports.help = {
  name: '확률',
  desc: '도박의 확률 알려드림',
  alias: ['ghkrfbf'],
  authority: 'Basic'
}
