import { Storage } from "./Storage";

class DOMStuff {
    static bind() {
        bindButton("storageLoad", Storage.loadUser, DOMStuff.renderUser);
        bindButton("storageSave", Storage.saveUser, DOMStuff.renderUser);
        bindButton("storageDefault", Storage.default, DOMStuff.renderUser);
        bindButton("storageDelete", Storage.delete, DOMStuff.renderUser);

        bindButton("listNew", newList, DOMStuff.renderUser);
        bindButton("listDelete", newList, DOMStuff.renderUser);

        document.getElementById("newListForm").addEventListener("submit", addNewList);

        function bindButton(buttonID, action, render) {
            document
                .getElementById(buttonID)
                .addEventListener("click", (event) => {
                    action();
                    render();
                });
        }
    }

    static renderUser() {
        const todoLists = document.getElementById("todoLists");

        // always clear the display, but delete does not need to build anything
        while (todoLists.firstChild)
            todoLists.removeChild(todoLists.firstChild);
        if (!Storage.currentUser) return;

        Storage.currentUser.lists.forEach((list) => {
            const opt = document.createElement("option");
            opt.value = list.name;
            opt.innerText = list.name;
            todoLists.appendChild(opt);
        });
    }

}

// TODO: i guess i got sick of js class crap and started writing regular code
const newlistName = document.getElementById("listName");

// TODO: not sure dialog works for moble, but i am sure i don't give a fuck about moble
function newList() {
    newlistName.value = "";
    document.getElementById("newListDialog").showModal();
}

function addNewList() {
    Storage.currentUser.createList(newlistName.value);
    DOMStuff.renderUser();
}

function deletList() {
    alert("delete");
}

export { DOMStuff };
