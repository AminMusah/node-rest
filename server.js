const http = require('http')
const newUser = require('./router/auth')
const allUsers = require('./router/users')

require('./db/connect')


const server = http.createServer(
    newUser,
    allUsers
)

const PORT = 5000

server.listen(PORT, () => console.log(`serving on port ${PORT}`))