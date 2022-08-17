import { User } from "./User";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";

const DEFAULT_NAME = "default";

class Storage {

    // TODO: hack 
    // i want seperate layers, but i need the data to render the UI
    // events need to load data then render table
    // so need a referance somewhere, don't want global namespace crap in app.js
    static currentUser = null;

    // TODO: i fucking despise javascript; have to use 'this' to referance other static method/prop
    static delete() {
        localStorage.clear();
        this.currentUser = null;
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

        this.currentUser = user;
        Storage.saveUser();
        
        return user;
    }

    // TODO: this is crap; tightly coupled with class structure
    // i was wasting too much time this, just fall back to brute force shit so i can move on
    //TODO: name is not implimented yet
    static loadUser(name = DEFAULT_NAME) {
        const userObject = JSON.parse(localStorage.getItem(name));
        const user = new User(userObject.name);

        userObject.lists.forEach((list) => {
            const todoList = user.createList(list.name);
            list.items.forEach((item) => {
                const todoItem = todoList.createItem(item.name);
            });
        });

        this.currentUser = user;
        return user;
    }

    static saveUser() {
        localStorage.setItem(this.currentUser.name, JSON.stringify(this.currentUser));
        // console.log(localStorage);
    }
}

export { Storage };
