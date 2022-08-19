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

    static delete() {
        localStorage.clear();
        Storage.currentUser = null;
    }

    static default() {
        Storage.delete();

        const user = new User(DEFAULT_NAME);

        let list = user.createList("one");
        list.createItem("item 1");
        list.createItem("item 2");

        list = user.createList("two");
        list.createItem("item 3");
        list.createItem("item 4");
        list.createItem("item 5");

        list = user.createList("three");
        list.createItem("item 6");
        list.createItem("item 7");

        Storage.currentUser = user;

        Storage.saveUser();
    }

    // TODO: this is crap; tightly coupled with class structure
    // i was wasting too much time, just fall back to brute force shit so i can move on
    //TODO: name is not implimented yet
    static loadUser(name = DEFAULT_NAME) {
        const jsonString = localStorage.getItem(name);
        if (!jsonString) return;

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
