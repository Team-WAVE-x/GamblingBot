// Imports
const Client = require('./classes/Client')
const onReady = require('./events/onReady')
const onMessage = require('./events/onMessage')

// Inits
const client = new Client()

// Events
client.regist('ready', onReady)
client.regist('message', onMessage)

// Start
client.start()
