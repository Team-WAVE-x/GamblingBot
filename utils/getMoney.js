async function getMoney(db, id) {
    const money = JSON.parse(JSON.stringify(await db('users').select('money').where('id', id)).replace(' TextRow ', ''))[0].money
    return money
}
  
module.exports = { getMoney }