import { User } from "./User";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";

class Storage {
    static deleteStorage() {
        localStorage.clear();
    }

    static default() {
        Storage.deleteStorage();

        const user = new User("default");

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

        Storage.saveUser(user);

        return user;
    }

    static loadUser(name) {
        return this.fromJSON(localStorage.getItem(name));
    }

    // TODO: should be private
    // TODO: this is crap; tightly coupled with class structure
    // private fields don't seralize to json, just keeping it simpler and going all public
    // i was wasting too much time this, just fall back to brute force shit so i can move on
    static fromJSON(jsonString) {
        const userObject = JSON.parse(jsonString);
        const user = new User(userObject.name);

        userObject.lists.forEach((list) => {
            const todoList = user.createList(list.name);
            list.items.forEach((item) => {
                const todoItem = todoList.createItem(item.name);
            });
        });

        return user;
    }

    static saveUser(user) {
        localStorage.setItem(user.name, JSON.stringify(user));
    }
}

export { Storage };
