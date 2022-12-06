// @ts-nocheck

let todos = [];


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
    let todoList = document.getElementById("todo-list");

    clearCurrentList(todoList);

    todos.forEach(todo => {
        let item = document.createElement("li");

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
    console.log("Found todo item");
    console.log(todoItem);
    todoItem.completed = !todoItem.completed;
    console.log("Classes");
    console.log(liNode.classList);
    liNode.classList.toggle('completed');
    console.log("Classes");
    console.log(liNode.classList);
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