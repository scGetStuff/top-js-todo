import { Storage } from "./Storage";
import { User } from "./User";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";

const todoLists = document.getElementById("todoLists");
const rows = document.getElementById("rows");
const tableHeading = document.getElementById("tableHeading");
const newListName = document.getElementById("newListName");
const newListDialog = document.getElementById("newListDialog");
const newTaskName = document.getElementById("newTaskName");
const newTaskDialog = document.getElementById("newTaskDialog");
const newTaskDescription = document.getElementById("newTaskDescription");

function bind() {
    bindButton("storageLoad", Storage.loadUser, renderLists);
    bindButton("storageSave", Storage.saveUser);
    bindButton("storageDefault", Storage.default, renderLists);
    bindButton("storageDelete", Storage.delete, renderLists);

    bindButton("listNew", showNewListForm, renderLists);
    bindButton("listDelete", deletList, renderLists);

    bindButton("taskNew", showNewTaskForm, renderTable);

    document.getElementById("newListForm").addEventListener("submit", addList);
    document.getElementById("newTaskForm").addEventListener("submit", addTask);

    todoLists.addEventListener("change", renderTable);

    function bindButton(buttonID, action, render = null) {
        document.getElementById(buttonID).addEventListener("click", (event) => {
            action();
            if (render) render();
        });
    }
}

function renderLists() {
    clearUI();

    // delete does not need to build anything, so bail
    if (!Storage.currentUser) return;

    Storage.currentUser.lists.forEach((list, index) => {
        const opt = document.createElement("option");
        opt.value = index;
        opt.label = list.name;
        todoLists.appendChild(opt);
    });

    function clearUI() {
        rows.innerHTML = "";
        tableHeading.innerHTML = "&nbsp;"; // keep screen from shifting
        todoLists.selectedIndex = -1;
        while (todoLists.firstChild)
            todoLists.removeChild(todoLists.firstChild);
    }
}

// TODO: not sure dialog works for moble
function showNewListForm() {
    newListName.value = "";
    newListDialog.showModal();
}

function addList() {
    const name = newListName.value.trim();
    if (name === "") return;
    Storage.currentUser.createList(name);
    renderLists();
    // fake click on the new item, it will be last
    todoLists.selectedIndex = todoLists.children.length - 1;
    todoLists.dispatchEvent(new Event("change"));
}

function showNewTaskForm() {
    newTaskName.value = "";
    newTaskDialog.showModal();
}

function addTask() {
    const name = newTaskName.value.trim();
    if (name === "") return;
    const todoItem = Storage.currentUser
        .getList(todoLists.selectedIndex)
        .createItem(name);
    todoItem.description = newTaskDescription.value.trim();
    console.log(todoItem.description);
    renderTable();
}

function deletList() {
    if (todoLists.selectedIndex === -1) return;
    // TODO: only works because i stuck the array index into the option value
    Storage.currentUser.deleteList(todoLists.value);
}

function renderTable() {
    // TODO: thight coupling between data array and UI list
    const todoList = Storage.currentUser.lists[todoLists.selectedIndex];
    tableHeading.innerText = todoList.name;
    renderRows(todoList.items);
}

function renderRows(todoItems) {
    let html = "";
    todoItems.forEach((todoItem) => {
        html += createRow(todoItem);
    });
    rows.innerHTML = html;

    function createRow(todoItem) {
        // TODO: first pass dummy data
        // TODO: still not sure innerHTML is good/bad; it is less code than stupid DOM crap
        return `<tr><td>${todoItem.isDone}</td><td>${todoItem.name}</td><td>${todoItem.description}</td><td>X</td></tr>`;
    }
}

export { bind };
