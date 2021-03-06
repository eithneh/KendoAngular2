"use strict";
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/fromEvent');
require('rxjs/add/operator/auditTime');
var util_1 = require('../util');
var dom_service_1 = require('./dom.service');
/**
 * @hidden
 */
var ResizeService = (function () {
    function ResizeService(_dom, _zone) {
        this._dom = _dom;
        this._zone = _zone;
    }
    ResizeService.prototype.subscribe = function (callback) {
        var _this = this;
        if (!util_1.isDocumentAvailable()) {
            return;
        }
        this._zone.runOutsideAngular(function () {
            _this.subscription = Observable_1.Observable
                .fromEvent(_this._dom.getWindow(), "resize")
                .auditTime(util_1.FRAME_DURATION)
                .subscribe(function () { return _this._zone.run(function () { return callback(); }); });
        });
    };
    ResizeService.prototype.unsubscribe = function () {
        if (!this.subscription) {
            return;
        }
        this.subscription.unsubscribe();
    };
    ResizeService.prototype.isUnsubscribed = function () {
        return this.subscription && this.subscription.closed;
    };
    ResizeService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ResizeService.ctorParameters = [
        { type: dom_service_1.DOMService, },
        { type: core_1.NgZone, },
    ];
    return ResizeService;
}());
exports.ResizeService = ResizeService;
