# top-js-todo

The Odin Project, Full Stack JavaScript Path, JavaScript, Organizing your JavaScript Code, Project: Todo List

### Requirements
-   add sorting; I would like to make headers as links that sort alternate asc/des

### Notes
-   I screwed up reading the spec "choose which project their todos go into".  Spec wants a pile of todos that you assign to lists.  My brain wants you to define a list then add todos to it; every project I looked at did it this way; none of them let you move an item from one place to another. I'm not changing at this time.
-   user has to hit the save button, it is not automatic on every edit
-   Personal preference with ess6 modules, I hate the existence of defaults, I do not use them.
-   JSON.stringify() only writes out public fields, kind of makes serializing class with private fields a problem. I have to figure out how I want to deal wiht it, just keeping it simpler and going all public for now.
-   Namespace thing; I started with static methods, then switched back to regular functions.
```js
    // my prefered aproach is to always qualify code from other modules
    import * as DOMStuff from "./DOMStuff";
    DOMStuff.bind();
```

### other features maybe add
-   something in the UI to rename lists/tasks and edit description
-   add the ability to create users
-   allow for manual rearranging lists/items; aside from the sort
-   a done/checked task should be excluded from sort, push to bottom and gray cross-through
-   date input validations, range: min today max ?
-   fix alignment problem with description resizing things. get rid of the table, just use 1 grid template and divs; first pass is each <tr> is a grid.
