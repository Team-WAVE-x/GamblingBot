module.exports = (client) => {
  console.log('Logged in As ' + client.user.tag)
  client.user.setActivity('$도움 를 써보세요!')
}
