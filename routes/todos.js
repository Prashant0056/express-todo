var express = require('express');
var router = express.Router();
var crypto = require('crypto')


todo = [
    {
        id:crypto.randomUUID(),
        title:'item no: 1',
        status : 'completed'
    }
]

//GET all todos
router.get('/',(req,res,next)=>{
    res.send(todo)
})

//GET todos by id
router.get('/:id',(req,res,next)=>{
    let todoById = []
    todoById = todo.filter(todo=>{
        if(todo.id==req.params.id)
            return todo;
    })

    res.send(todoById);
})

//POST new todo
router.post('/',(req,res,next)=>{
    let idForNewItem = crypto.randomUUID();
    todo.push(
        {
            id:idForNewItem,
            title:'new item',
            status:'ongoing'
        }
    )

    res(todo);
})


//DELETE todo by id
router.put('/:id',(req,res,next)=>{
    todo = todo.filter(todo=>{
        if(todo.id != req.params.id)
            return todo;
    })

    res(todo);
})

console.log(todo)

module.exports = router