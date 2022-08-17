"use strict";

import style from "./styles.css";
import { User } from "./User";
import { Storage } from "./Storage";

function doStuff() {
    console.clear();

    // localStorage.setItem('test', JSON.stringify(user));
    // const user2 = User.fromJSON(localStorage.getItem('test'));
    const user = Storage.default();
    Storage.saveUser(user);
    const user2 = Storage.loadUser(user.name);
    console.log(user);
    console.log(user2);
}

doStuff();
