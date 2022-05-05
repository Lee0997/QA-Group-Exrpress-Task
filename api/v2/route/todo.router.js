const express= require('express');
const todoController = require('../controller/todo-controller');

const router = express.Router();

router.get('/',todoController.readAll);

router.get('/:id',todoController.readById);

router.post('/',todoController.create);

router.put('/:id', todoController.update);

router.delete('/:id', todoController.delete);

router.post('/:id', todoController.addTag);

router.delete('/:id', todoController.removeTag);

module.exports = router;
