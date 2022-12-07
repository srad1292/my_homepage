// @ts-nocheck
const TODO_KEY = 'todos';
let todos = [];
getFromLocalStorage();
console.log(todos);
buildTodoList();


function handleAddItemKeyPress(event) {
    console.log("I am inside handleAddItemKeyPress");
    if (event.key === "Enter") {
        const todoInput = document.getElementById('todo-input');
        let text = todoInput.value;
        console.log("Current todo text: ", text);
        if(!text) { return; }
        text = text.trim();
        if(!text) { return; }
        
        todos.push({value: text, completed: false});
        buildTodoList();
        todoInput.value = '';
    }
}

function buildTodoList() {
    updateLocalStorage();
    let todoList = document.getElementById("todo-list");

    clearCurrentList(todoList);

    todos.forEach(todo => {
        let item = document.createElement("li");
        if(todo.completed) { item.classList.add('completed'); }

        let button = item.appendChild(document.createElement('button'));
        button.innerHTML = "X";
        button.classList.toggle('clear-button')
        button.onclick = () => {deleteItem(todo.value)};

        let itemSpanNode = document.createElement('span');
        itemSpanNode.classList.add('clickable');
        itemSpanNode.appendChild(document.createTextNode(todo.value));
        itemSpanNode.onclick = () => {toggleItemState(todo, item)};
        item.appendChild(itemSpanNode);

        todoList.appendChild(item);

        

    });
}

function toggleItemState(item, liNode) {
    let todoItem = todos.find(todo => todo.value === item.value);
    todoItem.completed = !todoItem.completed;
    liNode.classList.toggle('completed');
    updateLocalStorage();
}

function deleteItem(item) {
    console.log("I am in delete item for: ", item);
    todos = todos.filter(todo => todo.value !== item);
    buildTodoList();
}

function clearCurrentList(todoList) {
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }
}

function updateLocalStorage() {
    const stringified = JSON.stringify(todos);
    localStorage.setItem(TODO_KEY, stringified);
}

function getFromLocalStorage() {
    let stored = localStorage.getItem(TODO_KEY);
    if(!!stored && stored !== '') {
        todos = JSON.parse(stored);
    } else {
        todos = [];
    }
}