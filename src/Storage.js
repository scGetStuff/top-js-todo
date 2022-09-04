import { User } from "./User";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";

const DEFAULT_NAME = "default";

// TODO: i don't know which is better, using 'Class' vs 'this'
// i think referancing static members using 'this' is fucking retarded,
// so i'm making a bunch of 'Storage' referances to my own static members
class Storage {
    // TODO: hack
    // i want seperate layers; ui, data, io.
    // but i need the user object for rendering, load/save events
    // i can't pass a user object to an event, so i need a referance somewhere
    // so this kind of makes sense because default() builds the user
    // but new/edit/delete functions will also need the user, so it probably should just be global in app.js
    static currentUser = null;

    static clear() {
        localStorage.clear();
        Storage.currentUser = null;
    }

    static createDefaultUser(cb) {
        Storage.clear();
        Storage.currentUser = new User(DEFAULT_NAME);
        if (cb) cb();
        Storage.saveUser();
    }

    static createDefaultList() {
        Storage.createDefaultUser(() =>
            Storage.currentUser.createList("Default")
        );
    }

    static createDefaultData() {
        Storage.createDefaultUser(() => {
            let list = Storage.currentUser.createList("one");
            list.createItem("item 1");
            list.createItem("item 2");

            list = Storage.currentUser.createList("two");
            list.createItem("item 3");
            list.createItem("item 4");
            list.createItem("item 5");

            list = Storage.currentUser.createList("three");
            list.createItem("item 6");
            list.createItem("item 7");
        });
    }

    // TODO: javascript seralizing objects sucks, this is what i'm stuck with
    // TODO: name is not implimented yet
    static loadUser(name = DEFAULT_NAME) {
        let jsonString = localStorage.getItem(name);
        // handle empty storage with default
        if (!jsonString) {
            Storage.createDefaultUser();
            jsonString = localStorage.getItem(name);
        }

        const userState = JSON.parse(jsonString);
        const user = new User(userState.name);

        userState.lists.forEach((list) => {
            const todoList = user.createList(list.name);
            list.items.forEach((item) => {
                const todoItem = todoList.createItem(item.name);
            });
        });

        Storage.currentUser = user;
    }

    static saveUser() {
        if (!Storage.currentUser) return;
        localStorage.setItem(
            Storage.currentUser.name,
            JSON.stringify(Storage.currentUser)
        );
        // console.log(localStorage);
    }
}

export { Storage };
