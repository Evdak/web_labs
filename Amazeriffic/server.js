const express = require('express')
const app = express()
const port = 5000


app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use(express.json())



app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render('index')
})
app.get('/flikr', (req, res) => {
    res.render('flikr')
})

app.get('/todo.json', (req, res) => {
    res.sendFile(__dirname + '/todo.json')
})

app.get('/app.js', (req, res) => {
    res.sendFile(__dirname + '/app.js')
})

app.listen(port, () => console.info(`Запуск сервера -> ${port}`))