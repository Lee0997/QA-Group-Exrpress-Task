const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  name: String,
  todo: String,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;

// module.exports = function Todo(id, name, todo) {
//     this.id = id;
//     this.name = name;
//     this.todo = todo;
// }