import { FrameworkApp } from "./framework/core/framework.js";

const app = new FrameworkApp({
    selector: '.root',
    updateQuery: 1
});

app.add("app.js", "app.hbs");