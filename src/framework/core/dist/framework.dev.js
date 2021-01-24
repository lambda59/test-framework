"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FrameworkApp = exports.BorrowedDOM = void 0;

var _handlebars = require("handlebars");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BorrowedDOM =
/*#__PURE__*/
function () {
  function BorrowedDOM(initialOptions) {
    var _this = this;

    _classCallCheck(this, BorrowedDOM);

    this.currentElement = initialOptions.currentElement;
    this.currentQuery = initialOptions.currentQuery;
    this.currentDOM = document.querySelector(this.currentElement).cloneNode(true);
    this.updatedDOM = setInterval(function () {
      _this.currentDOM = document.querySelector(_this.currentElement).cloneNode(true);
      document.querySelector(_this.currentElement).innerHTML = _this.currentDOM.innerHTML;
    }, this.currentQuery);
  }

  _createClass(BorrowedDOM, [{
    key: "GetCurrentDOM",
    value: function GetCurrentDOM() {
      return this.currentDOM;
    }
  }, {
    key: "RenderToDOM",
    value: function RenderToDOM(content) {
      document.querySelector(this.currentElement).innerHTML += content;
    }
  }, {
    key: "DestroyDOM",
    value: function DestroyDOM() {
      clearInterval(this.updatedDOM);
    }
  }]);

  return BorrowedDOM;
}();

exports.BorrowedDOM = BorrowedDOM;

var FrameworkApp =
/*#__PURE__*/
function () {
  function FrameworkApp(initialOptions) {
    _classCallCheck(this, FrameworkApp);

    this.selector = initialOptions.selector;
    this.updateQuery = initialOptions.updateQuery;
    this.borrowedDOM = new BorrowedDOM({
      currentElement: this.selector,
      currentQuery: this.updateQuery
    });
  }

  _createClass(FrameworkApp, [{
    key: "add",
    value: function add(cName, tName) {
      this.ontroller = cName;
      this.template = tName;

      function load(template) {
        var template = (0, _handlebars.compile)(template);
        Promise.resolve().then(function () {
          return _interopRequireWildcard(require("".concat('../../controllers/' + 'app.js')));
        }).then(function (mc) {
          (0, _handlebars.compile)();
        });
      }

      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        load(this.responseText);
      };

      xhr.open("GET", "../src/templates/" + this.template);
      xhr.send();
    }
  }, {
    key: "start",
    value: function start() {}
  }]);

  return FrameworkApp;
}();

exports.FrameworkApp = FrameworkApp;