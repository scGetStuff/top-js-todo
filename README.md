# top-js-todo

The Odin Project, Full Stack JavaScript Path, JavaScript, Organizing your JavaScript Code, Project: Todo List

### Initial functionality
just get basic lists and items working with just names, all ui elements, events, modules defiend and working; then add other fields and features
- starting with single todoList containing some mock todoItems
- read/write set of lists to localstorage
- no intention of using date-fns at start, more practice doing things with straight js
- using class for object creation
- i'm using null for optional field initial values, my thinking being undefined is default state, null is my value so i get different errors
- starting with arrays, will need to change to a map for priority and sorting


### Requirements
- add priority, description, due date
- add sorting 


### Notes
- Personal preferance with ess6 modules, i hate the existance of defaults, i do not use them.
- JSON.stringify() only writes out public fields, kind of makes seralizing class with private fields a problem.  i don't want to deal with other libraries for seralizing, just keeping it simpler and going all public.


### other features maybe add
- add the ability to create a user
- track create/edit date for list and item
- allow for rearanging lists/items