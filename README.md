# top-js-todo

The Odin Project, Full Stack JavaScript Path, JavaScript, Organizing your JavaScript Code, Project: Todo List

Initial functionality
starting with single todoList containing some mock todoItems
read/write set of lists to localstorage
no intention of using date-fns at start, more practice doing things with straight js
using factory for object creation, other projects didn't use it enough, want more practice

class user {
    name - unique, required
    lists[] - allow user to rearrange them
    createList()
    deleteList()
    deleteLocalStorage() - make it work with empty list
    sortByDate() - sort lists based on the contained items, drilling into list will start with same sort
    sortByPriority() - ditto
}

class todoList {
    name - unique, required
    id - unique, required - assigend at create
    description - optional
    items[] - allow user to rearrange them
    rename()
    editDescription()
    createItem()
    deleteItem()
    sortByDate() - should not effect the user specified order, just a display thing
    sortByPriority() - ditto
    checkBox - see below
}

class todoItem {
    title - not unique, required; think of cooking; done multiple times on Today list
    id - unique, required - assigend at create
    description - meal1.  meal2.
    dueDate - optional
    priority - optional
    notes - optional
    checkBox - allow user to check a done task, exclue from sort, push to bottom. UI checkbox and gray cross-through
    rename()
    editDescription()
    editPriority()
    editDueDate()
}



Features, ideas to add functionality
add the ability to create a user
track create/edit date for list and item

