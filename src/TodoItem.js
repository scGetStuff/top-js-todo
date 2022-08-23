class TodoItem {
    constructor(name) {
        // not unique, required; think of cooking; done multiple times on Today list
        this.name = name;
    }

    description = null; // meal1.  meal2.
    dueDate = new Date(Date());
    priority = null;
    notes = null;
    // allow user to check a done task, exclue from sort, push to bottom. UI checkbox and gray cross-through
    checkBox = false;

    rename() {
        return undefined;
    }

    editDescription() {
        return undefined;
    }

    editPriority() {
        return undefined;
    }

    editDueDate(date) {
        return undefined;
    }
}

export { TodoItem };
