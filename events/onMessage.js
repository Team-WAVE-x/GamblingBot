const Query = require('../classes/Query')

module.exports = (client, msg) => {
  if (msg.author.bot) return
  if (!msg.content.startsWith(client.settings.prefix)) return

  const query = new Query(client.settings.prefix, msg.content)
  const target = client.commands.find((c) => c.help.alias.includes(query.cmd) || c.help.name === query.cmd)

  if (target) target.run(client, msg, query.args)
}
