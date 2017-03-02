/**
 * Created by o2o3 on 17/3/2.
 */
"use strict";
/*
 *   This is all the default params.
 *   ALL_CLASS: for checkbox check-all classname(css)
 *   ONE_CLASS: for checkbox check-one classname(css)
 */
var DEFAULT_CONFIG = {
    ALL_CLASS: 'River-checkAll',
    ONE_CLASS: 'River-checkOne'
};
/*
 *   This is pollyfill Object.assign;
 */
if (!Object.assign && typeof Object.assign === 'undefined') {
    Object.assign = function () {
        var args = arguments;
        for (var i = 1; i < args.length; i++) {
            for (var j in args[i]) {
                args[0][j] = args[i][j];
            }
        }
    };
}
/*
 *   This is pollyfill Object.assign;
 */
if (!document.addEventListener && typeof document.addEventListener === "undefined") {
    HTMLInputElement.prototype.eventHandle = function (eventName, callback) {
        this.attachEvent("on" + eventName, callback);
    };
}
else {
    HTMLInputElement.prototype.eventHandle = function (eventName, callback, useCapture) {
        this.addEventListener(eventName, callback, useCapture);
    };
}
var CheckBox = (function () {
    function CheckBox(config) {
        this.config = {};
        Object.assign(this.config, DEFAULT_CONFIG, config);
        this.init();
    }
    CheckBox.prototype.init = function () {
        var element = document.getElementsByClassName(this.config.ALL_CLASS)[0];
        var one_element = document.getElementsByClassName(this.config.ONE_CLASS);
        var that = this;
        element.addEventListener('click', function () {
            if (!this.hasAttribute('checked')) {
                this.setAttribute('checked', 'checked');
                this.checked = 'checked';
                that.checkAll();
            }
            else {
                this.removeAttribute('checked');
                this.checked = null;
                that.unCheckAll();
            }
        });
        for (var _i = 0, one_element_1 = one_element; _i < one_element_1.length; _i++) {
            var i = one_element_1[_i];
            i.eventHandle('click', function () {
                var count = 0;
                if (this.checked) {
                    for (var _i = 0, one_element_2 = one_element; _i < one_element_2.length; _i++) {
                        var j = one_element_2[_i];
                        if (j.checked) {
                            count++;
                        }
                    }
                    if (count === one_element.length) {
                        element.setAttribute('checked', 'checked');
                        element.checked = 'checked';
                    }
                    else {
                        element.removeAttribute('checked');
                        element.checked = null;
                    }
                }
                else {
                    element.removeAttribute('checked');
                    element.checked = null;
                }
            });
        }
    };
    CheckBox.prototype.checkAll = function () {
        var doc = document;
        var all_element = doc.getElementsByClassName(this.config.ALL_CLASS);
        var one_elements = doc.getElementsByClassName(this.config.ONE_CLASS);
        if (all_element.length > 1) {
            console.log('River Tips: ALL_CLASS elements numbers must be 1.');
        }
        for (var _i = 0, one_elements_1 = one_elements; _i < one_elements_1.length; _i++) {
            var e = one_elements_1[_i];
            e.checked = 'checked';
            e.setAttribute('checked', 'checked');
        }
    };
    CheckBox.prototype.unCheckAll = function () {
        var doc = document;
        var one_elements = doc.getElementsByClassName(this.config.ONE_CLASS);
        for (var _i = 0, one_elements_2 = one_elements; _i < one_elements_2.length; _i++) {
            var e = one_elements_2[_i];
            e.checked = null;
            e.removeAttribute('checked');
        }
    };
    return CheckBox;
}());
var checkbox = new CheckBox({
    ALL_CLASS: 'River-checkAll'
});
exports.__esModule = true;
exports["default"] = CheckBox;
