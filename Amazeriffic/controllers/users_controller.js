const { render, sendfile } = require("express/lib/response");
var User = require("../models/user.js"),
    mongoose = require("mongoose");

var UsersController = {};

//проверка, не существует ли уже пользователь
User.find({}, function (err, result) {
    if (err !== null) {
        console.log("Что-то идет не так");
        console.log(err);
    } else if (result.length === 0) {
        console.log("Создание тестового пользователя...");
        var exampleUser = new User({ "username": "usertest" });
        exampleUser.save(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Тестовый пользователь сохранен");
            }
        });
    }
});

UsersController.index = function (req, res) {
    console.log('Вызвано действие: UsersController.index');
    User.find(function (err, users) {
        if (err !== null) {
            res.json(500, err);
        } else {
            res.status(200).json(users);
        }
    });
};

//Отобразить пользователя
UsersController.show = function (req, res) {
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
};

//Создать нового пользователя
UsersController.create = function (req, res) {
    console.log('Вызвано действие: создать пользователя');
    var username = req.body.username;
    var role = req.body.role;
    // console.log(username);
    User.find({ "username": username }, function (err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            res.status(501).send("Пользователь уже существует");
            console.log(err);
        } else {
            role = 'user';
            var newUser = new User({
                "username": username,
                "role": role
            });
            newUser.save(function (err, result) {
                console.log(err);
                if (err !== null) {
                    res.json(500, err);
                } else {
                    res.json(200, result);
                    console.log(result);
                }
            });
        }
    });
};

//Обновить существующего пользователя
UsersController.update = function (req, res) {
    console.log("Вызвано действие: обновить пользователя");
    console.log(req.params);
    var oldUsername = req.body.oldUsername;
    var newUsername = req.body.newUsername;
    var newRole = req.body.role;
    console.log(oldUsername, newUsername, newRole);
    var newUsername = { $set: { "username": req.body.newUsername, "role": newRole } };
    User.updateOne({ "username": oldUsername }, newUsername, function (err, user) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            console.log('Изменен');
            res.status(200).json(user);
        }
    });
};

//Удалить существующего пользователя
UsersController.destroy = function (req, res) {
    console.log("Вызвано действие: удалить пользователя");
    var username = req.params.username;
    User.find({ "username": username }, function (err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            ToDo.deleteMany({ "owner": result[0]._id }, function (err, todo) {
                User.deleteOne({ "username": username }, function (err, user) {
                    if (err !== null) {
                        res.status(500).json(err);
                    } else {
                        if (user.n === 1 && user.ok === 1 && user.deletedCount === 1) {
                            res.status(200).json(user);
                        } else {
                            res.status(404).json({ "status": 404 });
                        }
                    }
                });
            });
        } else {
            res.status(404).send("Пользователь не существует");
            console.log(err);
        }
    });
};

UsersController.showTodos = function (req, res) {
    res.render('index', { username: req.params.username });
}


module.exports = UsersController;