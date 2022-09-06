class TodoItem {
    constructor(name) {
        // not unique, required; think of cooking; done multiple times on Today list
        this.name = name;
    }
    isDone = false;
    priority = 1;
    dueDate = new Date(Date());
    description = "";
}

export { TodoItem };
