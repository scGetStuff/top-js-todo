import { TodoItem } from "./TodoItem";

class TodoList {
    constructor(id, name) {
        // unique, required
        this.id = id;
        // unique, required
        this.name = name;
    }

    // TODO: allow user to rearrange them
    items = [];
    description = null;

    createItem(name) {
        // TODO: change to hashmap and do something better with id
        const id = this.items.length + 1;
        const item = new TodoItem(id, name);
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        this.items.splice(id, 1);
        return items;
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