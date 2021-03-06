const { MessageEmbed } = require('discord.js')
const { comma } = require('../utils/comma')
const { getMoney } = require('../utils/getMoney')

const cooltime = new Set()

exports.run = async (client, message, args) => {
  const { db } = client
  const rows = await db('users').select('*').where('id', message.author.id)
  if (!rows.length) message.channel.send(new MessageEmbed().addField('가입', '`$가입` 해주세요'))
  else {
    if (!cooltime.has(message.author.id)) {
        const money = await getMoney(db, message.author.id)
        await db('users').update({ money: money + 100}).where('id', message.author.id)
        message.channel.send(`<@${message.author.id}> 돈 받음.\n현재 돈 : ` + comma(money + 100))
        cooltime.add(message.author.id)
        setTimeout(() => { cooltime.delete(message.author.id) }, 15000)
    } else message.channel.send(`<@${message.author.id}> 쿨타임임 좀만 기다려주세요.\n쿨타임은 15초입니다.`)
  }
}

module.exports.help = {
  name: '돈받기',
  desc: '돈받는 명령어임',
  alias: ['ehsqkerl', '돈 받기', 'ehs qkerl'],
  authority: 'Basic'
}
