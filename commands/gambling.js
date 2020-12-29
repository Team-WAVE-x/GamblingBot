const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
  const { db } = client
  const rows = await db('users').select('*').where('id', message.author.id)
  if (!rows.length) message.channel.send(new MessageEmbed().addField('가입 먼저 해', '`$가입` 하라고요'))
  else {
    const gamblingMoney = Number(args)
    if (gamblingMoney && gamblingMoney > 0 && Number.isInteger(gamblingMoney)) {
      const { money } = (await db('users').select('*').where('id', message.author.id))[0]
      if (gamblingMoney <= money) {
        const rand = Math.floor(Math.random() * Math.floor(1000))
        if (rand < 499) {
          message.channel.send('도박 성공 ㅅㄱ 남은 돈: ' + (gamblingMoney + money))
          await db('users').update({ money : gamblingMoney + money }).where('id', message.author.id)
        } else if (rand < 500) {
          message.channel.send('잭팟이 터졌네 펑펑 와 축 하 드 려 요! 남은 돈: ' + (money + (gamblingMoney * 100)))
          await db('users').update({ money : money + (gamblingMoney * 100) }).where('id', message.author.id)
        }
        else {
          message.channel.send('도박 실패 ㅅㄱ 남은 돈: ' + (money - gamblingMoney))
          await db('users').update({ money : money - gamblingMoney }).where('id', message.author.id)
        }
      } else message.channel.send('도박할 돈도 없으면서 도박하지 마 ||니가 폐인이냐?||')
    } else message.channel.send('`$도박 [도박할 돈]` 소수 음수 안됨')
  }
}

module.exports.help = {
  name: '도박',
  desc: '도박 명령어임',
  alias: ['도박', 'ehqkr'],
  authority: 'Basic'
}
