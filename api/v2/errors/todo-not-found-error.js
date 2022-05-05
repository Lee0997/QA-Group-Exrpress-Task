module.exports = class TodoNotFoundError extends Error {
    constructor(id) {
        super(`Todo list with id ${id} was not found.`)
        this.id = id;
    }
}