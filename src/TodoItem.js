class TodoItem {
    constructor(name) {
        // not unique, required; think of cooking; done multiple times on Today list
        this.name = name;
    }

    description = null; // meal1.  meal2.
    dueDate = new Date(Date());
    priority = 0;

    // allow user to check a done task, exclue from sort, push to bottom. UI checkbox and gray cross-through
    isDone = false;
}

export { TodoItem };
