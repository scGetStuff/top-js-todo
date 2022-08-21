import { TodoList } from "./TodoList";

// TODO: these classes are the same simple structure, just container for a list of children; make it suck less
class User {
    constructor(name) {
        this.name = name;
    }

    lists = [];

    createList(name) {
        const list = new TodoList(name);
        this.lists.push(list);
        return list;
    }

    deleteList(id) {
        this.lists.splice(id, 1);
        return this.lists;
    }
}

export { User };
