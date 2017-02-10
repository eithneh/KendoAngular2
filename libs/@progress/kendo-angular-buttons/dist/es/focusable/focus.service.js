var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, EventEmitter } from '@angular/core';
/**
 * @hidden
 */
var FocusService = (function () {
    function FocusService() {
        this.onFocus = new EventEmitter();
    }
    FocusService.prototype.isFocused = function (index) {
        return index === this.focused;
    };
    FocusService.prototype.focus = function (index) {
        if (this.isFocused(index)) {
            return;
        }
        this.focused = index;
        this.onFocus.emit(index);
    };
    FocusService.prototype.resetFocus = function () {
        this.focused = -1;
    };
    Object.defineProperty(FocusService.prototype, "focused", {
        get: function () {
            return this.focusedIndex;
        },
        set: function (index) {
            this.focusedIndex = index;
            this.onFocus.emit(index);
        },
        enumerable: true,
        configurable: true
    });
    return FocusService;
}());
FocusService = __decorate([
    Injectable()
], FocusService);
export { FocusService };
