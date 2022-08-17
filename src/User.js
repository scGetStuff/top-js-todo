import { TodoList } from "./TodoList";

// TODO: these classes are the same simple structure, just container for a list of children; make it suck less
class User {
    constructor(name) {
        // unique, required
        this.name = name;
    }

    // TODO: allow user to rearrange them
    lists = [];

    createList(name) {
        // TODO: change to hashmap and do something better with id
        const id = this.lists.length + 1;
        const list = new TodoList(id, name);
        this.lists.push(list);
        return list;
    }

    deleteList(id) {
        this.lists.splice(id, 1);
        return lists;
    }
}

export { User };
