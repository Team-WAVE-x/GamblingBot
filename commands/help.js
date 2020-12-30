const { MessageEmbed } = require('discord.js')

exports.run = (client, message, args) => {
  const embed = new MessageEmbed()

  client.commands.forEach((command) => {
    const { help = { } } = command

    if (help.authority === 'Developer') return
    embed.addField(client.settings.prefix + help.name, help.desc || '설명이 없습니다', false)
  })
  embed.addField('초대링크', '- [봇 초대링크](https://discord.com/api/oauth2/authorize?client_id=791957008072441886&permissions=0&scope=bot)\n- [개발한 팀 초대링크](https://discord.gg/HsZrmdjA)')

  message.channel.send(embed)
}

module.exports.help = {
  name: '도움',
  desc: '이 메세지를 출력합니다',
  alias: ['help', '도움말', 'ehdna', 'ehdnaakf'],
  authority: 'Basic'
}
