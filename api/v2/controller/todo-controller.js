const TodoNotFoundError = require("../errors/todo-not-found-error");
const Todo = require("../model/todo");

let idCounter = 3;
const todos = [
  new Todo(1, "Alfred", "Buy groceries", ["tag1", "tag2"]),
  new Todo(2, "Jim", "Clean up", ["tag3", "tag4"]),
];

module.exports = {
  readAll: (req, res, next) => {
    res.status(200).json(todos);
  },

  readById: (req, res, next) => {
    const id = req.params.id;
    const todo = todos.find((todo) => todo.id == id);
    if (todo) {
      res.status(200).json(todo);
      return;
    }
    next(new TodoNotFoundError(id));
  },

  create: (req, res, next) => {
    const todo = new Todo(
      idCounter++,
      req.body.name,
      req.body.task,
      req.body.tags
    );
    todos.push(todo);
    res.status(200).json(todo);
  },

  update: (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;
    const todo = todos.find((todo) => todo.id == id);
    if (todo) {
      todo.name = updates.name;
      todo.todo = updates.task;
      todo.tags = updates.tags;
      res.status(200).json(todo);
      return;
    }
    next(new TodoNotFoundError(id));
  },

  delete: (req, res, next) => {
    const id = req.params.id;
    const todo = todos.find((todo) => todo.id == id);

    if (todo) {
      const index = todos.indexOf(todo);
      todos.splice(index, 1);
      res.status(200).json(todo);
      return;
    }
    next(new TodoNotFoundError());
  },

  addTag: (req, res, next) => {
    const id = req.params.id;
    const newTag = req.body.tags;
    const todo = todos.find((todo) => todo.id == id);
    if (todo) {
      todos.push(newTag);
      res.status(200).json(todo);
    }
  },

  removeTag: (req, res, next) => {},
};
