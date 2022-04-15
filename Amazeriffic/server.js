const express = require('express');
const app = express();
const port = 5000;
const http = require('http');


app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())



var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/amazeriffic');


const ToDoSchema = mongoose.Schema({
    description: String,
    tags: [String]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);



app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render('index')
})
app.get('/flikr', (req, res) => {
    res.render('flikr')
})

app.get('/todo.json', (req, res) => {
    // res.sendFile(__dirname + '/todo.json')
    ToDo.find({}, function (err, toDos) {
        if (err !== null) {
            console.log(err);
            res.send("ERROR");
        } else {
            res.json(toDos);
        }
    });
});

app.post("/todos", function (req, res) {
    console.log(req.body);
    var newToDo = new ToDo({ "description": req.body.description, "tags": req.body.tags });
    newToDo.save(function (err, result) {
        if (err !== null) {
            console.log(err);
            res.send("ERROR");
        } else {
            // клиент ожидает, что будут возвращены все задачи,
            // поэтому для сохранения совместимости сделаем дополнитель) в папку part7 . Нам понадобится файл package.json , гденый запрос 
            ToDo.find({}, function (err, result) {
                if (err !== null) {
                    // элемент не был сохранен
                    res.send("ERROR");
                }
                res.json(result);
            });
        }
    });
});

app.get('/app.js', (req, res) => {
    res.sendFile(__dirname + '/app.js')
})

// app.listen(port, () => console.info(`Запуск сервера -> ${port}`))
http.createServer(app).listen(port, () => console.info(`Запуск сервера -> ${port}`));
