var express = require('express');
var router = express.Router();
var crypto = require('crypto')
var fs = require('fs')
var path = require('path')


const idGenerator = () =>{
    return crypto.randomUUID()
} 

const todoPath = path.join(__dirname,'..','data','todo.json');
let todo;

function readTodo(){
    todo = JSON.parse(fs.readFileSync(todoPath, 'utf-8'))
}


//GET all todos
router.get('/',(req,res)=>{
    readTodo();
    let todoByStatus = todo;
    if(req.query.status === 'completed')
    {
        todoByStatus = todo.filter(item=> item.status === 'completed');
            
    }
    res.status(200).json(todoByStatus);
    
})

//GET todos by id
router.get('/:id',(req,res)=>{
    readTodo();
    let todoById = []
    todoById = todo.filter(items=>{
        if(items.id==req.params.id)
            return items;
    })

    res.send(todoById);
})

//POST new todo
router.post('/',(req,res)=>{
    readTodo();
    let idForNewItem = idGenerator();
    todo.push(
        {
            id:idForNewItem,
            title:'new item',
            status:'ongoing'
        }
    )
    
    const todoJSON = JSON.stringify(todo,null,2)
    fs.writeFile(todoPath,todoJSON,(err)=>{
        if(err)
            res.status(500).send("Failed to post")
        else
            res.status(200).send("Successfully posted")
    })
})




//UPDATE todos by put
router.put('/:id',(req,res)=>{
    readTodo();
    const newID = idGenerator();
    todo = todo.map((item)=>{
            if(item.id == req.params.id){
                return {
                        id:newID,
                        title:'updated via put',
                        status: 'updated'
                       }
            } else
            {
                return item;
            }
        }
    )    
    
    const todoJSON = JSON.stringify(todo,null,2)
    fs.writeFile(todoPath,todoJSON,(err)=>{
            if(err)
                res.status(500).send("Failed to update")
            else
                res.status(200).send("Successfully updated")
            })
})


//UPDATE todos by patch 
router.patch('/:id',(req,res)=>{
    readTodo();
    let todoUpdates = todo.find(item=> item.id == req.params.id)
    todoUpdates.title = 'UPDATED via patch';
    todoUpdates.status = 'Just updated';
    todo = todo.map(item=> {
        if(item.id === req.params.id)
            return todoUpdates;
        else return item;
    })
    
    const todoJSON = JSON.stringify(todo,null,2)
    fs.writeFile(todoPath,todoJSON,(err)=>{
            if(err)
                res.status(500).send("Failed to update")
            else
                res.status(200).send("Successfully updated via patch")
            })

})


//DELETE todo by id
router.delete('/:id',(req,res,next)=>{
    readTodo();
    todo = todo.filter(todo=>{
        if(todo.id != req.params.id)
            return todo;
    })
    const todoJSON = JSON.stringify(todo,null,2)
    fs.writeFile(todoPath,todoJSON,(err)=>{
            if(err)
                res.status(500).send("Failed to delete")
            else
                res.status(200).send("Successfully deleted")
            })
})


module.exports = router