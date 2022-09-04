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
    bindButton("storageDefault", Storage.createDefaultData, renderLists);
    bindButton("storageClear", Storage.clear, clearUI);
    bindButton("listDelete", deletSelectedList, renderLists);

    bindButton("listNew", showNewListForm);
    document.getElementById("newListForm").addEventListener("submit", addList);
    bindButton("taskNew", showNewTaskForm);
    document.getElementById("newTaskForm").addEventListener("submit", addTask);
    bindButton("listDefault", Storage.createDefaultList, renderLists);

    todoLists.addEventListener("change", renderTable);

    function bindButton(buttonID, action, render = null) {
        document.getElementById(buttonID).addEventListener("click", (event) => {
            action();
            if (render) render();
        });
    }
}

function fakeButtonClick(buttonName) {
    const button = document.getElementById(buttonName);
    button.dispatchEvent(new Event("click"));
}

function renderLists() {
    clearUI();

    // if they hit the clear button, there is no data to render
    if (!Storage.currentUser) return;

    Storage.currentUser.lists.forEach((list, index) => {
        const opt = document.createElement("option");
        opt.value = index;
        opt.label = list.name;
        todoLists.appendChild(opt);
    });
}

function clearUI() {
    rows.innerHTML = "";
    tableHeading.innerHTML = "&nbsp;"; // keep screen from shifting
    todoLists.selectedIndex = -1;
    while (todoLists.firstChild) todoLists.removeChild(todoLists.firstChild);
}

// TODO: not sure dialog works for moble
function showNewListForm() {
    // edge case
    // if user clears localStorage, then wants to create a new list, initialize with default user
    if (!Storage.currentUser) {
        Storage.createDefaultUser();
    }
    newListName.value = "";
    newListDialog.showModal();
}

// this is a little odd, the show() and add() functions are a single logical operation,
// but are broken up by submit event
function addList() {
    const name = newListName.value.trim();
    if (name === "") return;
    Storage.currentUser.createList(name);
    renderLists();
    // fake click on the new item to reset task table, it will be last
    todoLists.selectedIndex = todoLists.children.length - 1;
    todoLists.dispatchEvent(new Event("change"));
}

function showNewTaskForm() {
    if (todoLists.selectedIndex === -1) return;
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

function deletSelectedList() {
    // TODO: this validation is necessary in serveral locations, it should be a
    // function that throws, but i don't have any exception handling yet
    if (todoLists.selectedIndex === -1) return;
    // TODO: only works because i stuck the array index into the option value
    Storage.currentUser.deleteList(todoLists.value);
}

function renderTable() {
    if (todoLists.selectedIndex === -1) return;
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

export { bind, fakeButtonClick };
