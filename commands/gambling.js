const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
  const { db } = client
  const rows = await db('users').select('*').where('id', message.author.id)
  if (!rows.length) message.channel.send(new MessageEmbed().addField('가입 먼저 해', '`$가입` 하라고요'))
  else {
    const gamblingMoney = Number(args)
    const { money } = (await db('users').select('*').where('id', message.author.id))[0]
    if (gamblingMoney && gamblingMoney > 0 && Number.isInteger(gamblingMoney)) await rand(gamblingMoney, money, message, db)
    else if (args[0] === '올인' && gamblingMoney > 0) await rand(money, money, message, db)
    else message.channel.send(`<@${message.author.id}> \`$도박 [도박할 돈]\` 소수 음수 안됨`)
  }
}

async function rand(gamblingMoney, money, message, db) {
  if (gamblingMoney <= money) {
    const rand = Math.floor(Math.random() * Math.floor(100))
    if (rand < 49) {
      message.channel.send(`:tada: <@${message.author.id}> 도박 성공 \`+${gamblingMoney}\`\n남은 돈: ${gamblingMoney + money}`)
      await db('users').update({ money : gamblingMoney + money }).where('id', message.author.id)
    } else if (rand < 50) {
      message.channel.send(`\🏅 <@${message.author.id}> 잭팟이 터졌네 펑펑 와 축 하 드 려 요! \`+${gamblingMoney * 99}\`\n남은 돈: ${money + (gamblingMoney * 100)}`)
      await db('users').update({ money : money + (gamblingMoney * 99) }).where('id', message.author.id)
    } else if (rand < 99) {
      message.channel.send(`:boom: <@${message.author.id}> 도박 실패 \`-${gamblingMoney}\`\n남은 돈: ${money - gamblingMoney}`)
      await db('users').update({ money : money - gamblingMoney }).where('id', message.author.id)
    } else {
      message.channel.send(`:boom::boom::boom::boom: <@${message.author.id}> 당신의 지갑이 폭파되었습니다.. \`=0\`\n남은 돈: 0`)
      await db('users').update({ money : 0 }).where('id', message.author.id)
    }
  } else message.channel.send(`<@${message.author.id}> 도박할 돈도 없으면서 도박하지 마`)
}

module.exports.help = {
  name: '도박',
  desc: '도박 명령어임',
  alias: ['도박', 'ehqkr'],
  authority: 'Basic'
}
