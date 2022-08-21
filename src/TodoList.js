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

    // should not effect the user specified order, just a display thing
    sortByDate() {
        return undefined;
    }

    // should not effect the user specified order, just a display thing
    sortByPriority() {
        return undefined;
    }
}

export { TodoList };