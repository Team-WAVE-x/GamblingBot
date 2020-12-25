const Query = require('../classes/Query')
const { MessageEmbed } = require('discord.js')

module.exports = (client, msg) => {
  if (msg.author.bot) return
  if (!msg.content.startsWith(client.settings.prefix)) return

  const query = new Query(client.settings.prefix, msg.content)
  const target = client.commands.find((c) => c.help.alias.includes(query.cmd) || c.help.name === query.cmd)

  if (target.help.authority === 'Developer' && !client.settings.developers.includes(msg.author.id)) {
    return msg.channel.send(new MessageEmbed({ title: ':x: Access Denied!', color: 0xFF6961 }))
  }

  if (target) target.run(client, msg, query.args)
}
