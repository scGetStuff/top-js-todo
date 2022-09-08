"use strict";

import style from "./styles.css";
import * as DOMStuff from "./DOMStuff";
import * as Data from "./data";

console.clear();
DOMStuff.bind();
// kind of cheesy, but easy way of triggering all the default logic
DOMStuff.fakeButtonClick("storageLoad");
