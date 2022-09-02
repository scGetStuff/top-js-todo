import { TodoItem } from "./TodoItem";

class TodoList {
    constructor(name) {
        this.name = name;
    }

    items = [];

    createItem(name) {
        const item = new TodoItem(name);
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        this.items.splice(id, 1);
        return this.items;
    }
}

export { TodoList };
