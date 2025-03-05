const express = require('express');
const app = express();

app.use(express.json());//middleware pqrsing body to json object
let todos=[{id:1,name:"ali"},{id:2,name:"rami"}];


app.post('/api/todos/create',(req, res) => {
    todos.push(req.body)
    res.send(todos)
})

app.put('/api/todos/update/:id',(req, res) => {
    const id = Number(req.params.id)
    todos=todos.map((todo) =>{
        return todo.id===id ?{...todo,...req.body}:todo
    })
    res.send(todos)

})

app.delete('/api/todos/delete/:id',(req, res) => {
    const id = Number(req.params.id)
    todos=todos.filter((todo) =>{return todo.id !== id})
})


app.get('/', (req, res) => {
    res.send('Hello World!');
    res.json({message:"hello"})
    res.end({message:"do this ans skip other requests"})
    res.statusCode(404).send({message:"product not found"})
});

app.get('/file', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})
app.listen(5000,()=>{
    console.log('listening on '+5000);
});