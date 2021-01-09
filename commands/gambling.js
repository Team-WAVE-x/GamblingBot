const { MessageEmbed } = require('discord.js')
const { comma } = require('../utils/comma')
const { getMoney } = require('../utils/getMoney')

exports.run = async (client, message, args) => {
  const { db } = client
  const rows = await db('users').select('*').where('id', message.author.id)
  if (!rows.length) message.channel.send(new MessageEmbed().addField('가입', '`$가입` 해주세요'))
  else {
    const gamblingMoney = Number(args)
    const money = await getMoney(db, message.author.id)
    if (gamblingMoney && gamblingMoney > 0 && Number.isInteger(gamblingMoney)) await rand(gamblingMoney, money, message, db)
    else if (args[0] === '올인' && money > 0) await rand(money, money, message, db)
    else message.channel.send(`<@${message.author.id}> \`$도박 [도박할 돈]\` 도박할 돈은 양의 정수만 가능합니다.`)
  }
}

async function rand(gamblingMoney, money, message, db) {
  if (gamblingMoney <= money) {
    const rand = Math.floor(Math.random() * Math.floor(100))
    if (rand < 49) {
      message.channel.send(`:tada: <@${message.author.id}> 도박 성공 \`+${comma(gamblingMoney)}\`\n남은 돈: ${comma(gamblingMoney + money)}`)
      await db('users').update({ money : gamblingMoney + money }).where('id', message.author.id)
    } else if (rand < 50) {
      message.channel.send(`\🏅 <@${message.author.id}> 잭팟이 터졌네 펑펑 와 축 하 드 려 요! \`+${comma(gamblingMoney * 99)}\`\n남은 돈: ${comma(money + (gamblingMoney * 100))}`)
      await db('users').update({ money : money + (gamblingMoney * 99) }).where('id', message.author.id)
    } else if (rand < 99) {
      message.channel.send(`:boom: <@${message.author.id}> 도박 실패 \`-${comma(gamblingMoney)}\`\n남은 돈: ${comma(money - gamblingMoney)}`)
      await db('users').update({ money : money - gamblingMoney }).where('id', message.author.id)
    } else {
      message.channel.send(`:boom::boom::boom::boom: <@${message.author.id}> 당신의 지갑이 폭파되었습니다.. \`-${comma(money)}\`\n남은 돈: 0`)
      await db('users').update({ money : 0 }).where('id', message.author.id)
    }
  } else message.channel.send(`<@${message.author.id}> 도박할 돈도 없으면서 도박하지 말아주세요!`)
}

module.exports.help = {
  name: '도박',
  desc: '도박 명령어임',
  alias: ['도박', 'ehqkr'],
  authority: 'Basic'
}
