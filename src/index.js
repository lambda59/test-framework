import { FrameworkApp } from "./framework/core/framework.js";

const app = new FrameworkApp({
    selector: '.root',
    updateQuery: 1
});

console.log("test123");

app.add("app.js", "app.hbs");