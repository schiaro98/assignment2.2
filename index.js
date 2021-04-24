const express = require('express')
const app = express()
let port = 3123

app.use(express.static('public'))

const routes = require('./src/routes/trainRoutes')
routes(app)

app.listen(port, function (){
    console.log('Server started on port: ' + port)
})
