"use strict";

import * as Storage from "./storage";
import { User } from "./User";

const DEFAULT_NAME = "default";
let currentUser = null;

function createDefaultUser(cb = null) {
    Storage.clear();
    currentUser = new User(DEFAULT_NAME);
    if (cb) cb();
    Storage.save(currentUser);
}

function createDefaultList() {
    createDefaultUser(() => currentUser.createList("Default"));
}

function createTestData() {
    createDefaultUser(() => {
        let list = currentUser.createList("one");
        list.createItem("item 1");
        list.createItem("item 2");

        list = currentUser.createList("two");
        list.createItem("item 3");
        list.createItem("item 4");
        list.createItem("item 5");

        list = currentUser.createList("three");
        list.createItem("item 6");
        list.createItem("item 7");
    });
}

function loadUser() {
    let json = Storage.load(DEFAULT_NAME);

    // handle empty storage with default
    if (!json) {
        createDefaultList();
        return;
    }

    // TODO: javascript seralizing objects sucks, currently my classes are all public fields
    // need to switch to using the toJSON() method in all classes, and actulay manage state
    const userState = JSON.parse(json);
    currentUser = new User(userState.name);
    userState.lists.forEach((list) => {
        const todoList = currentUser.createList(list.name);
        list.items.forEach((item) => {
            const todoItem = todoList.createItem(item.name);
            Object.assign(todoItem, item);
        });
    });
}

function saveUser() {
    Storage.save(currentUser);
}

export { currentUser, loadUser, saveUser, createDefaultUser, createDefaultList, createTestData };
