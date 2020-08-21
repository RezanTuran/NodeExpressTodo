const express = require('express')

// Define a state for our data (database)
let idIndex = 1

const todos = [{
    id: 0,
    title: "Träna",
    description: "Träna efter jobbet",
    date: "2020-08-18"
}]

const app = express()
app.use(express.json())
//Make sure client folder is accesable
app.use(express.static('./client'))

// ### Get Todos  ### //
app.get('/api/todos', (req,res) => res.json(todos))

// ### Post Todos  ### //
app.post('/api/todos', (req,res) => {
    //console.log(req.body);
    if(!req.body.title || !req.body.date){
        res.status(404).json({
            message:'Data sent as body is not correct'
        })
    }else{
        const todo = {id: idIndex, ...req.body}
        todos.push(todo)
        res.status(201)
        res.json(todo)
        idIndex++
    }

})
// ### Update Todos ### //
app.put('/api/todos/:id', (req,res) => {
    const paramId = req.params.id
    let foundTodoIndex = todos.findIndex((todos) => todos.id == paramId)

    if(foundTodoIndex == -1){
        res.status(404).json({message:"Todos to update not found.."})
    }
    
    todos[foundTodoIndex] = req.body
    res.json({message: "Todos updated"})

})

// ### Remove Todos  ### //
app.delete('/api/todos/:id', (req,res) => {
    const paramId = req.params.id
    let foundTodoIndex = todos.findIndex((todos) => todos.id == paramId)

    if(foundTodoIndex == -1){
        res.status(404).json({message: "Todos to delete not found.."})
    }
    todos.splice(foundTodoIndex, 1)

    res.json({message: "Todos deleted"})
})

// ### Validation  ### //
app.use((req,res) =>{
    res.status(404).json({ 
        message: 'Could not find the resource you are looking for....'
    })
})

// Start the server
app.listen(3000, () => console.log('Server is up and running on port 3000'))