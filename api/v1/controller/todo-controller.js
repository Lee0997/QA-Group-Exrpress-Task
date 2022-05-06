const { json } = require("express");
const TodoNotFoundError = require("../errors/todo-not-found-error");
const Todo = require("../model/todo.js");

const todos = [
  new Todo({ name: "John", todo: "Remove rubbish" }),
  new Todo({ name: "Jim", todo: "Clean up" })
];

module.exports = {
  readAll: async (req, res, next) => {
    const todos = await Todo.find({});
    res.status(200).json(todos);
  },

  readById: async (req, res, next) => {
    const id = req.params.id;
    const todo = Todo.findById(id);
    if (todo) {
      res.status(200).json(todo);
      return;
    }
    next(new TodoNotFoundError(id));
  },

  create: async (req, res, next) => {
    const todo = new Todo(req.body);

    try {
      await todo.save();
      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;

    const todo = await Todo.updateOne({ _id: id }, updates);

    if (todo) {
      res.status(200).json(todo);
      return;
    }
    next(new TodoNotFoundError(id));
  },

  delete: async (req, res, next) => {
    const id = req.params.id;
    const condition = { _id: id }
    const todo = await Todo.findOneAndDelete(condition);

    if (todo) {
      return res.status(200).json(user);
    }
    next(new TodoNotFoundError(id));
  },
};
