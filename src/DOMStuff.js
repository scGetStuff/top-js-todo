import { Storage } from "./Storage";

const newlistName = document.getElementById("newlistName");
const todoLists = document.getElementById("todoLists");
const rows = document.getElementById("rows");
const tableHeading = document.getElementById("tableHeading");

function bind() {
    bindButton("storageLoad", Storage.loadUser, renderLists);
    bindButton("storageSave", Storage.saveUser);
    bindButton("storageDefault", Storage.default, renderLists);
    bindButton("storageDelete", Storage.delete, renderLists);

    bindButton("listNew", showNewListForm, renderLists);
    bindButton("listDelete", deletList, renderLists);

    document
        .getElementById("newListForm")
        .addEventListener("submit", addNewList);

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
    newlistName.value = "";
    document.getElementById("newListDialog").showModal();
}

function addNewList() {
    Storage.currentUser.createList(newlistName.value);
    renderLists();
    // fake click on the new item, it will be last
    todoLists.selectedIndex = todoLists.children.length - 1;
    todoLists.dispatchEvent(new Event("change"));
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
        // TODO: still not sure innerHTML is good/bad; less code than stupid DOM crap
        return `<tr><td>false</td><td>${todoItem.name}</td><td>X</td></tr>`;
    }
}

export { bind };
