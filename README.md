# top-js-todo

The Odin Project, Full Stack JavaScript Path, JavaScript, Organizing your JavaScript Code, Project: Todo List

Initial functionality
- starting with single todoList containing some mock todoItems
- read/write set of lists to localstorage
- no intention of using date-fns at start, more practice doing things with straight js
- using class for object creation
- i'm using null for optional field initial values, my thinking being undefined is default state, null is my value so i get different errors
- starting with arrays, but probably want a map so i can use the key as the order number, allow for rearanging lists/items

JSON.stringify() only writes out public fields, kind of makes seralizing class with private fields a problem.  i don't want to deal with other libraries for seralizing, shit should be built in to the language; have to change my class approach.

Features, ideas to add functionality
add the ability to create a user
track create/edit date for list and item
