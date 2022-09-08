import * as Storage from "./storage";
import * as Data from "./data";

const todoLists = document.getElementById("todoLists");
const rows = document.getElementById("rows");
const tableHeading = document.getElementById("tableHeading");

const newListDialog = document.getElementById("newListDialog");
const newListName = document.getElementById("newListName");

const newTaskDialog = document.getElementById("newTaskDialog");
const newTaskName = document.getElementById("newTaskName");
const newTaskPriority = document.getElementById("newTaskPriority");
const newTaskDueDate = document.getElementById("newTaskDueDate");
const newTaskDescription = document.getElementById("newTaskDescription");

function bind() {
    bindButton("storageLoad", Data.loadUser, renderListNames);
    bindButton("storageSave", Data.saveUser);
    bindButton("storageDefault", Data.createTestData, renderListNames);
    bindButton("storageClear", storageClearEvent, clearUI);

    bindButton("listNew", showNewListForm);
    document.getElementById("newListForm").addEventListener("submit", addList);
    bindButton("listDelete", deletSelectedList, renderListNames);
    bindButton("listDefault", Data.createDefaultList, renderListNames);

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

    Data.currentUser.lists.forEach((list, index) => {
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

function storageClearEvent() {
    Storage.clear();
    Data.currentUser = null;
}

function showNewListForm() {
    // edge case - user clears localStorage; then wants to create a new list; make an empty user first
    if (!Data.currentUser) Data.createDefaultUser();

    newListName.value = "";
    newListDialog.showModal();
}

// this is a little odd, the show() and add() functions are a single logical operation,
// but are broken up by submit event
function addList() {
    const name = newListName.value.trim();
    if (name === "") return;
    Data.currentUser.createList(name);
    renderListNames();

    // fake click on the new item to reset task table, it will be last
    todoLists.selectedIndex = todoLists.children.length - 1;
    todoLists.dispatchEvent(new Event("change"));
}

function showNewTaskForm() {
    if (todoLists.selectedIndex === -1) return;
    newTaskName.value = "";
    newTaskPriority.value = 1;
    newTaskDueDate.value = new Date(Date());
    newTaskDescription.value = "";
    newTaskDialog.showModal();
}

function addTask() {
    const name = newTaskName.value.trim();
    if (name === "") return;
    const todoItem = Data.currentUser
        .getList(todoLists.selectedIndex)
        .createItem(name);
    todoItem.priority = newTaskPriority.value;
    todoItem.dueDate = newTaskDueDate.value;
    todoItem.description = newTaskDescription.value.trim();
    renderItemTable();
}

function deletSelectedList() {
    if (todoLists.selectedIndex === -1) return;
    Data.currentUser.deleteList(todoLists.value);
}

function renderItemTable() {
    if (todoLists.selectedIndex === -1) return;
    const todoList = Data.currentUser.lists[todoLists.selectedIndex];
    tableHeading.innerText = todoList.name;
    renderItems(todoList);
}

// TODO: this should probably all be some component modules
// TODO: i hate the way i am doing this with a table
// every row is a grid layout, stupid, should be 1 layout with a bunch of spans/divs
function renderItems(todoList) {
    const todoItems = todoList.items;
    rows.innerHTML = "";
    todoItems.forEach((todoItem, index) => {
        rows.appendChild(tr(todoList, todoItem, index));
    });

    // TODO: all this crap should be done with <template>
    function tr(todoList, todoItem, index) {
        const tr = document.createElement("tr");
        tr.appendChild(td(check(todoItem)));
        tr.appendChild(td(span(todoItem.name)));
        tr.appendChild(td(priority(todoItem)));
        tr.appendChild(td(date(todoItem)));
        tr.appendChild(td(span(todoItem.description)));
        tr.appendChild(td(deleteButton(todoList, index)));
        return tr;
    }

    function td(child) {
        const td = document.createElement("td");
        td.appendChild(child);
        return td;
    }

    function span(value) {
        const span = document.createElement("span");
        span.innerText = value;
        return span;
    }

    function check(todoItem) {
        const check = document.createElement("input");
        check.addEventListener("change", () => {
            todoItem.isDone = !todoItem.isDone;
        });
        check.type = "checkbox";
        check.checked = todoItem.isDone;
        return check;
    }

    function priority(todoItem) {
        const input = document.createElement("input");
        input.addEventListener("change", (event) => {
            todoItem.priority = event.target.value;
        });
        input.type = "number";
        input.classList.add("priority");
        input.value = todoItem.priority;
        input.min = 1; // TODO: same bounds here and dialog; should be a better way, avoid duplicate
        input.max = 9;
        return input;
    }

    function date(todoItem) {
        const date = document.createElement("input");
        date.addEventListener("change", (event) => {
            todoItem.dueDate = event.target.value;
        });
        date.type = "date";
        date.value = todoItem.dueDate;
        return date;
    }

    function deleteButton(todoList, index) {
        const button = document.createElement("button");
        button.addEventListener("click", () => {
            todoList.deleteItem(index);
            renderItemTable();
        });
        button.type = "button";
        button.classList.add("delete");
        button.textContent = "X";
        return button;
    }
}

export { bind, fakeButtonClick };
