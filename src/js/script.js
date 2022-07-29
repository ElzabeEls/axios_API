import 'regenerator-runtime/runtime';
import axios from 'axios';

//Our first fetch function
let result = fetch('https://jsonplaceholder.typicode.com/todos');
console.log("Our first fetch function");
console.log(result);

//Our first GET function
let results = axios.get('https://jsonplaceholder.typicode.com/todos', {
    params: {//the key and value pairs of the query parameter
        userId: 1,
        completed: false
    }
})
console.log("Our first GET function:");
console.log(results);

//Our second GET function
let result3 = axios.get('https://jsonplaceholder.typicode.com/todos?userId=1&completed=false')
console.log("Our second GET function:");
console.log(result3);

//Our third GET function
document.getElementById("axios3Button").addEventListener("click", displayTwoGet);

function displayTwoGet() {
    axios.all([
        axios.get("https://jsonplaceholder.typicode.com/todos/"),//the first get request
        axios.get("https://jsonplaceholder.typicode.com/users")//the second get request
    ])
        .then(axios.spread((todos, users) => {//the two request arrays as parameters
            console.log("todos are:");
            console.log(todos)//the first request array
            console.log("users are:");
            console.log(users)//the second request array
            console.log("todos.data are:");
            console.log(todos.data)
            console.log("users.data are:");
            console.log(users.data)
            let theData = todos.data
            display(theData);

        }))
}


function display(param) {
    console.log("Let's display it one by one on here and on the DOM");
    for (let i = 0; i < param.length; i++) {
        console.log(param[i]);
        let para = document.createElement("p");
        let textNode = document.createTextNode("id: " + param[i].id);
        para.appendChild(textNode);
        textNode = document.createTextNode(" title: " + param[i].title);
        para.appendChild(textNode);
        textNode = document.createTextNode(" completed: " + param[i].completed);
        para.appendChild(textNode);
        document.getElementById("displayDiv").appendChild(para);
    }
}


//Our first post request

const form = document.querySelector('form');

form.addEventListener('submit', async event => {
    event.preventDefault();

    const title = document.querySelector('#new-todos__title').value;

    const todo = {
        userId: 1,
        title: title,
        completed: false
    };

    const submitTodoItem = await addTodoItem(todo);
    updateTodoList(submitTodoItem);
});

// ...

const createTodoElement = item => {
    const todoElement = document.createElement('li');

    todoElement.appendChild(document.createTextNode(item.title));

    return todoElement;
};

const updateTodoList = todoItems => {
    const todoList = document.querySelector('ul');

    if (Array.isArray(todoItems) && todoItems.length > 0) {
        todoItems.map(todoItem => {
            todoList.appendChild(createTodoElement(todoItem));
        });
    } else if (todoItems) {
        todoList.appendChild(createTodoElement(todoItems));
    }
};


export const addTodoItem = async todo => {
    try {
        const response = await axios.post(`https://jsonplaceholder.typicode.com/todos`, todo);
        const newTodoItem = response.data;

        console.log(`Added a new Todo!`, newTodoItem);

        return newTodoItem;
    } catch (errors) {
        console.error(errors);
    }
};

//Our second post request

const form2 = document.querySelector('#form2');

form2.addEventListener('submit', async event => {
    event.preventDefault();

    const title = document.querySelector('#new-todos__title2').value;

    try {
        const response = await axios.post(`https://jsonplaceholder.typicode.com/todos?userId=1&title=title&completed=false`);
        const newTodoItem = response.data;

        console.log(`Added a new Todo!`, newTodoItem);

        return newTodoItem;
    } catch (errors) {
        console.error(errors);
    }
});