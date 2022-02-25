const inputTask = document.querySelector("#inputTask");
const addTask = document.querySelector("#addTask");
const tasks = document.querySelector("#tasks");

function createLi() {
    const li = document.createElement("li");
    return li;
}

inputTask.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
        if (!inputTask.value) return;
        createTask(inputTask.value);
    }
});

function clearInput() {
    inputTask.value = "";
    inputTask.focus();
}

function createDelete(li) {
    li.innerText += " ";
    const btnDelete = document.createElement("button");
    btnDelete.innerText = "Apagar";
    btnDelete.setAttribute("class", "btnDelete");
    li.appendChild(btnDelete);
}

function createTask(textInput) {
    const li = createLi();
    li.innerText = textInput;
    tasks.appendChild(li);
    clearInput();
    createDelete(li);
    saveTasks();
}

addTask.addEventListener("click", () => {
    if (!inputTask.value) return;
    createTask(inputTask.value);
});

document.addEventListener("click", (e) => {
    const el = e.target;

    if (el.classList.contains("btnDelete")) {
        el.parentElement.remove();
        saveTasks();
    }
});

function saveTasks() {
    const liTasks = tasks.querySelectorAll("li");
    const listOfTasks = [];

    for (let task of liTasks) {
        let taskText = task.innerText;
        taskText = taskText.replace("Apagar", "").trim();
        listOfTasks.push(taskText);
    }

    const tasksJSON = JSON.stringify(listOfTasks);
    localStorage.setItem("tasks", tasksJSON);
}

function addSavedTasks() {
    const tasks = localStorage.getItem("tasks");
    const listOfTasks = JSON.parse(tasks);

    for (let task of listOfTasks) {
        createTask(task);
    }
}

addSavedTasks();