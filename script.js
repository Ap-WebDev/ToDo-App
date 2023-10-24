function addTodo() {
    const todoText = document.getElementById("todoInput").value;
    if (todoText) {
        const todoList = JSON.parse(localStorage.getItem("todos")) || [];
        todoList.push({
            text: todoText,
            checked: false,
        });
        localStorage.setItem("todos", JSON.stringify(todoList));
        document.getElementById("todoInput").value = "";
        displayTodoList();
    }
}

function displayTodoList() {
    const todoList = JSON.parse(localStorage.getItem("todos")) || [];
    const todoListElement = document.getElementById("todoList");
    todoListElement.innerHTML = "";

    for (let i = 0; i < todoList.length; i++) {
        const listItem = document.createElement("li");
        listItem.className = "ListItems";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "CheckRadio";
        checkbox.checked = todoList[i].checked;
        checkbox.addEventListener("change", function() {
            todoList[i].checked = checkbox.checked;
            localStorage.setItem("todos", JSON.stringify(todoList));
            updateTaskStyle(listItem, checkbox.checked);
        });
        const taskText = document.createElement("span");
        taskText.id = "LiSpan";
        taskText.textContent = todoList[i].text;
        taskText.addEventListener("click", function() {
            editTodo(i);
        });

        const deleteButton = document.createElement("button");
        deleteButton.id = "DeletionButt";
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            deleteTodo(i);
        };

        const editButton = document.createElement("button");
        editButton.id = "EditButt";
        editButton.textContent = "Edit";
        editButton.onclick = function() {
            editTodo(i);
        };

        listItem.appendChild(taskText);
        listItem.appendChild(checkbox);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        updateTaskStyle(listItem, checkbox.checked);
        todoListElement.appendChild(listItem);
    }
}

function updateTaskStyle(taskElement, isChecked) {
    if (isChecked) {
        taskElement.firstChild.classList.add("line-through");
    } else {
        taskElement.firstChild.classList.remove("line-through");
    }
}

function deleteTodo(index) {
    const todoList = JSON.parse(localStorage.getItem("todos")) || [];
    todoList.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todoList));
    displayTodoList();
}

function editTodo(index) {
    const todoList = JSON.parse(localStorage.getItem("todos")) || [];
    const editedText = prompt("Edit the task:", todoList[index].text);
    if (editedText !== null) {
        todoList[index].text = editedText;
        localStorage.setItem("todos", JSON.stringify(todoList));
        displayTodoList();
    }
}

window.addEventListener("load", displayTodoList);