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

var usersController = require("./controllers/users_controller.js");
const User = require('./models/user.js');

app.get("/users.json", usersController.index);
app.post("/users", usersController.create);
app.get("/users/:username", usersController.show);
app.put("/users/:username", usersController.update);
app.delete("/users/:username", usersController.destroy);
app.get("/users/:username/account", usersController.showTodos);
// app.put("/users/:username/account", usersController.updateTodos);
// app.delete("/users/:username/account", usersController.destroyTodos);


var ObjectId = mongoose.Schema.Types.ObjectId;

const ToDoSchema = mongoose.Schema({
    description: String,
    tags: [String],
    owner: { type: ObjectId, ref: "User" }
});

var ToDo = mongoose.model("ToDo", ToDoSchema);



app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render('index', { username: "" });
})
app.get('/flikr', (req, res) => {
    res.render('flikr')
})

app.get('/:username/todo.json', (req, res) => {
    // res.sendFile(__dirname + '/todo.json')
    User.find({ 'username': req.params.username }, function (err, user) {
        console.log('нашел', user[0]._id)
        ToDo.find({ 'owner': user[0]._id }, function (err, toDos) {
            if (err !== null) {
                console.log(err);
                res.send("ERROR");
            } else {
                res.json(toDos);
            }
        });
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post("/:username/todos", function (req, res) {
    console.log(req.body);

    User.find({ 'username': req.params.username }, function (err, user) {
        var newToDo = new ToDo({ 'owner': user[0]._id, "description": req.body.description, "tags": req.body.tags });
        newToDo.save(function (err, result) {
            if (err !== null) {
                console.log(err);
                res.send("ERROR");
            } else {
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
});

app.get('/app.js', (req, res) => {
    res.sendFile(__dirname + '/app.js')
})

// app.listen(port, () => console.info(`Запуск сервера -> ${port}`))
http.createServer(app).listen(port, () => console.info(`Запуск сервера -> ${port}`));
