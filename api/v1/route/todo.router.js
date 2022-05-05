const express= require('express');
const todoController = require('../controller/todo-controller')

const router = express.Router();



router.get('/',todo-Controller.readAll);

router.get('/',todo-controller.readById);

router.post('/create',todo-controller.create);

router.put('/update', todo-controller.update);

router.delete('/delete', todo-controller.delete);

module.exports = router;