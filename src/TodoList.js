import { TodoItem } from "./TodoItem";

class TodoList {
    constructor(name) {
        this.name = name;
    }

    // TODO: allow user to rearrange them
    items = [];
    description = null;

    createItem(name) {
        const item = new TodoItem(name);
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        this.items.splice(id, 1);
        return this.items;
    }

    sortByDate() {
        return undefined;
    }

    sortByPriority() {
        return undefined;
    }
}

export { TodoList };
