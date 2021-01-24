import { compile } from 'handlebars';

class BorrowedDOM {
    constructor(initialOptions) {
        this.currentElement = initialOptions.currentElement;
        this.currentQuery = initialOptions.currentQuery;
        this.currentDOM = document.querySelector(this.currentElement).cloneNode(true);

        this.updatedDOM = setInterval(() => {
            this.currentDOM = document.querySelector(this.currentElement).cloneNode(true);
            document.querySelector(this.currentElement).innerHTML = this.currentDOM.innerHTML;
        }, this.currentQuery);
    }

    GetCurrentDOM() {
        return this.currentDOM;
    }

    RenderToDOM(content) {
        document.querySelector(this.currentElement).innerHTML += content;
    }

    DestroyDOM() {
        clearInterval(this.updatedDOM);
    }
}

class FrameworkApp {
    constructor(initialOptions) {
        this.selector = initialOptions.selector;
        this.updateQuery = initialOptions.updateQuery;
        this.borrowedDOM = new BorrowedDOM({
            currentElement: this.selector,
            currentQuery: this.updateQuery
        });
    }

    add(cName, tName) {
        var controller = cName;
        this.template = tName;
        var currentThis = this;

        const load = (template) => {
            var reController = controller;
            var template = compile(template);
            import(`../../controllers/${reController}`).then(mc => {
                this.borrowedDOM.RenderToDOM(template(mc.data));
            });
        }

        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            load(this.responseText);
        }
        xhr.open("GET", "../src/templates/" + this.template);
        xhr.send();
    }

    start() {

    }
}

export {
    BorrowedDOM,
    FrameworkApp
}