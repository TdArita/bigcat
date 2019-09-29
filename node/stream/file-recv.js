const net = require('net')

net.connect(9999, '10.1.1.1').pipe(process.stdout)