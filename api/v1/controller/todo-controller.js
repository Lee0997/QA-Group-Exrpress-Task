const TodoNotFoundError = require('../errors/todo-not-found-error');
const Todo = require('../model/todo');

let idCounter = 1;
const todos = [new Todo(1, "Alfred", "Buy groceries"), new User(2, "Jim", "Clean up")];

module.exports = {
    readAll: (req, res, next) => {
        res.status(200).json(todos);
    },
    
    readById: (req, res, next) => {
        const id = req.params.id;
        const todo = todos.find(todo => todo.id == id);
        if (todo) {
            res.status(200).json(todo);
        }
        next(new TodoNotFoundError(id));
    },

    create: (req, res, next) => {
        const todo = new Todo(idCounter++, req.body.name);
        todos.push(todo);
        res.status(200).json(todo);
    },

    update: (req, res, next) => {
        const id = req.params.id;
        const updates = req.body;
        const todo = todos.find(todo => todo.id == id);
        if (todo) {
            todo.name = updates.name;
            res.status(200).json(todo);
            return;
        }
        next(new TodoNotFoundError(id));
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        const todo = todos.find(todo => todo.id == id);

        if (todo) {
            const index = todos.indexOf(todo);
            todos.splice(index, 1);
            res.status(200).json(todo);
            return;
        }
        next(new TodoNotFoundError);
    }
}