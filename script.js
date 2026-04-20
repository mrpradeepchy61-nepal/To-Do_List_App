let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let totalTasks = document.getElementById("totalTasks");
let completedTasks = document.getElementById("completedTasks");

// Load tasks on page load
window.onload = loadTasks;

// Add task on button click only
addBtn.addEventListener("click", addTask);

function addTask() {
  let taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  let task = {
    text: taskText,
    completed: false
  };

  saveTask(task);
  createTaskElement(task);
  updateStats();

  taskInput.value = "";
}

function createTaskElement(task) {
  let li = document.createElement("li");

  let span = document.createElement("span");
  span.innerText = task.text;

  if (task.completed) {
    span.classList.add("completed");
  }

  let buttonBox = document.createElement("div");
  buttonBox.classList.add("buttons");

  let doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.classList.add("done-btn");

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("delete-btn");

  doneBtn.addEventListener("click", function () {
    span.classList.toggle("completed");
    updateTasks();
    updateStats();
  });

  deleteBtn.addEventListener("click", function () {
    li.remove();
    updateTasks();
    updateStats();
  });

  buttonBox.appendChild(doneBtn);
  buttonBox.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(buttonBox);

  taskList.appendChild(li);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(function (task) {
    createTaskElement(task);
  });
  updateStats();
}

function updateTasks() {
  let allTasks = [];

  document.querySelectorAll("#taskList li").forEach(function (li) {
    let text = li.querySelector("span").innerText;
    let completed = li.querySelector("span").classList.contains("completed");

    allTasks.push({
      text: text,
      completed: completed
    });
  });

  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

function updateStats() {
  let allTasks = document.querySelectorAll("#taskList li");
  let completed = document.querySelectorAll(".completed");

  totalTasks.innerText = allTasks.length;
  completedTasks.innerText = completed.length;
}