const https = require('https')
const fs = require('fs')

const privateKey  = fs.readFileSync('/root/.acme.sh/tdarita.com/tdarita.com.key', 'utf8')
const certificate = fs.readFileSync('/root/.acme.sh/tdarita.com/tdarita.com.cer', 'utf8')
const credentials = {key: privateKey, cert: certificate}

var httpsServer = https.createServer(credentials)

module.exports = httpsServer