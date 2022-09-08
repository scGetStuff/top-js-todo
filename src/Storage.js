"use strict";

function clear() {
    localStorage.clear();
}

function load(key) {
    return localStorage.getItem(key);
}

function save(user) {
    localStorage.setItem(user.name, JSON.stringify(user));
}

export { clear, load, save };
