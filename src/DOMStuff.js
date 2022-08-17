import { Storage } from "./Storage";

class DOMStuff {
    static bind() {
        document
            .getElementById("storageLoad")
            .addEventListener("click", (event) => {
                Storage.loadUser();
                DOMStuff.renderUser();
            });

        document
            .getElementById("storageSave")
            .addEventListener("click", (event) => {
                Storage.saveUser();
                DOMStuff.renderUser();
            });

        document
            .getElementById("storageDefault")
            .addEventListener("click", (event) => {
                Storage.default();
                DOMStuff.renderUser();
            });

        document
            .getElementById("storageDelete")
            .addEventListener("click", (event) => {
                Storage.delete();
                DOMStuff.renderUser();
            });
    }

    static renderUser() {
        const todoLists = document.getElementById("todoLists");

        // always clear the display, but delete does not need to build anything
        while (todoLists.firstChild)
            todoLists.removeChild(todoLists.firstChild);
        if (!Storage.currentUser)
            return;

        Storage.currentUser.lists.forEach((list) => {
            const opt = document.createElement("option");
            opt.value = list.name;
            opt.innerText = list.name;
            todoLists.appendChild(opt);
        });
    }
}

export { DOMStuff };
