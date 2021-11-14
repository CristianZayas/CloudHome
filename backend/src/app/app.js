const express =  require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')

const app = express();

app.set('port', process.env.PORT || 4100)
app.use(morgan('dev'))
app.use(cors('http://localhost:3000/'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, '../upluaders')))
app.use(require('../router/IndexRouter'))

module.exports =  {  app }