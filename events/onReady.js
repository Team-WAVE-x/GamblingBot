module.exports = (client) => {
  console.log('Logged in As ' + client.user.tag)
  client.user.setActivity('$help 를 써보세요!')
}
