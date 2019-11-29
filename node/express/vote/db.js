const sqlite = require('sqlite')

const dbPromise = sqlite.open(__dirname + '/db/voting-site.sqlite3')

module.exports = dbPromise