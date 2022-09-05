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
    bindButton("storageLoad", Storage.loadUser, renderListNames);
    bindButton("storageSave", Storage.saveUser);
    bindButton("storageDefault", Storage.createDefaultData, renderListNames);
    bindButton("storageClear", Storage.clear, clearUI);

    bindButton("listNew", showNewListForm);
    document.getElementById("newListForm").addEventListener("submit", addList);
    bindButton("listDelete", deletSelectedList, renderListNames);
    bindButton("listDefault", Storage.createDefaultList, renderListNames);

    bindButton("taskNew", showNewTaskForm);
    document.getElementById("newTaskForm").addEventListener("submit", addTask);

    todoLists.addEventListener("change", renderItemTable);

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

function renderListNames() {
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
    // edge case - user clears localStorage; then wants to create a new list; make an empty user first
    if (!Storage.currentUser) Storage.createDefaultUser();

    newListName.value = "";
    newListDialog.showModal();
}

// this is a little odd, the show() and add() functions are a single logical operation,
// but are broken up by submit event
function addList() {
    const name = newListName.value.trim();
    if (name === "") return;
    Storage.currentUser.createList(name);
    renderListNames();
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
    renderItemTable();
}

function deletSelectedList() {
    // TODO: this validation is necessary in serveral locations, it should be a
    // function that throws, but i don't have any exception handling yet
    if (todoLists.selectedIndex === -1) return;
    // TODO: only works because i stuck the array index into the option value
    Storage.currentUser.deleteList(todoLists.value);
}

function renderItemTable() {
    if (todoLists.selectedIndex === -1) return;
    const todoList = Storage.currentUser.lists[todoLists.selectedIndex];
    tableHeading.innerText = todoList.name;
    renderItems(todoList);
}

// TODO: i hate the way i am doing this with a table
// every row is a grid layout, stupid, should be 1 layout with a bunch of spans/divs
function renderItems(todoList) {
    const todoItems = todoList.items;
    rows.innerHTML = "";
    todoItems.forEach((todoItem, index) => {
        rows.appendChild(tr(todoList, todoItem, index));
    });
}

function tr(todoList, todoItem, index) {
    const tr = document.createElement("tr");
    tr.appendChild(tdCheck(todoItem));
    tr.appendChild(td(todoItem.name));
    tr.appendChild(td(todoItem.description));
    tr.appendChild(tdDelete(todoList, index));
    return tr;
}

function td(value) {
    const td = document.createElement("td");
    td.innerText = value;
    return td;
}

// TODO: trying to bind UI to data model without a bunch of stupid data attributes
// wind up needing a referance to the list object from cells in the items
// because, i'm tring to keep list manipulation controled by the container class
// at some point i do wnat the classes to mage their state properly; its the seralization thing
function tdCheck(todoItem) {
    const td = document.createElement("td");
    const check = document.createElement("input");
    check.addEventListener("change", () => {
        todoItem.isDone = !todoItem.isDone;
    });
    check.type = "checkbox";
    check.checked = todoItem.isDone;
    td.appendChild(check);
    return td;
}

function tdDelete(todoList, index) {
    const td = document.createElement("td");
    const button = document.createElement("button");
    button.addEventListener("click", () => {
        todoList.deleteItem(index);
        renderItemTable();
    });
    button.type = "button";
    button.classList.add("delete");
    button.textContent = "X";
    td.appendChild(button);
    return td;
}

export { bind, fakeButtonClick };
