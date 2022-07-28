import 'regenerator-runtime/runtime';
import axios from 'axios';


let results = axios.get('https://jsonplaceholder.typicode.com/todos', {
    params: {//the key and value pairs of the query parameter
        userId: 1,
        completed: false
    }
})
console.log("results are:");
console.log(results);


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
            console.log("todos.data one by one:");
            let theData = todos.data
            display(theData);

        }))
}


function display(param) {
    for (let i = 0; i < param.length; i++) {
        console.log(param[i]);

        let para = document.createElement("p");
        let textNode = document.createTextNode("id: " + param[i].id);
        para.appendChild(textNode);
        textNode = document.createTextNode(" title: " + param[i].title);
        para.appendChild(textNode);
        document.getElementById("displayDiv").appendChild(para);
    }
}

document.getElementById("myPostButton").addEventListener("click", myPost);

function myPost() {
    axios.post('https://jsonplaceholder.typicode.com/todos/1', {
        title: 'cook',
        completed: false
    });
}