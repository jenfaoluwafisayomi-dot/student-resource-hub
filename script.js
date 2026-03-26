// Select elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Load tasks from storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        // Complete button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✔";

        completeBtn.addEventListener("click", function () {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";

        deleteBtn.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

// Add task
function addTask() {
    const taskText = taskInput.value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Initial render
renderTasks();
const searchInput = document.getElementById("searchInput");
const resourceList = document.getElementById("resourceList");

searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.toLowerCase();
    const resources = resourceList.getElementsByTagName("li");

    Array.from(resources).forEach(function (item) {
        const text = item.textContent.toLowerCase();

        if (text.includes(searchValue)) {
            item.style.display = "list-item";
        } else {
            item.style.display = "none";
        }
    });
});
const toggleBtn = document.getElementById("toggleMode");

toggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});