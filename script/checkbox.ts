/**
 * Created by o2o3 on 17/3/2.
 */
 
declare var Object:any;
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
    }
}

/*
 *   This is pollyfill Object.assign;
 */
if (!document.addEventListener && typeof document.addEventListener === "undefined") {
    HTMLInputElement.prototype.eventHandle = function (eventName, callback) {
        this.attachEvent("on" + eventName, callback);
    };
} else {
    HTMLInputElement.prototype.eventHandle = function (eventName, callback, useCapture) {
        this.addEventListener(eventName, callback, useCapture);
    };
}

class CheckBox {
    config:any;

    constructor(config) {
        this.config = {};
        Object.assign(this.config, DEFAULT_CONFIG, config);
        this.init();
    }

    private init() {
        var element = document.getElementsByClassName(this.config.ALL_CLASS)[0];
        var one_element = document.getElementsByClassName(this.config.ONE_CLASS);
        var that = this;
        element.addEventListener('click', function () {
            if (!this.hasAttribute('checked')) {
                this.setAttribute('checked', 'checked');
                this.checked = 'checked';
                that.checkAll();
            } else {
                this.removeAttribute('checked');
                this.checked = null;
                that.unCheckAll();
            }
        });
        for (var i of one_element) {
            i.eventHandle('click', function () {
                var count = 0;
                if (this.checked) {
                    for (var j of one_element) {
                        if (j.checked) {
                            count++;
                        }
                    }
                    if (count === one_element.length) {
                        element.setAttribute('checked', 'checked');
                        element.checked = 'checked';
                    } else {
                        element.removeAttribute('checked');
                        element.checked = null;
                    }
                } else {
                    element.removeAttribute('checked');
                    element.checked = null;
                }
            });
        }
    }

    public checkAll() {
        var doc = document;
        var all_element = doc.getElementsByClassName(this.config.ALL_CLASS);
        var one_elements = doc.getElementsByClassName(this.config.ONE_CLASS);
        if (all_element.length > 1) {
            console.log('River Tips: ALL_CLASS elements numbers must be 1.');
        }
        for (var e of one_elements) {
            e.checked = 'checked';
            e.setAttribute('checked', 'checked');
        }
    }

    public unCheckAll() {
        var doc = document;
        var one_elements = doc.getElementsByClassName(this.config.ONE_CLASS);
        for (var e of one_elements) {
            e.checked = null;
            e.removeAttribute('checked');
        }
    }


}

var checkbox = new CheckBox({
    ALL_CLASS: 'River-checkAll'
});

export default CheckBox;