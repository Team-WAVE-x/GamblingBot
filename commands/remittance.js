const { MessageEmbed } = require('discord.js')
const { comma } = require('../utils/comma')
const { getMoney } = require('../utils/getMoney')

exports.run = async (client, message, args) => {
  const { db } = client
  const rows = await db('users').select('*').where('id', message.author.id)
  if (!rows.length) message.channel.send(new MessageEmbed().addField('가입', '`$가입` 해주세요'))
  else {
    const money = await getMoney(db, message.author.id)
    const id = args[0]
    if (await db('users').select('*').where('id', id)) {
      const reciverMoney = await getMoney(db, id)
      await db('users').update({ money: Number(money) - Number(args[1]) }).where('id', message.author.id)
      await db('users').update({ money: Number(reciverMoney) + Number(args[1]) }).where('id', id)
      message.channel.send(new MessageEmbed()
        .setTitle(':check: 송금 완료')
        .addField('발신자', String(Number(money) - Number(args[1])))
        .addField('수신자', String(Number(reciverMoney) + Number(args[1]))))
    } else message.channel.send(`<@${message.author.id}> 유효하지 않은 맨션 입니다.`)
  }
}

module.exports.help = {
  name: '송금',
  desc: '돈주는 명령어임',
  alias: ['thdrma', '돈주기', 'ehswnrl'],
  authority: 'Basic'
}
