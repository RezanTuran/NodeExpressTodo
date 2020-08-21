
window.addEventListener('load', getTodos)

async function makeRequest(url, method, formdata) {
    const response = await fetch(url, {
    method: method,
    body: formdata,
    headers: {"Content-Type": "application/json"}
})
console.log(response);   

const todos = await response.json()
console.log(todos);
}

async function createTodo(event) {
event.preventDefault() // Hinda ladda om sidan
}

// ### Get All Todos ### //
 async function getTodos() {
    const result = await fetch('/api/todos')
    const todos = await result.json()
    console.log(todos);

    let container = document.getElementById("container")

        for (let i = 0; i < todos.length; i++) {
            let title = (todos[i].title);
            let description = (todos[i].description);
            let date = (todos[i].date);
            let id = (todos[i].id);

            let box = document.createElement("div");

            let titleTag = document.createElement("h3");
            let descriptionTag = document.createElement("p");
            let dateTag = document.createElement("p");
            let deleteButton = document.createElement("button");
            let updateButton = document.createElement("button");

            titleTag.innerText = title;
            descriptionTag.innerText = description;
            dateTag.innerText = date;
            deleteButton.innerText = "Ta Bort";
            updateButton.innerText = "Uppdatera";

            deleteButton.classList = "btn btn-danger"
            updateButton.classList = "btn btn-info"

            updateButton.style.margin = "2px";



            deleteButton.onclick = function () {
                deleteTodos(id);
            }
            updateButton.onclick = function () {
                updateTodos(id);
            }

            box.appendChild(titleTag);
            box.appendChild(descriptionTag);
            box.appendChild(dateTag);
            box.appendChild(deleteButton);
            box.appendChild(updateButton);

            container.appendChild(box);
}
}

// ### Post Todos ### //
function addTodos() {
    
    let todosInput = document.getElementById("todosInput").value
    let todosDescription = document.getElementById("todosDescription").value
    let todosDate = document.getElementById("todosDate").value
    
    if(todosInput === "" || todosDate === ""){
        alert("Fyll uppgifter som behövs")
    }else{
    let body = {
        "title": todosInput,
        "description": todosDescription,
        "date": todosDate
    }
    makeRequest("/api/todos", "post", JSON.stringify(body))
    location.reload()
}
}

function deleteTodos(id) {

    makeRequest('/api/todos/' + id, 'delete')
    location.reload()
}



function updateTodos(id) {

    let todo = {
        title:"dsfdsfsdf",
        description:"Dfgdfdf",
        date:"2020-01-01"
    }

    makeRequest('/api/todos/' + id, 'put', JSON.stringify(todo))
    
}


