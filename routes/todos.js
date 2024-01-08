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

    res.send(todo);
})

//UPDATE todos by put
router.put('/:id',(req,res,next)=>{
    todo = todo.map(todo=>{
                           if(todo.id == req.params.id)
                            {
                            return {
                                    id:crypto.randomUUID(),
                                    title:'updated via put',
                                    status: 'updated'
                                }
                            }
                            else
                                return todo;
                          }
                    )       

    res.send(todo);
})


//UPDATE todos by patch 
router.patch('/:id',(req,res,next)=>{
    const todoUpdates = todo.find(item=> item.id == req.params.id)
    todoUpdates.title = 'UPDATED via patch';
    todoUpdates.status = 'Just updated'
    todo = todo.map(todo=>{
        if(todo.id == req.params.id)
            return todoUpdates;
    })
    res.send(todo);
})


//DELETE todo by id
router.delete('/:id',(req,res,next)=>{
    todo = todo.filter(todo=>{
        if(todo.id != req.params.id)
            return todo;
    })

    res.send(todo);
})


module.exports = router