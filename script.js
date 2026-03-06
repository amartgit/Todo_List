// DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");

// Load tasks from local storage on page load
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

/*
 Add Task
*/
addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    // Validation: prevent empty task
    if (taskText === "") {
        errorMsg.textContent = "Task cannot be empty!";
        return;
    }

    errorMsg.textContent = "";

    // Create task object
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();

    taskInput.value = "";
}

/*
 Render Tasks
*/
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task";
        if (task.completed) li.classList.add("completed");

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTask(task.id));

        // Task text
        const span = document.createElement("span");
        span.textContent = task.text;

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit";
        editBtn.addEventListener("click", () => editTask(task.id));

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteTask(task.id));

        li.append(checkbox, span, editBtn, deleteBtn);
        taskList.appendChild(li);
    });
}

/*
 Toggle Complete
*/
function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

/*
 Edit Task

*/
function editTask(id) {
    const newText = prompt("Edit your task:");
    if (newText === null || newText.trim() === "") return;

    tasks = tasks.map(task =>
        task.id === id ? { ...task, text: newText.trim() } : task
    );
    saveTasks();
    renderTasks();
}

/*
Delete Task
*/
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

/*
 Save to Local Storage
*/
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
